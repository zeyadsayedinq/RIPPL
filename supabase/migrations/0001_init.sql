-- ═══════════════════════════════════════════════════════════
-- RIPPL OS — initial schema (Supabase / PostgreSQL)
-- Single-user personal OS: every row is owned by auth.uid().
-- Run in the Supabase SQL editor, or `supabase db push`.
-- ═══════════════════════════════════════════════════════════

-- Extensions
create extension if not exists "pgcrypto";

-- ── Profiles (mirrors auth.users) ───────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now()
);

-- ── Artists (roster + scouting) ─────────────────────────────
do $$ begin create type artist_kind as enum ('Music','Influencer'); exception when duplicate_object then null; end $$;
do $$ begin create type scout_stage as enum ('Discovered','Evaluating','Negotiating','Signed'); exception when duplicate_object then null; end $$;

create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  kind artist_kind not null default 'Music',
  handle text,
  streams text,
  followers text,
  stage scout_stage not null default 'Discovered',
  managed boolean not null default false,
  note text,
  created_at timestamptz not null default now()
);

-- ── Tracks ──────────────────────────────────────────────────
create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  artist_id uuid references public.artists(id) on delete set null,
  title text not null,
  audio_path text,            -- Supabase Storage path (bucket: audio)
  isrc text,
  duration_seconds int,
  created_at timestamptz not null default now()
);

-- ── Releases (distribution) ─────────────────────────────────
create type content_id as enum ('red','yellow','green');
create type release_status as enum ('Draft','Scheduled','Live');

create table if not exists public.releases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  artist text,
  isrc text,
  upc text,
  release_date date,
  content_id content_id not null default 'yellow',
  status release_status not null default 'Draft',
  cover_path text,            -- Storage path (bucket: art)
  dsp jsonb not null default '{"spotify":false,"anghami":false,"youtube":false}',
  qa  jsonb not null default '{"atmos":false,"eq":false}',
  created_at timestamptz not null default now()
);

-- ── Contracts (the vault) ───────────────────────────────────
create type contract_tag as enum ('Split Sheet','Exclusive Recording','Sync License','Management','Other');

create table if not exists public.contracts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  tag contract_tag not null default 'Other',
  expires_on date,
  file_path text,             -- Storage path (bucket: contracts)
  created_at timestamptz not null default now()
);

-- ── Deals ───────────────────────────────────────────────────
create type deal_status as enum ('Pitching','Contracting','In Production','Live','Paid');

create table if not exists public.deals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  artist_id uuid references public.artists(id) on delete set null,
  brand text not null,
  deliverables text,
  value numeric not null default 0,     -- EGP
  split int not null default 0,
  status deal_status not null default 'Pitching',
  created_at timestamptz not null default now()
);

-- ── Notes ───────────────────────────────────────────────────
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text,
  body text,
  updated_at timestamptz not null default now()
);

-- ── Campaigns (marketing side) ──────────────────────────────
create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  artist text,
  title text,
  subtitle text,
  status text default 'Planning',
  budget numeric default 0,
  spent numeric default 0,
  start_date text,
  end_date text,
  platforms text[] default '{}',
  goal text,
  template_id text,
  created_at timestamptz not null default now()
);

-- ── SaaS projects + sprint tasks (tech lab) ─────────────────
create table if not exists public.saas_projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null,
  deploy text not null default 'Building',
  created_at timestamptz not null default now()
);
create table if not exists public.sprint_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  project_id uuid references public.saas_projects(id) on delete cascade,
  title text not null,
  col text not null default 'Backlog',
  created_at timestamptz not null default now()
);

-- ── Prompts (prompt library) ────────────────────────────────
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null,
  category text,
  body text,
  created_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════
-- Row Level Security — owner-only access on every table.
-- ═══════════════════════════════════════════════════════════
-- Owner policies for tables that have a user_id column (profiles handled separately below).
do $$
declare t text;
begin
  foreach t in array array[
    'artists','tracks','releases','contracts','deals',
    'notes','campaigns','saas_projects','sprint_tasks','prompts'
  ] loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists %1$s_owner on public.%1$s;', t);
    execute format(
      'create policy %1$s_owner on public.%1$s for all using (auth.uid() = user_id) with check (auth.uid() = user_id);',
      t
    );
  end loop;
end $$;

-- profiles keys on id (it mirrors auth.users), not user_id.
alter table public.profiles enable row level security;
drop policy if exists profiles_owner on public.profiles;
create policy profiles_owner on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

-- Auto-create a profile row on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', new.email));
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ═══════════════════════════════════════════════════════════
-- Storage buckets (create in Dashboard → Storage, or via API):
--   audio      (private)  — WAV/MP3 masters & demos
--   art        (private)  — cover art / canvas
--   contracts  (private)  — signed PDFs
-- Suggested storage policy per bucket (owner-only):
--   using ( bucket_id = 'audio' and (storage.foldername(name))[1] = auth.uid()::text )
-- ═══════════════════════════════════════════════════════════
