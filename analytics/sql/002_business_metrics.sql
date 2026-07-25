-- ═══════════════════════════════════════════════════════════
-- RIPPL — Business metrics query pack
--
-- The thirteen questions from the Chinook music-store analyses
-- (dphelan61/sql_business_analysis_project, Divleen-0619/DigitalMusic-BusinessMetrics)
-- rewritten against RIPPL's own schema and views.
--
-- Run 001_analytics_views.sql first. Each block is standalone — paste the one
-- you want into the Supabase SQL editor. Rationale for the question set:
-- knowledge/research/CATALOG_ANALYTICS_METHOD.md
-- ═══════════════════════════════════════════════════════════


-- ── Q1. Total revenue by month, by line ─────────────────────
select month, line, currency, transactions, revenue
from public.revenue_by_month
order by month desc, revenue desc;


-- ── Q2. Top 10 transactions ─────────────────────────────────
select occurred_on, line, counterparty, currency, amount
from public.revenue_ledger
order by amount desc
limit 10;


-- ── Q3. Revenue by country ──────────────────────────────────
-- (country currently only populated for live/ticketing; extend revenue_ledger
--  as you add billing country to invoices)
select coalesce(country, 'Unknown') as country,
       count(*)                     as transactions,
       sum(amount)                  as revenue
from public.revenue_ledger
group by 1
order by revenue desc;


-- ── Q4. Revenue concentration — what share is the top 10% of customers ──
with ranked as (
  select name, lifetime_value,
         ntile(10) over (order by lifetime_value desc) as decile
  from public.customers
)
select
  sum(lifetime_value) filter (where decile = 1)                       as top_decile_revenue,
  sum(lifetime_value)                                                 as all_revenue,
  round(sum(lifetime_value) filter (where decile = 1)
        / nullif(sum(lifetime_value), 0), 4)                          as top_decile_share
from ranked;


-- ── Q5. Customer Lifetime Value ─────────────────────────────
select name, email, country, orders, lifetime_value, avg_order_value,
       first_purchase, last_purchase
from public.customers
order by lifetime_value desc;


-- ── Q6. Best customer overall, and best per country ─────────
select name, email, lifetime_value
from public.customers
order by lifetime_value desc
limit 1;

select distinct on (country)
       country, name, email, lifetime_value
from public.customers
where country is not null
order by country, lifetime_value desc;


-- ── Q7. Spend per customer, per revenue line ────────────────
select counterparty as customer, line, sum(amount) as spend, count(*) as orders
from public.revenue_ledger
where counterparty is not null
group by 1, 2
order by customer, spend desc;


-- ── Q8. Segment extraction — everyone who ever bought a given line ──
-- (the "email, first name, last name of all rock listeners" query, generalised)
select distinct counterparty as name, counterparty_email as email, line
from public.revenue_ledger
where line = 'Live'                      -- swap for 'Custom' | 'Sync' | 'Affiliate'
  and counterparty_email is not null
order by name;


-- ── Q9. Sales by artist ─────────────────────────────────────
select g.artist,
       count(*)                       as gigs,
       sum(o.quantity)                as tickets,
       sum(o.quantity * o.unit_price) as revenue
from public.ticket_orders o
join public.gigs g on g.id = o.gig_id
where o.status = 'paid'
group by g.artist
order by revenue desc;


-- ── Q10. Best-performing territory per artist ───────────────
select distinct on (artist)
       artist, country, sum(tickets_sold) as tickets
from public.gig_economics
where country is not null
group by artist, country
order by artist, tickets desc;


-- ── Q11. Catalog vs new-release split ───────────────────────
-- Health of the floor. Target: catalog (>90 days) above 40% of releases
-- actively earning. See knowledge/systems/CATALOG_COMPOUNDING_MODEL.md
select
  count(*) filter (where is_catalog)                          as catalog_releases,
  count(*) filter (where not is_catalog)                      as recent_releases,
  round(count(*) filter (where is_catalog)::numeric
        / nullif(count(*), 0), 4)                             as catalog_share,
  round(avg(hit_score) filter (where hit_score is not null), 1) as avg_hit_score
from public.catalog_performance
where status = 'Live';


-- ── Q12. Hit Score calibration — predicted vs actual ────────
-- The only test that matters: does the score predict anything for YOUR catalog?
-- Run once you have 20+ scored releases with actual_d28_streams filled in.
select
  band,
  count(*)                             as releases,
  round(avg(score), 1)                 as avg_score,
  round(avg(actual_d28_streams))       as avg_d28,
  percentile_cont(0.5) within group (order by actual_d28_streams) as median_d28
from public.hit_scores
where actual_d28_streams is not null
group by band
order by avg_score desc;

-- correlation between predicted score and actual D28
select corr(score::float8, actual_d28_streams::float8) as pearson_r
from public.hit_scores
where actual_d28_streams is not null;


-- ── Q13. Team / rep performance ─────────────────────────────
-- Which affiliate partners and channels actually produce
select partner_name, channel, clicks, signups, conversions,
       referred_revenue, commission_owed, conversion_rate
from public.affiliate_performance
order by referred_revenue desc;


-- ── Bonus. Cashflow watchlist ───────────────────────────────
select * from public.cashflow_health;

select number, client_name, due_date, total, currency,
       current_date - due_date as days_overdue
from public.invoice_totals
where status <> 'Paid' and due_date < current_date
order by days_overdue desc;


-- ── Bonus. Live break-even watchlist ────────────────────────
select artist, venue, city, gig_date, capacity, ticket_price,
       breakeven_tickets, tickets_sold, sell_through, net
from public.gig_economics
where status in ('Confirmed','Announced','On Sale')
order by gig_date;
