// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Dominio canónico de producción: alimenta <link rel="canonical">,
  // las metas Open Graph y el sitemap generado en /sitemap-index.xml.
  site: 'https://nbonanzamining.com',
  // Español sin prefijo (/productos) e inglés bajo /en/. Mantener en sincronía
  // con `languages` y `defaultLang` de src/i18n/ui.ts.
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: { prefixDefaultLocale: false },
  },
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
  build: {
    // El CSS total por página ronda los 10 KB: incrustarlo en <style> elimina
    // las hojas externas que bloquean el primer render.
    inlineStylesheets: 'always',
  },
  vite: {
    build: {
      // Los iconos se usan como máscaras CSS: deben ser archivos con URL
      // propia, nunca data-URIs. Astro reutiliza este mismo límite para decidir
      // si incrusta los scripts de componentes, así que solo los JS chicos
      // (< 4 KB) se incrustan y cualquier otro asset queda como archivo.
      assetsInlineLimit: (filePath, content) =>
        filePath.endsWith('.js') && content.length < 4096,
    },
  },
});
