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

This is a real Python process — it can't run on Vercel next to the frontend. Cheapest options: [Railway](https://railway.app), [Render](https://render.com), or [Fly.io](https://fly.io) all support a `Dockerfile`-less Python service off this `requirements.txt` + `main.py`. Once deployed, set `VITE_VIBE_ANALYZER_URL` to that URL in Vercel's env vars and redeploy the frontend.

## ⚠️ The Hit Scoring baseline is a placeholder

`hit_model.py` trains on a **synthetic** baseline, not real chart data — there's no Spotify credential available here. The scores are directionally functional (energetic/upbeat/danceable tracks score higher) but are *not* a real market signal.

To make it real:

1. Create a Spotify Developer app → get a Client ID/Secret.
2. Implement `fetch_real_baseline()` in `hit_model.py` to pull the current MENA Top 50 (Egypt/Saudi/UAE) via the Spotify Web API and its audio-features.
3. Re-train on that instead of `_synthetic_baseline()`. Re-run on a schedule (e.g. weekly) so it tracks current trends, per the original plan.
