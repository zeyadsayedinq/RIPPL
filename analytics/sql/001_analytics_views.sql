-- ═══════════════════════════════════════════════════════════
-- RIPPL — Analytics views
--
-- Ports the classic Chinook "digital music store" analytics layer onto RIPPL's
-- own schema. Question set adapted from:
--   dphelan61/sql_business_analysis_project      (Chinook + SQLite music sales)
--   Divleen-0619/DigitalMusic-BusinessMetrics    (CLV, revenue by country, etc.)
--
-- Run AFTER supabase/migrations/0006_growth_modules.sql.
-- Method notes: knowledge/research/CATALOG_ANALYTICS_METHOD.md
-- ═══════════════════════════════════════════════════════════

-- ── Unified revenue ledger ──────────────────────────────────
-- One row per money event, whatever line it came from. Everything downstream
-- reads this, so a new revenue line only needs to be added here once.
create or replace view public.revenue_ledger as
  -- commissions & services, via paid invoices
  select
    i.user_id,
    i.id                       as source_id,
    'invoice'::text            as source,
    coalesce(c.kind, 'Service')as line,
    i.client_name              as counterparty,
    i.client_email             as counterparty_email,
    null::text                 as country,
    coalesce(i.paid_on, i.issue_date) as occurred_on,
    i.currency,
    t.total                    as amount
  from public.invoices i
  join public.invoice_totals t on t.id = i.id
  left join public.commissions c on c.id = i.commission_id
  where i.status = 'Paid'

  union all

  -- live: ticket orders
  select
    o.user_id,
    o.id, 'ticket', 'Live',
    coalesce(o.buyer_name, 'Box office'),
    o.buyer_email,
    g.country,
    o.created_at::date,
    o.currency,
    (o.quantity * o.unit_price)
  from public.ticket_orders o
  join public.gigs g on g.id = o.gig_id
  where o.status = 'paid'

  union all

  -- affiliate: referred revenue net of commission
  select
    r.user_id,
    r.id, 'referral', 'Affiliate',
    a.partner_name,
    a.partner_email,
    null,
    r.occurred_on,
    a.currency,
    round(r.revenue * (1 - a.commission_rate), 2)
  from public.referrals r
  join public.affiliates a on a.id = r.affiliate_id;

-- ── Customers ───────────────────────────────────────────────
create or replace view public.customers as
select
  user_id,
  counterparty                     as name,
  counterparty_email               as email,
  max(country)                     as country,
  min(occurred_on)                 as first_purchase,
  max(occurred_on)                 as last_purchase,
  count(*)                         as orders,
  sum(amount)                      as lifetime_value,
  round(avg(amount), 2)            as avg_order_value
from public.revenue_ledger
where counterparty is not null
group by user_id, counterparty, counterparty_email;

-- ── Revenue by month ────────────────────────────────────────
create or replace view public.revenue_by_month as
select
  user_id,
  date_trunc('month', occurred_on)::date as month,
  line,
  currency,
  count(*)   as transactions,
  sum(amount) as revenue
from public.revenue_ledger
group by user_id, date_trunc('month', occurred_on), line, currency;

-- ── Revenue by line, with concentration ─────────────────────
create or replace view public.revenue_by_line as
with totals as (
  select user_id, sum(amount) as all_revenue
  from public.revenue_ledger group by user_id
)
select
  r.user_id,
  r.line,
  r.currency,
  sum(r.amount) as revenue,
  round(sum(r.amount) / nullif(t.all_revenue, 0), 4) as share_of_total
from public.revenue_ledger r
join totals t on t.user_id = r.user_id
group by r.user_id, r.line, r.currency, t.all_revenue;

-- ── Catalog performance ─────────────────────────────────────
-- Joins releases to their stored hit score so predicted vs actual is one query.
create or replace view public.catalog_performance as
select
  rel.user_id,
  rel.id            as release_id,
  rel.title,
  rel.artist,
  rel.release_date,
  rel.status,
  rel.content_id,
  (current_date - rel.release_date)              as age_days,
  case when rel.release_date < current_date - 90
       then true else false end                   as is_catalog,
  hs.score          as hit_score,
  hs.band           as hit_band,
  hs.actual_d28_streams
from public.releases rel
left join lateral (
  select score, band, actual_d28_streams
  from public.hit_scores h
  where h.release_id = rel.id
  order by h.created_at desc
  limit 1
) hs on true;

-- ── Live economics roll-up ──────────────────────────────────
create or replace view public.live_summary as
select
  user_id,
  count(*)                                     as gigs,
  count(*) filter (where status = 'Played')    as played,
  sum(tickets_sold)                            as tickets_sold,
  sum(gross_to_artist)                         as gross,
  sum(net)                                     as net,
  round(avg(sell_through), 4)                  as avg_sell_through,
  count(*) filter (where net < 0)              as loss_making
from public.gig_economics
group by user_id;

-- ── Cashflow health ─────────────────────────────────────────
create or replace view public.cashflow_health as
select
  user_id,
  count(*) filter (where status in ('Sent','Partial'))                        as open_invoices,
  count(*) filter (where status <> 'Paid' and due_date < current_date)        as overdue_invoices,
  sum(total) filter (where status <> 'Paid')                                  as outstanding,
  percentile_cont(0.5) within group (order by days_to_pay)
    filter (where days_to_pay is not null)                                    as median_days_to_pay
from public.invoice_totals
group by user_id;
