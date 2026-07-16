import { useEffect, useRef, useState } from "react";
import { useOS, type Track } from "@/lib/os-store";
import { signedUrl } from "@/lib/cloud";
import { Play, Pause, RotateCcw, Disc3, Circle, Square, Download } from "lucide-react";

/* Interactive DJ / mixer with real Web Audio: per-deck 3-band EQ, volume,
   tempo, cue, spinning platter, equal-power crossfader, tap-tempo BPM, and a
   record-the-mix button (captures the master bus to a downloadable file). */

interface DeckNodes { src: MediaElementAudioSourceNode; low: BiquadFilterNode; mid: BiquadFilterNode; high: BiquadFilterNode; gain: GainNode; xf: GainNode; }
interface DeckState { trackId: string; playing: boolean; vol: number; low: number; mid: number; high: number; rate: number; bpm: number | null; }
const initial = (): DeckState => ({ trackId: "", playing: false, vol: 0.8, low: 0, mid: 0, high: 0, rate: 1, bpm: null });

export function DjMixer() {
  const { tracks } = useOS();
  const audioA = useRef<HTMLAudioElement>(null);
  const audioB = useRef<HTMLAudioElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const recDest = useRef<MediaStreamAudioDestinationNode | null>(null);
  const nA = useRef<DeckNodes | null>(null);
  const nB = useRef<DeckNodes | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const [a, setA] = useState<DeckState>(initial());
  const [b, setB] = useState<DeckState>(initial());
  const [xf, setXf] = useState(0.5);
  const [recording, setRecording] = useState(false);
  const [recUrl, setRecUrl] = useState<string | null>(null);
  const [recSecs, setRecSecs] = useState(0);

  function buildDeck(ctx: AudioContext, el: HTMLAudioElement, rec: MediaStreamAudioDestinationNode): DeckNodes {
    const src = ctx.createMediaElementSource(el);
    const low = ctx.createBiquadFilter(); low.type = "lowshelf"; low.frequency.value = 220;
    const mid = ctx.createBiquadFilter(); mid.type = "peaking"; mid.frequency.value = 1000; mid.Q.value = 1;
    const high = ctx.createBiquadFilter(); high.type = "highshelf"; high.frequency.value = 3500;
    const gain = ctx.createGain(); const xfg = ctx.createGain();
    src.connect(low); low.connect(mid); mid.connect(high); high.connect(gain); gain.connect(xfg);
    xfg.connect(ctx.destination); xfg.connect(rec);
    return { src, low, mid, high, gain, xf: xfg };
  }
  function ensureEngine() {
    if (ctxRef.current || !audioA.current || !audioB.current) return;
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx(); ctxRef.current = ctx;
      const rec = ctx.createMediaStreamDestination(); recDest.current = rec;
      nA.current = buildDeck(ctx, audioA.current, rec);
      nB.current = buildDeck(ctx, audioB.current, rec);
      applyXf(xf);
    } catch { /* web audio unavailable */ }
  }
  function applyXf(x: number) {
    if (nA.current) nA.current.xf.gain.value = Math.cos(x * Math.PI / 2);
    if (nB.current) nB.current.xf.gain.value = Math.cos((1 - x) * Math.PI / 2);
  }

  useEffect(() => { if (nA.current) { nA.current.gain.gain.value = a.vol; nA.current.low.gain.value = a.low; nA.current.mid.gain.value = a.mid; nA.current.high.gain.value = a.high; } if (audioA.current) audioA.current.playbackRate = a.rate; }, [a]);
  useEffect(() => { if (nB.current) { nB.current.gain.gain.value = b.vol; nB.current.low.gain.value = b.low; nB.current.mid.gain.value = b.mid; nB.current.high.gain.value = b.high; } if (audioB.current) audioB.current.playbackRate = b.rate; }, [b]);
  useEffect(() => { applyXf(xf); }, [xf]);
  useEffect(() => { if (!recording) return; const id = setInterval(() => setRecSecs((s) => s + 1), 1000); return () => clearInterval(id); }, [recording]);

  async function resolve(t: Track): Promise<string | null> { return t.url ?? (t.path ? await signedUrl("audio", t.path) : null); }
  async function load(deck: "A" | "B", trackId: string) {
    const t = tracks.find((x) => x.id === trackId); if (!t) return;
    const el = deck === "A" ? audioA.current : audioB.current; if (!el) return;
    el.crossOrigin = "anonymous";
    const url = await resolve(t); if (!url) return;
    el.src = url;
    (deck === "A" ? setA : setB)((s) => ({ ...s, trackId, playing: false }));
  }
  async function toggle(deck: "A" | "B") {
    ensureEngine(); await ctxRef.current?.resume();
    const el = deck === "A" ? audioA.current : audioB.current; if (!el || !el.src) return;
    if (el.paused) { el.play().catch(() => {}); (deck === "A" ? setA : setB)((s) => ({ ...s, playing: true })); }
    else { el.pause(); (deck === "A" ? setA : setB)((s) => ({ ...s, playing: false })); }
  }
  function cue(deck: "A" | "B") { const el = deck === "A" ? audioA.current : audioB.current; if (el) el.currentTime = 0; }

  function toggleRec() {
    ensureEngine();
    if (recording) { recorder.current?.stop(); return; }
    if (!recDest.current) return;
    ctxRef.current?.resume();
    try {
      const mr = new MediaRecorder(recDest.current.stream);
      chunks.current = [];
      mr.ondataavailable = (e) => { if (e.data.size) chunks.current.push(e.data); };
      mr.onstop = () => { const blob = new Blob(chunks.current, { type: "audio/webm" }); setRecUrl(URL.createObjectURL(blob)); setRecording(false); };
      mr.start(); recorder.current = mr; setRecSecs(0); setRecording(true);
    } catch { /* recording unsupported */ }
  }

  return (
    <div>
      <audio ref={audioA} loop onEnded={() => setA((s) => ({ ...s, playing: false }))} />
      <audio ref={audioB} loop onEnded={() => setB((s) => ({ ...s, playing: false }))} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <Deck side="A" state={a} setState={setA} tracks={tracks} onLoad={(id) => load("A", id)} onToggle={() => toggle("A")} onCue={() => cue("A")} />
        <div className="flex flex-row items-center justify-center gap-4 lg:flex-col">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Crossfade</div>
          <div className="flex items-center gap-2 text-xs text-white/40"><span>A</span>
            <input type="range" min={0} max={1} step={0.01} value={xf} onChange={(e) => setXf(Number(e.target.value))} className="dj-fader w-40 lg:w-56" />
            <span>B</span>
          </div>
        </div>
        <Deck side="B" state={b} setState={setB} tracks={tracks} onLoad={(id) => load("B", id)} onToggle={() => toggle("B")} onCue={() => cue("B")} accent="oklch(0.72 0.16 200)" />
      </div>

      {/* Recorder */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
        <button onClick={toggleRec} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${recording ? "bg-[oklch(0.65_0.24_20)] text-white" : "bg-white text-black"}`}>
          {recording ? <><Square className="h-4 w-4" /> Stop ({Math.floor(recSecs / 60)}:{String(recSecs % 60).padStart(2, "0")})</> : <><Circle className="h-4 w-4" /> Record mix</>}
        </button>
        {recUrl && !recording && (
          <a href={recUrl} download="rippl-mix.webm" className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5"><Download className="h-4 w-4" /> Download mix</a>
        )}
      </div>
    </div>
  );
}

function Deck({ side, state, setState, tracks, onLoad, onToggle, onCue, accent = "oklch(0.7 0.28 328)" }: {
  side: string; state: DeckState; setState: React.Dispatch<React.SetStateAction<DeckState>>; tracks: Track[];
  onLoad: (id: string) => void; onToggle: () => void; onCue: () => void; accent?: string;
}) {
  const set = (p: Partial<DeckState>) => setState((s) => ({ ...s, ...p }));
  const taps = useRef<number[]>([]);
  function tap() {
    const now = performance.now();
    taps.current = [...taps.current.filter((t) => now - t < 3000), now].slice(-6);
    if (taps.current.length >= 2) {
      const intervals = taps.current.slice(1).map((t, i) => t - taps.current[i]);
      const avg = intervals.reduce((s, v) => s + v, 0) / intervals.length;
      set({ bpm: Math.round(60000 / avg) });
    }
  }
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold tracking-widest" style={{ color: accent }}>DECK {side}</div>
        <span className="font-mono text-[11px] text-white/40">{Math.round((state.rate - 1) * 100)}%</span>
      </div>
      <div className="mt-4 grid place-items-center">
        <div className="relative grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-black/40">
          <Disc3 className="h-24 w-24 text-white/15" style={{ animation: state.playing ? "spin 2.4s linear infinite" : "none" }} />
          <div className="absolute h-3 w-3 rounded-full" style={{ background: accent }} />
        </div>
      </div>
      <select value={state.trackId} onChange={(e) => onLoad(e.target.value)} className="mt-4 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none">
        <option value="" className="bg-[#0a0a0c]">Load a track…</option>
        {tracks.map((t) => <option key={t.id} value={t.id} className="bg-[#0a0a0c]">{t.title}</option>)}
      </select>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={onToggle} className="grid h-10 w-10 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105">{state.playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}</button>
        <button onClick={onCue} title="Cue to start" className="glass grid h-10 w-10 place-items-center rounded-full hover:bg-white/5"><RotateCcw className="h-4 w-4" /></button>
        <button onClick={tap} title="Tap tempo" className="glass grid h-10 min-w-[3.5rem] place-items-center rounded-full px-2 text-xs hover:bg-white/5">
          {state.bpm ? <span className="font-mono">{state.bpm}<span className="text-white/40"> BPM</span></span> : "TAP"}
        </button>
        <div className="ml-1 flex-1">
          <div className="mb-1 text-[9px] uppercase tracking-wider text-white/40">Tempo</div>
          <input type="range" min={0.85} max={1.15} step={0.01} value={state.rate} onChange={(e) => set({ rate: Number(e.target.value) })} className="dj-fader w-full" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-2">
        <Knob label="LOW" value={state.low} onChange={(v) => set({ low: v })} accent={accent} />
        <Knob label="MID" value={state.mid} onChange={(v) => set({ mid: v })} accent={accent} />
        <Knob label="HIGH" value={state.high} onChange={(v) => set({ high: v })} accent={accent} />
        <Knob label="VOL" value={state.vol} min={0} max={1} onChange={(v) => set({ vol: v })} accent={accent} unit="" />
      </div>
    </div>
  );
}

function Knob({ label, value, onChange, min = -12, max = 12, accent, unit = "dB" }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; accent: string; unit?: string }) {
  const drag = useRef(false); const startY = useRef(0); const startV = useRef(0);
  const deg = ((value - min) / (max - min)) * 270 - 135;
  function down(e: React.PointerEvent) { drag.current = true; startY.current = e.clientY; startV.current = value; (e.target as Element).setPointerCapture?.(e.pointerId); }
  function move(e: React.PointerEvent) { if (!drag.current) return; const dv = ((startY.current - e.clientY) / 120) * (max - min); onChange(Math.max(min, Math.min(max, startV.current + dv))); }
  function up() { drag.current = false; }
  return (
    <div className="flex flex-col items-center gap-1">
      <div onPointerDown={down} onPointerMove={move} onPointerUp={up} onDoubleClick={() => onChange(unit === "" ? 0.8 : 0)}
        className="relative grid h-12 w-12 cursor-ns-resize touch-none place-items-center rounded-full border border-white/15 bg-black/40">
        <div className="absolute h-4 w-[2px] rounded-full" style={{ background: accent, transform: `rotate(${deg}deg) translateY(-9px)`, transformOrigin: "center bottom" }} />
        <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
      </div>
      <div className="text-[9px] uppercase tracking-wider text-white/40">{label}</div>
      <div className="font-mono text-[9px] text-white/30">{unit === "" ? Math.round(value * 100) : (value > 0 ? "+" : "") + value.toFixed(0)}{unit && unit}</div>
    </div>
  );
}
