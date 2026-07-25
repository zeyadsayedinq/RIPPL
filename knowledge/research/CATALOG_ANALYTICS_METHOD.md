# Catalog & Sales Analytics — Method

Behind `analytics/sql/`. Question set adapted from two Chinook-based music-store
analyses: `dphelan61/sql_business_analysis_project` and
`Divleen-0619/DigitalMusic-BusinessMetrics`.

## Question set (portable to any catalog schema)

**Revenue shape**
1. Total revenue by period
2. Top N invoices / transactions
3. Revenue by country and by city
4. Revenue concentration — what share comes from the top 10% of customers

**Customer**
5. Customer Lifetime Value per customer
6. Best customer by total spend, overall and per country
7. Spend per customer per artist — what each buyer actually likes
8. Segment extraction (e.g. every listener of a given genre, with contact fields)

**Catalog**
9. Total sales by artist
10. Most popular genre per country
11. Tracks longer than the catalog average, and whether length correlates with revenue
12. Top artists by track count within a genre — depth vs. performance

**Team**
13. Most senior employee / rep by title, and revenue attributable to each rep

## Why these and not "more"

Each question maps to a decision:

| Question | Decision it drives |
|---|---|
| Revenue by country | Where to spend the next promo dollar |
| Popular genre per country | What to sign and where to release it |
| CLV | Who gets personal follow-up |
| Revenue concentration | How fragile the business is |
| Sales by artist | Renewal and advance conversations |
| Segment extraction | Targeted campaigns in `/creators` and `/campaigns` |

## Applying it to RIPPL

RIPPL's Supabase schema is not Chinook, so `analytics/sql/001_analytics_views.sql`
defines equivalent views over RIPPL's own tables (releases, invoices, invoice
lines, gigs, tickets, affiliates). `002_business_metrics.sql` holds the thirteen
questions rewritten against those views. Run both in the Supabase SQL editor.

## Caveats

- Revenue by country is only as good as your billing-country data
- CLV computed on realised revenue only; no predictive component
- Any metric over a period shorter than one full settlement cycle (60–120 days
  for streaming) will understate recorded revenue
