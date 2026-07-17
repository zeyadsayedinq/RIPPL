import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { useOS, uid, type Track } from "@/lib/os-store";
import { cloudEnabled, uploadToBucket, signedUrl } from "@/lib/cloud";
import { DjMixer } from "@/components/DjMixer";
import { Upload, Play, Pause, Trash2, Share2, Check, Gauge, Sparkles, Loader2 } from "lucide-react";
import { analyze } from "web-audio-beat-detector";
import { analyzeVibe, scoreHit } from "@/lib/vibe-api";

function encodeShare(o: { title: string; artist: string; url: string }) {
  return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(o)))));
}

export const Route = createFileRoute("/audio")({
  head: () => ({ meta: [{ title: "Audio · RIPPL OS" }, { name: "description", content: "Masters, demos & mixing." }] }),
  component: AudioPage,
});

function AudioPage() {
  const { tracks, update, currentTrack, playing, playTrack, togglePlay } = useOS();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [shared, setShared] = useState<string | null>(null);
  const [vibeBusy, setVibeBusy] = useState<string | null>(null);

  async function runVibe(t: Track) {
    setErr("");
    setVibeBusy(t.id);
    try {
      const url = t.path ? await signedUrl("audio", t.path) : t.url;
      if (!url) throw new Error("No audio source available for this track.");
      const blob = await (await fetch(url)).blob();
      const [feats, hit] = await Promise.all([analyzeVibe(blob, t.title), scoreHit(blob, t.title)]);
      update("tracks", (all) => all.map((x) => x.id === t.id
        ? { ...x, bpm: Math.round(feats.bpm), key: feats.key, energy: feats.energy, mood: feats.mood, hitScore: hit.hit_probability }
        : x));
    } catch (e: any) {
      setErr(e?.message || String(e));
    } finally {
      setVibeBusy(null);
    }
  }

  async function share(t: Track) {
    const url = t.path ? await signedUrl("audio", t.path, 60 * 60 * 24 * 7) : t.url;
    if (!url) { setErr("Upload this track to the cloud first to share it (needs the audio bucket)."); return; }
    const link = `${window.location.origin}/s#t=${encodeShare({ title: t.title, artist: t.artist, url })}`;
    await navigator.clipboard?.writeText(link);
    setShared(t.id); setTimeout(() => setShared(null), 1800);
  }

  async function onFiles(files: FileList | null) {
    if (!files) return;
    setErr("");
    for (const file of Array.from(files)) {
      const id = uid("tr");
      const title = file.name.replace(/\.[^.]+$/, "");
      const url = URL.createObjectURL(file);
      let path: string | undefined;
      if (cloudEnabled) {
        setBusy(true);
        try { path = (await uploadToBucket("audio", file)) ?? undefined; }
        catch (e: any) { setErr(`Upload to Storage failed: ${e?.message || e}. Create the "audio" bucket + run the storage policy.`); }
        setBusy(false);
      }
      update("tracks", (t) => [{ id, title, artist: "Upload", url, path }, ...t]);
      void detectBpm(file, id);
    }
  }

  // Auto-BPM detection (Web Audio API, fully client-side — no API keys needed).
  async function detectBpm(file: File, id: string) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      const bpm = await analyze(audioBuffer);
      update("tracks", (all) => all.map((t) => (t.id === id ? { ...t, bpm: Math.round(bpm) } : t)));
      void ctx.close();
    } catch {
      /* not every clip has a clear, detectable tempo (or the browser can't decode it) — skip silently */
    }
  }

  return (
    <AppShell>
      <header className="glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">KAIRO SOUND · Audio</div>
          <h1 className="mt-1 font-display text-3xl font-bold">Audio <span className="text-gradient-neon">Lab</span></h1>
          <p className="mt-1 text-sm text-muted-foreground">Upload masters & demos, review them in the bottom player, leave timestamped feedback.</p>
        </div>
        <input ref={fileRef} type="file" accept="audio/*" multiple className="hidden" onChange={(e) => { onFiles(e.target.files); e.target.value = ""; }} />
        <MagneticButton onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /> {busy ? "Uploading…" : "Upload audio"}</MagneticButton>
      </header>

      {err && <div className="mt-4 rounded-xl border border-[oklch(0.7_0.2_20)]/40 bg-[oklch(0.7_0.2_20)]/10 p-3 text-sm text-[oklch(0.8_0.2_20)]">{err}</div>}

      {/* Dropzone */}
      <button
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
        className="mt-6 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-white/40"
      >
        <Upload className="mx-auto h-6 w-6 text-muted-foreground" />
        <div className="mt-2 text-sm text-muted-foreground">Drag & drop audio here, or click to browse — WAV / MP3.</div>
      </button>

      <section className="mt-6 grid grid-cols-12 gap-4">
        {/* Track list */}
        <SpotlightCard className="col-span-12 xl:col-span-7 p-5" spotlight={false}>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Library</div>
          <h2 className="mt-1 font-display text-2xl font-bold">Tracks</h2>
          <div className="mt-4 space-y-2">
            {tracks.length === 0 && <div className="glass rounded-xl p-6 text-center text-sm text-muted-foreground">No audio yet. Upload a master or demo to start.</div>}
            {tracks.map((t) => {
              const isCurrent = currentTrack?.id === t.id;
              const isPlaying = isCurrent && playing;
              return (
                <div key={t.id} className={`glass flex flex-wrap items-center gap-3 rounded-xl p-3 ${isCurrent ? "border-white/25" : ""}`}>
                  <button onClick={() => (isCurrent ? togglePlay() : playTrack(t))} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105">
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
                  </button>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{t.title}</div>
                    <div className="truncate text-[11px] text-muted-foreground">{t.artist}{t.path ? " · cloud" : t.url ? " · this session" : ""}</div>
                  </div>
                  {t.bpm && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-muted-foreground" title="Auto-detected tempo">
                      <Gauge className="h-3 w-3" /> {t.bpm} BPM
                    </span>
                  )}
                  <button onClick={() => runVibe(t)} disabled={vibeBusy === t.id} title="Analyze Key / Mood / Hit Score" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-muted-foreground hover:text-white disabled:opacity-50">
                    {vibeBusy === t.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />} {vibeBusy === t.id ? "Analyzing…" : "Analyze Vibe"}
                  </button>
                  <button onClick={() => share(t)} title="Copy view-only share link" className="text-muted-foreground hover:text-white">
                    {shared === t.id ? <Check className="h-4 w-4 text-[oklch(0.85_0.18_150)]" /> : <Share2 className="h-4 w-4" />}
                  </button>
                  <button onClick={() => update("tracks", (all) => all.filter((x) => x.id !== t.id))} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><Trash2 className="h-4 w-4" /></button>
                  {(t.key || t.mood || t.hitScore !== undefined) && (
                    <div className="flex w-full flex-wrap gap-1.5 pl-12">
                      {t.key && <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">Key: {t.key}</span>}
                      {t.mood && <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">{t.mood}</span>}
                      {t.energy !== undefined && <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground">Energy {Math.round(t.energy * 100)}%</span>}
                      {t.hitScore !== undefined && (
                        <span className="rounded-full border border-[oklch(0.82_0.18_150)]/40 bg-[oklch(0.82_0.18_150)]/10 px-2 py-0.5 text-[10px] text-[oklch(0.82_0.18_150)]" title="Placeholder baseline — see services/vibe-analyzer/README.md">
                          Hit Score {t.hitScore}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </SpotlightCard>

        {/* quick tips */}
        <SpotlightCard className="col-span-12 xl:col-span-5 p-5" spotlight={false}>
          <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">How to</div>
          <h2 className="mt-1 font-display text-2xl font-bold">Mix it</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Load a track into <b className="text-foreground">Deck A</b> and another into <b className="text-foreground">Deck B</b>.</li>
            <li>• Hit play on both, then ride the <b className="text-foreground">crossfader</b> between them.</li>
            <li>• Twist the <b className="text-foreground">LOW / MID / HIGH</b> knobs (drag up/down) to EQ each deck.</li>
            <li>• Nudge <b className="text-foreground">Tempo</b> to beat-match; double-click a knob to reset.</li>
          </ul>
        </SpotlightCard>
      </section>

      {/* DJ / Mixer */}
      <section className="mt-6">
        <SpotlightCard className="p-6" spotlight={false}>
          <div className="mb-4 flex items-center justify-between">
            <div><div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Studio</div><h2 className="mt-1 font-display text-2xl font-bold">DJ / Mixer</h2></div>
            <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground">Live · Web Audio</span>
          </div>
          {tracks.length < 1 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-muted-foreground">Upload at least one track to start mixing.</div>
          ) : <DjMixer />}
        </SpotlightCard>
      </section>
    </AppShell>
  );
}
