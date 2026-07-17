# RIPPL — "My Universe" OS

**RIPPL** is Zeyad Sayedin's personal operating system — one dashboard that unifies A&R / artist management, music distribution, 360° marketing, legal/contracts, creative studio, an audio lab with a DJ mixer, and AI/SaaS project ops. It's more than a dashboard; it's the command center for everything he builds.

- **Live:** `rippl-mu.vercel.app`
- **Repo:** `github.com/zeyadsayedinq/RIPPL`
- **Owner / HQ:** `zeyadsayedinq@gmail.com`

---

## 1. Tech Stack

| Layer | Choice |
|---|---|
| Framework | **TanStack Start** (Vite + React 19), file-based routing |
| Styling | **Tailwind CSS v4**, custom glass/mono theme (JetBrains Mono app-wide) |
| Animation | **framer-motion** |
| Icons | **lucide-react** |
| Charts | **recharts** |
| Spreadsheets | **xlsx** (SheetJS) — in-app XLSX/CSV viewer |
| PDFs | **jspdf** — press kits & release one-pagers |
| Audio | **Web Audio API** — DJ mixer, EQ, recorder, waveform |
| Backend | **Supabase** (Postgres + Auth + Storage + RLS) |
| Persistence | Supabase `app_state` (JSONB sync) + localStorage fallback |
| Hosting | **Vercel** |

**Design language:** pure-black minimal, monospace/"typewriter" font everywhere, flowing gradient-border glow on every card (hover), subtle mesh glow.

---

## 2. Folder & File Structure

