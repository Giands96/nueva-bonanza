// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  redirects: {
    // La sección Proyectos se reemplazó por Productos.
    "/proyectos": "/productos",
  },
  vite: {
    build: {
      // Los iconos se usan como máscaras CSS: deben ser archivos con URL
      // propia, nunca data-URIs (Vite incrusta todo lo menor a 4 KB).
      assetsInlineLimit: 0,
    },
  },
});
