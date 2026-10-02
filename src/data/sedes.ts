import { contact } from "./site";

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

export const sedes: Sede[] = [
  {
    id: "oficina-lima",
    nombre: "Oficina Administrativa",
    direccion: [
      `${contact.address.split(" - ")[0]}, ${contact.office}`,
      `${contact.district}, ${contact.city}, Perú`,
    ],
    telefonos: [contact.phone],
    coords: [-12.0858, -76.9765],
    departamento: "lima",
    mapsQuery: `Av. Manuel Olguín 325, ${contact.district}, ${contact.city}, Perú`,
  },
  {
    id: "sede-minera-arequipa",
    nombre: "Sede de Producción",
    direccion: ["Atico Carretera KM 56 - UEA Nueva Bonanza Nro. S/N.", "Atico, Caraveli, Arequipa"],
    telefonos: [],
    coords: [-15.8058466, -73.5719589],
    departamento: "arequipa",
  },
];

export function comoLlegarUrl(sede: Sede): string {
  const query = sede.mapsQuery ?? sede.coords.join(",");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