```
latifa-dashboard-claude/
├── supabase/
│   └── migrations/
│       └── 0001_init.sql        # Full schema: tables, enums, RLS, app_state, storage policy, buckets
├── public/
│   └── icon.svg                 # RIPPL logo (favicon)
├── src/
│   ├── routes/                  # File-based routes (each = a page/tab)
│   │   ├── __root.tsx           # Root: providers, AppGate, error boundary, public-route bypass
│   │   ├── index.tsx            # "/"  — Landing (My Universe: video hero, glow cards, footer)
│   │   ├── home.tsx             # "/home" — Command Center (metrics, calendar, to-dos)
│   │   ├── roster.tsx           # "/roster" — A&R CRM (scouting Kanban, roster, deal sorter)
│   │   ├── releases.tsx         # "/releases" — Distribution (Release Wizard, catalog, one-pager PDF)
│   │   ├── audio.tsx            # "/audio" — Audio Lab (library, upload, DJ/Mixer, share)
│   │   ├── vault.tsx            # "/vault" — Contracts DMS (upload, tags, expiry, PDF/XLSX viewer)
│   │   ├── studio.tsx           # "/studio" — Creative (scratchpad, moodboard, campaign tracker)
│   │   ├── techlab.tsx          # "/techlab" — AI/SaaS (sprint boards, prompt library, enhancer)
│   │   ├── admin.tsx            # "/admin" — HQ panel (members, roles, assignments) [HQ only]
│   │   ├── settings.tsx         # "/settings" — role/permissions, backend diagnostics, reset
│   │   ├── s.tsx                # "/s" — PUBLIC view-only shared song page (bypasses auth)
│   │   ├── dashboard.tsx        # "/dashboard" — 360 Marketing overview (tabs)
│   │   ├── campaigns.tsx        # "/campaigns" — campaign portfolio
│   │   ├── calendar.tsx         # "/calendar" — release timeline (template-driven)
│   │   ├── channels.tsx         # "/channels" — 360 channel plan (social/paid/PR/radio)
│   │   ├── tasks.tsx            # "/tasks" — release checklist (template-driven)
│   │   ├── budget.tsx           # "/budget" — budget / expense / payment entry
│   │   ├── templates.tsx        # "/templates" — editable campaign templates
│   │   ├── creators.tsx         # "/creators" — influencer roster + campaign list builder
│   │   └── assets.tsx           # "/assets" — per-campaign asset uploads + approval
│   │
│   ├── components/
│   │   ├── AppGate.tsx          # Chooses gate: Supabase Auth (configured) vs password
│   │   ├── SupabaseAuthGate.tsx # Real email/password login (accounts)
│   │   ├── PasswordGate.tsx     # Local master-password fallback ("FUKmusic")
│   │   ├── AppShell.tsx         # Sidebar + main + global chrome wrapper
│   │   ├── Sidebar.tsx          # Grouped collapsible nav + campaign/role switchers
│   │   ├── NotificationsBell.tsx# Expiring contracts / releases / deals alerts
│   │   ├── SyncBadge.tsx        # Cloud sync status ("Saving/Synced/Sync error")
│   │   ├── CommandPalette.tsx   # ⌘K search + quick-create
│   │   ├── QuickActionFAB.tsx   # Bottom-right radial quick-add (note/contract/deal/lead)
│   │   ├── AudioPlayer.tsx      # Persistent bottom player (waveform, scrubber, feedback)
│   │   ├── DjMixer.tsx          # Web Audio DJ: decks, EQ knobs, crossfader, BPM, recorder
│   │   ├── FileViewer.tsx       # Embedded PDF (iframe) + XLSX (SheetJS) viewer
│   │   ├── FeatureCard.tsx      # Glowing gradient-border card (landing modules)
│   │   ├── SpotlightCard.tsx    # Base card — spotlight + glow-border hover (used everywhere)
│   │   ├── NewCampaignModal.tsx # Campaign creation + shared ModalShell
│   │   ├── EmptyState.tsx       # Reusable empty state w/ "New campaign"
│   │   ├── MagneticButton.tsx   # Magnetic hover button
│   │   ├── Marquee / MeshGradient / Portal   # Marquee ticker, bg glow, portal overlays
│   │   └── ui/                  # shadcn/ui primitives
│   │
│   ├── lib/
│   │   ├── supabase.ts          # Supabase client (from VITE_ env vars) + isSupabaseConfigured
│   │   ├── cloud.ts             # loadState/saveState (app_state sync), Storage upload/signedUrl,
│   │   │                        #   clearEverything (reset), sync pub/sub, diagnose()
│   │   ├── use-auth.ts          # useAuthEmail / useIsHQ (HQ_EMAIL gate)
│   │   ├── os-store.tsx         # Personal-OS store: artists, deals, releases, contracts, notes,
│   │   │                        #   mood, projects, prompts, tracks, todos, members + audio/palette state
│   │   ├── campaign-store.tsx   # Marketing store: campaigns, tasks, assignments, assets,
│   │   │                        #   budget lines, custom templates (+ active campaign)
│   │   ├── campaign-data.ts     # Campaign types + (reset) empty seed data
│   │   ├── campaign-templates.ts# Reusable templates extracted from real marketing-plan PDFs
│   │   ├── mock-data.ts         # Influencer roster (36 creators) + types + platform colors
│   │   ├── role-context.tsx     # Role (Marketing Manager / Team Member / Client) + canSeePrice
│   │   ├── pdf.ts               # jsPDF press-kit + release one-pager generators
│   │   ├── error-reporting.ts   # Local error logger (Lovable reporting removed)
│   │   └── utils.ts             # cn() + helpers
│   │
│   ├── styles.css               # Theme tokens, glass utilities, keyframes (spin/shake/dots),
│   │                            #   xlsx-view + footer + dj-fader styles
│   ├── router.tsx / start.ts / server.ts / routeTree.gen.ts
│
├── SUPABASE_SETUP.md            # Supabase setup steps
├── RIPPL_OVERVIEW.md            # ← this file
├── .env.example                 # VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
└── package.json / vite.config.ts / tsconfig.json
```

---

## 3. Features by Module (Sidebar)

### PERSONAL OS

**🏠 Home** — 4 metric cards (Blended ROAS, Pending Signatures, Upcoming Releases, Active AI Pipelines), interactive month calendar with event dots, Action Center to-do list with Snooze/Delegate.

**👥 Roster** — A&R CRM with 3 tabs:
- *Scouting Board* — drag-and-drop Kanban (Discovered → Evaluating → Negotiating → Signed), per-column add, click a card → full **artist editor** (edit all fields, managed toggle, Draft Pitch to clipboard, delete).
- *Active Roster* — managed-artist cards with **Generate Press Kit (PDF)**, Log Deal Split, Analytics.
- *Deal Sorter* — table with status dropdowns.

