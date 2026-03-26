# SME AI Marketing App — MVP

A lightweight, mobile-first PWA delivering AI marketing lessons for SME bosses in Singapore, Malaysia, and Indonesia.

## Tech Stack

- **Vanilla HTML/CSS/JS** — no framework, fastest possible load
- **PWA** — installable on mobile, works offline
- **Deploy target:** Vercel (zero-config)

## Deploying to Vercel

1. Go to [vercel.com](https://vercel.com) → "Add New Project"
2. Import `khairulism/sme-ai-marketing-app` from GitHub
3. Click Deploy — done!

Vercel auto-deploys on every push to `main`.

## Project Structure

```
mvp/
├── index.html          # Single-page app (all lesson screens)
├── styles.css          # Shared styles, mobile-first
├── app.js              # Navigation + lesson logic
├── manifest.json       # PWA manifest
└── README.md           # This file
```

## Adding More Lessons

1. Add a new `<div class="screen" id="screen-N">` in `index.html`
2. Update `TOTAL_LESSONS = N` in `app.js`
3. Push — Vercel deploys automatically
