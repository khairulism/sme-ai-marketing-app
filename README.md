# SME AI Marketing App — MVP

A lightweight, mobile-first PWA delivering AI marketing lessons for SME bosses in Singapore, Malaysia, and Indonesia.

## Tech Stack

- **Vanilla HTML/CSS/JS** — no framework, fastest possible load
- **PWA** — installable on mobile, works offline
- **Deploy target:** Vercel (zero-config)

## Project Structure

```
mvp/
├── index.html          # Single-page app (all lesson screens)
├── styles.css          # Shared styles, mobile-first
├── app.js              # Navigation + lesson logic
├── manifest.json       # PWA manifest
└── README.md           # This file
```

## Getting Started (Local)

```bash
# Open in any browser
open index.html

# Or serve with a local server
npx serve .
```

## Deploying to Vercel

### Option A: Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
# Follow prompts, done in 30 seconds
```

### Option B: GitHub + Vercel Dashboard

1. Push code to GitHub (already done)
2. Go to [vercel.com](https://vercel.com) → "Add New Project" → Import the repo → Deploy.
3. Vercel auto-deploys on every push.

## Lesson Structure

Each lesson (`#screen-N` in `index.html`) contains:

1. **Lesson number + badge** — clear, scannable header
2. **Title + subtitle** — sets context
3. **Insight block** — one bold takeaway
4. **Supporting content** — icon cards, callouts, micro tasks
5. **Truth callout** — a key principle in a highlighted box
6. **Micro task** — one actionable thing the boss assigns themselves
7. **CTA** — next lesson or completion button

## Adding More Lessons

1. Add a new `<div class="screen" id="screen-N">` in `index.html`
2. Update `TOTAL_LESSONS = N` in `app.js`
3. Style it using existing components (`.insight-block`, `.icon-card`, `.callout`, `.micro-task`)
4. Push — Vercel deploys automatically

## Design Principles

- **Mobile-first** at 375px base
- **Premium but minimal** — no clutter, no dark patterns
- **No fake urgency** — no countdown timers, no "limited spots"
- **Fast load** — < 3 seconds on 3G (no frameworks)
- **Phone-friendly** — large tap targets (min 44px), clear CTAs

## API Note (Lesson 0 URL Check)

The current implementation simulates the Google/AI check for demo purposes. To make it real:

1. Use **Google Indexing API** to check if a URL is indexed
2. Use **Perplexity/ChatGPT sitemaps** or **Google's AI overview presence** data
3. Replace the simulated `fetch` in `app.js` with real API calls

## License

MIT — free to use and modify.
