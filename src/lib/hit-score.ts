/* ═══════════════════════════════════════════════════════════
   HIT SCORE — transparent popularity heuristic

   Adapted from ebtezcan/Spotify-Song-Popularity-Prediction, a supervised
   classification study over ~176k deduplicated 2019 Spotify tracks. That work
   binarised Spotify's popularity score at >= 58/100 and compared models by
   recall on the popular class:

       Logistic Regression 0.66 · XGBoost 0.65 · Random Forest 0.60 · Dummy 0.51

   Its directional findings — popular tracks skew HIGHER energy, HIGHER
   danceability and LOWER acousticness, and cluster in Pop / Rap / Rock /
   Hip-Hop / Dance — are reproduced here as an auditable linear model rather
   than a black box, so /hitlab can always explain *why* a track scored what
   it scored.

   ⚠  READ knowledge/research/HIT_PREDICTION_METHOD.md BEFORE TRUSTING A NUMBER.
      Every model in the source study hit a ~66% recall ceiling, which the
      author reads as evidence that audio features alone do not explain
      popularity. This is a tie-breaker and a conversation starter. It is not
      a gate, and it is not a signing decision.
═══════════════════════════════════════════════════════════ */

export interface AudioFeatures {
  /** 0–1, suitability for dancing (tempo, rhythm stability, beat strength) */
  danceability: number;
  /** 0–1, perceptual intensity and activity */
  energy: number;
  /** 0–1, musical positiveness */
  valence: number;
  /** 0–1, confidence the track is acoustic */
  acousticness: number;
  /** 0–1, likelihood the track has no vocals */
  instrumentalness: number;
  /** 0–1, presence of spoken words (>0.66 = all speech) */
  speechiness: number;
  /** 0–1, presence of an audience (>0.8 = likely live) */
  liveness: number;
  /** dB, typically -60 … 0 */
  loudness: number;
  /** BPM */
  tempo: number;
  /** track length in milliseconds */
  durationMs: number;
  /** free text; matched case-insensitively against GENRE_WEIGHTS */
  genre?: string;
}

export const DEFAULT_FEATURES: AudioFeatures = {
  danceability: 0.65,
  energy: 0.7,
  valence: 0.5,
  acousticness: 0.15,
  instrumentalness: 0.02,
  speechiness: 0.1,
  liveness: 0.15,
  loudness: -7,
  tempo: 120,
  durationMs: 180_000,
  genre: "Pop",
};

/* Genre priors. Positive = over-represented among popular tracks in the source
   study (Pop, Rap, Rock, Hip-Hop, Dance); negative = consistently
   under-represented (Children's Music, Comedy, Soundtrack, Classical, Jazz). */
export const GENRE_WEIGHTS: Record<string, number> = {
  pop: 0.9,
  rap: 0.85,
  "hip-hop": 0.85,
  "hip hop": 0.85,
  trap: 0.8,
  dance: 0.75,
  edm: 0.7,
  "r&b": 0.6,
  rnb: 0.6,
  rock: 0.6,
  afrobeats: 0.6,
  reggaeton: 0.6,
  indie: 0.25,
  electronic: 0.25,
  alternative: 0.2,
  house: 0.2,
  folk: -0.2,
  jazz: -0.55,
  classical: -0.8,
  soundtrack: -0.7,
  comedy: -0.9,
  "children's music": -0.95,
  opera: -0.9,
  world: -0.1,
  arabic: 0.15,
  mahraganat: 0.3,
  shaabi: 0.2,
};

export interface Contribution {
  label: string;
  /** signed points this feature added to / removed from the score */
  points: number;
  /** plain-language explanation shown in the UI */
  note: string;
}

export interface HitScoreResult {
  /** 0–100 */
  score: number;
  band: "Low" | "Moderate" | "Strong";
  /** rough probability the track clears the study's popular threshold */
  probability: number;
  contributions: Contribution[];
  warnings: string[];
  modelVersion: string;
}

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

/** Peak at `ideal`, falling off over `spread`. Returns -1…1. */
function bell(value: number, ideal: number, spread: number): number {
  const d = Math.abs(value - ideal) / spread;
  return clamp(1 - d, -1, 1);
}

export function genreWeight(genre?: string): number {
  if (!genre) return 0;
  const g = genre.trim().toLowerCase();
  if (GENRE_WEIGHTS[g] !== undefined) return GENRE_WEIGHTS[g];
  const hit = Object.keys(GENRE_WEIGHTS).find((k) => g.includes(k));
  return hit ? GENRE_WEIGHTS[hit] : 0;
}

/**
 * Score a track 0–100 with a full breakdown of where every point came from.
 * Weights are hand-set to reproduce the direction and rough relative magnitude
 * of the source study's coefficients — they are NOT the study's fitted values.
 */
