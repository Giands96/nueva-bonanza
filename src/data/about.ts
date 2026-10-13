// Textos copiados literalmente de Inicio NBM.dc.html y Quienes Somos NBM.dc.html.

export interface Policy {
  id: string;
  title: string;
  text: string;
}

// DATOS POR CONFIRMAR CON EL CLIENTE
// Todo lo utilizado es unicamente texto relleno, no es información oficial de la empresa.
// Se debe confirmar con el cliente antes de publicar.

export const policies: Policy[] = [
  {
    id: "gestion",
    title: "Gestión",
    text: "Planificamos y supervisamos nuestras operaciones para optimizar los recursos, fortalecer el control de los procesos y promover la mejora contínua.",
  },
  {
    id: "calidad",
    title: "Calidad",
    text: "Promovemos el cumplimiento de los procedimientos y estándares establecidos, buscando la eficiencia y la consistencia en nuestras operaciones.",
  },
  {
    id: "medio-ambiente",
    title: "Medio ambiente",
    text: "Desarrollamos nuestras actividades con responsabilidad ambiental, priorizando la prevención de impactos y el cumplimientos de los compromisos ambientales.",
  },
  {
    id: "seguridad-y-salud-en-el-trabajo",
    title: "Seguridad y salud en el trabajo",
    text: "Priorizamos la protección de nuestros colaboradores, mediante la prevención de riesgos, la capacitación contínua y el desarrollo de prácticas de trabajo seguras",
  },
];

export interface Milestone {
  year: string;
  text: string;
}

export const milestones: Milestone[] = [
  { year: "2004", text: "Inicio de operaciones en el Perú" },
  { year: "2010", text: "Ampliación de proyectos mineros" },
  { year: "2020", text: "Ampliación de nuevas exploraciones" },
  { year: "2025", text: "Inversión en infraestructura" },
  { year: "2026", text: "Consolidación como aliado estratégico del sector minero" },
  
];

export const historyNote =
  "Más de una década construyendo una minería responsable, basada en seguridad, innovación y compromiso con el desarrollo del Perú.";

export const mission =
  "Desarrollar actividades mineras de manera eficiente y responsable, priorizando la seguridad de las personas, la excelencia operativa y el cuidado del medio ambiente.";

export const vision =
  "Consolidarnos como una empresa minera reconocida por su gestión responsable, eficiencia operativa y compromiso con el desarrollo sostenible";

export interface Value {
  number: string;
  title: string;
  text: string;
}

export const values: Value[] = [
  { number: "01", title: "SEGURIDAD", text: "Protegemos la vida y promovemos condiciones de trabajo seguras en cada operación." },
  { number: "02", title: "INTEGRIDAD", text: "Actuamos con honestidad, ética y transparencia en todas nuestras actividades." },
  { number: "03", title: "RESPONSABILIDAD", text: "Cumplimos nuestros compromisos y gestionamos nuestras operaciones de manera responsable." },
  { number: "04", title: "RESPETO", text: "Valoramos a las personas, las comunidades y el entorno donde desarrollamos nuestras actividades." },
  { number: "05", title: "EXCELENCIA", text: "Impulsamos la mejora contínua para fortalecer nuestros procesos y resultados." },
];

export interface Stat {
  value: string;
  title: string;
  text: string;
}

// Se usa 16 (diseño de Proyectos) según Decisión pendiente §10 del plan.
export const stats: Stat[] = [
  {
    value: "15+",
    title: "PROYECTOS",
    text: "Formamos parte de los principales proyectos mineros del país.",
  },
  {
    value: "2,000",
    title: "COLABORADORES",
    text: "Un equipo comprometido con la excelencia y el desarrollo sostenible.",
  },
  {
    value: "16",
    title: "AÑOS DE EXPERIENCIA",
    text: "Contribuyendo al crecimiento de la industria minera del Perú.",
  },
];

export const companyHeading = "COMPROMETIDOS CON UN FUTURO SOSTENIBLE";

export const companyText =
  "En Nueva Bonanza Mining desarrollamos una operación aurifera planificada y supervisada en cada etapa. Integramos experiencia técnica, innovación y seguridad para generar valor compartido con nuestros colaboradores y comunidades del Perú";
