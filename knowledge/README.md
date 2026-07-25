# RIPPL Knowledge Hub

The operating manual that sits behind the dashboard. RIPPL the app tells you **what
is happening**; this hub tells you **what to do about it**.

Structure and philosophy adapted from `parrsi01/Music` (The Beat Maker's Business
Operating System), reframed for a label / management / 360-marketing operation.
Every file separates **theory** from **execution**. Nothing here is motivational.

---

## Fast-start paths

| You are… | Start here |
|---|---|
| Signing a new artist | `foundations/AR_AND_ARTIST_DEVELOPMENT.md` → `checklists/ARTIST_ONBOARDING_CHECKLIST.md` → `templates/CLIENT_PIPELINE.csv` |
| Shipping a release in 8 weeks | `systems/RELEASE_OPERATING_SYSTEM.md` → `checklists/DSP_PITCH_CHECKLIST.md` → `checklists/RELEASE_DAY_CHECKLIST.md` |
| Out of promo budget | `systems/LOW_BUDGET_PROMO_MODEL.md` → `marketing/UGC_CONTENT_ENGINE.md` |
| Building recurring revenue | `systems/REPEAT_CLIENT_ENGINE.md` → `finance/REVENUE_MODELS.md` → `operations/COMMISSION_PIPELINE.md` |
| Deciding what to sign / push | `research/HIT_PREDICTION_METHOD.md` → `/hitlab` in the app |
| Booking a show | `checklists/LIVE_SHOW_ADVANCE_CHECKLIST.md` → `/live` in the app |
| Reviewing the week | `templates/KPI_SCORECARD.md` → `templates/WEEKLY_EXECUTION_TEMPLATE.md` |

---

## Map

```
knowledge/
├── foundations/    Core knowledge — read once, revisit yearly
├── systems/        Named, repeatable models you actually run
├── marketing/      Content, social, UGC, paid
├── sales/          Sync, brand deals, commissions, objections
├── operations/     Delivery, QC, file hygiene, KPI logic
├── finance/        Unit economics, royalties, revenue models
├── research/       Method notes — hit prediction, catalog analytics
├── checklists/     Do-not-skip lists (release day, contracts, shows, security)
├── templates/      Trackers & scorecards (Markdown + CSV, importable)
├── prompts/        AI prompt library — paste into Tech Lab's Prompt Library
└── plans/          90-day execution plan, 180-day scaling plan
```

## How this connects to the app

| Hub file | App surface |
|---|---|
| `templates/RELEASE_CALENDAR.csv` | `/calendar`, `/releases` |
| `templates/CLIENT_PIPELINE.csv` | `/roster` scouting board |
| `templates/SALES_TRACKER.csv` | `/invoices`, `/budget` |
| `templates/OUTREACH_TRACKER.csv` | `/creators` |
| `templates/ROYALTY_SPLIT_SHEET.csv` | `/vault` split sheets |
| `templates/AFFILIATE_LEDGER.csv` | `/affiliates` |
| `prompts/*` | `/techlab` Prompt Library |
| `data/hooks.csv` (repo root) | `/studio` UGC engine, `scripts/ugc_reel_gen.py` |
| `analytics/sql/*` (repo root) | Supabase SQL editor → `/dashboard` |

## Rules of the hub

1. **One file, one system.** If a file describes two models, split it.
2. **Every model ends with a checklist.** Theory without a run-list is a blog post.
3. **Numbers get sourced or labelled as assumptions.** Mark assumptions `[ASSUMPTION]`.
4. **Update after every release cycle.** What actually happened beats what was planned.
