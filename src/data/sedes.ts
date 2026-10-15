import type { Lang } from "../i18n/ui";
import { getContact, type Contact } from "./site";

export interface Sede {
  id: string;
  nombre: string;
  /* Líneas de dirección, en el orden en que se muestran. */
  direccion: string[];
  telefonos: string[];
  /* Coordenadas aproximadas [latitud, longitud]. */
  coords: [number, number];
  /* id del departamento en src/data/peru-map.ts que se resalta en el mapa. */
  departamento: string;
  /* Búsqueda para "Cómo llegar"; si falta se usan las coordenadas. */
  mapsQuery?: string;
}

/* Datos de cada sede; solo el nombre y el país de la dirección cambian de idioma. */
type SedeText = { nombre: string; pais: string };
type SedeEntry = Omit<Sede, "nombre" | "direccion"> & {
  /* Recibe el país y el contacto ya traducidos y devuelve las líneas de dirección. */
  direccion: (pais: string, contact: Contact) => string[];
} & Record<Lang, SedeText>;

/* Campos del contacto que no dependen del idioma. */
const neutral = getContact("es");

const sedeData: SedeEntry[] = [
  {
    id: "oficina-lima",
    direccion: (pais, contact) => [
      `${contact.address.split(" - ")[0]}, ${contact.office}`,
      `${contact.district}, ${contact.city}, ${pais}`,
    ],
    telefonos: [neutral.phone],
    coords: [-12.0858, -76.9765],
    departamento: "lima",
    mapsQuery: `Av. Manuel Olguín 325, ${neutral.district}, ${neutral.city}, Perú`,
    es: { nombre: "Oficina Administrativa", pais: "Perú" },
    en: { nombre: "Administrative Office", pais: "Peru" },
  },
  {
    id: "sede-minera-arequipa",
    // Nombres propios: la dirección se mantiene igual en todos los idiomas.
    direccion: () => ["Atico Carretera KM 56 - UEA Nueva Bonanza Nro. S/N.", "Atico - Caraveli - Arequipa"],
    telefonos: [],
    coords: [-15.8058466, -73.5719589],
    departamento: "arequipa",
    es: { nombre: "Sede de Producción", pais: "Perú" },
    en: { nombre: "Production Site", pais: "Peru" },
  },
];

export function getSedes(lang: Lang): Sede[] {
  return sedeData.map(({ es, en, direccion, ...shared }) => {
    const { nombre, pais } = lang === "en" ? en : es;
    return { ...shared, nombre, direccion: direccion(pais, getContact(lang)) };
  });
}

export function comoLlegarUrl(sede: Sede): string {
  const query = sede.mapsQuery ?? sede.coords.join(",");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
