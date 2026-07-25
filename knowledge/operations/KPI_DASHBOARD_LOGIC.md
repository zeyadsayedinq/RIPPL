# KPI Dashboard Logic

Definitions behind the numbers on `/home` and `/dashboard`. If two people compute
a KPI differently, the KPI is worse than useless.

## Definitions

| KPI | Formula | Window | Notes |
|---|---|---|---|
| Blended ROAS | attributed revenue ÷ total media spend | Campaign to date | Blended = all channels, no per-channel attribution claimed |
| CPA | media spend ÷ conversions | 28 days | Conversion defined per campaign, stated in `/campaigns` |
| D7 / D28 streams | streams in first 7 / 28 days | Fixed | The only comparable release metric across catalog |
| Catalog share | streams from tracks > 90 days old ÷ total | Monthly | Health of the floor; target > 40% |
| Save rate | saves ÷ unique listeners | Monthly | Intent-to-return proxy |
| 3s retention | views ≥ 3s ÷ total views | Per post | The hook metric |
| Repeat rate | clients with ≥ 2 jobs ÷ total clients | Rolling 12m | Service-side health |
| Cash conversion days | invoice date → payment received | Per invoice | Median, not mean |
| Pipeline value | Σ(deal value × stage probability) | Live | Probabilities fixed below |
| Hit Score | see `research/HIT_PREDICTION_METHOD.md` | Per track | Decision *input*, never a decision |

## Stage probabilities (fixed — do not tune per deal)

| Stage | P |
|---|---|
| Sourced | 0.05 |
| Pitched | 0.15 |
| Briefed | 0.30 |
| Shortlisted | 0.50 |
| Negotiating | 0.70 |
| Contracted | 0.95 |

Fixed probabilities make the pipeline number comparable week to week. Tuning them
per deal turns forecasting into storytelling.

## Reporting cadence

- **Daily**: nothing. Daily numbers are noise at this scale.
- **Weekly**: 3s retention, spend vs plan, pipeline value, overdue invoices
- **Monthly**: catalog share, save rate, repeat rate, cash conversion days
- **Per release**: D7, D28, ROAS, post-mortem

## Checklist

- [ ] Every KPI on screen has a definition here
- [ ] Nobody reports a metric with an undocumented window
- [ ] Stage probabilities untouched
