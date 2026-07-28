# Hit Prediction — Method & Limits

Method notes behind RIPPL's `/hitlab` Hit Score. Adapted from
`ebtezcan/Spotify-Song-Popularity-Prediction`, a supervised classification study
over ~176,000 deduplicated 2019 Spotify tracks.

---

## ⚠ Read first: Hit Lab does not listen to the track

**`/hitlab` scores the slider positions. It does not analyse the audio file.**

This is the single most important thing to understand about the page, because
the layout implies otherwise — you pick a track from "Prefill from library" and
a number appears, which looks like the app listened to it. It didn't.

What `prefill()` actually copies when you click a library track:

| Copied | Not copied |
|---|---|
| Title | Danceability |
| Artist | Valence |
| Tempo — *only if that track already has a `bpm`* | Acousticness |
| Energy — *only if that track already has an `energy`* | Instrumentalness |
| | Speechiness |
| | Liveness |
| | Loudness |
| | Duration |

Eight of the ten features stay at their defaults. So two completely different
records will usually return the **same score**, and that score is mostly a
statement about the default slider positions, not about either record.

Treat the current page as a **what-if calculator**: useful for asking "if I
raised the energy and shortened it, how would that shift?" — not for asking
"how good is this track?"

### The analyser exists, but isn't connected to this page

`services/vibe-analyzer` is a real Python service (librosa) that extracts
features from an uploaded file, and `/audio` already uses it. It returns:

```
bpm · key · mode · energy · valence · danceability · speechiness · mood
```

That covers **five of the ten** features Hit Lab needs — tempo, energy,
valence, danceability, speechiness. Hit Lab's prefill currently uses only two
of those five. The remaining five (acousticness, instrumentalness, liveness,
loudness, duration) aren't extracted at all, though loudness and duration would
be straightforward to add to the service, and acousticness is approximable.

So RIPPL has two disconnected things: a real analyser on `/audio`, and a manual
calculator on `/hitlab` that looks like it's fed by it.

**To close the gap, in order of value:**

1. Extend `prefill()` to copy all five available features, not two. Cheapest fix,
   immediately makes different tracks score differently.
2. Add loudness and duration to `services/vibe-analyzer` — both are a few lines
   of librosa — taking real coverage to seven of ten.
3. Let Hit Lab upload straight to the analyser rather than only reading tracks
   that happen to have been analysed elsewhere.
4. Mark the still-manual features in the UI so it's visible which numbers were
   measured and which were assumed.

**Also check before trusting anything on the live site:** `VITE_VIBE_ANALYZER_URL`
defaults to `http://localhost:8000`. Unless it's set to a deployed URL in the
hosting environment, the analyser is unreachable in production — which means
`/audio` isn't populating `bpm` or `energy` either, and even the two features
prefill *can* copy will be empty.

---

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

## Scorer calibration (heuristic-v3)

Two opposite bugs got fixed here, and both are worth recording because the
second was caused by the fix for the first.

**v1 — everything scored 100.** Loudness, tempo and duration used a bell curve
that paid its *maximum* at the ideal point. Being 120 BPM, three minutes long
and −7 dB — i.e. completely unremarkable — earned full marks on three features
at once. Stacked with the genre prior, an ordinary pop track hit 100.0.

**v2 — three sliders went dead.** The fix was to make those penalty-only: zero
anywhere inside the normal range. That capped the ceiling, but it also meant
dragging tempo across 80–168 BPM, the entire musically useful range, changed
the score by *exactly nothing*. A control that is inert across its whole useful
span is indistinguishable from a broken one, and it was reported as broken.

**v3 — a small bonus, capped low.** Those three now pay a little at the centre
of the band, taper to zero at the edges, and go negative outside. Every control
is live, but sitting dead-centre on all three is worth ~7 points combined,
against ~30 available from energy alone. Only the features the source study
found genuinely discriminating can move the number far.

Reference points — if you change a weight, re-check all four:

| Input | Score |
|---|---|
| Default pop track (E .70 · D .65 · A .15 · −7 dB · 120 BPM · 3:00) | ≈ 70 |
| Everything pushed in the favourable direction | ≈ 90 |
| 6-minute acoustic instrumental jazz at −20 dB | ≈ 0 |
| **Sweep each slider end to end** | **every one must move the score** |

Bands: **Strong ≥ 72 · Moderate ≥ 48 · Low below that.** A scale where a typical
track scores 100 is worse than no scale, because it looks like a signal — and a
scale whose controls don't respond is worse still, because it looks like a bug.

## How to actually use it

**While the features are still entered by hand:**

- As a **what-if tool** — "if this were 8 BPM faster and a minute shorter, where
  does it land?" That question is answerable today and genuinely useful in a
  mix or arrangement conversation.
- As a **shared vocabulary** with an artist or producer. Moving the sliders
  together makes "it needs more energy" concrete.
- **Not** as a comparison between two records. Until prefill copies real
  measured features, two tracks will usually score the same, and any difference
  you see comes from whichever numbers you happened to type.

**Once real features are wired in (see the warning above):**

- As a **tie-breaker** between tracks in `/roster` or `/releases`, never as a gate
- As a **playlist-fit check** — compare against the median features of a target
  playlist
- Log the score, then log the actual D28 result. After 20 releases you'll know
  whether it predicts anything *for your catalog*, which is the only test that
  matters. `analytics/sql/002_business_metrics.sql` has the correlation query.

That last point only means something once the inputs are measured. Calibrating a
prediction against real outcomes is meaningless if the inputs were typed in by
the person making the prediction — you'd be measuring your own guesswork.

## Next steps if you want the real thing

- Pull current data from the Spotify Web API rather than 2019 Kaggle snapshots
- Train per-genre and per-territory models; a global model is the wrong unit
- Add non-audio features: playlist adds, creator pickups, save rate in week 1
- Score on precision/recall trade-offs you actually care about, not accuracy