export function hitScore(f: AudioFeatures): HitScoreResult {
  const c: Contribution[] = [];
  const warnings: string[] = [];

  // Energy — the strongest single separator in the source study.
  const energyPts = (f.energy - 0.5) * 34;
  c.push({
    label: "Energy",
    points: energyPts,
    note:
      f.energy >= 0.7
        ? "High energy — the strongest positive signal in the reference study"
        : f.energy >= 0.5
          ? "Moderate energy"
          : "Low energy — popular tracks skew energetic",
  });

  // Danceability — second strongest.
  const dancePts = (f.danceability - 0.5) * 30;
  c.push({
    label: "Danceability",
    points: dancePts,
    note:
      f.danceability >= 0.7
        ? "Very danceable — clusters with popular tracks"
        : f.danceability >= 0.5
          ? "Moderately danceable"
          : "Low danceability drags the score down",
  });

  // Acousticness — inverse relationship.
  const acousticPts = -(f.acousticness - 0.3) * 22;
  c.push({
    label: "Acousticness",
    points: acousticPts,
    note:
      f.acousticness > 0.6
        ? "Highly acoustic — under-represented among popular tracks"
        : "Production-forward, in line with popular tracks",
  });

  // Loudness — modern masters sit around -7 to -5 LUFS-ish territory.
  const loudPts = bell(f.loudness, -6, 10) * 10;
  c.push({
    label: "Loudness",
    points: loudPts,
    note:
      f.loudness < -14
        ? "Quiet master — will feel small next to playlist neighbours"
        : "Competitive loudness",
  });
  if (f.loudness > -4) warnings.push("Master may be over-limited (> -4 dB).");

  // Valence — mild positive, much weaker than energy/danceability.
  const valencePts = (f.valence - 0.45) * 9;
  c.push({
    label: "Valence",
    points: valencePts,
    note:
      f.valence >= 0.6
        ? "Bright / positive"
        : "Darker mood — small effect either way",
  });

  // Tempo — broad plateau, penalty at the extremes.
  const tempoPts = bell(f.tempo, 122, 55) * 8;
  c.push({
    label: "Tempo",
    points: tempoPts,
    note:
      f.tempo < 70 || f.tempo > 175
        ? "Unusual tempo for mainstream placement"
        : `${Math.round(f.tempo)} BPM sits in the common range`,
  });

  // Duration — short-form era favours ~2:30–3:30.
  const minutes = f.durationMs / 60_000;
  const durationPts = bell(minutes, 3.0, 2.0) * 8;
  c.push({
    label: "Duration",
    points: durationPts,
    note:
      minutes > 5
        ? "Long — skip risk in playlist contexts"
        : minutes < 1.6
          ? "Very short — may under-monetise"
          : `${minutes.toFixed(1)} min is a comfortable length`,
  });
  if (minutes > 6) warnings.push("Over 6 minutes — expect elevated skip rate.");

  // Instrumentalness — vocal tracks dominate the popular class.
  const instPts = -f.instrumentalness * 14;
  c.push({
    label: "Instrumentalness",
    points: instPts,
    note:
      f.instrumentalness > 0.5
        ? "Instrumental — popular tracks are overwhelmingly vocal"
        : "Vocal-led",
  });

  // Speechiness — fine for rap, penalised above the spoken-word threshold.
  const speechPts = f.speechiness > 0.66 ? -12 : f.speechiness > 0.33 ? 3 : 0;
  c.push({
    label: "Speechiness",
    points: speechPts,
    note:
      f.speechiness > 0.66
        ? "Reads as spoken word rather than music"
        : f.speechiness > 0.33
          ? "Rap-range speechiness — neutral to positive"
          : "Sung / melodic",
  });

  // Liveness — live recordings under-perform on DSPs.
  const livePts = f.liveness > 0.8 ? -10 : f.liveness > 0.5 ? -4 : 0;
  c.push({
    label: "Liveness",
    points: livePts,
    note:
      f.liveness > 0.8 ? "Detected as a live recording" : "Studio recording",
  });
  if (f.liveness > 0.8)
    warnings.push("Live recordings historically under-perform on DSPs.");

  // Genre prior.
  const genrePts = genreWeight(f.genre) * 12;
  c.push({
    label: `Genre${f.genre ? ` · ${f.genre}` : ""}`,
    points: genrePts,
    note:
      genrePts > 4
        ? "Genre is over-represented among popular tracks"
        : genrePts < -4
          ? "Niche genre — smaller mainstream ceiling, not a quality judgement"
          : "Genre is roughly neutral",
  });

  const raw = 50 + c.reduce((s, x) => s + x.points, 0);
  const score = Math.round(clamp(raw, 0, 100) * 10) / 10;

  // Logistic squash so the number reads as a probability, calibrated so ~58
  // (the study's popularity cutoff) lands near 0.5.
  const probability =
    Math.round((1 / (1 + Math.exp(-(score - 58) / 11))) * 1000) / 1000;

  const band: HitScoreResult["band"] =
    score >= 68 ? "Strong" : score >= 50 ? "Moderate" : "Low";

  warnings.push(
    "Heuristic, not a trained model. Reference models plateaued near 66% recall — treat this as a tie-breaker, never a gate.",
  );

  return {
    score,
    band,
    probability,
    contributions: c.sort((a, b) => Math.abs(b.points) - Math.abs(a.points)),
    warnings,
    modelVersion: "heuristic-v1",
  };
}

/** Compare a track against the median features of a target playlist. */
export function playlistFit(
  track: AudioFeatures,
  playlistMedian: Partial<AudioFeatures>,
): { key: string; delta: number; verdict: string }[] {
  const keys: (keyof AudioFeatures)[] = [
    "danceability",
    "energy",
    "valence",
    "acousticness",
    "tempo",
  ];
  return keys
    .filter((k) => playlistMedian[k] !== undefined)
    .map((k) => {
      const t = track[k] as number;
      const m = playlistMedian[k] as number;
      const delta = Math.round((t - m) * 1000) / 1000;
      const scale = k === "tempo" ? 12 : 0.12;
      return {
        key: String(k),
        delta,
        verdict:
          Math.abs(delta) <= scale
            ? "in range"
            : delta > 0
              ? "above playlist"
              : "below playlist",
      };
    });
}
