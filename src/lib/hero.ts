import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

export interface HeroPreload {
  href: string;
  srcset: string;
  sizes: string;
  media?: string;
}

const HERO_WIDTHS = [768, 1280, 1920];
const HERO_QUALITY = 75;

/**
 * Genera el preload del LCP (WebP responsive) para el <head>.
 * Devuelve una lista: solo desktop, o desktop acotado a `(min-width: 761px)`
 * más la versión mobile con `(max-width: 760px)` cuando se pasa `imageMobile`.
 * La URL mobile es la MISMA que usa el <source> del <picture>, así el
 * navegador reutiliza el recurso pre-cargado en lugar de descargar otro.
 * Los parámetros de desktop deben coincidir con el <Image> del hero.
 */
export async function heroPreload(
  image: ImageMetadata,
  imageMobile?: ImageMetadata,
): Promise<HeroPreload[]> {
  const optimized = await getImage({
    src: image,
    widths: HERO_WIDTHS,
    formats: ["webp"],
    quality: HERO_QUALITY,
  });
  const desktop: HeroPreload = {
    href: optimized.src,
    srcset: optimized.srcSet.attribute,
    sizes: "100vw",
  };
  if (!imageMobile) return [desktop];
  desktop.media = "(min-width: 761px)";
  return [
    desktop,
    {
      href: imageMobile.src,
      srcset: imageMobile.src,
      sizes: "100vw",
      media: "(max-width: 760px)",
    },
  ];
}
