"""
Predictive A&R "Hit" Scoring — RandomForestClassifier over audio features.

IMPORTANT — READ BEFORE TRUSTING THE SCORES:
The RIPPL v3.0 plan calls for training this on real Spotify Web API audio
features of the *current* MENA Top 50 (Egypt/Saudi/UAE), refreshed
continuously. This service has no Spotify credentials, so it ships with a
small synthetic, hand-built baseline purely so the pipeline is functional
end-to-end. The scores it returns are directional demo output only — NOT a
real market signal — until you swap in a real baseline.

To make this production-accurate:
  1. Create a Spotify Developer app -> get SPOTIFY_CLIENT_ID / SECRET.
  2. Fill in `fetch_real_baseline()` below to pull current MENA chart
     playlists via the Spotify Web API and their audio-features.
  3. Re-train `get_model()` on that real feature set instead of
     `_synthetic_baseline()`, and re-run periodically (e.g. weekly cron)
     so the baseline tracks current trends.
"""
from __future__ import annotations

import numpy as np
from sklearn.ensemble import RandomForestClassifier

FEATURE_KEYS = ["bpm", "energy", "valence", "danceability", "speechiness"]


def _synthetic_baseline() -> tuple[np.ndarray, np.ndarray]:
    """Placeholder baseline. Replace with real MENA Top 50 Spotify audio
    features (see module docstring) for anything you'd actually act on."""
    rng = np.random.default_rng(42)
    hits = rng.normal(loc=[112, 0.72, 0.68, 0.74, 0.12], scale=[10, 0.08, 0.1, 0.08, 0.05], size=(60, 5))
    misses = rng.normal(loc=[92, 0.42, 0.42, 0.45, 0.22], scale=[18, 0.15, 0.18, 0.15, 0.1], size=(60, 5))
    X = np.vstack([hits, misses])
    y = np.array([1] * 60 + [0] * 60)
    return X, y


def fetch_real_baseline() -> tuple[np.ndarray, np.ndarray] | None:
    """Stub — wire this up to the Spotify Web API once you have credentials.
    Return None to fall back to the synthetic baseline."""
    return None


_model: RandomForestClassifier | None = None


def get_model() -> RandomForestClassifier:
    global _model
    if _model is None:
        X, y = fetch_real_baseline() or _synthetic_baseline()
        clf = RandomForestClassifier(n_estimators=200, max_depth=6, random_state=42)
        clf.fit(X, y)
        _model = clf
    return _model


def score(features: dict) -> dict:
    x = np.array([[features[k] for k in FEATURE_KEYS]])
    clf = get_model()
    hit_class_idx = list(clf.classes_).index(1)
    hit_prob = float(clf.predict_proba(x)[0][hit_class_idx])
    return {
        "hit_probability": round(hit_prob * 100, 1),
        "baseline": "synthetic-placeholder",
        "note": (
            "Scored against a synthetic placeholder baseline, not real MENA Top 50 "
            "chart data. Add Spotify Web API credentials and wire up "
            "fetch_real_baseline() in hit_model.py for production-accurate scoring."
        ),
    }
