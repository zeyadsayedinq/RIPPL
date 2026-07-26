import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { useOS, uid, type HitScoreRecord } from "@/lib/os-store";
import {
  hitScore,
  DEFAULT_FEATURES,
  GENRE_WEIGHTS,
  type AudioFeatures,
} from "@/lib/hit-score";
import {
  Sparkles,
  Save,
  Trash2,
  AlertTriangle,
  Gauge,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/hitlab")({
  head: () => ({
    meta: [
      { title: "Hit Lab · RIPPL OS" },
      {
        name: "description",
        content:
          "Score a track's commercial potential from its audio features.",
      },
    ],
  }),
  component: HitLabPage,
});

const SLIDERS: {
  key: keyof AudioFeatures;
  label: string;
  min: number;
  max: number;
  step: number;
  hint: string;
}[] = [
  {
    key: "danceability",
    label: "Danceability",
    min: 0,
    max: 1,
    step: 0.01,
    hint: "Tempo, rhythm stability, beat strength",
  },
  {
    key: "energy",
    label: "Energy",
    min: 0,
    max: 1,
    step: 0.01,
    hint: "Perceived intensity and activity",
  },
  {
    key: "valence",
    label: "Valence",
    min: 0,
    max: 1,
    step: 0.01,
    hint: "Musical positiveness",
  },
  {
    key: "acousticness",
    label: "Acousticness",
    min: 0,
    max: 1,
    step: 0.01,
    hint: "Confidence the track is acoustic",
  },
  {
    key: "instrumentalness",
    label: "Instrumentalness",
    min: 0,
    max: 1,
    step: 0.01,
    hint: "Likelihood of no vocals",
  },
  {
    key: "speechiness",
    label: "Speechiness",
    min: 0,
    max: 1,
    step: 0.01,
    hint: "Presence of spoken words",
  },
  {
    key: "liveness",
    label: "Liveness",
    min: 0,
    max: 1,
    step: 0.01,
    hint: "Presence of an audience",
  },
  {
    key: "loudness",
    label: "Loudness (dB)",
    min: -30,
    max: 0,
    step: 0.5,
    hint: "Integrated loudness of the master",
  },
  {
    key: "tempo",
    label: "Tempo (BPM)",
    min: 50,
    max: 200,
    step: 1,
    hint: "Beats per minute",
  },
];

const GENRES = Object.keys(GENRE_WEIGHTS)
  .map((g) => g.replace(/\b\w/g, (m) => m.toUpperCase()))
  .sort();

