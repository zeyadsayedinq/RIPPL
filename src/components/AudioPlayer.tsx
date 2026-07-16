import { useEffect, useRef, useState } from "react";
import { Play, Pause, MessageSquarePlus, Music2, Upload } from "lucide-react";
import { useOS, uid } from "@/lib/os-store";
import { cloudEnabled, uploadToBucket, signedUrl } from "@/lib/cloud";

/* Persistent bottom audio bar. Synthetic waveform + scrubber.
   If the track has a URL, a real <audio> element is used; otherwise the
   progress is simulated so demos/masters can be reviewed anywhere. */

const BARS = Array.from({ length: 56 }, (_, i) => 30 + Math.abs(Math.sin(i * 0.6)) * 60);

export function AudioPlayer() {
  const { currentTrack, playing, togglePlay, tracks, playTrack, update } = useOS();
  const [progress, setProgress] = useState(0); // 0..100
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [srcUrl, setSrcUrl] = useState<string | null>(null); // resolved playable url

  async function onUpload(file?: File) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const id = uid("tr");
    const title = file.name.replace(/\.[^.]+$/, "");
    playTrack({ id, title, artist: "Upload", url });
    setProgress(0);
    let path: string | undefined;
    if (cloudEnabled) { try { path = (await uploadToBucket("audio", file)) ?? undefined; } catch { /* storage not set up */ } }
    // persist the track entry (with storage path) so it survives reloads
    update("tracks", (t) => [{ id, title, artist: "Upload", url, path }, ...t]);
  }

  const track = currentTrack ?? tracks[0] ?? null;

  // resolve a playable URL: session object URL, else a signed Storage URL from path
  useEffect(() => {
    let alive = true;
    (async () => {
      if (track?.url) { setSrcUrl(track.url); return; }
      if (track?.path) { const u = await signedUrl("audio", track.path); if (alive) setSrcUrl(u); return; }
      setSrcUrl(null);
    })();
    return () => { alive = false; };
  }, [track]);

  // simulated progress only when there's no real audio source
  useEffect(() => {
    if (!playing || srcUrl) return;
    const id = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 0.5)), 120);
    return () => clearInterval(id);
  }, [playing, srcUrl]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !srcUrl) return;
    if (playing) a.play().catch(() => {}); else a.pause();
  }, [playing, srcUrl]);

  if (!track) return null;

  function saveNote() {
    if (!noteText.trim()) { setNoteOpen(false); return; }
    update("notes", (n) => [{ id: uid("n"), title: `Feedback · ${track!.title}`, body: `@ ${Math.round(progress)}% — ${noteText}`, updatedAt: "just now" }, ...n]);
    setNoteText(""); setNoteOpen(false);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0c]/95 backdrop-blur-xl">
      {srcUrl && <audio ref={audioRef} src={srcUrl} onTimeUpdate={(e) => { const a = e.currentTarget; setProgress((a.currentTime / (a.duration || 1)) * 100); }} />}
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-2.5">
        <button onClick={togglePlay} className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105">
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
        </button>

        <div className="hidden min-w-0 sm:block" style={{ width: 180 }}>
          <div className="flex items-center gap-1.5 truncate text-sm font-medium"><Music2 className="h-3.5 w-3.5 text-white/40" />{track.title}</div>
          <div className="truncate text-[11px] text-white/40">{track.artist}</div>
        </div>

        {/* Waveform scrubber */}
        <button
          className="relative flex h-8 flex-1 items-center gap-[2px] overflow-hidden"
          onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - r.left) / r.width) * 100); }}
        >
          {BARS.map((h, i) => {
            const on = (i / BARS.length) * 100 <= progress;
            return <span key={i} className="flex-1 rounded-full" style={{ height: `${h}%`, background: on ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.18)" }} />;
          })}
        </button>

        <div className="hidden w-10 shrink-0 text-right font-mono text-[11px] text-white/40 md:block">{Math.round(progress)}%</div>

        <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={(e) => { onUpload(e.target.files?.[0]); e.target.value = ""; }} />
        <button onClick={() => fileRef.current?.click()} title="Load an audio file to play" className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white">
          <Upload className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Load audio</span>
        </button>

        <button onClick={() => setNoteOpen((o) => !o)} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white">
          <MessageSquarePlus className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Feedback</span>
        </button>

        {tracks.length > 1 && (
          <select
            value={track.id}
            onChange={(e) => { const t = tracks.find((x) => x.id === e.target.value); if (t) playTrack(t); }}
            className="hidden shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-xs outline-none lg:block"
          >
            {tracks.map((t) => <option key={t.id} value={t.id} className="bg-[#140a1e]">{t.title}</option>)}
          </select>
        )}
      </div>

      {noteOpen && (
        <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-4 pb-3">
          <input
            autoFocus value={noteText} onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveNote()}
            placeholder={`Leave a note at ${Math.round(progress)}%…`}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
          />
          <button onClick={saveNote} className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black">Save note</button>
        </div>
      )}
    </div>
  );
}
