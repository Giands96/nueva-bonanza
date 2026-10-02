// DATOS POR CONFIRMAR CON EL CLIENTE
// Textos redactados a partir de lo que hace una operación aurífera que extrae y no refina.
// Confirmar con el cliente las etapas de beneficio y fundición, y el destino de la producción.
// Imágenes PROVISIONALES: reemplazar por fotos reales de cada producto.
import oroImage from "../assets/img/oro-bruto.png";
import doreImage from "../assets/img/barra-oro.png";
import plataImage from "../assets/img/plata.png";

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
    label: "Mineral aurífero",
    summary: "Mineral con contenido de oro que extraemos del yacimiento de la mina Bonanza, en Arequipa.",
    description:
      "Es el punto de partida de nuestra operación. Extraemos el mineral con métodos planificados y control geológico en cada frente de trabajo, para aprovechar el yacimiento de forma ordenada y segura.",
    image: oroImage,
    imageAlt: "Frente de explotación de la mina",
  },
  {
    id: "barra-dore",
    name: "BARRA DE ORO",
    label: "Oro sin refinar",
    summary: "Barra de oro obtenida del mineral, que se entrega a refinerías para su purificación.",
    description:
      "La barra de oro  que todavía no ha pasado por refinación; su composición varía según el mineral de origen. No refinamos: entregamos las barras a refinerías autorizadas, que obtienen el oro y la plata de alta pureza.",
    image: doreImage,
    imageAlt: "Planta de tratamiento de mineral",
  },
  {
    id: "plata",
    name: "PLATA",
    label: "Metal asociado",
    summary: "Metal que acompaña al oro en el mineral y forma parte de la barra doré.",
    description:
      "La plata está presente de forma natural en el mineral aurífero. Se recupera junto con el oro y se separa después, en la refinación que realizan terceros.",
    image: plataImage,
    imageAlt: "Camión de acarreo en la mina",
  },
];

export interface ProcessStep {
  title: string;
  text: string;
}

export const processSteps: ProcessStep[] = [
  { title: "Exploración", text: "Estudiamos el yacimiento para definir dónde y cómo extraer." },
  { title: "Extracción", text: "Arrancamos el mineral con equipos y personal capacitado." },
  { title: "Beneficio", text: "Tratamos el mineral para recuperar el oro y la plata." },
  { title: "Fundición", text: "Obtenemos la barra doré, lista para refinar." },
  { title: "Despacho", text: "Trasladamos cada lote, documentado, hasta la refinería." },
];

export interface Measure {
  title: string;
  text: string;
}

export const measures: Measure[] = [
  {
    title: "SEGURIDAD",
    text: "Capacitación continua, equipos de protección personal y evaluación de riesgos antes de cada tarea.",
  },
  {
    title: "MEDIO AMBIENTE",
    text: "Manejo responsable del agua y de los residuos, y monitoreo del entorno de la operación.",
  },
  {
    title: "TRAZABILIDAD",
    text: "Registro del origen y del recorrido de cada lote, desde la mina hasta la refinería.",
  },
  {
    title: "COMUNIDADES",
    text: "Una relación de respeto y diálogo con las comunidades del entorno de la mina.",
  },
];
