# Vincenzo Picone — Portfolio (`vincenzopiconee.github.io`)

Minimalist Apple-inspired portfolio built with **Astro** and **Tailwind CSS**, automatically adapting to system Light and Dark Mode.

## Pages
- `/` — Name + brief intro underneath, followed by a vertical-scroll full-width 2-column grid of wide landscape cards for all 5 projects (`Trustfall`, `Biteary`, `Beeep`, `MyNapoli`, `SuperHeroFit`)
- `/profile` — Dedicated personal profile page with all connection links (`GitHub`, `LinkedIn`, `Email`)
- `/projects/<slug>` — Story-driven project pages with auto-detected screenshots/videos and expandable "Behind the craft" chapters

## Local Development
```bash
npm install
npm run dev
```

## Adding Media
See [`MEDIA_GUIDE.md`](./MEDIA_GUIDE.md) to drop in `icon.png`, `icon-dark.png`, `demo.mp4`, and `screen-1.png`–`screen-4.png` under `public/media/<app>/`.

## Deploy to GitHub Pages
```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/vincenzopiconee/vincenzopiconee.github.io.git
git push -u origin main
```
Then enable **Settings → Pages → Build and deployment → Source: GitHub Actions**.
