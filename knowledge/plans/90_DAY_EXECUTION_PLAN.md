# 90-Day Execution Plan

For a RIPPL operation going from "set up" to "running". One primary outcome per
week. Every item maps to an app surface.

## Phase 1 — Foundation (Weeks 1–4)

| Week | Primary outcome | Key actions | Surface |
|---|---|---|---|
| 1 | Backend live | Run migrations `0001` + `0002`; buckets created; diagnostics green | `/settings` |
| 2 | Data in | Import roster, catalog, contracts; set contract expiries | `/roster` `/releases` `/vault` |
| 3 | Money visible | Enter budget lines; raise every outstanding invoice; set up affiliate codes | `/budget` `/invoices` `/affiliates` |
| 4 | Content library | 20 hook b-rolls shot; 60 hooks in `data/hooks.csv`; 3 endcards | `/studio` |

## Phase 2 — First cycle (Weeks 5–8)

| Week | Primary outcome | Key actions | Surface |
|---|---|---|---|
| 5 | Release locked | Master + artwork final; ISRC/UPC; split sheet signed | `/releases` `/vault` |
| 6 | Pitch submitted | DSP pitch ≥4 weeks out; regional DSPs; Content-ID green | `checklists/DSP_PITCH_CHECKLIST.md` |
| 7 | Creative shipped | 12 variants rendered and scheduled; creator briefs out | `scripts/ugc_reel_gen.py` `/creators` |
| 8 | Spend planned | Channel plan approved; nothing boosted cold | `/channels` `/budget` |

## Phase 3 — Release & learn (Weeks 9–12)

| Week | Primary outcome | Key actions | Surface |
|---|---|---|---|
| 9 | Release day executed | Run the day checklist end to end | `/tasks` |
| 10 | Winner amplified | Rank on 3s retention; amplification behind one winner | `/dashboard` |
| 11 | D28 read | Actual vs plan; kill/scale decision written down | `/dashboard` |
| 12 | Systematized | Post-mortem committed to `knowledge/`; next cycle dated | `/calendar` |

## Exit criteria for the 90 days

- [ ] One release shipped through all 8 gates without compressing the schedule
- [ ] ≥ 12 creative variants shipped and ranked on 3s retention
- [ ] Every contract in `/vault` with an expiry date
- [ ] Every invoice raised within 24h of delivery
- [ ] KPI scorecard filled 12 weeks in a row
- [ ] Post-mortem written
