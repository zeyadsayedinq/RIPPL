# RIPPL Upgrade Plan — what came from where

Ten open-source repositories were reviewed against RIPPL as it stood. Each one
contributed exactly one thing RIPPL did not already have. This document is the
provenance record and the backlog for what is still worth doing.

---

## 1. The mapping

| # | Source repo | What it actually is | The gap it filled | What was added to RIPPL |
|---|---|---|---|---|
| 1 | [lucpod/ticketless](https://github.com/lucpod/ticketless) | AWS/serverless workshop that builds a gig + ticket-sales business | RIPPL had **no live/touring domain at all** | `/live` route · `gigs` + `ticket_orders` tables · `gig_economics` view with break-even and sell-through · Live Show Advance Checklist |
| 2 | [chronick/global-business-solutions](https://github.com/chronick/global-business-solutions) | Vite + TS slideshow app with a GitHub Actions deploy pipeline | RIPPL had **no CI** — a broken route could reach Vercel | `.github/workflows/ci.yml` — lint, typecheck, build, plus a committed-secrets scan |
| 3 | [ebtezcan/Spotify-Song-Popularity-Prediction](https://github.com/ebtezcan/Spotify-Song-Popularity-Prediction) | Supervised classification over ~176k Spotify tracks; LogReg 0.66 recall | RIPPL had **no predictive/analytical A&R input** | `/hitlab` route · `src/lib/hit-score.ts` transparent scorer · `hit_scores` table with predicted-vs-actual calibration · method + limits doc |
| 4 | [vishnuhimself/UGCVidGen](https://github.com/vishnuhimself/UGCVidGen) | Python batch renderer: hooks CSV + b-roll + CTA + music → reels | RIPPL tracked paid creative but **couldn't produce it at volume** | Studio → **UGC Engine** tab · `data/hooks.csv` (60 hooks, 6 angles) · `scripts/ugc_reel_gen.py` · `src/lib/ugc-hooks.ts` · creator-brief generator |
| 5 | [dphelan61/sql_business_analysis_project](https://github.com/dphelan61/sql_business_analysis_project) | Chinook music-store sales analysis in SQL | RIPPL had **no SQL analytics layer** | `analytics/sql/001_analytics_views.sql` — unified revenue ledger, customers, revenue by month/line |
| 6 | [Divleen-0619/DigitalMusic-BusinessMetrics](https://github.com/Divleen-0619/DigitalMusic-BusinessMetrics) | The same Chinook data with a defined business-question set (CLV, revenue by country, genre by country, top artists) | RIPPL had metrics on screen but **no question set behind them** | `analytics/sql/002_business_metrics.sql` — 13 questions rewritten against RIPPL's schema · method doc explaining the decision each one drives |
| 7 | [precisep/Business](https://github.com/precisep/Business) | Django app pairing affiliate tracking with music promotion | RIPPL had **no referral/affiliate concept** | `/affiliates` route · `affiliates` + `referrals` tables · `affiliate_performance` view · tracked codes, CVR, commission owed, CSV ledger export |
| 8 | [parrsi01/Music](https://github.com/parrsi01/Music) | "The Beat Maker's Business Operating System" — a doc repo that is book + OS + playbook + research | RIPPL was a dashboard with **no operating manual** | The entire `knowledge/` hub (40 files) + `/knowledge` route: foundations, systems, marketing, sales, operations, finance, research, checklists, CSV templates, prompt packs, 90/180-day plans |
| 9 | [ha346/AI-Saas-Platform](https://github.com/ha346/AI-Saas-Platform) | Next.js SaaS: Clerk auth, Stripe subscriptions, free tier with API limiting | RIPPL was single-tenant with **no billing or quota concept** | `/billing` route · `src/lib/plans.ts` (3 tiers, credit costs, tier gating) · `plans` / `subscriptions` / `usage_events` tables · `usage_this_month` view |
| 10 | [wpwwhimself/muzyka-szyta-na-miare](https://github.com/wpwwhimself/muzyka-szyta-na-miare) | Laravel CRM for a music-commission business: client-visible phases, auto-expiry, invoice generation | RIPPL stored contracts but had **no client-work pipeline and no invoicing** | `/invoices` route (Commission Pipeline + Invoices tabs) · `src/lib/invoice.ts` (invoice + quote PDFs) · `commissions` / `invoices` / `invoice_lines` tables · `invoice_totals` view · Commission Pipeline run-book |

---

## 2. What shipped

### New routes (6)

| Route | Module | Tier-gated to |
|---|---|---|
| `/hitlab` | Hit Score — audio-feature scoring with a full point-by-point breakdown | Studio, Label |
| `/invoices` | Commission pipeline (10 phases) + invoicing with PDF generation | Studio, Label |
| `/live` | Gigs, ticketing, break-even, sell-through, settlement | Label |
| `/affiliates` | Referral partners, tracked codes, commission ledger | Label |
| `/billing` | Plans, AI credits, per-feature usage metering | — |
| `/knowledge` | Searchable Knowledge Hub with fast-start paths | — |

### New libraries (6)

`src/lib/hit-score.ts` · `src/lib/invoice.ts` · `src/lib/plans.ts` ·
`src/lib/ugc-hooks.ts` · `src/lib/knowledge-index.ts` · `src/lib/knowledge-prompts.ts`
(plus a generic `downloadCsv` added to `src/lib/csv-export.ts`)

### UI surfaces updated

- **Sidebar** — Hit Lab added to Personal OS; new **Revenue** group (Invoices, Live & Tickets, Affiliates, Billing); Knowledge added next to Settings
- **Landing page** — 6 new glow cards, 8 headline stats, expanded footer nav
- **Home** — "Money & momentum" row (Outstanding, Commissions, Upcoming Shows, Affiliate Owed) with overdue/break-even warnings, plus a Jump-to grid
- **Command palette (⌘K)** — searches invoices, commissions, shows, partners, hit scores and all 40 knowledge docs; 6 new quick-create actions
- **Quick-Action FAB** — Raise Invoice, Add Show, Add Affiliate Partner
- **Notifications bell** — overdue invoices, quotes expiring ≤7 days, work in progress without a deposit, shows below break-even, AI credits low/exhausted
- **Studio** — new **UGC Engine** tab: batch builder, angle picker, hook library, render-command generator, per-hook creator briefs
- **Tech Lab** — one-click import of the 12-prompt knowledge pack (idempotent)

### Data & infra

- `supabase/migrations/0006_growth_modules.sql` — 10 tables, 5 views, RLS on everything, free-plan trigger on signup
- `analytics/sql/001_analytics_views.sql` + `002_business_metrics.sql`
- `data/hooks.csv` · `scripts/ugc_reel_gen.py`
- `.github/workflows/ci.yml`
- `knowledge/` — 40 files

---

## 3. Deployment order

1. Run `supabase/migrations/0006_growth_modules.sql` in the Supabase SQL editor.
2. Run `analytics/sql/001_analytics_views.sql`, then `002_business_metrics.sql`.
3. `npm run build` locally, then deploy. New routes are code-split — no env changes needed.
4. Open `/billing` and confirm the plan reads `Free`; open `/knowledge` and confirm 40 docs.
5. Work through `knowledge/checklists/SECURITY_AND_LAUNCH_CHECKLIST.md` before making the app public.

For the UGC renderer: `brew install ffmpeg`, drop b-roll into `media/hook_videos/`,
endcards into `media/cta_videos/`, a font into `media/fonts/`, then

```bash
python3 scripts/ugc_reel_gen.py --campaign night-drive --count 12 --track path/to/track.wav
```

---

## 4. Known limitations — read before trusting anything

| Area | Limitation |
|---|---|
| **Hit Score** | A hand-weighted heuristic reproducing the *direction* of the reference study's findings, not its fitted model. Every model in that study plateaued near 66% recall on 2019 data. Tie-breaker only — never a gate. |
| **Billing** | Plan switching is local. There is no Stripe checkout and no webhook yet; tier gating is advisory in the UI and **not enforced server-side**. Do not charge anyone until it is. |
| **Ticketing** | `/live` tracks sales and economics; it does not sell tickets. No payment flow, no ticket delivery, no scanning. |
| **Affiliates** | Codes and links are generated and revenue is logged manually. There is no click-tracking endpoint, so attribution is only as good as your partner reporting. |
| **Analytics SQL** | `revenue_ledger` covers invoices, tickets and referrals. Recorded-streaming revenue is not in it — add it when distributor statements are ingested. Country data is only populated for live. |
| **Knowledge hub** | Markdown on disk; `/knowledge` is a catalogue with search and deep links, not a renderer. Opening a doc means opening the file. |
| **Pricing bands** | Every figure marked `[ASSUMPTION]` in the finance docs is orientation only. Get a comparable before quoting. |

---

## 5. Backlog — ranked

**Now**

1. Server-side enforcement of tier gating + a Stripe checkout session and webhook (`/billing` is otherwise decorative).
2. A click-tracking endpoint for `/affiliates` (`/?ref=CODE` → cookie → conversion), so attribution stops being manual.
3. Ingest distributor statements into `revenue_ledger` — without recorded revenue the analytics layer is missing the largest line.

**Next**

4. Persist the growth modules to their Supabase tables. They currently live in `app_state` JSONB like the rest of the OS; the tables in `0006` are ready and indexed for when volume justifies it.
5. Real ticket sales in `/live` — payment link per gig, ticket email, QR check-in.
6. Hit Score calibration: once 20+ releases have `actual_d28_streams` logged, run the correlation query in `002_business_metrics.sql` and either retrain or retire the heuristic.
7. Sync-agent CRM inside `/roster` — the sync pipeline currently lives in the deal sorter and a knowledge doc, not in a purpose-built surface.

**Later**

8. Per-genre and per-territory hit models trained on live Spotify API data rather than a 2019 snapshot.
9. Auto-generated pitch decks from campaign data (the one idea from `chronick/global-business-solutions` not yet used — its slideshow engine).
10. Render the knowledge hub in-app with a Markdown viewer and inline checklist state synced to `/tasks`.

---

*Provenance recorded 25 July 2026. All source repositories are public; each is
credited in the header comment of the file(s) derived from it.*
