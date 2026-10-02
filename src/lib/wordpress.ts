/**
 * Cliente de WordPress headless vía WPGraphQL (plugin https://www.wpgraphql.com).
 * Normaliza los posts al modelo `NewsItem` que consumen las páginas de Noticias.
 *
 * Config: WP_GRAPHQL_URL en `.env` (p. ej. https://cms.ejemplo.com/graphql).
 * Sin URL se devuelven listas vacías (el listado muestra su estado vacío).
 * Con URL, un fallo de red o de GraphQL lanza error: en un build estático es
 * preferible que el deploy falle a publicar la sección de noticias vacía.
 */

export interface NewsItem {
  slug: string;
  title: string;
  /** ISO `YYYY-MM-DD`, para `<time datetime>`. */
  date: string;
  /** `dd/mm/yyyy`. */
  dateLabel: string;
  image: NewsImage | null;
  category: string | null;
  /** Texto plano, sin etiquetas. */
  excerpt: string;
  /** HTML del editor; solo en el detalle. */
  content?: string;
}

export interface NewsImage {
  src: string;
  alt: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

interface WPPost {
  slug: string;
  title: string | null;
  date: string;
  excerpt: string | null;
  content?: string | null;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string | null;
      srcSet: string | null;
      mediaDetails: { width: number | null; height: number | null } | null;
    };
  } | null;
  categories: { nodes: { name: string }[] } | null;
}

const ENDPOINT = import.meta.env.WP_GRAPHQL_URL as string | undefined;

/** Máximo por petición que admite WPGraphQL por defecto. */
const PAGE_SIZE = 100;

const POST_FIELDS = /* GraphQL */ `
  fragment NewsFields on Post {
    slug
    title
    date
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
        srcSet
        mediaDetails { width height }
      }
    }
    categories(first: 1) { nodes { name } }
  }
`;

const LIST_QUERY = /* GraphQL */ `
  ${POST_FIELDS}
  query NewsList($first: Int!, $after: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }
    ) {
      pageInfo { hasNextPage endCursor }
      nodes { ...NewsFields }
    }
  }
`;

const DETAIL_QUERY = /* GraphQL */ `
  ${POST_FIELDS}
  query NewsDetail($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...NewsFields
      status
      content
    }
  }
`;

async function query<T>(source: string, variables: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(ENDPOINT!, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query: source, variables }),
  });
  if (!res.ok) {
    throw new Error(`WordPress GraphQL respondió ${res.status} ${res.statusText}`);
  }
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) {
    throw new Error(`WordPress GraphQL: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  return json.data as T;
}

let warned = false;
function isConfigured(): boolean {
  if (!ENDPOINT && !warned) {
    console.warn("[wordpress] WP_GRAPHQL_URL no está definida: Noticias se mostrará vacía.");
    warned = true;
  }
  return Boolean(ENDPOINT);
}

/** Todas las noticias publicadas, de la más reciente a la más antigua. */
export async function getAllPosts(): Promise<NewsItem[]> {
  if (!isConfigured()) return [];
  const posts: NewsItem[] = [];
  let after: string | null = null;
  do {
    const data: {
      posts: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: WPPost[] };
    } = await query(LIST_QUERY, { first: PAGE_SIZE, after });
    posts.push(...data.posts.nodes.map(normalize));
    after = data.posts.pageInfo.hasNextPage ? data.posts.pageInfo.endCursor : null;
  } while (after);
  return posts;
}

/** Noticia completa (con `content`) o `null` si no existe o no está publicada. */
export async function getPostBySlug(slug: string): Promise<NewsItem | null> {
  if (!isConfigured()) return null;
  const data = await query<{ post: (WPPost & { status: string }) | null }>(DETAIL_QUERY, { slug });
  if (!data.post || data.post.status !== "publish") return null;
  return { ...normalize(data.post), content: data.post.content ?? "" };
}

function normalize(post: WPPost): NewsItem {
  const media = post.featuredImage?.node;
  const iso = post.date.slice(0, 10);
  const [y, m, d] = iso.split("-");
  return {
    slug: post.slug,
    title: decodeEntities(post.title ?? ""),
    date: iso,
    // WPGraphQL entrega `date` en la hora local del sitio, sin zona: se formatea
    // desde la cadena para no desplazar el día según la zona del servidor de build.
    dateLabel: `${d}/${m}/${y}`,
    image: media
      ? {
          src: media.sourceUrl,
          alt: media.altText ?? "",
          srcSet: media.srcSet ?? undefined,
          width: media.mediaDetails?.width ?? undefined,
          height: media.mediaDetails?.height ?? undefined,
        }
      : null,
    category: post.categories?.nodes[0]?.name ?? null,
    excerpt: toPlainText(post.excerpt ?? ""),
  };
}

/** Quita etiquetas HTML y decodifica entidades (excerpt, metadatos). */
export function toPlainText(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  hellip: "…", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”",
};

function decodeEntities(text: string): string {
  return text.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isNaN(n) ? match : String.fromCodePoint(n);
    }
    return NAMED_ENTITIES[code.toLowerCase()] ?? match;
  });
}
