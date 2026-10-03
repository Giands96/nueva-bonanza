import { getAllPosts, newsUrl, type NewsItem } from "./wordpress";

/** Tiempo máximo esperando a WordPress antes de conservar el HTML del build. */
const TIMEOUT_MS = 8000;

/** Debe coincidir con `pageSize: 9` de `getStaticPaths` en `[...page].astro`. */
const PAGE_SIZE = 9;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timeout de ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/** Tarjeta `<li>` idéntica en markup/clases a `NewsCard.astro`. Solo texto via `textContent`. */
function renderItem(
  post: NewsItem,
  placeholder: string,
  iconArrow: string,
): HTMLLIElement {
  const li = document.createElement("li");
  li.dataset.slug = post.slug;

  const link = document.createElement("a");
  link.className = "article";
  link.href = newsUrl(post.slug);

  const img = document.createElement("img");
  img.className = "article__img";
  img.src = post.image?.src ?? placeholder;
  img.alt = post.image?.alt ?? "";
  if (post.image?.srcSet) img.srcset = post.image.srcSet;
  img.sizes = "(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw";
  if (post.image?.width) img.width = post.image.width;
  if (post.image?.height) img.height = post.image.height;
  img.loading = "lazy";
  img.decoding = "async";

  const time = document.createElement("time");
  time.dateTime = post.date;
  time.textContent = post.dateLabel;

  const title = document.createElement("h3");
  title.textContent = post.title;

  const more = document.createElement("span");
  more.className = "article__more";
  more.textContent = "LEER MÁS";
  const icon = document.createElement("span");
  icon.className = "icon";
  icon.setAttribute("aria-hidden", "true");
  icon.style.cssText = `--i:url(${iconArrow});width:16px;height:16px`;
  more.appendChild(icon);

  link.append(img, time, title, more);
  li.appendChild(link);
  return li;
}

/**
 * Sincroniza el listado de página 1 con WordPress: reordena según la API viva,
 * inserta nuevas y elimina borradas. No hace nada fuera de página 1 o si WP falla.
 */
export async function hydrateNewsList(): Promise<void> {
  const section = document.querySelector<HTMLElement>("[data-news-list]");
  if (!section || section.dataset.page !== "1") return;
  const placeholder = section.dataset.placeholder ?? "";
  const iconArrow = section.dataset.iconArrow ?? "";

  let posts: NewsItem[];
  try {
    posts = await withTimeout(getAllPosts(), TIMEOUT_MS);
  } catch (err) {
    console.warn("[news-hydrate] usando HTML estático:", err);
    return;
  }
  const fresh = posts.slice(0, PAGE_SIZE);
  const freshSlugs = new Set(fresh.map((p) => p.slug));

  let grid = section.querySelector<HTMLUListElement>(".news__grid");
  if (!grid) {
    if (fresh.length === 0) return;
    section.querySelector(".news__empty")?.remove();
    grid = document.createElement("ul");
    grid.className = "news__grid";
    grid.setAttribute("data-reveal-stagger", "");
    section.appendChild(grid);
  }
  for (const post of fresh) {
    const slug = CSS.escape(post.slug);
    const li =
      grid.querySelector<HTMLLIElement>(`li[data-slug="${slug}"]`) ??
      renderItem(post, placeholder, iconArrow);
    grid.appendChild(li); // `appendChild` mueve el nodo: deja el orden de la API viva
  }
  grid.querySelectorAll<HTMLLIElement>("li[data-slug]").forEach((li) => {
    if (!freshSlugs.has(li.dataset.slug ?? "")) li.remove();
  });

  // Actualiza "1 / N" si la cantidad de páginas cambió.
  const count = section.querySelector(".pager__count");
  if (count) {
    count.textContent = `1 / ${Math.max(1, Math.ceil(posts.length / PAGE_SIZE))}`;
  }
}
