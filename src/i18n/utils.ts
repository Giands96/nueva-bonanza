import { defaultLang, languages, ui, type Lang, type UiKey } from "./ui";

/** Normaliza `Astro.currentLocale` a un idioma conocido. */
export function getLang(locale: string | undefined): Lang {
  return locale && Object.hasOwn(languages, locale) ? (locale as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

export type RouteKey =
  | "inicio"
  | "quienes-somos"
  | "productos"
  | "noticias"
  | "contacto"
  | "gracias";

/**
 * Ruta de cada página por idioma. Una página sin entrada para un idioma no
 * existe en ese idioma: sus links caen en la versión en español y no emite
 * `hreflang`.
 */
export const routes: Record<RouteKey, { es: string } & Partial<Record<Lang, string>>> = {
  inicio: { es: "/", en: "/en/" },
  "quienes-somos": { es: "/quienes-somos", en: "/en/about-us" },
  productos: { es: "/productos", en: "/en/products" },
  noticias: { es: "/noticias" },
  contacto: { es: "/contacto", en: "/en/contact" },
  gracias: { es: "/gracias", en: "/en/thanks" },
};

export function localizePath(key: RouteKey, lang: Lang): string {
  return routes[key][lang] ?? routes[key][defaultLang];
}

const stripSlash = (path: string) => (path.length > 1 ? path.replace(/\/$/, "") : path);

/** Entrada de `routes` que corresponde a la ruta dada (con o sin barra final). */
function findRoute(pathname: string) {
  const current = stripSlash(pathname);
  return Object.values(routes).find((route) =>
    Object.values(route).some((path) => stripSlash(path) === current),
  );
}

/**
 * Versiones de la página actual en cada idioma, para los `<link hreflang>`.
 * Vacío si la página existe en un solo idioma. Las rutas salen con barra final,
 * igual que el canonical del build (formato `directory`).
 */
export function getAlternates(pathname: string): { lang: Lang; path: string }[] {
  const entry = findRoute(pathname);
  if (!entry) return [];
  const alternates = (Object.keys(languages) as Lang[]).flatMap((lang) => {
    const path = entry[lang];
    return path ? [{ lang, path: `${stripSlash(path)}/`.replace(/^\/\/$/, "/") }] : [];
  });
  return alternates.length > 1 ? alternates : [];
}

/**
 * Un destino por idioma para el selector de idioma. Si la página no existe en
 * un idioma (noticias, 404), el destino es la portada de ese idioma.
 * Las rutas salen tal cual están en `routes`, igual que los links del menú.
 */
export function getLanguageLinks(
  pathname: string,
  lang: Lang,
): { lang: Lang; href: string; current: boolean }[] {
  const entry = findRoute(pathname);
  return (Object.keys(languages) as Lang[]).map((target) => ({
    lang: target,
    href: entry?.[target] ?? localizePath("inicio", target),
    current: target === lang,
  }));
}
