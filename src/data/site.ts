export interface NavItem {
  label: string;
  href: string;
  key: "inicio" | "quienes-somos" | "productos" | "noticias" | "contacto";
}

export const navigation: NavItem[] = [
  { label: "Inicio", href: "/", key: "inicio" },
  { label: "Quiénes somos", href: "/quienes-somos", key: "quienes-somos" },
  { label: "Productos", href: "/productos", key: "productos" },
  { label: "Noticias", href: "/noticias", key: "noticias" },
  { label: "Contacto", href: "/contacto", key: "contacto" },
];

export const contact = {
  address: "Av. Manuel Olguin 325 - Santiago de Surco",
  office: "Oficina 802",
  reference: "Referencia: Al frente del Jockey Plaza, hay un tambo en el primer piso.",
  district: "Santiago de Surco",
  city :"Lima",
  phone: "+51 913 338 729",
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
