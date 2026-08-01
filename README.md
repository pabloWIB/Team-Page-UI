# Team-Page-UI

Team section component: six people in a card grid under a single "who we are" statement.

[![Live demo](https://img.shields.io/badge/demo-teampage.wib.digital-2ea44f)](https://teampage.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/npm%20dependencies-0-brightgreen)
![Build step](https://img.shields.io/badge/build%20step-none-lightgrey)
![First load](https://img.shields.io/badge/first%20load-188%20KB-brightgreen)

## Description

A team page is one of the few pages on a company site that a visitor reads properly, because they are checking who they would be working with. That makes the photograph and the name the content, and everything else supporting.

This component keeps to that: a heading, one short statement about the group, and six cards. Bill Mahoney, Saba Cabrera, Shae Le, Skylah Lu, Griff Richards and Stan John each get a portrait, a name and a role, with nothing competing for attention around them. Selecting a portrait covers it with that person's short profile.

It is a section rather than a site — the block you drop into an existing page, not a standalone destination.

## Features

- Six team cards in a responsive grid: one column, two from 768px, three from 1024px.
- Staggered middle column on wide screens, flattening to a single stack on phones.
- Descriptions open on click or keyboard, one at a time, and close with `Escape`.
- Cards are real `<button>` elements with `aria-expanded`, so the interaction works without a mouse.
- Single group statement above the cards, kept short.
- No npm dependencies, no build step, no external requests at runtime.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html`, `404.html` |
| Styling | CSS3 with custom properties | `assets/css/` — tokens, layout, components |
| Scripting | JavaScript (no framework) | `assets/js/main.js`, one delegated listener |
| Images | WebP | Six portraits, 158 KB for all six |
| Typography | Georgia + system sans | No webfont requests |

## Prerequisites

None. Open `index.html` in any browser.

## Installation

```bash
git clone https://github.com/pabloWIB/Team-Page-UI.git
cd Team-Page-UI
npx serve .
```

The page also runs correctly opened straight from the filesystem — there are no module imports or fetches that require a server.

## Usage

To reuse the block elsewhere, copy the `<section class="team">` markup from `index.html` along with the three stylesheets and `assets/js/main.js`. The script queries by class and exits quietly if `.team-grid` is not on the page, so it will not interfere with a host page.

Adding a person means adding a `<li class="team-grid__item">` and a portrait to `assets/img/content/`. The grid reflows on its own — there is no column count to update. Two details to keep consistent when you do:

- The `id` on `.team-card__bio` must match the `aria-controls` on that card's button.
- Set `width` and `height` on the `<img>` to the file's real pixel dimensions, so the card reserves its space before the image arrives.

## Project structure

```
.
├── index.html              # The team section
├── 404.html                # Not-found page, links back to index
├── assets/
│   ├── css/
│   │   ├── base.css        # Design tokens, reset, typography, utilities
│   │   ├── layout.css      # Container, header, grid, footer, breakpoints
│   │   └── components.css  # Card, description overlay, link button
│   ├── js/
│   │   └── main.js         # Description toggles, delegated from the grid
│   └── img/
│       ├── content/        # Six portraits (WebP) and the Open Graph image
│       └── logo/           # Favicon and apple-touch-icon
├── docs/
│   ├── auditoria.md        # State of the project before the rewrite
│   └── cambios.md          # What changed, grouped by phase
├── robots.txt
├── sitemap.xml
└── .gitignore
```

## Accessibility

- One `<h1>`, no skipped heading levels, landmarks on header, main and footer.
- Every interactive element is reachable and operable by keyboard, with a visible focus ring.
- All text passes WCAG AA contrast; the lowest pair on the page is white on `#696969` at 5.49:1.
- Portraits carry descriptive `alt` text; the toggle buttons name the person they open.
- Transitions collapse under `prefers-reduced-motion`.

## Known issues

The six names, portraits and biographies are sample content. Replace them before using this as a real team page.

`robots.txt`, `sitemap.xml` and the canonical and Open Graph URLs are all written against `https://teampage.wib.digital/`. Change that host in those four places if you deploy anywhere else.

## Deployment

Deployed on Vercel at [teampage.wib.digital](https://teampage.wib.digital). Static: upload the repository root as-is, no build command and no output directory. `404.html` is picked up automatically by static hosts.

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

---

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
