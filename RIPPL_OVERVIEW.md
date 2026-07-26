# RIPPL — 360° Operating System

**v1.2 · 2026**

**RIPPL** is a 360° operating system for a music operation — one dashboard that unifies A&R / artist management, music distribution, 360° marketing, legal/contracts, creative studio, an audio lab with a DJ mixer, project ops, and a full revenue stack (commissions & invoicing, live ticketing, affiliates, plans & credits) sitting on top of a written operating manual. It's more than a dashboard; it's the command center for the whole operation.

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
| Spreadsheets | **xlsx** — in-app XLSX/CSV viewer |
| PDFs | **jspdf** (client-side) — press kits, release one-pagers, invoices & commission quotes |
| Audio | **Web Audio API** — DJ mixer, EQ, recorder, waveform |
| Backend | **Supabase** (Postgres + Auth + Storage + RLS) |
| Persistence | Supabase `app_state` (JSONB sync) + localStorage fallback |
| Video (offline) | **ffmpeg** via `scripts/ugc_reel_gen.py` — batch UGC reel rendering |
| CI | **GitHub Actions** — lint · typecheck · build · secret scan |
| Hosting | **Vercel** |

**Design language:** pure-black minimal, monospace/"typewriter" font everywhere, flowing gradient-border glow on every card (hover), subtle mesh glow.

---

## 2. Folder & File Structure

```
rippl/
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
│   │   ├── techlab.tsx          # "/techlab" — Project ops (sprint boards, prompt library, builder)
│   │   ├── hitlab.tsx           # "/hitlab" — Hit Score (audio-feature scoring + calibration)
│   │   ├── invoices.tsx         # "/invoices" — Commission pipeline + invoicing (PDF quotes/invoices)
│   │   ├── live.tsx             # "/live" — Gigs & ticketing (break-even, sell-through, settlement)
│   │   ├── affiliates.tsx       # "/affiliates" — Referral partners, tracked codes, commission ledger
│   │   ├── billing.tsx          # "/billing" — Plans, credits, per-feature usage metering
│   │   ├── knowledge.tsx        # "/knowledge" — Knowledge Hub browser (search, fast-start paths)
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
│   │   ├── PasswordGate.tsx     # Local master-password fallback (dev only)
│   │   ├── AppShell.tsx         # Sidebar + main + global chrome wrapper
│   │   ├── Sidebar.tsx          # Grouped collapsible nav + campaign/role switchers
│   │   ├── NotificationsBell.tsx# Expiring contracts / releases / deals alerts
│   │   ├── SyncBadge.tsx        # Cloud sync status ("Saving/Synced/Sync error")
│   │   ├── CommandPalette.tsx   # ⌘K search + quick-create
│   │   ├── QuickActionFAB.tsx   # Bottom-right radial quick-add (note/contract/deal/lead)
│   │   ├── AudioPlayer.tsx      # Persistent bottom player (waveform, scrubber, feedback)
│   │   ├── DjMixer.tsx          # Web Audio DJ: decks, EQ knobs, crossfader, BPM, recorder
│   │   ├── FileViewer.tsx       # Embedded PDF (iframe) + XLSX viewer
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
│   │   ├── mock-data.ts         # Creator roster seed + types + platform colors
│   │   ├── role-context.tsx     # Role (Marketing Manager / Team Member / Client) + canSeePrice
│   │   ├── pdf.ts               # jsPDF press-kit + release one-pager generators
│   │   ├── hit-score.ts         # Transparent popularity heuristic + playlist-fit comparison
│   │   ├── invoice.ts           # Invoice/quote totals, numbering, overdue logic + jsPDF output
│   │   ├── plans.ts             # Plan catalogue, credit costs, quota + tier gating
│   │   ├── ugc-hooks.ts         # 60-hook library, batch picker, render command, creator briefs
│   │   ├── knowledge-index.ts   # Catalogue of the knowledge/ hub (search + module links)
│   │   ├── knowledge-prompts.ts # 12 ready-made prompts importable into the Prompt Library
│   │   ├── csv-export.ts        # Creator roster export + generic downloadCsv()
│   │   ├── error-reporting.ts   # Local error logger
│   │   └── utils.ts             # cn() + helpers
│   │
│   ├── styles.css               # Theme tokens, glass utilities, keyframes (spin/shake/dots),
│   │                            #   xlsx-view + footer + dj-fader styles
│   ├── router.tsx / start.ts / server.ts / routeTree.gen.ts
│
├── knowledge/                   # THE OPERATING MANUAL (40 files) — see §8
│   ├── README.md                #   index + fast-start paths
│   ├── foundations/ systems/ marketing/ sales/ operations/ finance/ research/
│   ├── checklists/              #   release day, DSP pitch, contract review, live advance,
│   │                            #     artist onboarding, security & launch
│   ├── templates/               #   KPI scorecard, weekly template, 5 importable CSV trackers
│   ├── prompts/                 #   A&R, UGC, pitch & outreach, contract summarizer
│   └── plans/                   #   90-day execution plan, 180-day scaling plan
│
├── docs/
│   └── RIPPL_UPGRADE_PLAN.md    # Provenance: which repo produced which module + ranked backlog
├── analytics/sql/
│   ├── 001_analytics_views.sql  # revenue_ledger, customers, revenue_by_month/line, cashflow_health
│   └── 002_business_metrics.sql # 13 business questions (CLV, territory, catalog share, calibration)
├── data/hooks.csv               # 60 UGC hooks across 6 angles
├── scripts/ugc_reel_gen.py      # ffmpeg batch reel renderer (+ manifest for attribution)
├── .github/workflows/ci.yml     # lint · typecheck · build · secret scan
│
├── SUPABASE_SETUP.md            # Supabase setup steps
├── RIPPL_OVERVIEW.md            # ← this file
├── .env.example                 # VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
└── package.json / vite.config.ts / tsconfig.json
```

