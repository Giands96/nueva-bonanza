import type { Lang } from "../i18n/ui";
import { localizePath, type RouteKey } from "../i18n/utils";

export interface NavItem {
  label: string;
  href: string;
  key: "inicio" | "quienes-somos" | "productos" | "noticias" | "contacto";
}

/* Orden del menú; "noticias" no tiene versión en inglés, por eso no está aquí. */
const navLabels: { key: NavItem["key"] & RouteKey; es: string; en: string }[] = [
  { key: "inicio", es: "Inicio", en: "Home" },
  { key: "quienes-somos", es: "Quiénes somos", en: "About us" },
  { key: "productos", es: "Productos", en: "Products" },
  { key: "contacto", es: "Contacto", en: "Contact" },
];

export function getNavigation(lang: Lang): NavItem[] {
  return navLabels.map((item) => ({
    label: item[lang],
    href: localizePath(item.key, lang),
    key: item.key,
  }));
}

// Compatibilidad: se elimina cuando los componentes pidan el idioma (T3).
export const navigation: NavItem[] = getNavigation("es");

export interface Contact {
  readonly address: string;
  readonly office: string;
  readonly reference: string;
  readonly district: string;
  readonly city: string;
  readonly phone: string;
  readonly email: string;
  readonly hours: string;
}

/* Dirección, teléfono y correo no cambian de idioma. */
const contactShared = {
  address: "Av. Manuel Olguin 325 - Santiago de Surco",
  district: "Santiago de Surco",
  city: "Lima",
  phone: "+51 913 338 729",
  email: "gerencia01@nbonanzamining.com",
} as const;

const contactText: Record<Lang, Pick<Contact, "office" | "reference" | "hours">> = {
  es: {
    office: "Oficina 802",
    reference: "Referencia: Al frente del Jockey Plaza, hay un tambo en el primer piso.",
    hours: "Lun - Vie, 8:00 a.m. - 6:00 p.m.",
  },
  en: {
    office: "Office 802",
    reference: "Reference: Across from Jockey Plaza, there is a Tambo store on the first floor.",
    hours: "Mon - Fri, 8:00 a.m. - 6:00 p.m.",
  },
};

export function getContact(lang: Lang): Contact {
  return { ...contactShared, ...contactText[lang] };
}

// Compatibilidad: se elimina cuando los componentes pidan el idioma (T3).
export const contact: Contact = getContact("es");


export const emails = {
  rh: "sally.falconi@nbonanzamining.com",
  logistica: "logistica01@nbonanzamining.com",
  gerencia_comercial: "hector.acevedo@nbonanzamining.com",
  prensa:"paola.acevedo@nbonanzamining.com",
  proyectos:"gerencia01@nbonanzamining.com"
}
/**
 * Motivos del formulario de Contacto y a quién se envía cada uno (FormSubmit).
 * `to` admite el correo o, mejor, el alias aleatorio que FormSubmit entrega al
 * activar cada correo (p. ej. "a1b2c3d4e5..."): así la dirección no queda
 * expuesta en el HTML. Cada correo nuevo debe activarse una vez desde el
 * mensaje de confirmación que FormSubmit le envía con el primer envío.
 */
export const contactReasons = [
  { label: "Propuesta de proyecto", to: "4bda3c158d7e89b1c28463e6230c4873" },
  { label: "Consulta comercial", to: "aa8652f874dee24750d36e13603d5d5c" },
  { label: "Empleo y prácticas", to: "93c3884a197ac293ffabf54a0ae78d30" },
  { label: "Prensa y comunicaciones", to: "d5aff8dd18ce9fd3f5145d46cb6f4e0c" },
  { label: "Logística y transporte", to: "61cb2035270792a91bc3504a68ae209b" },
  { label: "Otro", to: "aa8652f874dee24750d36e13603d5d5c" },
] as const;

/* Etiqueta en inglés de cada motivo, indexada por la etiqueta en español. */
const contactReasonLabels: Record<(typeof contactReasons)[number]["label"], string> = {
  "Propuesta de proyecto": "Project proposal",
  "Consulta comercial": "Business inquiry",
  "Empleo y prácticas": "Jobs and internships",
  "Prensa y comunicaciones": "Press and communications",
  "Logística y transporte": "Logistics and transportation",
  "Otro": "Other",
};

/**
 * `value` es la etiqueta en español: es lo que se envía en el formulario y lo que
 * usa el PHP para enrutar el correo. `label` es lo que ve la persona.
 */
export function getContactReasons(lang: Lang) {
  return contactReasons.map((reason) => ({
    value: reason.label,
    label: lang === "en" ? contactReasonLabels[reason.label] : reason.label,
    to: reason.to,
  }));
}

export const tagline =``;

/** Dominio canónico de producción (sitemap, canonical, Open Graph). */
export const siteUrl = "https://nbonanzamining.com";

// URLs pendientes (Decisión pendiente §10): placeholders centralizados.
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/nueva-bonanza-mining" },
  { label: "Facebook", href: "https://www.facebook.com/nueva-bonanza-mining" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nueva-bonanza-mining" },
];
