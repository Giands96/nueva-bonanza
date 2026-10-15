# Feature: English version of the site (i18n)

- **Branch:** `feat/i18n-english` (from `master`)
- **Engram mirror:** `odd/i18n-english/tasks`
- **Status:** in progress (stage 1)

## Objective

Publish an English version of the site alongside the Spanish one, with a visible
language selector and a non-forcing suggestion banner for English-language browsers.

## Problem / why

The site is Spanish-only. Foreign buyers and partners need English content. Automatic
redirects by browser language would hurt SEO (Googlebot crawls as `en-US`) and trap
users, so the switch is user-driven.

## Decisions (approved 2026-10-15)

- Astro built-in i18n routing: `es` default without prefix, `en` under `/en/`.
- No client-side i18n library; every locale is static HTML.
- English slugs: `/en/`, `/en/about-us`, `/en/products`, `/en/contact`, `/en/thanks`.
- Claude drafts the English copy; the client reviews it.
- News (WordPress) stays out of the English version for now; the English nav omits "News".
- Contact form posts a `lang` field so the PHP redirects to the right thank-you page;
  the internal email stays in Spanish.
- Selector (`ES | EN` in the header) and banner are design changes: apply only after
  approval of their look.
- `hreflang` alternates go in each page's `<head>`. The sitemap's i18n option is not
  used: it pairs pages by identical path after the locale prefix, which translated slugs
  do not have.

## Constraints

- Design is locked: no visual changes outside the selector/banner.
- Describe changes before applying them; one stage at a time.
- Static build for Ferozo hosting (no SSR).

## Tasks

- [x] T1 — Base i18n: `i18n` config, `src/i18n/` dictionary and route helpers,
  locale-aware `BaseLayout` (`lang`, `og:locale`, `hreflang`).
- [x] T2 — Locale data: `site.ts`, `about.ts`, `products.ts`, `sedes.ts` per locale
  (getters `getX(lang)`, Spanish exports kept for compatibility until T3); navigation
  hrefs go through the route helper. Other hardcoded slugs in components move in T3.
  Removed the "por confirmar / texto de relleno / imágenes provisionales" comments:
  the user confirmed texts and images are final (2026-10-15).
- [ ] T3 — English pages and locale-aware components (no visual change). Approach
  explained to the user 2026-10-15: each page body moves to `src/views/<Name>.astro`
  (markup and styles unchanged); `src/pages/*.astro` and `src/pages/en/*.astro` become
  thin wrappers. Component copy lives in a colocated `{ es, en }` block; the language
  comes from `Astro.currentLocale`; client-script strings travel as `data-*` attributes.
  - [x] T3a — Shared chrome: Header, Footer, ContactBand locale-aware; shared keys in
    `ui.ts`; review fixes R3-002 (`Object.hasOwn`) and R3-003 (getters return copies).
  - [ ] T3b — Views Home and About; `/en/` and `/en/about-us`; `home/*` and `about/*`
    components; English route entries for both.
  - [ ] T3c — Views Products, Contact, Thanks; `/en/products`, `/en/contact`,
    `/en/thanks`; `products/*` and `contact/*` components; remove T2 compatibility
    exports; JSON-LD `availableLanguage: ["es", "en"]`.
  - Out of scope: news pages and 404 stay Spanish-only; contact form redirect is T4;
    selector is T5.
  - User commits `fec2836` (Footer copy) and `2e01185` (BARRA image) sit on this branch
    after the reviewed boundary `996ccde`.
- [ ] T4 — Contact form `lang` field and PHP redirects.
- [ ] T5 — Language selector and suggestion banner (after design approval).

## Checks

- TDD: the project has no test runner, so strict TDD cannot apply (no RED/GREEN
  evidence possible). Functional checks instead: `npm run build` succeeds, and the
  generated HTML in `dist/` is inspected for the expected `lang`, `og:locale` and
  `hreflang` output.

## Delivery

- Forecast: well above ~400 authored changed lines (≈280 strings plus pages). One
  commit per task on the feature branch; push/PR remain the user's decision.

## Progress / evidence

| Task | Route | Commit | Checks |
| --- | --- | --- | --- |
| T1 | inline (3 small files, already mapped) | `fb2cc06`; RDD assess: medium, `under_budget` (193 lines), review pending in slice | `npm run build` OK (8 pages); `dist` Spanish pages unchanged (`lang="es"`, `es_PE`, no `hreflang` while no English routes exist); `getAlternates`/`localizePath`/`getLang`/`t` checked with a scratch script (es-only → none; es+en → both with trailing slash, matching the canonical; unknown path → none). |

| T2 | delegated writer (4 non-trivial files) | see git log `feat(i18n): datos` | `npm run build` OK; `diff -rq -x _astro dist-before dist` → no differences (Spanish HTML identical); parent re-ran build + diff. Type check NOT run: no TypeScript/`@astrojs/check` installed, build does not type-check. |

| T3a | delegated writer (Header, Footer, ContactBand + 2 fixes) | see git log `feat(i18n): header` | `npm run build` OK; Spanish HTML vs `dist-base`: only the expected `data-label-open/close` attributes on the menu button, the header script hash, and a harmless reorder of two scoped `<style>` blocks in `index.html`; English render checked on a temporary `/en/` page (lang, nav labels, aria-labels, footer, ContactBand), page then deleted. Parent re-ran build. |

RDD review of slice `master..996ccde` (T1+T2, 683 lines, medium): user granted consent;
lineage `review-eced5cd23595e8e2`, lens `review-reliability` → **approved**, acknowledged
(authority burned). Reviewed boundary is now `996ccde`. Non-blocking suggestions, to fold
into T3:
- R3-001: no committed tests for `getAlternates`/`localizePath`/`getLang` (project has no
  test runner; decide whether to add one).
- R3-002: `getLang` uses `in`, which accepts inherited keys like `toString`; use
  `Object.hasOwn(languages, locale)`.
- R3-003: `getProcessSteps`/`getMeasures` return the module arrays by reference; return
  copies like the other getters.

Notes:
- Contact reasons: the form keeps submitting the Spanish label as `value` (PHP routes by it);
  only the visible label is translated.
- English copy drafted by Claude, pending client review. Two additions to confirm: final
  periods added where the Spanish has none, and "Tambo store" in the office reference.
- The build canonical uses a trailing slash (`/quienes-somos/`), so `hreflang` paths
  are emitted with a trailing slash too.
- `routes` in `src/i18n/utils.ts` holds only Spanish paths until T3 adds the English
  pages; a route without an `en` entry falls back to Spanish and emits no `hreflang`.

## Next step

T3 — English pages and locale-aware components.
