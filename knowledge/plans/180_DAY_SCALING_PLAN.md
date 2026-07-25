# 180-Day Scaling Plan

Assumes the 90-day plan is complete and one release cycle has been run cleanly.
Goal for this period: **more throughput without more chaos**, and a second
revenue line that pays inside 30 days.

## Months 4–5 — Throughput

| Focus | Target | Surface |
|---|---|---|
| Release cadence | 2 releases in parallel, staggered by 4 weeks | `/calendar` |
| Team | 2 members onboarded with per-asset assignments | `/admin` |
| Creative | Batch-render 24 variants/month, ranked automatically | `scripts/ugc_reel_gen.py` |
| Catalog | Every existing track has a video version | `/releases` |
| Analytics | Analytics SQL views live; monthly report generated | `analytics/sql/` |

## Month 6 — Second revenue line

Pick **one** (not two):

| Option | Best if | First 30 days |
|---|---|---|
| Commissions / services | You have delivery capacity now | Publish 3 packages; quote template live; `/invoices` in use |
| Sync | Splits are clean and catalog is deep | 20-track sync-ready pack; 5 supervisor relationships |
| Live | There is a local audience | 1 small room self-ticketed via `/live` |
| Affiliate | You have an audience but little time | 5 partners live with tracked codes in `/affiliates` |

## Months 7–8 — Compounding

| Focus | Target |
|---|---|
| Catalog share of streams | > 40% |
| Repeat client rate | > 30% |
| Back-catalog re-pitch | Quarterly, scheduled |
| Owned audience | Email list growing every month |
| Pipeline | Always ≥ 3× the next quarter's revenue target |

## Months 9 — Productize (optional)

If RIPPL itself is going to be sold: enable `/billing`, define 3 tiers, meter AI
actions as credits, ship a free tier with hard limits. Model:
`ha346/AI-Saas-Platform` (Stripe subscription + free tier with API limiting).
Treat it as the highest-margin, longest-payback line — do not start it until at
least two music revenue lines are stable.

## Guardrails

1. **No new revenue line while an existing one is unmeasured.**
2. **No new team member without per-asset assignments in `/admin`.**
3. **No compressed release schedules.** Move the date instead.
4. **No line above 50% of forecast revenue.**
5. **Post-mortem after every release, without exception.**
