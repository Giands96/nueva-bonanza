export interface NavItem {
  label: string;
  href: string;
  key: "inicio" | "quienes-somos" | "proyectos" | "noticias" | "contacto";
}

export const navigation: NavItem[] = [
  { label: "Inicio", href: "/", key: "inicio" },
  { label: "Quiénes somos", href: "/quienes-somos", key: "quienes-somos" },
  { label: "Proyectos", href: "/proyectos", key: "proyectos" },
  { label: "Noticias", href: "/noticias", key: "noticias" },
  { label: "Contacto", href: "/contacto", key: "contacto" },
];

export const contact = {
  address: "Av. Puente Grau 492, Arequipa, Perú",
  phone: "+51 955 222 111",
  email: "contacto@nbmining.pe",
  hours: "Lun - Vie, 8:00 a.m. - 6:00 p.m.",
} as const;

export const tagline = "Minería responsable con visión de futuro";

// URLs pendientes (Decisión pendiente §10): placeholders centralizados.
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/nueva-bonanza-mining" },
  { label: "Facebook", href: "https://www.facebook.com/nueva-bonanza-mining" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nueva-bonanza-mining" },
];
