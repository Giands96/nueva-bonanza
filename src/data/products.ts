import oroImage from "../assets/img/ORO.webp";
import doreImage from "../assets/img/BARRA.webp";
import plataImage from "../assets/img/PLATA.webp";
import type { Lang } from "../i18n/ui";

export interface Product {
  id: string;
  name: string;
  label: string;
  summary: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
}

/* Texto traducible de un producto; `id` e `image` se comparten entre idiomas. */
type ProductText = Omit<Product, "id" | "image">;
type ProductEntry = Pick<Product, "id" | "image"> & Record<Lang, ProductText>;

const productData: ProductEntry[] = [
  {
    id: "oro",
    image: oroImage,
    es: {
      name: "ORO",
      label: "Extracción de mineral aurífero",
      summary: "Mineral aurífero extraído de nuestras conseciones mineras ubicadas en Arequipa, Perú.",
      description:
        "Desarrollamos nuestras operaciones mediante labores planificadas y controles técnicos adaptados a las características del yacimiento.",
      imageAlt: "Frente de explotación de la mina",
    },
    en: {
      name: "GOLD",
      label: "Gold ore extraction",
      summary: "Gold ore extracted from our mining concessions located in Arequipa, Peru.",
      description:
        "We carry out our operations through planned mining works and technical controls adapted to the characteristics of the deposit.",
      imageAlt: "Mine working face",
    },
  },
  {
    id: "barra-dore",
    image: doreImage,
    es: {
      name: "BARRA DORE",
      label: "Oro y plata sin refinar",
      summary: "Barra de oro obtenida del mineral que se entrega a refinerías para su purificación.",
      description:
        "La barra doré constituye un producto intermedio destinado a procesos posteriores de refinación, donde se recuperan y purifican los metales preciosos para su aprovechamiento comercial.",
      imageAlt: "Planta de tratamiento de mineral",
    },
    en: {
      name: "DORÉ BAR",
      label: "Unrefined gold and silver",
      summary: "Gold bar obtained from the ore and delivered to refineries for purification.",
      description:
        "The doré bar is an intermediate product intended for subsequent refining processes, where precious metals are recovered and purified for commercial use.",
      imageAlt: "Ore processing plant",
    },
  },
  {
    id: "plata",
    image: plataImage,
    es: {
      name: "PLATA",
      label: "Metal asociado",
      summary: "Metal que acompaña al oro en el mineral y forma parte de la barra doré.",
      description:
        "Metal precioso presente en determinados minerales y asociado a las operaciones de extracción de oro. Su recuperación forma parte del procesamiento del mineral, puede integrarse en la barra doré y separarse posteriormente durante el proceso de refinación.",
      imageAlt: "Camión de acarreo en la mina",
    },
    en: {
      name: "SILVER",
      label: "Associated metal",
      summary: "Metal that accompanies gold in the ore and is part of the doré bar.",
      description:
        "Precious metal present in certain ores and associated with gold extraction operations. Its recovery is part of ore processing; it can be incorporated into the doré bar and later separated during the refining process.",
      imageAlt: "Haul truck at the mine",
    },
  },
];

export function getProducts(lang: Lang): Product[] {
  return productData.map((item) => ({ id: item.id, image: item.image, ...item[lang] }));
}

// Compatibilidad: se elimina cuando los componentes pidan el idioma (T3).
export const products: Product[] = getProducts("es");

export interface ProcessStep {
  title: string;
  text: string;
}

const processStepData: Record<Lang, ProcessStep[]> = {
  es: [
    { title: "Exploración", text: "Evaluamos las características geológicas del yacimiento para identificar el potencial de los recursos minerales." },
    { title: "Planificación Minera", text: "Organizamos las labores, los equipos y los recursos necesarios para desarrollar una operación eficiente y segura." },
    { title: "Extracción", text: "Realizamos la extracción de minerales auríferos y argentíferos de acuerdo con las características del yacimiento." },
    { title: "Control de producción", text: "Supervisamos y registramos la producción para mantener un control ordenado de las operaciones." },
    { title: "Despacho", text: "Coordinamos el traslado y la entrega de la producción conforme a los procedimientos logísticos establecidos." },
  ],
  en: [
    { title: "Exploration", text: "We assess the geological characteristics of the deposit to identify the potential of the mineral resources." },
    { title: "Mine Planning", text: "We organize the workings, equipment and resources needed to run an efficient and safe operation." },
    { title: "Extraction", text: "We extract gold-bearing and silver-bearing ores in accordance with the characteristics of the deposit." },
    { title: "Production control", text: "We monitor and record production to keep operations under orderly control." },
    { title: "Dispatch", text: "We coordinate the transport and delivery of production in line with established logistics procedures." },
  ],
};

export function getProcessSteps(lang: Lang): ProcessStep[] {
  return processStepData[lang].map((step) => ({ ...step }));
}

// Compatibilidad: se elimina cuando los componentes pidan el idioma (T3).
export const processSteps: ProcessStep[] = getProcessSteps("es");

export interface Measure {
  title: string;
  text: string;
}

const measureData: Record<Lang, Measure[]> = {
  es: [
    {
      title: "SEGURIDAD",
      text: "Priorizamos la protección de las personas mediante la prevención de riesgos y prácticas de trabajo seguras",
    },
    {
      title: "MEDIO AMBIENTE",
      text: "Gestionamos nuestras actividades con responsabilidad y medidas orientadas a prevenir y controlar los impactos ambientales.",
    },
    {
      title: "TRAZABILIDAD",
      text: "Mantenemos registros para facilitar el seguimiento y control de la producción y sus movimientos.",
    },
    {
      title: "COMPROMISO",
      text: "Actuamos con responsabilidad, transparencia y respeto hacia las comunidades y el entorno.",
    },
  ],
  en: [
    {
      title: "SAFETY",
      text: "We prioritize the protection of people through risk prevention and safe work practices.",
    },
    {
      title: "ENVIRONMENT",
      text: "We manage our activities responsibly, with measures aimed at preventing and controlling environmental impacts.",
    },
    {
      title: "TRACEABILITY",
      text: "We keep records to support the tracking and control of production and its movements.",
    },
    {
      title: "COMMITMENT",
      text: "We act with responsibility, transparency and respect toward communities and the environment.",
    },
  ],
};

export function getMeasures(lang: Lang): Measure[] {
  return measureData[lang].map((measure) => ({ ...measure }));
}

// Compatibilidad: se elimina cuando los componentes pidan el idioma (T3).
export const measures: Measure[] = getMeasures("es");
