-- ═══════════════════════════════════════════════════════════
-- RIPPL — Growth Modules
--
-- Adds six revenue/ops surfaces that RIPPL didn't have, each derived from a
-- reference repo (see docs/RIPPL_UPGRADE_PLAN.md):
--
--   live / gigs / tickets   ← lucpod/ticketless          (gig + ticket sales)
--   invoices + commissions  ← wpwwhimself/muzyka-…       (commission CRM, invoicing)
--   affiliates + referrals  ← precisep/Business          (affiliate + music promo)
--   plans / credits / usage ← ha346/AI-Saas-Platform     (Stripe tiers + API limiting)
--   hit_scores              ← ebtezcan/Spotify-…         (popularity prediction)
--   analytics views         ← dphelan61 + Divleen-0619   (music-store business metrics)
--
-- Idempotent. Run in the Supabase SQL editor after 0001–0005.
-- Every row is owned by auth.uid() and protected by RLS, same as 0001.
-- ═══════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- ─────────────────────────────────────────────── LIVE & TICKETING
do $$ begin create type gig_status as enum ('Enquiry','Held','Confirmed','Announced','On Sale','Played','Settled','Cancelled'); exception when duplicate_object then null; end $$;

create table if not exists public.gigs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  artist text not null,
  venue text not null,
  city text,
  country text,
  gig_date timestamptz,
  status gig_status not null default 'Enquiry',
  capacity int,
  currency text not null default 'EGP',
  ticket_price numeric(12,2) not null default 0,
  guarantee numeric(12,2) not null default 0,
  door_split numeric(5,4) not null default 0,      -- 0.70 = 70% of net door
  costs numeric(12,2) not null default 0,          -- travel + crew + backline
  tickets_sold int not null default 0,
  advance_complete boolean not null default false,
  notes text,
  created_at timestamptz not null default now()
);

-- Break-even ticket count, computed not stored — see
-- knowledge/finance/UNIT_ECONOMICS.md
create or replace view public.gig_economics as
select
  g.*,
  (g.tickets_sold * g.ticket_price * g.door_split) + g.guarantee            as gross_to_artist,
  (g.tickets_sold * g.ticket_price * g.door_split) + g.guarantee - g.costs  as net,
  case
    when g.ticket_price * g.door_split > 0
    then ceil(greatest(g.costs - g.guarantee, 0) / (g.ticket_price * g.door_split))
    else null
  end                                                                       as breakeven_tickets,
  case when g.capacity > 0 then round(g.tickets_sold::numeric / g.capacity, 4) end as sell_through
from public.gigs g;

create table if not exists public.ticket_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  gig_id uuid not null references public.gigs(id) on delete cascade,
  buyer_name text,
  buyer_email text,
  quantity int not null default 1,
  tier text not null default 'General',
  unit_price numeric(12,2) not null default 0,
  currency text not null default 'EGP',
  status text not null default 'paid',          -- pending | paid | refunded
  reference text,                                -- payment provider reference
  created_at timestamptz not null default now()
);
create index if not exists ticket_orders_gig_idx on public.ticket_orders(gig_id);

-- ─────────────────────────────────────────────── COMMISSIONS & INVOICING
do $$ begin create type commission_phase as enum ('Inquiry','Quoted','Deposit Paid','In Progress','Review','Revisions','Delivered','Invoiced','Paid','Cancelled'); exception when duplicate_object then null; end $$;

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  client_name text not null,
  client_email text,
  title text not null,
  kind text not null default 'Custom',           -- Custom | Mix | Master | Sheet | Sync
  phase commission_phase not null default 'Inquiry',
  currency text not null default 'EGP',
  quote_amount numeric(12,2) not null default 0,
  deposit_amount numeric(12,2) not null default 0,
  deposit_paid boolean not null default false,
  revisions_included int not null default 2,
  revisions_used int not null default 0,
  quote_expires_on date,
  due_date date,
  delivered_on date,
  share_token text unique,                       -- client-facing phase view
  notes text,
  created_at timestamptz not null default now()
);

