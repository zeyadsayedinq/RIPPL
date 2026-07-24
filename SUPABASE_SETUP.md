# RIPPL — Supabase Setup

The app runs on localStorage by default and keeps working with **no** backend.
Follow these steps to switch it to a real cloud backend (data syncs across
devices, real file storage, server-side auth).

## 1. Create a project
1. Go to https://supabase.com → **New project** (free tier is fine).
2. Wait for it to provision.

## 2. Run the schema
1. Open **SQL Editor** in the Supabase dashboard.
2. Paste the contents of `supabase/migrations/0001_init.sql` and **Run**.
   - Creates all tables (artists, tracks, releases, contracts, deals, notes,
     campaigns, saas_projects, sprint_tasks, prompts), enums, Row-Level
     Security (owner-only), and a signup trigger that creates a profile row.
3. Run `supabase/migrations/0002_youtube_deep_analytics.sql` — `tracked_videos`
   / `video_snapshots`, behind the YouTube Video Intel panel + daily cron.
4. Run `supabase/migrations/0003_soundcharts_digest_shares.sql` —
   `tracked_sounds` / `sound_snapshots` (same idea, for the TikTok sound
   scanner's growth chart), `weekly_digests` (the Monday brief-PDF digest —
   see api/cron/weekly-digest.ts), and `campaign_shares` (read-only
   client-facing links, `/c/$token`).

## 3. Create storage buckets
Dashboard → **Storage** → New bucket (set to **Private**):
- `audio` — WAV/MP3 masters & demos
- `art` — cover art / canvas
- `contracts` — signed PDFs
- `reports` — auto-generated campaign brief PDFs (Monday digest cron)

## 4. Add your keys
1. Dashboard → **Project Settings → API**. Copy the **Project URL** and the
   **anon public** key.
2. In the project root, copy `.env.example` to `.env` and fill them in:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-PUBLIC-KEY
   ```
3. On Vercel: **Project → Settings → Environment Variables**, add the same two.

## 5. Install & run
```bash
npm install          # @supabase/supabase-js is already in package.json
npm run dev
```
Open **Settings** — the Backend card should read **"Supabase connected."**

## Trade-offs / notes
- The password gate (`FUKmusic`) is still client-side. For true server-side
  protection, replace it with Supabase Auth (email magic-link or a single
  service account) — the schema + RLS are already in place for that.
- Keys prefixed `VITE_` are exposed to the browser (that's expected for the
  anon key — RLS is what protects your data). Never put the **service_role**
  key in a `VITE_` var.
- Data migration from localStorage → Supabase is the next step once your keys
  are live; the stores are structured to map 1:1 onto these tables.
