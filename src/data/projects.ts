import antamina from "../assets/img/project-antamina.png";
import cerroVerde from "../assets/img/project-cerro-verde.png";
import lasBambas from "../assets/img/project-las-bambas.png";
import toquepala from "../assets/img/proyecto-4.png";
import quellaveco from "../assets/img/proyecto-pit.png";
import antaminaWide from "../assets/img/proyecto-truck.png";
import cerroVerdeTile from "../assets/img/proyecto-2.png";
import lasBambasTile from "../assets/img/proyecto-3.png";

export interface Project {
  slug: string;
  region: string;
  name: string;
  description: string;
  shortDescription: string;
  cardImage: ImageMetadata;
  tileImage: ImageMetadata;
}

export const projects: Project[] = [
  {
    slug: "antamina",
    region: "ANCASH",
    name: "ANTAMINA",
    description:
      "Proyecto ubicado en Ancash, sede de una de las mayores operaciones de cobre y zinc del país. Operamos con flota de gran tonelaje, protocolos de seguridad de clase mundial y un plan de gestión ambiental que incluye monitoreo permanente y trabajo coordinado con las comunidades vecinas.",
    shortDescription:
      "Proyecto ubicado en Ancash, uno de los mayores yacimientos de cobre y zinc del país. Operamos con altos estándares de seguridad y gestión ambiental.",
    cardImage: antamina,
    tileImage: antaminaWide,
  },
  {
    slug: "cerro-verde",
    region: "AREQUIPA",
    name: "CERRO VERDE",
    description:
      "Proyecto ubicado en Arequipa, cerca de nuestra sede. Producimos cobre con eficiencia operativa y uso responsable del agua.",
    shortDescription:
      "Proyecto ubicado en Arequipa, a pocos kilómetros de nuestra sede. Integramos tecnología y eficiencia operativa en la producción de cobre.",
    cardImage: cerroVerde,
    tileImage: cerroVerdeTile,
  },
  {
    slug: "las-bambas",
    region: "APURÍMAC",
    name: "LAS BAMBAS",
    description:
      "Proyecto ubicado en Apurímac, en los Andes del sur. Apoyamos la minería de gran escala con logística segura y desarrollo local.",
    shortDescription:
      "Proyecto ubicado en Apurímac, en los Andes del sur. Trabajamos de la mano con las comunidades del entorno para generar desarrollo sostenible.",
    cardImage: lasBambas,
    tileImage: lasBambasTile,
  },
  {
    slug: "toquepala",
    region: "TACNA",
    name: "TOQUEPALA",
    description:
      "Proyecto ubicado en Tacna, una operación histórica de cobre. Combinamos experiencia y tecnología para sostener su producción.",
    shortDescription:
      "Proyecto ubicado en Tacna, una operación histórica de cobre. Combinamos experiencia y tecnología para sostener su producción.",
    cardImage: toquepala,
    tileImage: toquepala,
  },
  {
    slug: "quellaveco",
    region: "MOQUEGUA",
    name: "QUELLAVECO",
    description:
      "Proyecto ubicado en Moquegua, una operación moderna de cobre. Aplicamos altos estándares ambientales, de seguridad y de gestión del agua en cada etapa.",
    shortDescription:
      "Proyecto ubicado en Moquegua, una operación moderna de cobre. Aplicamos altos estándares ambientales, de seguridad y de gestión del agua en cada etapa.",
    cardImage: quellaveco,
    tileImage: quellaveco,
  },
];
