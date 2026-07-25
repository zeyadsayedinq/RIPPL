# Security & Launch Checklist (RIPPL itself)

Run before every production deploy of the app.

## Secrets
- [ ] No API keys in client code — only `VITE_` public values
- [ ] Service-role Supabase key exists **only** in server functions / Vercel env
- [ ] `.env` is gitignored; `.env.example` has no real values
- [ ] Stripe secret key and webhook secret set server-side only
- [ ] Rotate any key that has ever been pasted into a chat or a screenshot

## Auth & access
- [ ] Supabase Auth configured; the local master-password fallback is **disabled**
      or changed for production
- [ ] RLS enabled on every table with user data
- [ ] RLS policies tested with a second, non-HQ account
- [ ] HQ email gate (`useIsHQ`) verified — non-HQ cannot reach `/admin`
- [ ] Public routes (`/s`, `/c/$token`) leak nothing beyond the shared item
- [ ] Share tokens are unguessable and revocable

## Storage
- [ ] Buckets `contracts`, `audio`, `art` are private
- [ ] Storage policies restrict by owner
- [ ] All file access goes through signed URLs with a short TTL

## Data
- [ ] `app_state` writes tested from a clean account
- [ ] Backup/export path exists (CSV export works)
- [ ] "Reset everything" tested and confirmed to be scoped to the current user

## Build & deploy
- [ ] `npm run build` clean
- [ ] `npm run lint` clean
- [ ] CI green (`.github/workflows/ci.yml`)
- [ ] `VITE_` env vars set in Vercel **before** deploy (they are build-time)
- [ ] Settings → Run diagnostics: all three green
- [ ] Smoke test: sign in, create a record, reload, confirm persistence
