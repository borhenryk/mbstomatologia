# MBSTOMATOLOGIA — Modern redesign

A modern, elegant one‑page redesign of [mbstomatologia.pl](https://mbstomatologia.pl/) inspired by the minimal aesthetic of [golddent.eu](https://golddent.eu/). All content (services, prices, contact info) is preserved from the original site — only the presentation is new.

## Design system

- **Palette** — cream `#f6f2ec`, deep teal ink `#0f1f2d`, warm gold accent `#b58b4a`.
- **Typography** — _Cormorant Garamond_ for headlines (elegant serif with an italic accent) + _Inter_ for body copy.
- **Layout** — full‑bleed hero, generous whitespace, subtle animations, scroll‑reveal, tabbed pricing, accordion FAQ.
- **Language** — Polish (matches the original clinic content).

## File structure

```
mon/
├── index.html   ← markup for all sections
├── styles.css   ← full stylesheet + design tokens (:root)
├── script.js    ← nav, mobile menu, tabs, scroll reveal
└── README.md
```

Everything is fully static — no build step, no dependencies. Google Fonts are loaded from a CDN, hero + team photos are Unsplash placeholders (swap them for real clinic photos when ready).

## Preview locally

Any static server will do. From this directory:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080. Or simply drag `index.html` onto your browser.

## Sections

1. **Hero** — full‑screen background with brand promise and CTAs
2. **O nas** — about, tags, key stats
3. **Oferta** — grid of 8 services (protetyka, endodoncja, implanty, higienizacja GBT, RTG/tomografia, wybielanie, estetyka, zachowawcza)
4. **Cytat / CTA** — dark banner with a call to book
5. **Zespół** — Monika Borzymowska, Dominika Pupin, rejestracja
6. **Cennik** — tabbed price list with 7 categories, dot‑leader rows
7. **Warto wiedzieć** — 6 FAQ accordions with the original medical explanations
8. **Kontakt** — info cards, contact form, embedded Google Map
9. **Stopka**

## Customising

- **Colours** — update the `:root` custom properties at the top of `styles.css` (`--gold`, `--ink`, `--bg`).
- **Photos** — replace the Unsplash URLs in `styles.css` for `.hero__bg`, `.about__img--1/2`, `.member__portrait--1/2/3` with real photos of the clinic and team. Keep aspect ratios similar (`4/5` for portraits).
- **Copy & prices** — edit directly in `index.html` — every price and FAQ block is inline HTML.
- **Contact form** — currently posts nothing (uses an `alert` on submit). Hook it up to Formspree, Netlify Forms, or a custom backend by replacing the `onsubmit` handler.

## Deployment

Drop the three files anywhere that serves static content: Netlify, Vercel, GitHub Pages, Cloudflare Pages, or your existing hosting. No server code required.