> `supabase/migrations/` now runs `0001_init.sql` → `0006_growth_modules.sql`.
> `0006` adds gigs, ticket orders, commissions, invoices, invoice lines, affiliates,
> referrals, plans, subscriptions, usage events and hit scores — with RLS on every
> table and a trigger putting each new account on the free plan.

---

## 3. Features by Module (Sidebar)

### PERSONAL OS

**🏠 Home** — 4 metric cards (Blended ROAS, Pending Signatures, Upcoming Releases, Active AI Pipelines), a **Money & Momentum** row (Outstanding invoices, live Commissions, Upcoming Shows, Affiliate Owed — with overdue and below-break-even warnings), a **Jump-to** grid, interactive month calendar with event dots, and the Action Center to-do list with Snooze/Delegate.

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

**🎨 Studio** — Creative, 4 tabs: **Scratchpad** (notes with /h1 /bullet /image), **Moodboard** (paste image URLs), **UGC Engine** (batch builder, 6 hook angles, 60-hook library, render-command generator, per-hook creator briefs, save batch to Scratchpad), **TikTok/Meta tracker** with Copy Creator Brief.

**🤖 Tech Lab** — AI/SaaS: sprint **Kanban boards** with Vercel deploy-status badge, **Prompt Library** accordion (Copy Prompt), one-click **Import knowledge prompts** (12 A&R / UGC / pitch / legal prompts, idempotent), **Prompt Enhancer** (no-API keyword builder + Surprise me + save).

**✨ Hit Lab** — Score a track from its audio features. Sliders for danceability, energy, valence, acousticness, instrumentalness, speechiness, liveness, loudness, tempo, duration + genre. Returns a 0–100 score, a band (Low/Moderate/Strong), a rough probability, and a **signed point-by-point breakdown of why**. Prefill from the audio library. Saved scores get an **Actual D28** field so predictions can be calibrated against reality.

### REVENUE

