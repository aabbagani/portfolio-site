# Portfolio site

Static site, no build step. Two pages:

- `index.html` — Home: hero → Projects → Skills → Education → Certifications, single continuous scroll with a sticky nav + scrollspy quick-jump.
- `experience.html` — Experience, its own page.

## Before this goes live, fill in:

- **Contact links** in `index.html` hero: `mailto:you@example.com` and the LinkedIn URL placeholder.
- **Certificate links** — each cert card has a placeholder "Certificate" chip; swap in the real links.
- **CliniCalm PRD link** — marked "link TBD" in the Projects section.
- **Stellantis "View Presentation" link** — marked "link TBD" in Experience.

## Adding experience photos

Each photo slot looks for a specific file under `assets/experience/`. Until the file exists, it shows a placeholder with the caption so the page never breaks. Drop in (any of):

- `cure-foundation-1.jpg` — Golf Charity Fundraiser with Padma Shri Dr Vijay Anand Reddy & Dr Shashi Palkonda
- `cure-foundation-2.jpg` — CURE Foundation Gala
- `cure-foundation-3.jpg` — Press Meet & Inauguration, Cancer Crusaders Golf Championship
- `stellantis-1.jpg` — Town Hall recognition
- `louisa-ai-1.jpg` — With Muriel Daccache & Relina Vas

To add a photo for an entry that doesn't have a slot yet, copy an `<figure class="exp-photo">` block in `experience.html` and point it at a new filename in `assets/experience/`.

## Preview locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploy

Push to GitHub and enable GitHub Pages (Settings → Pages → deploy from `main`), or point your existing hosting/DNS for abbagani.com at this repo.
