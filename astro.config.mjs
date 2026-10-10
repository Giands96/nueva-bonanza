// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio canónico de producción: alimenta <link rel="canonical">,
  // las metas Open Graph y el sitemap generado en /sitemap-index.xml.
  site: 'https://nbonanzamining.com',
  integrations: [
    sitemap({
      // /proyectos solo existe como redirect hacia /productos y la 404 no
      // debe indexarse.
      filter: (page) => !page.endsWith('/proyectos/') && !page.endsWith('/404/'),
    }),
  ],
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
