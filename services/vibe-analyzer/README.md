# Vibe Analyzer & Hit Scoring service

Standalone FastAPI microservice implementing two items from `RIPPL_v3_PLAN.md`:

- **The Vibe Analyzer Pipeline** — `POST /analyze`: drop in a demo, get back Key, BPM, Energy, and Mood (librosa, fully local, no API keys).
- **Predictive A&R "Hit" Scoring Engine** — `POST /score`: same audio features run through a RandomForestClassifier, returns a Hit Probability %.

Tested and confirmed working end-to-end in this environment (see commit that added it).

## Run it locally

```bash
cd services/vibe-analyzer
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Then in the RIPPL frontend `.env`:

```
VITE_VIBE_ANALYZER_URL=http://localhost:8000
```

Restart `npm run dev`. An "Analyze Vibe" button appears next to every track in **Audio Lab** — it calls `/analyze` + `/score` and shows Key / Mood / Hit Score inline. If the service isn't running, RIPPL shows a clear inline error instead of crashing.

## Deploying it (so it's not just localhost)

This is a real, stateful-ish Python process — it can't run on Vercel next to the frontend. `Procfile`, `railway.json`, `render.yaml`, and `runtime.txt` are already in this folder so either of the two options below is close to a 2-click deploy.

### Option A — Railway (recommended)

1. Go to [railway.app](https://railway.app) → sign in with GitHub → **New Project → Deploy from GitHub repo** → pick `zeyadsayedinq/RIPPL`.
2. Railway will try to build the whole repo — open the new service's **Settings → Root Directory** and set it to `services/vibe-analyzer`. It'll pick up `railway.json` automatically from there (Nixpacks build, `uvicorn` start command already configured).
3. Once it deploys, **Settings → Networking → Generate Domain** to get a public URL like `https://rippl-vibe-analyzer.up.railway.app`.
4. Test it: `curl https://<your-domain>/health` → should return `{"status":"ok"}`.

### Option B — Render

1. Go to [render.com](https://render.com) → **New → Blueprint** → connect the `zeyadsayedinq/RIPPL` repo. Render will read `services/vibe-analyzer/render.yaml` automatically.
2. Deploy. Note: Render's free tier spins the service down after 15 min idle — the first request after a gap takes ~30-50s to wake up (RIPPL's UI will just show the "isn't reachable" message during that window, then work once it's up). Fine for testing, worth upgrading off free tier for real use.

### Then wire it to the frontend

In Vercel → your RIPPL project → **Settings → Environment Variables**, add:

```
VITE_VIBE_ANALYZER_URL=https://<your-railway-or-render-domain>
```

Redeploy the frontend (Vercel → Deployments → ⋯ → Redeploy). "Analyze Vibe" in Audio Lab will now hit the real deployed service instead of `localhost`.

## ⚠️ The Hit Scoring baseline is a placeholder

`hit_model.py` trains on a **synthetic** baseline, not real chart data — there's no Spotify credential available here. The scores are directionally functional (energetic/upbeat/danceable tracks score higher) but are *not* a real market signal.

To make it real:

1. Create a Spotify Developer app → get a Client ID/Secret.
2. Implement `fetch_real_baseline()` in `hit_model.py` to pull the current MENA Top 50 (Egypt/Saudi/UAE) via the Spotify Web API and its audio-features.
3. Re-train on that instead of `_synthetic_baseline()`. Re-run on a schedule (e.g. weekly) so it tracks current trends, per the original plan.
