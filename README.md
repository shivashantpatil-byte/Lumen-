# LUMEN — Interior Architecture & Design Studio

A fictional/concept interior architecture studio website, built as a frontend
portfolio project (HTML, CSS, vanilla JavaScript — no framework, no backend).

LUMEN, its projects, and its team are not real. Content and photography
(via Unsplash) are used to demonstrate design and front-end development
skills only.

## Structure

```
lumen/
├── index.html
├── projects.html
├── studio.html
├── contact.html
├── projects/
│   ├── residence-no-01.html
│   ├── coastal-house.html
│   ├── quiet-courtyard.html
│   └── atelier-17.html
├── css/style.css
├── js/script.js
└── images/
```

## Pages

- **Home** — hero, featured project, studio introduction, selected projects, design philosophy, CTA
- **Projects** — editorial index of all four case studies
- **Projects / [project]** — individual case study: hero, intro, metadata, image gallery, design approach, prev/next navigation
- **Studio** — studio statement, approach, philosophy, capabilities
- **Contact** — studio info + inquiry form

## Known pre-launch TODOs

- `contact.html` — the inquiry form posts to a placeholder Formspree endpoint
- Footer/header social links (Instagram, Pinterest, LinkedIn) are placeholders
  (`href="#"`) since LUMEN has no real social accounts.
- Images are hotlinked from Unsplash for development; replace with optimized,
  locally hosted images before production deployment.
