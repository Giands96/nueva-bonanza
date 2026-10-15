// Textos copiados literalmente de Inicio NBM.dc.html y Quienes Somos NBM.dc.html.
import type { Lang } from "../i18n/ui";

export interface Policy {
  id: string;
  title: string;
  text: string;
}

type PolicyText = Omit<Policy, "id">;
type PolicyEntry = Pick<Policy, "id"> & Record<Lang, PolicyText>;

const policyData: PolicyEntry[] = [
  {
    id: "gestion",
    es: {
      title: "Gestión",
      text: "Planificamos y supervisamos nuestras operaciones para optimizar los recursos, fortalecer el control de los procesos y promover la mejora contínua.",
    },
    en: {
      title: "Management",
      text: "We plan and supervise our operations to optimize resources, strengthen process control and promote continuous improvement.",
    },
  },
  {
    id: "calidad",
    es: {
      title: "Calidad",
      text: "Promovemos el cumplimiento de los procedimientos y estándares establecidos, buscando la eficiencia y la consistencia en nuestras operaciones.",
    },
    en: {
      title: "Quality",
      text: "We promote compliance with established procedures and standards, seeking efficiency and consistency in our operations.",
    },
  },
  {
    id: "medio-ambiente",
    es: {
      title: "Medio ambiente",
      text: "Desarrollamos nuestras actividades con responsabilidad ambiental, priorizando la prevención de impactos y el cumplimientos de los compromisos ambientales.",
    },
    en: {
      title: "Environment",
      text: "We carry out our activities with environmental responsibility, prioritizing the prevention of impacts and compliance with our environmental commitments.",
    },
  },
  {
    id: "seguridad-y-salud-en-el-trabajo",
    es: {
      title: "Seguridad y salud en el trabajo",
      text: "Priorizamos la protección de nuestros colaboradores, mediante la prevención de riesgos, la capacitación contínua y el desarrollo de prácticas de trabajo seguras",
    },
    en: {
      title: "Occupational health and safety",
      text: "We prioritize the protection of our employees through risk prevention, ongoing training and the development of safe work practices.",
    },
  },
];

export function getPolicies(lang: Lang): Policy[] {
  return policyData.map((item) => ({ id: item.id, ...item[lang] }));
}

export interface Milestone {
  year: string;
  text: string;
}

type MilestoneEntry = Pick<Milestone, "year"> & Record<Lang, string>;

const milestoneData: MilestoneEntry[] = [
  { year: "2004", es: "Inicio de operaciones en el Perú", en: "Start of operations in Peru" },
  { year: "2010", es: "Ampliación de proyectos mineros", en: "Expansion of mining projects" },
  { year: "2020", es: "Ampliación de nuevas exploraciones", en: "Expansion of new exploration work" },
  { year: "2025", es: "Inversión en infraestructura", en: "Investment in infrastructure" },
  {
    year: "2026",
    es: "Consolidación como aliado estratégico del sector minero",
    en: "Consolidation as a strategic partner of the mining sector",
  },
];

export function getMilestones(lang: Lang): Milestone[] {
  return milestoneData.map((item) => ({ year: item.year, text: item[lang] }));
}

/* Textos sueltos de la empresa, un bloque por idioma. */
interface CompanyText {
  historyNote: string;
  mission: string;
  vision: string;
  companyHeading: string;
  companyText: string;
}

const companyData: Record<Lang, CompanyText> = {
  es: {
    historyNote:
      "Más de una década construyendo una minería responsable, basada en seguridad, innovación y compromiso con el desarrollo del Perú.",
    mission:
      "Desarrollar actividades mineras de manera eficiente y responsable, priorizando la seguridad de las personas, la excelencia operativa y el cuidado del medio ambiente.",
    vision:
      "Consolidarnos como una empresa minera reconocida por su gestión responsable, eficiencia operativa y compromiso con el desarrollo sostenible",
    companyHeading: "COMPROMETIDOS CON UN FUTURO SOSTENIBLE",
    companyText:
      "En Nueva Bonanza Mining desarrollamos una operación aurifera planificada y supervisada en cada etapa. Integramos experiencia técnica, innovación y seguridad para generar valor compartido con nuestros colaboradores y comunidades del Perú",
  },
  en: {
    historyNote:
      "More than a decade building responsible mining, based on safety, innovation and commitment to the development of Peru.",
    mission:
      "To carry out mining activities efficiently and responsibly, prioritizing the safety of people, operational excellence and care for the environment.",
    vision:
      "To establish ourselves as a mining company recognized for its responsible management, operational efficiency and commitment to sustainable development.",
    companyHeading: "COMMITTED TO A SUSTAINABLE FUTURE",
    companyText:
      "At Nueva Bonanza Mining we run a gold operation that is planned and supervised at every stage. We combine technical expertise, innovation and safety to create shared value with our employees and communities in Peru.",
  },
};

export function getCompanyText(lang: Lang): CompanyText {
  return companyData[lang];
}

export interface Value {
  number: string;
  title: string;
  text: string;
}

type ValueText = Omit<Value, "number">;
type ValueEntry = Pick<Value, "number"> & Record<Lang, ValueText>;

const valueData: ValueEntry[] = [
  {
    number: "01",
    es: { title: "SEGURIDAD", text: "Protegemos la vida y promovemos condiciones de trabajo seguras en cada operación." },
    en: { title: "SAFETY", text: "We protect life and promote safe working conditions in every operation." },
  },
  {
    number: "02",
    es: { title: "INTEGRIDAD", text: "Actuamos con honestidad, ética y transparencia en todas nuestras actividades." },
    en: { title: "INTEGRITY", text: "We act with honesty, ethics and transparency in all our activities." },
  },
  {
    number: "03",
    es: { title: "RESPONSABILIDAD", text: "Cumplimos nuestros compromisos y gestionamos nuestras operaciones de manera responsable." },
    en: { title: "RESPONSIBILITY", text: "We meet our commitments and manage our operations responsibly." },
  },
  {
    number: "04",
    es: { title: "RESPETO", text: "Valoramos a las personas, las comunidades y el entorno donde desarrollamos nuestras actividades." },
    en: { title: "RESPECT", text: "We value people, communities and the environment where we carry out our activities." },
  },
  {
    number: "05",
    es: { title: "EXCELENCIA", text: "Impulsamos la mejora contínua para fortalecer nuestros procesos y resultados." },
    en: { title: "EXCELLENCE", text: "We drive continuous improvement to strengthen our processes and results." },
  },
];

export function getValues(lang: Lang): Value[] {
  return valueData.map((item) => ({ number: item.number, ...item[lang] }));
}

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
