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
  { label: "Propuesta de proyecto", to: emails.proyectos },
  { label: "Consulta comercial", to: emails.gerencia_comercial },
  { label: "Empleo y prácticas", to: emails.rh },
  { label: "Prensa y comunicaciones", to: emails.prensa },
  { label: "Otro", to: emails.gerencia_comercial },
] as const;

export const tagline ="Minería responsable con visión de futuro";

// URLs pendientes (Decisión pendiente §10): placeholders centralizados.
export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/nueva-bonanza-mining" },
  { label: "Facebook", href: "https://www.facebook.com/nueva-bonanza-mining" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/nueva-bonanza-mining" },
];
