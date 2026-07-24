-- ═══════════════════════════════════════════════════════════
-- RIPPL — YouTube Video Intel (vidIQ/TubeBuddy-style SEO panel)
--
-- Adds two tables:
--   • tracked_videos   — one row per video ever run through the analyzer
--                        (tags, SEO score + recommendations — all computed
--                        locally from the YouTube Data API, no AI/LLM call
--                        of any kind).
--   • video_snapshots  — one row per video per day (view/like/comment
--                        counts at that point in time). YouTube's public
--                        Data API has no historical view-count endpoint for
--                        third-party videos, so this is how RIPPL builds its
--                        own velocity curve: snapshot on analyze, and again
--                        daily via the cron in api/cron/youtube-snapshot.ts.
--
-- Run in the Supabase SQL editor, or `supabase db push`.
-- ═══════════════════════════════════════════════════════════

create table if not exists public.tracked_videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  campaign_id uuid references public.campaigns(id) on delete set null,
  youtube_video_id text not null,
  title text,
  channel_title text,
  tags text[] default '{}',
  seo_score int,
  seo_score_is_heuristic boolean not null default true, -- always true: SEO score is a local formula, never an AI call
  seo_recommendations jsonb not null default '[]',
  last_analyzed_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id, youtube_video_id)
);

create table if not exists public.video_snapshots (
  id uuid primary key default gen_random_uuid(),
  video_id uuid not null references public.tracked_videos(id) on delete cascade,
  view_count bigint not null default 0,
  like_count bigint, -- null when the uploader hides the like count
  comment_count bigint not null default 0,
  recorded_at timestamptz not null default now()
);

-- `timestamptz::date` depends on the session's TimeZone setting, so Postgres
-- only considers it STABLE, not IMMUTABLE — and a unique index on an
-- expression requires IMMUTABLE (42P17: "functions in index expression must
-- be marked IMMUTABLE"). This tiny wrapper pins the conversion to UTC
-- explicitly, which makes the result independent of the calling session's
-- TimeZone and safe to mark IMMUTABLE. Shared by both snapshot tables (see
-- 0003_soundcharts_digest_shares.sql's sound_snapshots).
create or replace function public.utc_day(ts timestamptz)
returns date
language sql
immutable
as $$ select (ts at time zone 'UTC')::date $$;

-- One snapshot per video per calendar day (UTC) — the daily cron and an
-- on-demand (re)analyze both upsert against this, so re-running either
-- twice in the same day updates the row instead of duplicating it.
create unique index if not exists uq_video_snapshot_per_day
  on public.video_snapshots (video_id, public.utc_day(recorded_at));

create index if not exists idx_snapshots_video_date
  on public.video_snapshots (video_id, recorded_at);

-- ── RLS ──────────────────────────────────────────────────────
-- Owner-only, same pattern as every other table in 0001_init.sql. The
-- daily cron (api/cron/youtube-snapshot.ts) and the analyzer's server
-- function both use the Supabase *service role* key, which bypasses RLS
-- entirely by design — they set/verify user_id explicitly in application
-- code instead (see resolveUserId() in youtube-deep-analytics.ts).
alter table public.tracked_videos enable row level security;
drop policy if exists tracked_videos_owner on public.tracked_videos;
create policy tracked_videos_owner on public.tracked_videos
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

alter table public.video_snapshots enable row level security;
drop policy if exists video_snapshots_owner on public.video_snapshots;
create policy video_snapshots_owner on public.video_snapshots
  for all using (
    exists (select 1 from public.tracked_videos tv where tv.id = video_id and tv.user_id = auth.uid())
  ) with check (
    exists (select 1 from public.tracked_videos tv where tv.id = video_id and tv.user_id = auth.uid())
  );
