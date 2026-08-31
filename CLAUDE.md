# Palqum — New Design

Redesign of the Palqum marketing site: dark theme, fully bilingual (English / Arabic with true
RTL mirroring). Every page's real copy was pulled from the live site (`www.palqum.com`) before
writing a line of new markup, so the content is unchanged; only the visual system is new.

**Two implementations of the same design live in this repo**, kept in sync by hand:

1. **Plain HTML/CSS/JS** — project root (`index.html`, `web-development.php`, ...). No build
   step, no framework. Everything below this point describes this version.
2. **React + Vite** — `react-app/`. Same design system, same copy, componentised. This is the
   version going forward. See `README.md` for how to run it and where its content data lives —
   its structure mirrors the HTML version's (`css/style.css` → `react-app/src/styles/global.css`,
   each page's inline `I18N`/`PLANS` → `react-app/src/data/*.js`, `js/common.js`'s reveal/count-up
   logic → `react-app/src/hooks/useReveal.js` + `useCountUp.js`).

## Stack (HTML version)

Vanilla HTML + CSS + JS. Pages are named `.php` only to match the live site's existing URLs
(`/web-development.php`, etc.) — none of them contain PHP logic, so any static host or PHP host
works identically. No npm, no bundler, no dependencies. Fonts load from Google Fonts; everything
else is hand-written.

## Folder structure

```
/
├── index.html              Homepage (the flagship — full design system lives here first)
├── web-development.php     Service page
├── ai-automation.php       Service page
├── branding.php             Service page
├── ads.php                  Service page
├── pos.php                  Service page
├── portfolio.php            Filterable project grid
├── privacy.php               Legal (English only — see Known gaps)
├── terms.php                  Legal (English only)
├── cookies.php                Legal (English only)
├── css/
│   └── style.css            Every style on every page. One file, one source of truth.
├── js/
│   └── common.js            Shared behaviour: nav, i18n engine, reveal-on-scroll, counters,
│                             mobile menu, single-service pricing renderer.
└── assets/
    └── icons.svg             One SVG sprite (<symbol> defs), referenced by every page via
                                <use href="assets/icons.svg#i-name">. No icon font, no per-page
                                duplication.
```

**Why pages live at root instead of a `/pages` folder:** the sitemap and every internal link on
the live site point at `/web-development.php` etc. directly. Moving them into a subfolder would
break every existing inbound link and require a router just to avoid it — not worth it for a
static site.

## Design system

Tokens are defined once at the top of `css/style.css` as CSS custom properties:

| Token | Value | Use |
|---|---|---|
| `--bg` / `--bg-1` / `--bg-2` / `--bg-3` | near-black, warm-neutral charcoal, stepped | page background → card → nested surface |
| `--ink` / `--ink-soft` / `--ink-faint` | off-white → grey | text hierarchy |
| `--accent` / `--accent-2` / `--accent-dim` | violet #7C5CFF family | primary brand color — buttons, links, focus |
| `--pop` | lime #D8FA46 | secondary accent — stats, badges, highlighted words only |
| `--ff-display` | Bricolage Grotesque | headings (English) |
| `--ff-body` | Manrope | body text (English) |
| `--ff-ar` | Cairo | all Arabic text, headings and body |
| `--ff-mono` | IBM Plex Mono | eyebrows, stats, labels |

Dark theme only, deliberately — no light-mode variant, matching the brief.

## How the bilingual system works

No page duplication, no `/ar/` routes. Each page defines a `window.I18N = { en: {...}, ar: {...} }`
dictionary right before loading `js/common.js`. Every translatable element carries
`data-i18n="some.key"`; clicking the globe button in the nav calls `applyLang('ar' | 'en')`, which:

1. Flips `document.documentElement.dir` (`ltr` ↔ `rtl`) — the whole layout re-flows because the
   CSS uses logical properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`)
   instead of `left`/`right` everywhere, so nothing needs a separate RTL stylesheet.
2. Swaps every `[data-i18n]` element's `innerHTML` to the matching dictionary entry.
3. Persists the choice to `localStorage` and re-renders the pricing grid if one exists.

Legal pages (`privacy.php`, `terms.php`, `cookies.php`) only have `nav.*` / `footer.*` keys in
their `ar` dictionary — the policy body itself stays English and is wrapped in a hard
`dir="ltr"` block regardless of the page's language state. See **Known gaps** below for why.

## Pricing

Two render paths, both in `js/common.js`:

- **Homepage** (`index.html`) has its own inline `renderPricing()` — 4 service tabs × 3 tiers,
  because it's the only page that needs to switch between services.
- **Every service page** uses the shared `renderSimplePricing()` — it reads `window.PLANS`
  (a flat array of 3 tiers) that each page defines inline, plus the shared `#currencyTabs`
  (USD/EUR/ILS) — no service-switching needed since the page *is* the service.

`RATES` in `common.js` (EUR 0.92, ILS 3.7) are placeholder conversions off the USD prices — not
live rates. Flag this before shipping real pricing.

## Adding a new page

Copy any existing service page (`pos.php` is a good short one) and:

1. Update `<title>`, meta description, and the hero copy.
2. Replace the 6 feature cards, 5 process steps, and 4 stats.
3. Swap `window.I18N` and `window.PLANS` in the bottom `<script>` block.
4. Everything else — nav, footer, WhatsApp button, mobile menu, reveal animations — is already
   wired via the shared `css/style.css` + `js/common.js` include. Don't touch those unless the
   change should apply to every page.

## Motion

Intentionally light: one `IntersectionObserver` for fade+rise reveals (`.reveal` class, ~500ms,
triggers once), a `requestAnimationFrame` count-up for stat numbers, native
`scroll-behavior: smooth`, and a couple of slow CSS `@keyframes` drifts on the hero's floating
cards and background blobs. Everything respects `prefers-reduced-motion: reduce`. No animation
library, no scroll-linked pinning — the old site's audit flagged GSAP ScrollTrigger sections that
went fully blank while scrolling; this design can't reproduce that bug because content is never
hidden by default, only offset a few pixels and faded.

## Known gaps (flagged on purpose, not missed)

- **Portfolio images are styled placeholder tiles**, not real screenshots — the actual client
  screenshot files weren't available to pull from the live site.
- **EUR / ILS prices are computed conversions**, not confirmed real pricing.
- **`ads.php` pricing tiers are newly written**, not pulled from the live site — the live
  `ads.php` page has a data bug (it renders the *branding* pricing tiers under an "Ad Management
  Pricing" heading). Reproducing that bug seemed worse than fixing it, so these three tiers
  (Starter/Growth/Scale) are original, reasonable numbers pending confirmation.
- **Legal pages are English-only.** Translating Privacy/Terms/Cookies copy carries real legal-
  accuracy risk if done casually — worth a proper translation pass by someone who can sign off
  on it, not a first draft.
- **Contact form has no backend.** It's wired to `preventDefault()` and show a success message
  client-side only — needs a real submit endpoint before launch.
- **The `web-development.php` "Recent Web Projects" strip** currently repeats 3 of the homepage's
  portfolio entries; the live site's third card (`DanialFactory Store`) content matched what
  the homepage already showed, so no new data was invented there.