function HitLabPage() {
  const { hitScores, update, tracks } = useOS();
  const [f, setF] = useState<AudioFeatures>(DEFAULT_FEATURES);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [durationMin, setDurationMin] = useState(3);

  const features = useMemo<AudioFeatures>(
    () => ({ ...f, durationMs: durationMin * 60_000 }),
    [f, durationMin],
  );
  const result = useMemo(() => hitScore(features), [features]);

  const bandColor =
    result.band === "Strong"
      ? "oklch(0.82 0.18 150)"
      : result.band === "Moderate"
        ? "oklch(0.85 0.15 85)"
        : "oklch(0.7 0.2 20)";

  function save() {
    const rec: HitScoreRecord = {
      id: uid("hs"),
      title: title.trim() || "Untitled",
      artist: artist.trim() || "—",
      genre: features.genre,
      score: result.score,
      band: result.band,
      probability: result.probability,
      features: {
        danceability: features.danceability,
        energy: features.energy,
        valence: features.valence,
        acousticness: features.acousticness,
        instrumentalness: features.instrumentalness,
        speechiness: features.speechiness,
        liveness: features.liveness,
        loudness: features.loudness,
        tempo: features.tempo,
        durationMs: features.durationMs,
      },
      modelVersion: result.modelVersion,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    update("hitScores", (all) => [rec, ...all]);
    update("usage", (all) => [
      {
        id: uid("u"),
        feature: "hit_score",
        credits: 1,
        at: new Date().toISOString(),
      },
      ...all,
    ]);
  }

  function prefill(t: {
    title: string;
    artist: string;
    bpm?: number;
    energy?: number;
  }) {
    setTitle(t.title);
    setArtist(t.artist);
    setF((p) => ({
      ...p,
      tempo: t.bpm ?? p.tempo,
      energy:
        typeof t.energy === "number"
          ? Math.min(1, Math.max(0, t.energy > 1 ? t.energy / 100 : t.energy))
          : p.energy,
    }));
  }

  const calibrated = hitScores.filter((h) => typeof h.actualD28 === "number");

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
          A&amp;R · Hit Lab
        </div>
        <h1 className="mt-1 font-display text-3xl font-bold">
          Hit <span className="text-gradient-neon">Score</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Score a track from its audio features. Transparent heuristic — every
          point is explained below.
        </p>
      </header>

      <div className="mt-6 grid grid-cols-12 gap-4">
        {/* ── Inputs ── */}
        <SpotlightCard
          className="col-span-12 p-5 lg:col-span-7"
          spotlight={false}
        >
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 sm:col-span-5">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
                Track title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Night Drive"
                className="glass w-full rounded-xl px-3 py-2 text-sm outline-none"
              />
            </div>
            <div className="col-span-12 sm:col-span-4">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
                Artist
              </label>
              <input
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Marwan H."
                className="glass w-full rounded-xl px-3 py-2 text-sm outline-none"
              />
            </div>
            <div className="col-span-12 sm:col-span-3">
              <label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">
                Genre
              </label>
              <select
                value={f.genre}
                onChange={(e) => setF({ ...f, genre: e.target.value })}
                className="glass w-full rounded-xl bg-transparent px-3 py-2 text-sm outline-none"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g} className="bg-black">
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {tracks.length > 0 && (
            <div className="mt-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Prefill from library
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {/* max-w + truncate: library titles include full video names and
                    RTL Arabic titles that ran the chip row off the card. */}
                {tracks.slice(0, 8).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => prefill(t)}
                    title={t.title}
                    className="glass max-w-[15rem] truncate rounded-lg px-2.5 py-1.5 text-left text-xs hover:bg-white/5"
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 space-y-3.5">
            {SLIDERS.map((s) => {
              const v = f[s.key] as number;
              return (
                <div key={String(s.key)}>
                  <div className="flex items-baseline justify-between">
                    <label className="text-xs font-medium">{s.label}</label>
                    <span className="font-mono text-xs text-muted-foreground">
                      {s.max <= 1 ? v.toFixed(2) : Math.round(v)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={s.min}
                    max={s.max}
                    step={s.step}
                    value={v}
                    onChange={(e) =>
                      setF({ ...f, [s.key]: Number(e.target.value) })
                    }
                    className="mt-1.5 w-full accent-white"
                  />
                  <div className="text-[10px] text-muted-foreground/60">
                    {s.hint}
                  </div>
                </div>
              );
            })}
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-medium">
                  Duration (minutes)
                </label>
                <span className="font-mono text-xs text-muted-foreground">
                  {durationMin.toFixed(1)}
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={8}
                step={0.1}
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
                className="mt-1.5 w-full accent-white"
              />
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={save}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
            >
              <Save className="h-4 w-4" /> Save score
            </button>
            <button
              onClick={() => {
                setF(DEFAULT_FEATURES);
                setDurationMin(3);
              }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5"
            >
              Reset
            </button>
          </div>
        </SpotlightCard>

        {/* ── Result ── */}
        <div className="col-span-12 lg:col-span-5">
          <SpotlightCard className="p-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" /> Hit Score
            </div>
            <div className="mt-3 flex items-end gap-3">
              <div
                className="font-display text-6xl font-bold leading-none"
                style={{ color: bandColor }}
              >
                {result.score.toFixed(1)}
              </div>
              <div className="pb-1">
                <div
                  className="text-sm font-semibold"
                  style={{ color: bandColor }}
                >
                  {result.band}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  p ≈ {(result.probability * 100).toFixed(0)}% vs the reference
                  cutoff
                </div>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${result.score}%`, background: bandColor }}
              />
            </div>

            <div className="mt-5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Why
            </div>
            <div className="mt-2 space-y-2">
              {result.contributions.map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="w-24 shrink-0 text-xs">{c.label}</div>
                  <div className="relative mt-1.5 h-1.5 flex-1 rounded-full bg-white/[0.06]">
                    {/* zero marker — without it a neutral feature renders as an
                        empty track, which reads as "not computed" rather than
                        "no effect". */}
                    <div className="absolute left-1/2 top-[-2px] h-[10px] w-px -translate-x-1/2 bg-white/20" />
                    <div
                      className="absolute top-0 rounded-full"
                      style={{
                        height: "100%",
                        left:
                          c.points >= 0
                            ? "50%"
                            : `${50 - Math.min(Math.abs(c.points) * 2, 50)}%`,
                        width: `${Math.max(Math.min(Math.abs(c.points) * 2, 50), 0.6)}%`,
                        background:
                          Math.abs(c.points) < 0.05
                            ? "rgba(255,255,255,.28)"
                            : c.points >= 0
                              ? "oklch(0.82 0.18 150)"
                              : "oklch(0.7 0.2 20)",
                      }}
                    />
                  </div>
                  <div
                    className="w-12 shrink-0 text-right font-mono text-[11px]"
                    style={{
                      color:
                        Math.abs(c.points) < 0.05
                          ? "rgba(255,255,255,.35)"
                          : undefined,
                    }}
                    title={
                      Math.abs(c.points) < 0.05
                        ? "In the normal range — neither helps nor hurts"
                        : undefined
                    }
                  >
                    {Math.abs(c.points) < 0.05
                      ? "—"
                      : `${c.points >= 0 ? "+" : ""}${c.points.toFixed(1)}`}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              {result.contributions.slice(0, 3).map((c) => (
                <div
                  key={c.label}
                  className="text-[11px] text-muted-foreground/80"
                >
                  · {c.note}
                </div>
              ))}
            </div>
          </SpotlightCard>

          <SpotlightCard className="mt-4 p-5" spotlight={false}>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[oklch(0.85_0.15_85)]">
              <AlertTriangle className="h-3.5 w-3.5" /> Read this
            </div>
            <ul className="mt-2 space-y-1.5 text-[11px] leading-relaxed text-muted-foreground">
              {result.warnings.map((w, i) => (
                <li key={i}>· {w}</li>
              ))}
              <li>
                · Method, sources and limits:{" "}
                <span className="text-white/70">
                  knowledge/research/HIT_PREDICTION_METHOD.md
                </span>
              </li>
            </ul>
          </SpotlightCard>
        </div>
      </div>

      {/* ── History & calibration ── */}
      <SpotlightCard className="mt-4 p-5" spotlight={false}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" /> Scored tracks
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground/70">
              Log the real D28 streams once a track releases — that's the only
              test of whether this predicts anything for your catalog.
            </p>
          </div>
          {calibrated.length >= 5 && (
            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                <TrendingUp className="h-3 w-3" /> Calibration
              </div>
              <div className="font-mono text-sm">
                {calibrated.length} scored + measured
              </div>
            </div>
          )}
        </div>

        {hitScores.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Nothing scored yet.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="pb-3">Track</th>
                  <th className="pb-3">Artist</th>
                  <th className="pb-3">Genre</th>
                  <th className="pb-3 text-right">Score</th>
                  <th className="pb-3">Band</th>
                  <th className="pb-3 text-right">Actual D28</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {hitScores.map((h) => (
                  <tr key={h.id} className="border-t border-white/[0.06]">
                    <td className="py-3 font-medium">{h.title}</td>
                    <td className="py-3 text-muted-foreground">{h.artist}</td>
                    <td className="py-3 text-muted-foreground">
                      {h.genre || "—"}
                    </td>
                    <td className="py-3 text-right font-mono">
                      {h.score.toFixed(1)}
                    </td>
                    <td className="py-3">{h.band}</td>
                    <td className="py-3 text-right">
                      <input
                        type="number"
                        value={h.actualD28 ?? ""}
                        placeholder="—"
                        onChange={(e) =>
                          update("hitScores", (all) =>
                            all.map((x) =>
                              x.id === h.id
                                ? {
                                    ...x,
                                    actualD28:
                                      e.target.value === ""
                                        ? undefined
                                        : Number(e.target.value),
                                  }
                                : x,
                            ),
                          )
                        }
                        className="glass w-28 rounded-lg px-2 py-1 text-right font-mono text-xs outline-none"
                      />
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() =>
                          update("hitScores", (all) =>
                            all.filter((x) => x.id !== h.id),
                          )
                        }
                        className="text-muted-foreground hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SpotlightCard>
    </AppShell>
  );
}
