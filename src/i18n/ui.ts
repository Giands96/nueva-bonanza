/**
 * Idiomas del sitio. Debe coincidir con `i18n.locales` y `i18n.defaultLocale`
 * de astro.config.mjs.
 */
export const languages = {
  es: "Español",
  en: "English",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "es";

/** Valor de og:locale por idioma. */
export const ogLocales: Record<Lang, string> = {
  es: "es_PE",
  en: "en_US",
};

const es = {
  "meta.description":
    "Empresa minera en Arequipa, Perú. Conectamos oportunidades con experiencia minera, criterio técnico y una operación responsable.",
} as const;

export type UiKey = keyof typeof es;

// Record completo: si falta una traducción, falla el chequeo de tipos.
const en: Record<UiKey, string> = {
  "meta.description":
    "Mining company in Arequipa, Peru. We connect opportunities with mining experience, technical judgment and responsible operations.",
};

export const ui: Record<Lang, Record<UiKey, string>> = { es, en };