do $$ begin create type invoice_status as enum ('Draft','Sent','Partial','Paid','Overdue','Void'); exception when duplicate_object then null; end $$;

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  commission_id uuid references public.commissions(id) on delete set null,
  gig_id uuid references public.gigs(id) on delete set null,
  number text not null,                          -- INV-0001
  client_name text not null,
  client_email text,
  issue_date date not null default current_date,
  due_date date,
  currency text not null default 'EGP',
  tax_rate numeric(5,4) not null default 0,
  status invoice_status not null default 'Draft',
  paid_on date,
  notes text,
  created_at timestamptz not null default now()
);
create unique index if not exists invoices_user_number_idx on public.invoices(user_id, number);

create table if not exists public.invoice_lines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  description text not null,
  quantity numeric(12,2) not null default 1,
  unit_price numeric(12,2) not null default 0,
  sort int not null default 0
);
create index if not exists invoice_lines_invoice_idx on public.invoice_lines(invoice_id);

create or replace view public.invoice_totals as
select
  i.id, i.user_id, i.number, i.client_name, i.client_email,
  i.issue_date, i.due_date, i.currency, i.status, i.paid_on,
  coalesce(sum(l.quantity * l.unit_price), 0)                        as subtotal,
  round(coalesce(sum(l.quantity * l.unit_price), 0) * i.tax_rate, 2) as tax,
  round(coalesce(sum(l.quantity * l.unit_price), 0) * (1 + i.tax_rate), 2) as total,
  case when i.paid_on is not null then i.paid_on - i.issue_date end  as days_to_pay
from public.invoices i
left join public.invoice_lines l on l.invoice_id = i.id
group by i.id;

-- ─────────────────────────────────────────────── AFFILIATES & REFERRALS
create table if not exists public.affiliates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  partner_name text not null,
  partner_email text,
  code text not null,                            -- RIPPL-ONE
  channel text,                                  -- Newsletter | IG | Blog | Discord
  commission_rate numeric(5,4) not null default 0.20,
  currency text not null default 'USD',
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create unique index if not exists affiliates_user_code_idx on public.affiliates(user_id, lower(code));

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  affiliate_id uuid not null references public.affiliates(id) on delete cascade,
  occurred_on date not null default current_date,
  clicks int not null default 0,
  signups int not null default 0,
  conversions int not null default 0,
  revenue numeric(12,2) not null default 0,
  payout_status text not null default 'pending', -- pending | approved | paid
  paid_on date,
  notes text
);
create index if not exists referrals_affiliate_idx on public.referrals(affiliate_id);

create or replace view public.affiliate_performance as
select
  a.id, a.user_id, a.partner_name, a.code, a.channel,
  a.commission_rate, a.currency, a.active,
  coalesce(sum(r.clicks), 0)       as clicks,
  coalesce(sum(r.signups), 0)      as signups,
  coalesce(sum(r.conversions), 0)  as conversions,
  coalesce(sum(r.revenue), 0)      as referred_revenue,
  round(coalesce(sum(r.revenue), 0) * a.commission_rate, 2) as commission_owed,
  case when coalesce(sum(r.clicks), 0) > 0
       then round(coalesce(sum(r.conversions), 0)::numeric / sum(r.clicks), 4) end as conversion_rate
from public.affiliates a
left join public.referrals r on r.affiliate_id = a.id
group by a.id;

-- ─────────────────────────────────────────────── PLANS, CREDITS, USAGE
-- Free tier with hard API limits + paid tiers, modelled on
-- ha346/AI-Saas-Platform (Stripe subscription + free-tier API limiting).
create table if not exists public.plans (
  id text primary key,                           -- free | studio | label
  name text not null,
  price_month numeric(12,2) not null default 0,
  currency text not null default 'USD',
  monthly_credits int not null default 0,        -- 0 = unlimited
  seats int not null default 1,
  features jsonb not null default '[]'::jsonb,
  stripe_price_id text
);

