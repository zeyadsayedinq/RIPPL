# Deploy — SQL run order + git push

## 1. Supabase SQL (run in this exact order)

Open the SQL editor at your project → paste each file → **Run**. Use a fresh tab
per file. Everything is idempotent, so re-running a file that partly failed is safe.

| # | File | What it does |
|---|---|---|
| 1 | `supabase/migrations/0006_growth_modules.sql` | Creates the 10 growth tables + 5 views + RLS |
| 2 | `analytics/sql/001_analytics_views.sql` | Creates `revenue_ledger`, `customers`, `revenue_by_month`, `revenue_by_line`, `catalog_performance`, `live_summary`, `cashflow_health` |
| 3 | `analytics/sql/002_business_metrics.sql` | The 13 business-question queries — **paste one block at a time**, don't run the whole file |

**Running 002 before 001 is what produced** `relation "public.revenue_by_month"
does not exist`. The views have to exist before you can query them.

### Verify it worked

```sql
-- should return 10 rows
select table_name from information_schema.tables
where table_schema = 'public'
  and table_name in ('gigs','ticket_orders','commissions','invoices','invoice_lines',
                     'affiliates','referrals','plans','subscriptions','usage_events','hit_scores')
order by table_name;

-- should return 7 rows
select table_name from information_schema.views
where table_schema = 'public'
  and table_name in ('gig_economics','invoice_totals','affiliate_performance','usage_this_month',
                     'revenue_ledger','customers','revenue_by_month','revenue_by_line',
                     'catalog_performance','live_summary','cashflow_health')
order by table_name;

-- should return the 3 plans
select id, name, price_month, monthly_credits, seats from public.plans order by price_month;

-- RLS should be enabled on every growth table
select relname, relrowsecurity from pg_class
where relname in ('gigs','ticket_orders','commissions','invoices','invoice_lines',
                  'affiliates','referrals','subscriptions','usage_events','hit_scores');
```

---

## 2. Git push

### Troubleshooting (both of these actually happened)

**`fatal: Unable to create '.git/index.lock': File exists`**

A git process crashed and left a stale lock. Nothing is running — just delete it:

```bash
cd ~/Downloads/RIPPL
rm -f .git/index.lock
```

**`refusing to allow a Personal Access Token to create or update workflow
'.github/workflows/ci.yml' without 'workflow' scope`**

GitHub blocks tokens from writing to `.github/workflows/` unless the token
explicitly carries the `workflow` scope. This is a security feature — a leaked
token shouldn't be able to make your repo run arbitrary CI. Three ways out:

**A. Add the scope to your token** *(recommended — 30 seconds)*

github.com → Settings → Developer settings → Personal access tokens →
*Tokens (classic)* → click your token → tick **`workflow`** → Update token.
(Fine-grained tokens: Repository permissions → **Workflows: Read and write**.)

Editing an existing token keeps the same token string, so macOS Keychain will
keep working and you can just re-run `git push`. If you generate a *new* token,
clear the cached one first:

```bash
printf "protocol=https\nhost=github.com\n\n" | git credential-osxkeychain erase
git push origin main   # it'll prompt; paste the new token as the password
```

**B. Switch to SSH** — SSH keys aren't subject to the workflow-scope rule at all:

```bash
git remote set-url origin git@github.com:zeyadsayedinq/RIPPL.git
git push origin main
```

**C. Push everything except the workflow file**, then add CI through the GitHub
web UI (the web editor can create workflow files without any token scope):

```bash
git rm --cached .github/workflows/ci.yml
git commit --amend --no-edit
git push origin main
```

The file stays on your disk. Afterwards go to the repo → **Actions** → *New
workflow* → *set up a workflow yourself* → paste the contents of
`.github/workflows/ci.yml` → Commit.

---

### The push itself

From the project folder:

```bash
cd ~/Downloads/RIPPL

# see what's about to go up
git status

# stage everything new + changed
git add -A

# commit
git commit -m "Add growth modules: Hit Lab, invoicing & commissions, live ticketing, affiliates, billing, knowledge hub

- /hitlab      audio-feature Hit Score with point-by-point breakdown + D28 calibration
- /invoices    10-phase commission pipeline + invoicing (quote & invoice PDFs)
- /live        gigs, ticketing, break-even and sell-through
- /affiliates  referral partners, tracked codes, commission ledger
- /billing     plans, AI credits, per-feature usage metering
- /knowledge   searchable hub over 42 playbooks, checklists, templates and prompts
- Studio: UGC Engine tab (60-hook library, batch builder, creator briefs)
- Tech Lab: one-click import of the knowledge prompt pack
- Sidebar, landing, home, command palette, FAB and notifications all wired up
- supabase/migrations/0006_growth_modules.sql (10 tables, 5 views, RLS)
- analytics/sql/ business metrics pack, data/hooks.csv, scripts/ugc_reel_gen.py
- .github/workflows/ci.yml (lint, typecheck, build, secret scan)"

# push
git push origin main
```

### If the push is rejected (remote has commits you don't have)

```bash
git pull --rebase origin main
# resolve any conflicts, then:
git push origin main
```

### If it asks for a password

GitHub stopped accepting account passwords over HTTPS. Use a **personal access
token** as the password (github.com → Settings → Developer settings → Personal
access tokens → Fine-grained tokens → give it `Contents: Read and write` on the
`RIPPL` repo), or switch the remote to SSH:

```bash
git remote set-url origin git@github.com:zeyadsayedinq/RIPPL.git
git push origin main
```

### Safer alternative — push to a branch and open a PR

```bash
git checkout -b growth-modules
git add -A
git commit -m "Add growth modules (see docs/RIPPL_UPGRADE_PLAN.md)"
git push -u origin growth-modules
```

Then open the PR on GitHub. CI (`.github/workflows/ci.yml`) will run lint,
typecheck, build and the secret scan before you merge.

---

## 3. Before it goes live

Work through `knowledge/checklists/SECURITY_AND_LAUNCH_CHECKLIST.md`. The two
that matter most right now:

- **`/billing` tier gating is UI-only.** Do not charge anyone until it's enforced server-side.
- **Rotate any key that has ever been pasted into a chat or a screenshot.**
