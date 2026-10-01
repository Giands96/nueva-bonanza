// Textos copiados literalmente de Inicio NBM.dc.html y Quienes Somos NBM.dc.html.

export interface Policy {
  id: string;
  title: string;
  text: string;
}

export const policies: Policy[] = [
  {
    id: "gestion",
    title: "Gestión",
    text: "Planificamos, medimos y mejoramos de forma continua cada proceso. Gestionamos los recursos con eficiencia y transparencia para cumplir nuestros objetivos y generar valor para nuestros grupos de interés.",
  },
  {
    id: "calidad",
    title: "Calidad",
    text: "Cumplimos los requisitos de nuestros clientes y las normas aplicables. Estandarizamos procesos y verificamos resultados para entregar un servicio consistente y confiable.",
  },
  {
    id: "medio-ambiente",
    title: "Medio ambiente",
    text: "Prevenimos, mitigamos y controlamos los impactos ambientales de la operación. Usamos los recursos naturales de forma sostenible y respetamos la biodiversidad del entorno.",
  },
  {
    id: "seguridad",
    title: "Seguridad",
    text: "La vida y la salud de nuestros colaboradores son innegociables. Identificamos riesgos, capacitamos de forma constante y aplicamos protocolos para mantener ambientes de trabajo seguros.",
  },
];

export interface Milestone {
  year: string;
  text: string;
}

export const milestones: Milestone[] = [
  { year: "2010", text: "Inicio de operaciones en el Perú" },
  { year: "2015", text: "Primer gran proyecto minero" },
  { year: "2020", text: "Expansión a nuevas regiones del país" },
  { year: "2026", text: "Consolidación como aliado estratégico del sector minero" },
];

export const historyNote =
  "Más de una década construyendo una minería responsable, basada en seguridad, innovación y compromiso con el desarrollo del Perú";

export const mission =
  "Desarrollar operaciones mineras eficientes y responsables, aplicando altos estándares de seguridad, calidad y gestión ambiental.";

export const vision =
  "Ser la empresa minera de referencia en el Perú por nuestra capacidad operativa, innovación y compromiso con una minería segura y responsable.";

export interface Value {
  number: string;
  title: string;
  text: string;
}

export const values: Value[] = [
  { number: "01", title: "SEGURIDAD", text: "Protegemos la vida y el bienestar en cada tarea." },
  { number: "02", title: "INTEGRIDAD", text: "Actuamos con ética, transparencia y responsabilidad." },
  { number: "03", title: "COMPROMISO", text: "Cumplimos con disciplina y enfoque en resultados." },
  { number: "04", title: "RESPETO", text: "Valoramos a las personas, las comunidades y el entorno." },
  { number: "05", title: "EXCELENCIA", text: "Mejoramos continuamente para operar mejor." },
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
  "En Nueva Bonanza contribuimos al desarrollo del país con una operación responsable, eficiente y sostenible. Integramos experiencia, innovación y altos estándares de seguridad para generar valor compartido con nuestros colaboradores y con el Perú.";
