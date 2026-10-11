import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

export interface HeroPreload {
  href: string;
  srcset: string;
  sizes: string;
}

const HERO_WIDTHS = [768, 1280, 1920];
const HERO_QUALITY = 75;

/**
 * Genera la imagen LCP optimizada (WebP responsive) para el preload del <head>.
 * Debe coincidir con los parámetros del <Image> del hero para que el navegador
 * reutilice el recurso pre-cargado en lugar de descargar otro.
 */
export async function heroPreload(image: ImageMetadata): Promise<HeroPreload> {
  const optimized = await getImage({
    src: image,
    widths: HERO_WIDTHS,
    formats: ["webp"],
    quality: HERO_QUALITY,
  });
  return {
    href: optimized.src,
    srcset: optimized.srcSet.attribute,
    sizes: "100vw",
  };
}
