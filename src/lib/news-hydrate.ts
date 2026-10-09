import { getAllPosts, newsUrl, type NewsItem } from "./wordpress";

/** Tiempo máximo esperando a WordPress antes de mostrar el error. */
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

function pageHref(page: number): string {
  return page <= 1 ? "/noticias" : `/noticias/${page}`;
}

/**
 * Dibuja el listado contra WordPress en cada visita: el build no guarda
 * noticias, solo el cascarón con el loader. Ante un fallo muestra el error
 * y ante una página fuera de rango, el estado vacío.
 */
export async function hydrateNewsList(): Promise<void> {
  const section = document.querySelector<HTMLElement>("[data-news-list]");
  if (!section) return;
  const page = Number(section.dataset.page ?? "1") || 1;
  // Última página que existe como archivo: más allá solo hay 404 hasta el rebuild.
  const builtLast = Number(section.dataset.lastPage ?? "1") || 1;
  const placeholder = section.dataset.placeholder ?? "";
  const iconArrow = section.dataset.iconArrow ?? "";

  const loading = section.querySelector<HTMLElement>("[data-loading]");
  const grid = section.querySelector<HTMLUListElement>("[data-grid]");
  const empty = section.querySelector<HTMLElement>("[data-empty]");
  const error = section.querySelector<HTMLElement>("[data-error]");
  const pager = section.querySelector<HTMLElement>("[data-pager]");
  if (!grid || !loading || !empty || !error) return;

  let posts: NewsItem[];
  try {
    posts = await withTimeout(getAllPosts(), TIMEOUT_MS);
  } catch (err) {
    console.warn("[news-hydrate] no se pudo cargar el listado:", err);
    loading.hidden = true;
    error.hidden = false;
    return;
  }
  loading.hidden = true;

  const freshLast = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  if (slice.length === 0) {
    empty.hidden = false;
  } else {
    for (const post of slice) {
      grid.appendChild(renderItem(post, placeholder, iconArrow));
    }
    grid.hidden = false;
  }

  // Paginador: solo enlaza a páginas que existen como archivo.
  if (pager) {
    const prev = pager.querySelector<HTMLAnchorElement>("[data-prev]");
    const next = pager.querySelector<HTMLAnchorElement>("[data-next]");
    const count = pager.querySelector("[data-count]");
    if (count) count.textContent = `${page} / ${freshLast}`;
    const showPrev = page > 1;
    const showNext = page < freshLast && page < builtLast;
    if (prev) {
      prev.hidden = !showPrev;
      if (showPrev) prev.href = pageHref(page - 1);
    }
    if (next) {
      next.hidden = !showNext;
      if (showNext) next.href = pageHref(page + 1);
    }
    pager.hidden = !(showPrev || showNext);
  }
}
