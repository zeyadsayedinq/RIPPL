-- ═══════════════════════════════════════════════════════════
-- RIPPL — E-signature tracking (Vault)
--
-- Real e-signature requests via Dropbox Sign (developers.hellosign.com) —
-- confirmed against their live API docs (2026-07-24): POST
-- /v3/signature_request/send (HTTP Basic auth, API key as username, empty
-- password), and webhook events verified via event_hash = HMAC-SHA256(
-- event_time + event_type, keyed by the API key). See src/lib/esignature.ts
-- and api/webhooks/dropbox-sign.ts.
--
-- Contracts themselves live in the app_state JSONB blob (key
-- "rippl.os.v2", field `contracts` — see os-store.tsx), NOT a normal table,
-- so this is a small side table purely for looking up "which account +
-- which contract does this Dropbox Sign request belong to" when a webhook
-- event arrives — same "side table next to a JSONB blob" shape as
-- weekly_digests / campaign_shares in 0003_soundcharts_digest_shares.sql.
-- The webhook handler patches the actual Contract record inside the JSONB
-- blob directly; this table is the lookup index + a simple audit trail.
--
-- Run in the Supabase SQL editor, or `supabase db push`.
-- ═══════════════════════════════════════════════════════════

create table if not exists public.signature_requests (
  request_id text primary key,       -- Dropbox Sign signature_request_id
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  contract_id text not null,         -- Contract.id inside the JSONB blob (not a FK — contracts aren't a table)
  contract_name text,
  signer_name text,
  signer_email text,
  status text not null default 'sent', -- sent | signed | declined
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_signature_requests_user on public.signature_requests (user_id);

alter table public.signature_requests enable row level security;
drop policy if exists signature_requests_owner on public.signature_requests;
create policy signature_requests_owner on public.signature_requests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- Writes from sendForSignature() and the webhook both use the service-role
-- key (bypasses RLS by design, same as every other cron/webhook in this
-- app) — this policy just protects direct client reads to owner-only.
