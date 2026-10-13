// DATOS POR CONFIRMAR CON EL CLIENTE
// Textos redactados a partir de lo que hace una operación aurífera que extrae y no refina.
// Confirmar con el cliente las etapas de beneficio y fundición, y el destino de la producción.
// Imágenes PROVISIONALES: reemplazar por fotos reales de cada producto.
import oroImage from "../assets/img/ORO.webp";
import doreImage from "../assets/img/BARRA.webp";
import plataImage from "../assets/img/PLATA.webp";

export interface Product {
  id: string;
  name: string;
  label: string;
  summary: string;
  description: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const products: Product[] = [
  {
    id: "oro",
    name: "ORO",
    label: "Extracción de mineral aurífero",
    summary: "Mineral con contenido de oro que extraemos del yacimiento de la mina Bonanza, en Arequipa.",
    description:
      "Extraemos mineral con contenido de oro mediante labores planificadas y controles operativos adaptados a las características del yacimiento, priorizando la seguridad y la eficiencia en cada etapa de la operación.",
    image: oroImage,
    imageAlt: "Frente de explotación de la mina",
  },
  {
    id: "barra-dore",
    name: "BARRA DORE",
    label: "Oro sin refinar",
    summary: "Barra de oro obtenida del mineral, que se entrega a refinerías para su purificación.",
    description:
      "Extraemos mineral con contenido de oro mediante labores planificadas y controles operativos adaptados a las características del yacimiento, priorizando la seguridad y la eficiencia en cada etapa de la operación.",
    image: doreImage,
    imageAlt: "Planta de tratamiento de mineral",
  },
  {
    id: "plata",
    name: "PLATA",
    label: "Metal asociado",
    summary: "Metal que acompaña al oro en el mineral y forma parte de la barra doré.",
    description:
      "Metal precioso presente junto con el oro en determinados minerales y que puede formar parte de la composición de la barra doré. La plata se recupera durante el procesamiento del mineral y, cuando corresponde, se separa del oro en etapas posteriores de refinación. Su contenido depende de las características del mineral procesado.",
    image: plataImage,
    imageAlt: "Camión de acarreo en la mina",
  },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Exploración", text: "Evaluamos las características geológicas del yacimiento para identificar el potencial de los recursos minerales." },
  { title: "Planificación Minera", text: "Organizamos las labores, los equipos y los recursos necesarios para desarrollar una operación eficiente y segura." },
  { title: "Extracción", text: "Realizamos la extracción de minerales auríferos y argentíferos de acuerdo con las características del yacimiento." },
  { title: "Control de producción", text: "Supervisamos y registramos la producción para mantener un control ordenado de las operaciones." },
  { title: "Despacho", text: "Coordinamos el traslado y la entrega de la producción conforme a los procedimientos logísticos establecidos." },
];

export interface Measure {
  title: string;
  text: string;
}

export const measures: Measure[] = [
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
];
