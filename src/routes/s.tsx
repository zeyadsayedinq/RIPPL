import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export const Route = createFileRoute("/s")({
  head: () => ({ meta: [{ title: "Shared track · RIPPL" }, { name: "robots", content: "noindex" }] }),
  component: SharePage,
});

interface Shared { title: string; artist: string; url: string; }
function decode(): Shared | null {
  if (typeof window === "undefined") return null;
  const m = window.location.hash.match(/t=([^&]+)/);
  if (!m) return null;
  try { return JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(m[1]))))); } catch { return null; }
}
const fmt = (s: number) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

function SharePage() {
  const [data, setData] = useState<Shared | null>(null);
  const [playing, setPlaying] = useState(false);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => { setData(decode()); }, []);
  useEffect(() => {
    if (!data) return;
    const el = new Audio(data.url); el.crossOrigin = "anonymous";
    el.ontimeupdate = () => setCur(el.currentTime);
    el.onloadedmetadata = () => setDur(el.duration || 0);
    el.onended = () => setPlaying(false);
    audioRef.current = el;
    return () => { el.pause(); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [data]);

  function ensureAnalyser() {
    if (ctxRef.current || !audioRef.current) return;
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();
      const src = ctx.createMediaElementSource(audioRef.current);
      const an = ctx.createAnalyser(); an.fftSize = 128;
      src.connect(an); an.connect(ctx.destination);
      ctxRef.current = ctx; analyserRef.current = an;
    } catch { /* visualizer unavailable — audio still plays */ }
  }
  function draw() {
    const an = analyserRef.current, cv = canvasRef.current;
    if (cv) {
      const ctx = cv.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, cv.width, cv.height);
        const bars = 56, bw = cv.width / bars;
        let arr: Uint8Array | null = null;
        if (an) { arr = new Uint8Array(an.frequencyBinCount); an.getByteFrequencyData(arr as any); }
        for (let i = 0; i < bars; i++) {
          const v = arr ? arr[Math.floor((i / bars) * arr.length)] / 255 : 0;
          const h = Math.max(2, v * cv.height);
          ctx.fillStyle = "rgba(255,255,255,0.85)";
          ctx.fillRect(i * bw + 1, (cv.height - h) / 2, bw - 2, h);
        }
      }
    }
    rafRef.current = requestAnimationFrame(draw);
  }
  async function toggle() {
    const el = audioRef.current; if (!el) return;
    ensureAnalyser(); await ctxRef.current?.resume();
    if (el.paused) { el.play().catch(() => {}); setPlaying(true); if (rafRef.current == null) draw(); }
    else { el.pause(); setPlaying(false); }
  }
  function seek(v: number) { const el = audioRef.current; if (el) { el.currentTime = v; setCur(v); } }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-black px-4 font-mono text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.08 300) 0%, transparent 65%)" }} />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-sm">
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/40">RIPPL // SHARED TRACK</div>
        {data ? (
          <>
            <button onClick={toggle} className="mx-auto mt-7 grid h-20 w-20 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105">
              {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 translate-x-[2px]" />}
            </button>

            <h1 className="mt-6 text-lg font-bold leading-snug">{data.title}</h1>
            <div className="mt-1 text-sm text-white/50">{data.artist}</div>

            {/* Waveform visualizer */}
            <canvas ref={canvasRef} width={360} height={64} className="mt-6 h-16 w-full" />

            {/* Seek / timeline */}
            <input type="range" min={0} max={dur || 0} step={0.1} value={cur} onChange={(e) => seek(Number(e.target.value))} className="dj-fader mt-3 w-full" />
            <div className="mt-1 flex justify-between font-mono text-[11px] text-white/40">
              <span>{fmt(cur)}</span><span>{fmt(dur)}</span>
            </div>

            <p className="mt-5 text-[10px] tracking-wider text-white/25">Listen-only · shared via RIPPL</p>
          </>
        ) : (
          <p className="mt-10 text-sm text-white/50">This share link is invalid or has expired.</p>
        )}
      </div>
    </div>
  );
}