**🧾 Invoices** — two tabs:
- *Commission Pipeline* — 10 client-visible phases (Inquiry → Paid) with a progress rail, 14-day auto-expiring quotes, deposit gate (flags work in progress without a deposit), revision counter, **Quote PDF**.
- *Invoices* — outstanding / collected / overdue stats, sequential numbering, due-date tracking with late badges, status workflow, **Invoice PDF**.

**🎟️ Live & Tickets** — shows with capacity, ticket price, guarantee, door split and costs. Computes **break-even ticket count**, sell-through (with a break-even marker on the bar), gross/costs/net per show, and flags any confirmed show tracking below break-even.

**🔗 Affiliates** — referral partners with unique tracked codes (`?ref=CODE`, copy to clipboard), clicks/signups/conversions, CVR, referred revenue, commission owed, payout status, and a **CSV ledger export**.

**💳 Billing** — three plans (Free / Studio / Label), monthly **AI credit** quota with a usage bar and per-feature breakdown, credit cost table, tier-gated module list, and the Stripe wiring instructions. Metered actions log to `usage`.

### MARKETING

**Overview** (360 dashboard, tabbed: Paid/Organic/Funnel/Budget), **Campaigns**, **Calendar**, **Channels**, **Tasks**, **Budget** (add budget/expense/payment), **Templates** (editable, PDF-derived), **Creators** (influencer roster + per-campaign **list builder**), **Assets** (per-campaign uploads + approval pipeline).

### ADMIN / SYSTEM

**🛡️ Admin** *(HQ only)* — add team **members**, set **roles**, and **assign** campaigns / releases / audio / contracts to each person.

**📚 Knowledge** — searchable hub over all 40 playbooks, checklists, templates and prompt sets. Fast-start paths ("Signing a new artist", "Shipping a release in 8 weeks", "Out of promo budget"…), section filters with counts, tag search, copy-path, deep links into the module each doc drives, and a provenance panel.

**⚙️ Settings** — interactive **role/permissions matrix**, **Backend diagnostics** (Run diagnostics: env / signed-in / DB write test), Sign out, **Reset everything** (local + cloud).

---

## 4. Global Chrome (on every app page)

- **⌘K / Ctrl+K Command Palette** — searches artists, deals, releases, campaigns, notes, **invoices, commissions, shows, affiliate partners, hit scores and all 40 knowledge docs**, plus 11 **quick-create** actions (note, lead, release, brand deal, campaign, invoice, commission, show, partner, score a track, open the hub).
- **Persistent Audio Player** (bottom) — plays library tracks, waveform, feedback notes.
- **Quick-Action FAB** (bottom-right) — New Note, Upload Contract, Log Brand Deal, Add Scouting Lead, **Raise Invoice, Add Show, Add Affiliate Partner**.
- **Notifications Bell** (top-right) — expiring contracts, scheduled releases, deals awaiting signature, **overdue invoices (with balance), quotes expiring ≤7 days, work in progress without a deposit, shows below break-even, AI credits low or exhausted**.
- **Sync Badge** (bottom-left) — live cloud-sync status.

---

## 5. Data, Persistence & Auth

- **Auth gate:** Supabase email/password accounts when configured; falls back to a local master-password gate with no backend so you're never locked out. **Change or disable this before the app is publicly reachable** — see the security checklist.
- **HQ:** `zeyadsayedinq@gmail.com` sees the Admin panel and manages members/assignments.
- **Persistence:** every store writes to the Supabase `app_state` table (JSONB, per-user, RLS-protected) and syncs across devices; localStorage is an offline cache/fallback.
- **Files:** contracts + audio upload to Supabase **Storage** (`contracts` / `audio` / `art` buckets), served via signed URLs.
- **Public share:** `/s#…` renders a view-only song player (waveform + timeline) outside the auth gate.

---

## 6. Setup (to enable cloud)

