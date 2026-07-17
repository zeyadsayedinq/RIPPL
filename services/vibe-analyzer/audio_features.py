"""
Shared librosa feature extraction for the Vibe Analyzer + Hit Scoring endpoints.

Pure signal-processing on the raw audio — no external API calls, no keys
required. This is what powers RIPPL v3.0 plan item:
  "The Vibe Analyzer Pipeline (Python + librosa): drop a demo, get it
   automatically analyzed and tagged for Key, BPM, Energy, and Mood."
"""
from __future__ import annotations

import numpy as np
import librosa

KEY_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

# Krumhansl-Schmuckler key profiles
_MAJOR_PROFILE = np.array([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88])
_MINOR_PROFILE = np.array([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17])


def _best_key_correlation(chroma_mean: np.ndarray, profile: np.ndarray) -> tuple[float, int]:
    best_corr, best_idx = -1.0, 0
    for i in range(12):
        rotated = np.roll(profile, i)
        corr = float(np.corrcoef(rotated, chroma_mean)[0, 1])
        if corr > best_corr:
            best_corr, best_idx = corr, i
    return best_corr, best_idx


def classify_mood(energy: float, valence: float, mode: str) -> str:
    if energy > 0.6 and valence > 0.55:
        return "Uplifting / Anthemic"
    if energy > 0.6 and valence <= 0.55:
        return "Aggressive / Dark"
    if energy <= 0.6 and valence > 0.55:
        return "Chill / Feel-good"
    return "Moody / Emotional"


def extract_features(path: str) -> dict:
    # Cap analysis at 90s for speed — plenty for tempo/key/timbre estimation.
    y, sr = librosa.load(path, mono=True, sr=22050, duration=90)
    if y.size == 0:
        raise ValueError("empty or unreadable audio")

    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    tempo = float(np.atleast_1d(tempo)[0])

    chroma = librosa.feature.chroma_cqt(y=y, sr=sr)
    chroma_mean = chroma.mean(axis=1)
    maj_corr, maj_idx = _best_key_correlation(chroma_mean, _MAJOR_PROFILE)
    min_corr, min_idx = _best_key_correlation(chroma_mean, _MINOR_PROFILE)
    if maj_corr >= min_corr:
        key_label, mode = f"{KEY_NAMES[maj_idx]} major", "major"
    else:
        key_label, mode = f"{KEY_NAMES[min_idx]} minor", "minor"

    rms = librosa.feature.rms(y=y)[0]
    energy = float(np.clip(rms.mean() * 12, 0, 1))

    zcr = float(librosa.feature.zero_crossing_rate(y).mean())
    centroid = float(librosa.feature.spectral_centroid(y=y, sr=sr).mean())
    rolloff = float(librosa.feature.spectral_rolloff(y=y, sr=sr).mean())

    # Proxy features standing in for Spotify's audio-features (valence,
    # danceability, speechiness aren't directly recoverable from raw audio —
    # these are reasonable heuristics, not Spotify's exact algorithm).
    valence = float(np.clip(
        0.35 * (1.0 if mode == "major" else 0.0)
        + 0.35 * np.clip((tempo - 70) / 90, 0, 1)
        + 0.30 * np.clip(centroid / 4000, 0, 1),
        0, 1,
    ))
    danceability = float(np.clip(0.5 * np.clip((tempo - 60) / 120, 0, 1) + 0.5 * energy, 0, 1))
    speechiness = float(np.clip(zcr * 3, 0, 1))

    return {
        "bpm": round(tempo, 1),
        "key": key_label,
        "mode": mode,
        "energy": round(energy, 3),
        "valence": round(valence, 3),
        "danceability": round(danceability, 3),
        "speechiness": round(speechiness, 3),
        "spectral_centroid": round(centroid, 1),
        "spectral_rolloff": round(rolloff, 1),
        "mood": classify_mood(energy, valence, mode),
    }
