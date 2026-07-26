# Hit Prediction — Method & Limits

Method notes behind RIPPL's `/hitlab` Hit Score. Adapted from
`ebtezcan/Spotify-Song-Popularity-Prediction`, a supervised classification study
over ~176,000 deduplicated 2019 Spotify tracks.

## What the source study did

- Data: ~232k tracks from Spotify's API (Kaggle "Ultimate Spotify Tracks DB"),
  deduplicated to ~176k by track id
- Target: binarised popularity — a track counts as "popular" at a popularity
  score **≥ 58/100**, a cutoff derived from the range seen in that year's Top 50
  and Top 100 lists
- Features: acousticness, danceability, duration, energy, instrumentalness, key,
  liveness, loudness, mode, speechiness, tempo, time signature, valence, genre
- Handling: one-hot encoding for key/mode/time-signature, SMOTENC for class
  imbalance, outlier removal and scaling for logistic regression
- Models compared by recall on the popular class:

| Model | Recall |
|---|---|
| Logistic Regression | 0.66 |
| XGBoost | 0.65 |
| Random Forest | 0.60 |
| Dummy baseline | 0.51 |

## Findings that transferred into RIPPL's scorer

- Popular tracks skew **higher energy**
- Popular tracks skew **higher danceability**
- Popular tracks skew **lower acousticness**
- Top genres among popular tracks: Pop, Rap, Rock, Hip-Hop, Dance
- Consistently unpopular genres: Children's Music, Comedy, Soundtrack,
  Classical, Jazz — niche audiences, low mainstream representation

## The limits — read this before trusting a number

1. **Ceiling ~66% recall.** Every model in the study converged near the same
   ceiling, which the author reads as evidence that audio features alone don't
   explain popularity. Comparable published work reaches similar ceilings.
2. **Popularity ≠ quality, and popularity ≠ your goals.** Spotify's popularity
   score is play-count and recency weighted; it measures distribution outcomes,
   not artistic merit.
3. **2019 data.** Genre-level tastes drift. Duration norms in particular have
   shifted materially since.
4. **Selection bias.** The dataset is what Spotify surfaced, not what was released.
5. **RIPPL's scorer is a heuristic**, not the study's trained model. It reproduces
   the *directional* relationships in a transparent, auditable form so you can
   see exactly why a track scored what it scored.

## Scorer calibration (heuristic-v2)

v1 shipped with a real bug worth recording, because the failure mode is easy to
repeat: loudness, tempo and duration were scored with a *bell* function that
returned its **maximum positive value at the ideal point**. Being at 120 BPM,
three minutes long and -7 dB — i.e. completely unremarkable — earned full marks
on three features at once. Stacked with the genre prior, an ordinary pop track
scored **100.0** and the scale carried no information at all.

The fix: those three are now **penalty-only**. Sitting in the normal range earns
nothing, because it isn't evidence a record will do well — it's just the absence
of a problem. Only the features the source study actually found discriminating
(energy, danceability, acousticness) can add points, and they're centred on the
popular class's midpoint rather than the middle of the 0–1 range.

Reference points for v2 — if you change a weight, re-check these three:

| Input | Score |
|---|---|
| Default pop track (E .70 · D .65 · A .15 · -7 dB · 120 BPM · 3:00) | ≈ 65 |
| Everything pushed in the favourable direction | ≈ 85 |
| 6-minute acoustic instrumental jazz at -20 dB | ≈ 0 |

Bands: **Strong ≥ 72 · Moderate ≥ 48 · Low below that.** A scale where a typical
track scores 100 is worse than no scale, because it looks like a signal.

## How to actually use it

- As a **tie-breaker** between tracks in `/roster` or `/releases`, never as a gate
- As a **conversation starter** with an artist about arrangement and energy
- As a **playlist-fit check**: compare a track's features against the median
  features of a target playlist
- Log the score, then log the actual D28 result. After 20 releases you'll know
  whether it predicts anything *for your catalog* — which is the only test that
  matters.

## Next steps if you want the real thing

- Pull current data from the Spotify Web API rather than 2019 Kaggle snapshots
- Train per-genre and per-territory models; a global model is the wrong unit
- Add non-audio features: playlist adds, creator pickups, save rate in week 1
- Score on precision/recall trade-offs you actually care about, not accuracy