**💿 Releases** — Distribution engine:
- 4-step **Release Wizard** (Audio+Metadata → Assets → DSP checklist → Atmos/EQ QA toggles).
- **Catalog Grid** with Content-ID badge (red/yellow/green), **One-pager PDF**, Takedown.

**🎵 Audio** — Audio Lab:
- Library: upload WAV/MP3 (→ Supabase Storage), play/pause, **Share** (view-only link), delete.
- **DJ / Mixer** (Web Audio): 2 decks, spinning platters, 3-band EQ knobs (drag), volume, tempo, cue, **tap-tempo BPM**, **equal-power crossfader**, **Record mix** → download / save to library.
- Persistent bottom **player** with live waveform, scrubber, and timestamped "Feedback" notes.

**🗂️ The Vault** — Contracts DMS: drag-drop upload (→ Storage), **search**, tag dropdowns, **expiration engine** (alerts ≤30 days), embedded **View** (PDF inline, XLSX as spreadsheet), Download, delete.

**🎨 Studio** — Creative: **Scratchpad** (notes with /h1 /bullet /image), **Moodboard** (paste image URLs), **TikTok/Meta tracker** with Copy Creator Brief.

**🤖 Tech Lab** — AI/SaaS: sprint **Kanban boards** with Vercel deploy-status badge, **Prompt Library** accordion (Copy Prompt), **Prompt Enhancer** (no-API keyword builder + Surprise me + save).

### MARKETING

**Overview** (360 dashboard, tabbed: Paid/Organic/Funnel/Budget), **Campaigns**, **Calendar**, **Channels**, **Tasks**, **Budget** (add budget/expense/payment), **Templates** (editable, PDF-derived), **Creators** (influencer roster + per-campaign **list builder**), **Assets** (per-campaign uploads + approval pipeline).

### ADMIN / SYSTEM

**🛡️ Admin** *(HQ only)* — add team **members**, set **roles**, and **assign** campaigns / releases / audio / contracts to each person.

**⚙️ Settings** — interactive **role/permissions matrix**, **Backend diagnostics** (Run diagnostics: env / signed-in / DB write test), Sign out, **Reset everything** (local + cloud).

---

## 4. Global Chrome (on every app page)

- **⌘K / Ctrl+K Command Palette** — search artists/deals/releases/campaigns/notes + **quick-create**.
- **Persistent Audio Player** (bottom) — plays library tracks, waveform, feedback notes.
- **Quick-Action FAB** (bottom-right) — New Note, Upload Contract, Log Brand Deal, Add Scouting Lead.
- **Notifications Bell** (top-right) — expiring contracts, scheduled releases, deals awaiting signature.
- **Sync Badge** (bottom-left) — live cloud-sync status.

---

## 5. Data, Persistence & Auth

- **Auth gate:** Supabase email/password accounts when configured; falls back to a local master-password gate (`FUKmusic`) with no backend so you're never locked out.
- **HQ:** `zeyadsayedinq@gmail.com` sees the Admin panel and manages members/assignments.
- **Persistence:** every store writes to the Supabase `app_state` table (JSONB, per-user, RLS-protected) and syncs across devices; localStorage is an offline cache/fallback.
- **Files:** contracts + audio upload to Supabase **Storage** (`contracts` / `audio` / `art` buckets), served via signed URLs.
- **Public share:** `/s#…` renders a view-only song player (waveform + timeline) outside the auth gate.

---

## 6. Setup (to enable cloud)

1. Create a Supabase project; run `supabase/migrations/0001_init.sql` in the SQL editor (idempotent).
2. Create Storage buckets `contracts`, `audio`, `art` (Private) — or run the `insert into storage.buckets…` snippet.
3. Add `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` to `.env` **and** Vercel env vars → redeploy (VITE vars are build-time).
4. Verify in **Settings → Run diagnostics** (all three green = syncing).

Full steps in `SUPABASE_SETUP.md`.

---

## 7. Routes Reference

`/` landing · `/home` · `/roster` · `/releases` · `/audio` · `/vault` · `/studio` · `/techlab` · `/admin` (HQ) · `/settings` · `/dashboard` · `/campaigns` · `/calendar` · `/channels` · `/tasks` · `/budget` · `/templates` · `/creators` · `/assets` · `/s` (public share).

---

*© 2026 RIPPL — Built by Zeyad Sayedin. This is my universe.*
