# Palqum — New Design

New dark-theme, bilingual (English / Arabic, full RTL) redesign of [palqum.com](https://palqum.com).
All the copy is the real copy from the live site — this project only changes how it looks and
how it's built.

There are **two versions of the same site** in this repo. Pick one, they don't depend on each
other:

| | Where | Stack | Use it if... |
|---|---|---|---|
| **HTML version** | project root (`index.html`, `web-development.html`, ...) | Plain HTML/CSS/JS, zero build step | You want to upload files straight to any static host and be done |
| **React version** | `react-app/` | React + Vite | You want components, want to keep extending the site as an app, or plan to hand it to a developer long-term |

Both look and behave identically — same design, same translations, same animations. The React
version is the one going forward; the HTML version stays as a lightweight, dependency-free
fallback.

---

## Quick start — React version (recommended)

```bash
cd react-app
npm install
npm run dev        # opens a local dev server, auto-reloads on save
```

To build the real, deployable files:

```bash
npm run build       # outputs static files into react-app/dist/
npm run preview     # serve that build locally to double-check it
```

Upload the contents of `react-app/dist/` to any static host (Vercel, Netlify, Cloudflare Pages,
or a plain web server) — it's a fully static site once built, no Node needed on the server.

## Quick start — HTML version

No install needed. Open `index.html` directly (double-click it), or serve the folder with any
static server / host. Every internal link between pages is a relative path (`web-development.html`,
not `/web-development.html`), so it works exactly the same whether you're opening the file
straight off your disk or the whole folder is deployed to a real domain.

---

## I just want to change some text

**React version:** almost all the copy lives in `react-app/src/data/`:

- `homeContent.js` — homepage
- `services/webDevelopment.js`, `aiAutomation.js`, `branding.js`, `ads.js`, `pos.js` — one file
  per service page
- `legalContent.js` — Privacy / Terms / Cookies

Every string exists twice — once under `en:` and once under `ar:` — find the English line,
edit it, then edit the matching Arabic line just below/near it. Save, and if `npm run dev` is
running the page updates instantly.

**HTML version:** open the page's `.html` file, scroll to the bottom `<script>` block,
find `window.I18N = { en: {...}, ar: {...} }`, edit the same way.

## I want to change a color, font, or spacing

Everything design-related is in one file:

- React: `react-app/src/styles/global.css`
- HTML: `css/style.css` (same file, copied)

Colors are CSS variables at the very top (`--bg`, `--accent`, `--pop`, etc.) — change the
variable once and it updates everywhere. Fonts are the `--ff-*` variables right below the colors.
The palette is pulled from the real `palqum.com` (near-black background, indigo→violet button
gradient, cyan accent) — if that site's brand colors change, update the tokens here to match.

## I want to add a whole new page

React version — copy `react-app/src/pages/Portfolio.jsx` (simplest full example) or use
`ServicePage.jsx` + a new file in `data/services/` (copy `pos.js`, it's the shortest) for
another service-style page. Then add a `<Route>` for it in `App.jsx`.

## I want to change prices

Same `data/` files as above — each service page has a `plans` array (or `SERVICE_PLANS` on the
homepage) with USD prices. EUR and ILS are calculated automatically from a fixed conversion
rate near the top of `ServicePricing.jsx` / `Pricing.jsx` — update that rate if it goes stale,
or replace it with real per-currency prices if you'd rather set those directly.

---

## Project status — what's real vs. placeholder

- ✅ All copy, pricing tiers, stats, and testimonials are pulled from the real live site.
- ✅ Every page works in both languages with true RTL mirroring (not a translated screenshot —
  the whole layout flips).
- ⚠️ **Portfolio images are styled color tiles, not real screenshots** — swap in the actual
  project screenshots when you have them (`WORK_ITEMS` in `homeContent.js`, `ITEMS` in
  `Portfolio.jsx`).
- ⚠️ **EUR/ILS prices are estimated conversions**, not confirmed real pricing.
- ⚠️ **`ads.html` / the Ads service page pricing tiers are newly written** — the live site's ads
  pricing section has a data bug (it was showing branding prices), so these three tiers are
  original numbers pending your confirmation, not pulled from anywhere.
- ⚠️ **Legal pages (Privacy/Terms/Cookies) are English-only.** Translating legal text
  accurately is a real responsibility — worth a proper pass rather than a first draft.
- ⚠️ **Contact form doesn't send anywhere yet.** It shows a success message on submit but has no
  backend wired up — needs a real endpoint (email service, form API, etc.) before launch.

Full technical notes (design tokens, how the i18n system works internally, animation
philosophy) are in `CLAUDE.md` at the project root.

## Questions

If something in here doesn't make sense or a file isn't where you expect, `CLAUDE.md` has the
deeper technical breakdown of both builds. Everything is plain HTML/CSS/JS or plain React — no
exotic tooling, so standard web search / any AI coding assistant can help from here too.
