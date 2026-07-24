-- ═══════════════════════════════════════════════════════════
-- RIPPL — Soundcharts snapshots, weekly digest, client share links
--
-- Three independent additions, bundled in one migration:
--   • tracked_sounds / sound_snapshots — same idea as
--     0002_youtube_deep_analytics.sql's tracked_videos/video_snapshots,
--     but for the TikTok "sound scanner" (Soundcharts video-count).
--     Soundcharts has no historical endpoint either, so RIPPL builds its
--     own curve: snapshot whenever the sound panel is fetched, and again
--     daily via api/cron/soundcharts-snapshot.ts.
--   • weekly_digests — one row per campaign brief the Monday digest cron
--     (api/cron/weekly-digest.ts) generates. The PDF itself lives in
--     Storage (bucket: reports); this row is what NotificationsBell reads
--     to surface "this week's brief is ready" in-app.
--   • campaign_shares — read-only, no-login client links (/c/$token).
--     A random token maps to one campaign; the public route resolves it
--     server-side with the service-role key (RLS below still protects the
--     row itself — the public read path never queries this table with the
--     anon key, only the service role after validating the token format).
--
-- Run in the Supabase SQL editor, or `supabase db push`.
-- ═══════════════════════════════════════════════════════════

-- ── Soundcharts (TikTok sound) tracking ─────────────────────
create table if not exists public.tracked_sounds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  -- campaigns here are marketing-side, tracked separately from the
  -- localStorage/app_state Campaign records (see campaign-data.ts) — this
  -- column is best-effort and may stay null; the unique row is really keyed
  -- on (user_id, tiktok_sound_url).
  tiktok_sound_url text not null,
  soundcharts_uuid text,
  last_video_count int,
  last_fetched_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, tiktok_sound_url)
);

create table if not exists public.sound_snapshots (
  id uuid primary key default gen_random_uuid(),
  sound_id uuid not null references public.tracked_sounds(id) on delete cascade,
  video_count bigint not null default 0,
  recorded_at timestamptz not null default now()
);

-- Same IMMUTABLE-wrapper reasoning as uq_video_snapshot_per_day in
-- 0002_youtube_deep_analytics.sql — public.utc_day() is defined there.
create unique index if not exists uq_sound_snapshot_per_day
  on public.sound_snapshots (sound_id, public.utc_day(recorded_at));
create index if not exists idx_sound_snapshots_sound_date
  on public.sound_snapshots (sound_id, recorded_at);

alter table public.tracked_sounds enable row level security;
drop policy if exists tracked_sounds_owner on public.tracked_sounds;
create policy tracked_sounds_owner on public.tracked_sounds
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.sound_snapshots enable row level security;
drop policy if exists sound_snapshots_owner on public.sound_snapshots;
create policy sound_snapshots_owner on public.sound_snapshots
  for all using (
    exists (select 1 from public.tracked_sounds ts where ts.id = sound_id and ts.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.tracked_sounds ts where ts.id = sound_id and ts.user_id = auth.uid())
  );

-- ── Weekly digest log ────────────────────────────────────────
create table if not exists public.weekly_digests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  campaign_id text not null,        -- app_state Campaign.id (not a FK — campaigns live in app_state JSONB, not a table)
  campaign_title text not null,
  pdf_path text,                    -- Storage path in the `reports` bucket, null if the PDF upload failed
  creators_count int not null default 0,
  task_progress int not null default 0, -- 0-100, mirrors campaign-store's taskProgress at generation time
  generated_at timestamptz not null default now()
);
create index if not exists idx_weekly_digests_user_date
  on public.weekly_digests (user_id, generated_at desc);

alter table public.weekly_digests enable row level security;
drop policy if exists weekly_digests_owner on public.weekly_digests;
create policy weekly_digests_owner on public.weekly_digests
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Client-facing share links ───────────────────────────────
create table if not exists public.campaign_shares (
  token text primary key,           -- random url-safe id, e.g. from crypto.randomUUID()
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  campaign_id text not null,        -- app_state Campaign.id
  campaign_title text,              -- denormalized for a nicer /admin list, not authoritative
  revoked boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_campaign_shares_user on public.campaign_shares (user_id);

alter table public.campaign_shares enable row level security;
drop policy if exists campaign_shares_owner on public.campaign_shares;
create policy campaign_shares_owner on public.campaign_shares
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
-- No public/anon policy: the /c/$token page never queries this table
-- directly from the browser. getSharedCampaign() (src/lib/campaign-share.ts)
-- reads it server-side with the service-role key, same pattern as
-- shared-workspace.ts — RLS here just protects direct table access.

-- ── Storage: add a `reports` bucket to the existing shared policy ───
-- Create the bucket itself in Dashboard → Storage (Private) — SQL can't
-- create buckets portably across Supabase project configs, same as
-- audio/art/contracts in 0001_init.sql. Once created, this re-issues the
-- single-user storage policy to also cover it.
drop policy if exists "rippl storage all" on storage.objects;
create policy "rippl storage all" on storage.objects
  for all to authenticated
  using ( bucket_id in ('audio','art','contracts','reports') )
  with check ( bucket_id in ('audio','art','contracts','reports') );
