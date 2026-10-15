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
- [ ] T2 — Locale data: `site.ts`, `about.ts`, `products.ts`, `sedes.ts` per locale;
  hardcoded slugs go through the route helper.
- [ ] T3 — English pages and locale-aware components (no visual change).
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
| T1 | inline (3 small files, already mapped) | see git log `feat(i18n): base` | `npm run build` OK (8 pages); `dist` Spanish pages unchanged (`lang="es"`, `es_PE`, no `hreflang` while no English routes exist); `getAlternates`/`localizePath`/`getLang`/`t` checked with a scratch script (es-only → none; es+en → both with trailing slash, matching the canonical; unknown path → none). |

Notes:
- The build canonical uses a trailing slash (`/quienes-somos/`), so `hreflang` paths
  are emitted with a trailing slash too.
- `routes` in `src/i18n/utils.ts` holds only Spanish paths until T3 adds the English
  pages; a route without an `en` entry falls back to Spanish and emits no `hreflang`.

## Next step

T2 — locale data files.
