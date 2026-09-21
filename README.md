# Farmasi — Pharmacy Operations Mockup

Clickable UI mockup for the pharmacy management system: a **Back Office** web
app (stock, transfers, replenishment approvals, fast-moving forecasts) and a
**POS PWA** (sale, prescription verification, shift close). Built with
React + Vite + Tailwind. All data is mocked in `src/data/mockData.js` — there
is no backend.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

**Option A — GitHub Actions (recommended, already set up)**

1. Push this project to a new GitHub repo.
2. In the repo, go to **Settings → Pages → Source** and select **GitHub
   Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and deploys
   automatically. Your site will be at
   `https://<your-username>.github.io/<repo-name>/`.

**Option B — manual deploy with `gh-pages`**

```bash
npm install
npm run deploy
```

This builds the project and pushes `dist/` to a `gh-pages` branch. Then set
**Settings → Pages → Source** to **Deploy from a branch → gh-pages**.

> The Vite config uses a relative base (`base: "./"`), and routing uses
> `HashRouter`, so the build works at any repo path without edits — no need
> to set a `homepage` field or change `vite.config.js`.

## Structure

```
src/
  data/mockData.js       mock branches, stock, transfers, POS catalog
  components/            Badge, Sidebar
  layouts/                BackOfficeLayout, PosLayout
  pages/backoffice/       Dashboard, Transfers, Replenishment, Forecasting
  pages/pos/              Sale, ShiftClose
```

## Notes for the next pass

- This is a visual/interaction mockup, not wired to a real API — cart state,
  approvals, and shift totals reset on reload.
- Prescription verification on the POS Sale screen accepts any 4+ digit PIN;
  it's illustrating the *flow*, not real auth.
- Branch switcher in the Back Office sidebar is currently decorative (always
  shows Sanur Branch data).
