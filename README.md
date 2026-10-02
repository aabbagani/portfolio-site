# Portfolio site

Static site, no build step. Two pages:

- `index.html` — Home: hero → Projects → Skills → Education → Certifications, single continuous scroll with a sticky nav + scrollspy quick-jump.
- `experience.html` — Experience, its own page.

## Before this goes live, fill in:

- **Certificate links** — each cert card has a placeholder "Certificate" chip; swap in the real links.
- **Project links marked "link TBD"** — edit directly in `js/projects-data.js`, or use Admin Mode (below).
- **Stellantis "View Presentation" link** — marked "link TBD" in Experience.

## Editing Projects (Admin Mode)

The Projects grid on `index.html` is data-driven from `js/projects-data.js` and rendered by `js/projects-render.js`. You can hand-edit that data file directly, or use the built-in Admin Mode:

1. Open the site and click **Admin Mode** (floating button, bottom-right of Home).
2. Each project card gets a pencil button — click it to edit name, category (dropdown, or "Other…" for a custom one), headline, description, tags, cover photo, and links (add/remove rows freely, leave a URL blank to show it as "link TBD").
3. **+ Add Project** in the toolbar adds a new card the same way.
4. A cover photo can be a URL/path, or use the file picker to upload an image directly — it's read into the page as a data URL, no server involved.

**Important — this is client-side only.** Edits save to that browser's `localStorage`, so they're visible only to you, only on that browser, and only until you clear site data. They do **not** change the live site other visitors see, and they are **not** saved to this repo automatically. To make an edit permanent:

1. Click **Export data file** in the Admin Mode toolbar — this downloads an updated `projects-data.js`.
2. Replace `js/projects-data.js` in the repo with the downloaded file.
3. Commit and push.

**Reset changes** discards everything in `localStorage` and reverts to whatever is currently in the committed `js/projects-data.js`.

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
