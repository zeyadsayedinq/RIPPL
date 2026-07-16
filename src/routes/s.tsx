import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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

function SharePage() {
  const [data, setData] = useState<Shared | null>(null);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => { setData(decode()); }, []);
  useEffect(() => {
    if (!data) return;
    const el = new Audio(data.url);
    el.onended = () => setPlaying(false);
    setAudio(el);
    return () => { el.pause(); };
  }, [data]);

  function toggle() {
    if (!audio) return;
    if (audio.paused) { audio.play().catch(() => {}); setPlaying(true); }
    else { audio.pause(); setPlaying(false); }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-black px-4 font-mono text-white">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.08 300) 0%, transparent 65%)" }} />

      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-sm">
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/40">RIPPL // SHARED TRACK</div>
        {data ? (
          <>
            <div
              onClick={toggle}
              className="mx-auto mt-8 grid h-40 w-40 cursor-pointer place-items-center rounded-full border border-white/10 bg-black/40"
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-black">
                {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-[2px]" />}
              </div>
            </div>
            <h1 className="mt-6 text-xl font-bold tracking-tight">{data.title}</h1>
            <div className="mt-1 text-sm text-white/50">{data.artist}</div>
            <button onClick={toggle} className="mt-6 w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] transition-all hover:border-white/60 hover:bg-white hover:text-black">
              {playing ? "Pause" : "Play"}
            </button>
            <p className="mt-4 text-[10px] tracking-wider text-white/25">Listen-only · shared via RIPPL</p>
          </>
        ) : (
          <p className="mt-10 text-sm text-white/50">This share link is invalid or has expired.</p>
        )}
      </div>
    </div>
  );
}