insert into public.plans (id, name, price_month, currency, monthly_credits, seats, features) values
  ('free',   'Free',   0,  'USD',  25, 1, '["Personal OS","1 campaign","25 AI credits/mo"]'),
  ('studio', 'Studio', 29, 'USD', 500, 3, '["Everything in Free","Unlimited campaigns","Hit Lab","Invoicing","500 AI credits/mo"]'),
  ('label',  'Label',  99, 'USD',   0, 10,'["Everything in Studio","Ticketing","Affiliates","Team roles","Unlimited AI credits"]')
on conflict (id) do nothing;

create table if not exists public.subscriptions (
  user_id uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  plan_id text not null default 'free' references public.plans(id),
  status text not null default 'active',         -- active | past_due | canceled
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  feature text not null,                         -- hit_score | prompt_enhance | ugc_batch | pdf
  credits int not null default 1,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
-- NOTE: indexed on the raw timestamp, not date_trunc('month', …).
-- date_trunc(text, timestamptz) is STABLE (it depends on the session TimeZone),
-- and Postgres rejects non-IMMUTABLE functions in index expressions (42P17).
-- A plain descending timestamp index serves the "credits used this month"
-- range scan in usage_this_month just as well.
create index if not exists usage_events_user_created_idx
  on public.usage_events(user_id, created_at desc);

create or replace view public.usage_this_month as
select
  s.user_id,
  s.plan_id,
  p.monthly_credits,
  coalesce(sum(u.credits), 0) as credits_used,
  case when p.monthly_credits = 0 then null
       else greatest(p.monthly_credits - coalesce(sum(u.credits), 0), 0) end as credits_left
from public.subscriptions s
join public.plans p on p.id = s.plan_id
left join public.usage_events u
  on u.user_id = s.user_id
 and u.created_at >= date_trunc('month', now())
group by s.user_id, s.plan_id, p.monthly_credits;

-- ─────────────────────────────────────────────── HIT SCORES
-- Audit trail for /hitlab. Store the score AND the features so you can later
-- correlate predictions against real D28 outcomes — see
-- knowledge/research/HIT_PREDICTION_METHOD.md
create table if not exists public.hit_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  track_id uuid references public.tracks(id) on delete set null,
  release_id uuid references public.releases(id) on delete set null,
  title text not null,
  artist text,
  genre text,
  danceability numeric(4,3),
  energy numeric(4,3),
  valence numeric(4,3),
  acousticness numeric(4,3),
  instrumentalness numeric(4,3),
  speechiness numeric(4,3),
  liveness numeric(4,3),
  loudness numeric(6,2),
  tempo numeric(6,2),
  duration_ms int,
  score numeric(5,2) not null,                   -- 0–100
  band text not null,                            -- Low | Moderate | Strong
  model_version text not null default 'heuristic-v1',
  -- filled in later, once the release has actually happened:
  actual_d28_streams bigint,
  actual_recorded_on date,
  created_at timestamptz not null default now()
);
create index if not exists hit_scores_user_idx on public.hit_scores(user_id, created_at desc);

-- ─────────────────────────────────────────────── RLS
do $$
declare t text;
begin
  foreach t in array array[
    'gigs','ticket_orders','commissions','invoices','invoice_lines',
    'affiliates','referrals','subscriptions','usage_events','hit_scores'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %1$s_owner on public.%1$s;', t);
    execute format(
      'create policy %1$s_owner on public.%1$s for all using (auth.uid() = user_id) with check (auth.uid() = user_id);',
      t
    );
  end loop;
end $$;

-- plans is a public read-only catalogue
alter table public.plans enable row level security;
drop policy if exists plans_read on public.plans;
create policy plans_read on public.plans for select using (true);

-- Every new account starts on the free plan.
create or replace function public.ensure_subscription()
returns trigger language plpgsql security definer as $$
begin
  insert into public.subscriptions (user_id, plan_id)
  values (new.id, 'free')
  on conflict (user_id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created_subscription on auth.users;
create trigger on_auth_user_created_subscription
  after insert on auth.users
  for each row execute function public.ensure_subscription();
