# RIPPL

**v1.2 · 2026**

A 360° operating system for artist management, distribution, marketing and
revenue. One command center covering A&R and scouting, release and distribution
operations, a contracts vault, a creative studio and audio lab, campaign
management across every platform, commissions and invoicing, live ticketing,
an affiliate programme, and the written playbooks behind all of it.

---

## Modules

**Personal OS** — Home · Roster · Releases · Audio · The Vault · Studio · Tech Lab · Hit Lab

| Module | What it does |
|---|---|
| **Home** | Command center: performance metrics, money & momentum, calendar, action list |
| **Roster** | A&R CRM — scouting board, active roster, deal pipeline, press-kit generation |
| **Releases** | Distribution engine — release wizard, catalog, rights status, one-pager export |
| **Audio** | Library, upload, DJ/mixer with EQ and recording, shareable view-only players |
| **The Vault** | Contracts — tagging, expiry alerts, embedded viewer, e-signature dispatch |
| **Studio** | Scratchpad, moodboard, UGC engine, campaign creative tracker |
| **Tech Lab** | Project boards, prompt library, prompt builder |
| **Hit Lab** | Scores a track from its audio features with a full breakdown, and calibrates against real results |

**Revenue** — Invoices · Live & Tickets · Affiliates · Billing

| Module | What it does |
|---|---|
| **Invoices** | Ten-phase commission pipeline with deposit gating and expiring quotes, plus invoicing and PDF export |
| **Live & Tickets** | Shows, capacity, break-even ticket count, sell-through, settlement |
| **Affiliates** | Referral partners, tracked codes, conversion rates, commission ledger |
| **Billing** | Plans, monthly credit quota, per-feature usage metering |

**Marketing** — Overview · Campaigns · Calendar · Channels · Tasks · Budget · Templates · Creators · Assets

**Platforms** — TikTok · Instagram · YouTube · Facebook · X

**System** — Admin · Knowledge · Settings

---

## Global chrome

Available on every page:

- **⌘K command palette** — searches every record type and all knowledge documents, with quick-create actions
- **Persistent audio player** — waveform, scrubber, timestamped feedback notes
- **Quick-action button** — note, contract, deal, lead, invoice, show, partner
- **Notifications** — expiring contracts, scheduled releases, overdue invoices, expiring quotes, undeposited work, shows below break-even, credit limits
- **Sync status** — live cloud-sync indicator

---

## Knowledge Hub

Forty playbooks, checklists, templates and prompt sets in `knowledge/`, browsable
and searchable at `/knowledge`. Covers A&R, release operations, marketing
systems, sales, delivery, finance, research method, and 90/180-day plans —
each linked to the module it drives.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | TanStack Start (React 19 + Vite) |
| Styling | Tailwind CSS v4, OKLCH colour system |
| Animation | Framer Motion |
| Charts | Recharts |
| Audio | Web Audio API |
| Documents | Client-side PDF and spreadsheet generation |
| Backend | Supabase — Postgres, Auth, Storage, row-level security |
| Hosting | Vercel |

---

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:8080`.

```bash
npm run build      # production build
npm run lint       # lint
npx tsc --noEmit   # typecheck
```

### Backend

The app runs without a backend using local storage, so you can explore it
immediately. To enable cloud sync, accounts, file storage and the revenue
modules, follow **`SUPABASE_SETUP.md`** — create the project, run the
migrations in `supabase/migrations/` in order, create the storage buckets, and
set the environment variables.

Verify with **Settings → Run diagnostics**.

### Optional: batch video renderer

`scripts/ugc_reel_gen.py` renders short-form promo video in batches from the
hook library. Requires `ffmpeg` on the path. See
`knowledge/marketing/UGC_CONTENT_ENGINE.md`.

---

## Project structure

```
├── knowledge/          Playbooks, checklists, templates, prompts (40 files)
├── docs/               Deployment and internal reference
├── analytics/sql/      Reporting views and the business-metrics query pack
├── data/               Hook library
├── scripts/            Batch video renderer
├── supabase/           Database migrations
├── api/                Scheduled jobs and webhooks
└── src/
    ├── routes/         One file per page
    ├── components/     Shared UI
    ├── lib/            State, integrations, document generation, scoring
    └── styles.css      Theme tokens and utilities
```

---

## Security

Before deploying publicly, work through
`knowledge/checklists/SECURITY_AND_LAUNCH_CHECKLIST.md`. In particular:

- Row-level security must be enabled and tested with a second, non-admin account
- Service-role keys and payment secrets belong in server-side environment
  variables only, never in a `VITE_`-prefixed variable
- The local fallback password gate is for development convenience — disable or
  change it before the app is reachable publicly
- Rotate any key that has been shared, screenshotted or pasted into a chat

---

## Deployment

Push to the connected branch; the host builds and deploys automatically.
Environment variables prefixed `VITE_` are inlined at build time, so they must
be set **before** the build runs, and changing one requires a redeploy.

Full sequence in `docs/DEPLOY_COMMANDS.md`.

---

## Browser support

Chrome 90+ · Firefox 88+ · Safari 15+ · Edge 90+

---

## License

Proprietary and confidential. All rights reserved.

*RIPPL v1.2 · © 2026*