1. Create a Supabase project; run `supabase/migrations/0001_init.sql` in the SQL editor (idempotent).
2. Run the remaining migrations in order, ending with **`0006_growth_modules.sql`** (gigs, ticketing, commissions, invoicing, affiliates, plans/credits, hit scores — all RLS-protected).
3. Optionally run `analytics/sql/001_analytics_views.sql` then `002_business_metrics.sql` for the analytics layer.
4. Create Storage buckets `contracts`, `audio`, `art` (Private) — or run the `insert into storage.buckets…` snippet.
5. Add `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` to `.env` **and** Vercel env vars → redeploy (VITE vars are build-time).
6. Verify in **Settings → Run diagnostics** (all three green = syncing).
7. Before making the app public, work through `knowledge/checklists/SECURITY_AND_LAUNCH_CHECKLIST.md`.

Full steps in `SUPABASE_SETUP.md`. Provenance and known limitations of the newer
modules are in `docs/RIPPL_UPGRADE_PLAN.md`.

### UGC renderer (optional, runs offline)

```bash
brew install ffmpeg                       # or apt / windows build
# media/hook_videos/  1080x1920 b-roll, no text
# media/cta_videos/   1080x1920 endcards
# media/fonts/        a .ttf for the overlay
python3 scripts/ugc_reel_gen.py --campaign night-drive --count 12 --track path/to/track.wav
```

Output lands in `out/ugc/<campaign>/` with a `manifest.json` mapping every file
back to its hook id — so 3-second-retention results stay attributable.

---

## 7. Routes Reference

**Personal OS** — `/` landing · `/home` · `/roster` · `/releases` · `/audio` · `/vault` · `/studio` · `/techlab` · `/hitlab`

**Revenue** — `/invoices` · `/live` · `/affiliates` · `/billing`

**Marketing** — `/dashboard` · `/campaigns` · `/calendar` · `/channels` · `/tasks` · `/budget` · `/templates` · `/creators` · `/assets`

**Platforms** — `/dashboard/tiktok` · `/dashboard/instagram` · `/dashboard/youtube` · `/dashboard/facebook` · `/dashboard/x`

**Admin / System** — `/admin` (HQ) · `/knowledge` · `/settings`

**Public (no auth)** — `/s` (shared song) · `/c/$token` (client share link)

---

## 8. Knowledge Hub

`knowledge/` is the operating manual behind the dashboard: 40 files across
foundations, systems, marketing, sales, operations, finance, research,
checklists, templates and prompts, plus 90- and 180-day plans. Browse and search
it at **`/knowledge`**; the files themselves stay as Markdown and CSV so they
remain editable in an editor and reviewable in git.

The structure and several models were adapted from public reference repositories
and rewritten for a label / management / 360-marketing operation. The full
mapping — which repo produced which module, what shipped, what the known
limitations are, and the ranked backlog — lives in **`docs/RIPPL_UPGRADE_PLAN.md`**.

| Section | Files | Highlights |
|---|---|---|
| Foundations | 3 | A&R & artist development · market structures · why releases fail |
| Systems | 4 | Release OS (8 gates) · catalog compounding · low-budget promo · repeat-client engine |
| Marketing | 3 | UGC content engine · short-form growth · content pillars |
| Sales | 2 | Sync & brand deal pipeline · objection handling |
| Operations | 3 | Commission pipeline · file naming & delivery · KPI definitions |
| Finance | 3 | Unit economics · royalty splits & accounting · revenue models |
| Research | 2 | Hit prediction method & limits · catalog analytics method |
| Checklists | 6 | Release day · DSP pitch · contract review · live advance · onboarding · security |
| Templates | 8 | KPI scorecard · weekly template · quote template · 5 CSV trackers |
| Prompts | 4 | A&R · UGC hooks · pitch & outreach · contract summarizer |
| Plans | 2 | 90-day execution · 180-day scaling |

---

---

*RIPPL v1.2 · © 2026 Zeyad Sayedin. Proprietary and confidential.*
