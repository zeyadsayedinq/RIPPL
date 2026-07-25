-- ═══════════════════════════════════════════════════════════
-- RIPPL — Manual TikTok video-count entry (Soundcharts fallback)
--
-- Real-world discovery: Soundcharts can only match SONGS it has in its own
-- catalog (officially distributed releases with label/ISRC metadata) — it
-- cannot resolve a TikTok "original sound" link (the auto-created sound
-- page that appears when someone just uploads a video, not an official
-- release). On top of that, the specific /song/{uuid}/audience/tiktok
-- endpoint is restricted on Soundcharts' free/trial tier per their own
-- docs. Both are real data-source limits, not bugs in RIPPL — but they mean
-- the TikTok sound scanner would show "not connected" forever for anyone
-- without a paid Soundcharts plan and an officially distributed track.
--
-- This adds a manual fallback: log today's TikTok video count by hand (you
-- can see it yourself on the TikTok sound page), same growth-chart output,
-- clearly labeled as manually entered rather than pulled from an API.
-- ═══════════════════════════════════════════════════════════

alter table public.tracked_sounds
  add column if not exists tracking_mode text not null default 'api'
  check (tracking_mode in ('api', 'manual'));

alter table public.sound_snapshots
  add column if not exists source text not null default 'api'
  check (source in ('api', 'manual'));

comment on column public.tracked_sounds.tracking_mode is
  'api = resolved via Soundcharts (has a soundcharts_uuid); manual = user-entered counts only, skipped by the daily cron sweep.';
comment on column public.sound_snapshots.source is
  'api = fetched from Soundcharts; manual = typed in by the user from the TikTok app.';
