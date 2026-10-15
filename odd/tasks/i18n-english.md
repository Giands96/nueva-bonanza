# Feature: English version of the site (i18n)

- **Branch:** `feat/i18n-english` (from `master`)
- **Engram mirror:** `odd/i18n-english/tasks`
- **Status:** implementation complete (T1–T5). Last slice `d520f74..2bdf0aa` (fix
  `9db00d2`, T4, T5; 273 lines, medium) is under the review budget and not reviewed yet.
  Pending outside the code: PHP test on Ferozo (JS disabled, both languages), client
  review of the English copy.

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
- [x] T3 — English pages and locale-aware components (no visual change). Approach
  explained to the user 2026-10-15: each page body moves to `src/views/<Name>.astro`
  (markup and styles unchanged); `src/pages/*.astro` and `src/pages/en/*.astro` become
  thin wrappers. Component copy lives in a colocated `{ es, en }` block; the language
  comes from `Astro.currentLocale`; client-script strings travel as `data-*` attributes.
  - [x] T3a — Shared chrome: Header, Footer, ContactBand locale-aware; shared keys in
    `ui.ts`; review fixes R3-002 (`Object.hasOwn`) and R3-003 (getters return copies).
  - [x] T3b — Views Home and About; `/en/` and `/en/about-us`; `home/*` and `about/*`
    components; English route entries for both.
  - [x] T3c — Views Products, Contact, Thanks; `/en/products`, `/en/contact`,
    `/en/thanks`; `products/*` and `contact/*` components; remove T2 compatibility
    exports; JSON-LD `availableLanguage: ["es", "en"]`.
  - Out of scope: news pages and 404 stay Spanish-only; contact form redirect is T4;
    selector is T5.
  - User commits `fec2836` (Footer copy) and `2e01185` (BARRA image) sit on this branch
    after the reviewed boundary `996ccde`.
- [x] T4 — Contact form `lang` field and PHP redirects. Hidden `lang` input; PHP whitelists
  `en` (anything else → `es`), maps the 5 redirects through `nb_ruta()`, and adds
  "Idioma del formulario: …" to the email body (approved by the user 2026-10-15).
  Separate fix `9db00d2`: CV recipient changed from the test Gmail to
  `sally.falconi@nbonanzamining.com` (user request).
- [x] T5 — Language selector and suggestion banner. Design approved by the user
  2026-10-15 from a mockup: `ES | EN` after the nav links (same Oswald gold, current
  language white, thin umber divider); on mobile it is the last row of the open menu.
  Each option links to the same page in the other language, or `/en/` when the page has
  no English version (news). Banner on Spanish pages only, when `navigator.language`
  starts with `en`: `--nb-ink-700` strip above the header, "This site is also available
  in English." + gold "View in English →" + ✕ (dismissal remembered in
  `localStorage`). An inline `<head>` script decides visibility before first paint to
  avoid layout shift.

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

| T3b | delegated writer (2 views, 4 wrappers, 10 components) | see git log `feat(i18n): inicio` | `npm run build` OK (10 pages); Spanish diff vs post-T3a baseline: only hreflang + `og:locale:alternate` on `/` and `/quienes-somos/`, two new sitemap URLs, and the known harmless scoped-style reorder in `index.html` (parent verified `quienes-somos` diff line by line); English pages: `lang="en"`, canonical and hreflang pairs correct, leftover-Spanish scan shows only proper nouns/addresses. To confirm with client: "THE FUTURE IS MINED TODAY", "explotación" → "mining". |

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

| T3c | delegated writer (3 views, 6 wrappers, 6 components, Impact fix, compat exports removed) | see git log `feat(i18n): productos` | `npm run build` OK (13 pages); Spanish diff vs post-T3b baseline: only JSON-LD `availableLanguage` `["es","en"]` on all pages, hreflang/`og:locale:alternate` on `/productos/`, `/contacto/`, `/gracias/`, 3 sitemap URLs, contact-form `data-*` strings + `data-success-url`, and scoped-style hash changes from moving page bodies into views (rules identical); English pages: lang/canonical/hreflang correct, leftover scan only proper nouns, addresses and example name; parent verified English `<option>` values stay Spanish with English text, `data-success-url="/en/thanks"`. Client to confirm: "CV" vs "résumé". Measures icons still paired by index (no icon field in data; low risk). |

| T4 | inline (1 hidden input + 1 PHP file) | see git log `feat(contacto)` | `npm run build` OK (13 pages); hidden input renders `value="es"` on `/contacto/` and `value="en"` on `/en/contact/`; client script sends `new FormData(form)` so the field travels on the JS path too; no hardcoded `Location:` left in the PHP (5 via `nb_ruta`). PHP NOT executed: no PHP runtime on this machine — must be tested on Ferozo (submit from `/en/contact` with JavaScript disabled, plus one Spanish submission). |

| T5 | delegated writer (Header, BaseLayout, utils) | see git log `feat(i18n): selector` | `npm run build` OK (13 pages); selector links verified (`/productos` → EN `/en/products`, news → `/en/`, English pages → ES current-page link); banner markup + head script only on Spanish pages; nav links byte-identical. Parent browser check (dev server): desktop header + forced banner match the mockup; ✕ hides it and stores `nb-lang-banner-dismissed`; mobile open menu by computed styles: 4 links unchanged (28px, border), `ES | EN` row below at 18px without border. Note: the banner's scoped CSS is inlined on English pages too (unused rules, a few hundred bytes). |

RDD review of slice `996ccde..d5a827a` (T3a+T3b plus user commits `fec2836`, `2e01185`;
644 lines, medium): user granted consent; lineage `review-3da5ca8d8de831b0`, lens
`review-reliability` → **approved**, acknowledged. Reviewed boundary is now `d5a827a`.
Non-blocking suggestions:
- R3-001/R3-002 (again): no automated tests for `getLang`, `routes`, `getAlternates`,
  `localizePath`. Needs a user decision on adding a test runner (dev dependency).
- R3-003: `Impact.astro` pairs icons with translated items by array index; keep each icon
  next to its item. Folded into T3c.

RDD review of slice `d5a827a..d520f74` (T3c, 848 lines, medium): user granted consent;
lineage `review-1b579b2923062034`, lens `review-reliability` → **approved**, acknowledged.
Reviewed boundary is now `d520f74`. Non-blocking suggestions:
- R3-001: `ContactForm` client helper `text(key)` returns `""` when a `data-*` key is
  missing; fall back to Spanish or warn so messages never render blank.
- R3-002: tests again (reason values stay Spanish, locale success redirect, routes) —
  pending the test-runner decision.

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
