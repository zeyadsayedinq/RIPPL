"""
RIPPL Vibe Analyzer & Predictive Hit Scoring microservice.

Run locally:
    cd services/vibe-analyzer
    python3 -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    uvicorn main:app --reload --port 8000

RIPPL's frontend talks to this over HTTP (see src/lib/vibe-api.ts). Set
VITE_VIBE_ANALYZER_URL in .env if you deploy this somewhere other than
http://localhost:8000 (e.g. Railway/Render/Fly.io — this is a stateful
Python service and can't run on Vercel alongside the frontend).
"""
from __future__ import annotations

import os
import shutil
import tempfile

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from audio_features import extract_features
from hit_model import FEATURE_KEYS, score

app = FastAPI(title="RIPPL Vibe Analyzer & Hit Scoring", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your RIPPL domain(s) before deploying publicly
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


async def _save_upload(file: UploadFile) -> str:
    suffix = os.path.splitext(file.filename or "")[1] or ".wav"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        shutil.copyfileobj(file.file, tmp)
        return tmp.name


@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    """Key / BPM / Energy / Mood tagging for a single demo."""
    path = await _save_upload(file)
    try:
        return extract_features(path)
    except Exception as e:  # noqa: BLE001 - surface a clean 422 to the client
        raise HTTPException(status_code=422, detail=f"Could not analyze audio: {e}")
    finally:
        os.unlink(path)


@app.post("/score")
async def hit_score(file: UploadFile = File(...)):
    """Predictive A&R Hit Probability Score for a single demo."""
    path = await _save_upload(file)
    try:
        feats = extract_features(path)
        result = score(feats)
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=422, detail=f"Could not score audio: {e}")
    finally:
        os.unlink(path)
    return {
        **result,
        "features": {k: feats[k] for k in FEATURE_KEYS},
        "key": feats["key"],
        "mood": feats["mood"],
    }
