import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Portal } from "@/components/Portal";
import { useOS, uid, type Artist, type ScoutStage, type DealStatus } from "@/lib/os-store";
import { pressKitPdf } from "@/lib/pdf";
import { ModalShell } from "@/components/NewCampaignModal";
import { getMarketSnapshot, formatCount, type MarketSnapshot } from "@/lib/market-data";
import { trendingMusic, youtubeConfigured, type TrendingVideo } from "@/lib/youtube-api";
import { LayoutGrid, Users, Handshake, FileText, DollarSign, BarChart3, Copy, Check, X, Music2, Sparkles, Trash2, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/roster")({
  head: () => ({ meta: [{ title: "Roster · RIPPL OS" }, { name: "description", content: "A&R and artist management." }] }),
  component: RosterPage,
});

const STAGES: ScoutStage[] = ["Discovered", "Evaluating", "Negotiating", "Signed"];
const DEAL_STATUSES: DealStatus[] = ["Pitching", "Contracting", "In Production", "Live", "Paid"];
type Tab = "scouting" | "roster" | "deals";

function RosterPage() {
  const [tab, setTab] = useState<Tab>("scouting");
  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "scouting", label: "Scouting Board", icon: LayoutGrid },
    { key: "roster", label: "Active Roster", icon: Users },
    { key: "deals", label: "Deal Sorter", icon: Handshake },
  ];

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">A&R · CRM</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Roster <span className="text-gradient-neon">Management</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Scout, sign and manage talent — drag cards across the pipeline.</p>
      </header>

      <div className="mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5">
        {tabs.map((t) => {
          const on = tab === t.key;
          return (
            <button key={t.key} onClick={() => setTab(t.key)} className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? "text-white" : "text-muted-foreground hover:text-white"}`}>
              {on && <motion.div layoutId="roster-tab" className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10" transition={{ type: "spring", stiffness: 320, damping: 30 }} />}
              <t.icon className="relative h-4 w-4" /><span className="relative whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {tab === "scouting" && <ScoutingBoard />}
        {tab === "roster" && <ActiveRoster />}
        {tab === "deals" && <DealSorter />}
      </div>
    </AppShell>
  );
}

/* ── Trending on YouTube (MENA) — real, live data for A&R scouting ──
   Spots what's rising in Egypt/Saudi/UAE before it charts elsewhere. */
const REGIONS = [["EG", "Egypt"], ["SA", "Saudi"], ["AE", "UAE"]] as const;

function TrendingMusicPanel() {
  const [region, setRegion] = useState<(typeof REGIONS)[number][0]>("EG");
  const [videos, setVideos] = useState<TrendingVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!youtubeConfigured) return;
    let cancelled = false;
    setLoading(true); setErr(null);
    trendingMusic(region)
      .then((v) => { if (!cancelled) setVideos(v); })
      .catch((e) => { if (!cancelled) setErr(e?.message || String(e)); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [region]);

  return (
    <SpotlightCard className="mb-4 p-5" spotlight={false}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"><TrendingUp className="h-3.5 w-3.5" /> Trending on YouTube · Music</div>
        {youtubeConfigured && (
          <div className="flex gap-1.5">
            {REGIONS.map(([code, label]) => (
              <button key={code} onClick={() => setRegion(code)} className={`rounded-full border px-3 py-1 text-xs ${region === code ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`}>{label}</button>
            ))}
          </div>
        )}
      </div>
      {!youtubeConfigured && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
          Not connected. Add <code className="rounded bg-white/10 px-1 py-0.5 text-white">VITE_YOUTUBE_API_KEY</code> in Vercel → Settings → Environment Variables and redeploy to see trending music here.
        </div>
      )}
      {err && <div className="mt-3 text-xs text-[oklch(0.8_0.2_20)]">Trending lookup failed: {err}</div>}
      {youtubeConfigured && <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {loading && Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-32 w-48 shrink-0 animate-pulse rounded-xl bg-white/[0.04]" />)}
        {!loading && videos.map((v) => (
          <a key={v.id} href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noreferrer" className="group w-48 shrink-0">
            <div className="aspect-video overflow-hidden rounded-xl bg-white/5">
              {v.thumbnail && <img src={v.thumbnail} alt={v.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />}
            </div>
            <div className="mt-1.5 truncate text-xs font-medium">{v.title}</div>
            <div className="truncate text-[10px] text-muted-foreground">{v.channelTitle} · {formatCount(v.viewCount)} views</div>
          </a>
        ))}
      </div>}
    </SpotlightCard>
  );
}

/* ── Scouting Kanban (native drag & drop) ───────────────────── */
function ScoutingBoard() {
  const { artists, update } = useOS();
  const [drag, setDrag] = useState<string | null>(null);
  const [over, setOver] = useState<ScoutStage | null>(null);
  const [selected, setSelected] = useState<Artist | null>(null);

  function drop(stage: ScoutStage) {
    if (!drag) return;
    update("artists", (a) => a.map((x) => (x.id === drag ? { ...x, stage, managed: stage === "Signed" ? x.managed : x.managed } : x)));
    setDrag(null); setOver(null);
  }

  return (
    <>
      <TrendingMusicPanel />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {STAGES.map((stage) => {
          const cards = artists.filter((a) => a.stage === stage);
          return (
            <div
              key={stage}
              onDragOver={(e) => { e.preventDefault(); setOver(stage); }}
              onDragLeave={() => setOver(null)}
              onDrop={() => drop(stage)}
              className={`rounded-2xl border p-3 transition-colors ${over === stage ? "border-white/40 bg-white/[0.04]" : "border-white/8 bg-white/[0.01]"}`}
            >
              <div className="flex items-center justify-between px-1 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stage}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{cards.length}</span>
                  <button onClick={() => { const name = prompt(`New ${stage} lead — name`); if (name) update("artists", (a) => [{ id: uid("ar"), name, kind: "Music", handle: "", streams: "—", followers: "—", stage, managed: stage === "Signed" }, ...a]); }} className="grid h-5 w-5 place-items-center rounded-md border border-white/15 text-muted-foreground hover:text-white" title={`Add to ${stage}`}>+</button>
                </div>
              </div>
              <div className="space-y-2">
                {cards.map((a) => (
                  <div
                    key={a.id}
                    draggable
                    onDragStart={() => setDrag(a.id)}
                    onClick={() => setSelected(a)}
                    className="glass cursor-grab rounded-xl p-3 active:cursor-grabbing hover:border-white/30"
                  >
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold">{a.name.charAt(0)}</div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{a.name}</div>
                        <div className="truncate text-[11px] text-muted-foreground">{a.kind} · {a.handle}</div>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                      <span>{a.kind === "Music" ? `${a.streams} streams` : `${a.followers} followers`}</span>
                    </div>
                  </div>
                ))}
                {cards.length === 0 && <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-[11px] text-muted-foreground">Drop here</div>}
              </div>
            </div>
          );
        })}
      </div>
      <AnimatePresence>{selected && <ArtistPanel artist={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </>
  );
}

const fld = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-sm outline-none focus:border-white/40";
const lb = "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground";

function ArtistPanel({ artist, onClose }: { artist: Artist; onClose: () => void }) {
  const { update } = useOS();
  const [copied, setCopied] = useState(false);
  const [f, setF] = useState<Artist>(artist);
  const set = (p: Partial<Artist>) => setF((s) => ({ ...s, ...p }));

  function save() { update("artists", (all) => all.map((a) => (a.id === f.id ? f : a))); onClose(); }
  function del() { if (confirm(`Delete ${f.name}?`)) { update("artists", (all) => all.filter((a) => a.id !== f.id)); onClose(); } }
  function draftPitch() {
    const pitch = `Pitch: ${f.name} (${f.kind})\nHandle: ${f.handle}\nReach: ${f.kind === "Music" ? f.streams + " streams" : f.followers + " followers"}\n\n${f.name} is a standout ${f.kind.toLowerCase()} talent with strong regional pull. Proposing a development + release deal to scale their audience across TikTok, Instagram and DSPs.`;
    navigator.clipboard?.writeText(pitch).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  }
  return (
    <Portal>
      <motion.div className="fixed inset-0 z-[100] flex justify-end p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }} transition={{ type: "spring", stiffness: 260, damping: 30 }} className="glass-strong relative flex w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl p-6">
          <button onClick={onClose} className="glass absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full"><X className="h-4 w-4" /></button>
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-white/10 text-2xl font-bold">{f.name.charAt(0) || "?"}</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Edit artist</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2"><label className={lb}>Name</label><input className={fld} value={f.name} onChange={(e) => set({ name: e.target.value })} /></div>
            <div><label className={lb}>Type</label><select className={fld} value={f.kind} onChange={(e) => set({ kind: e.target.value as Artist["kind"] })}><option className="bg-[#0a0a0c]">Music</option><option className="bg-[#0a0a0c]">Influencer</option></select></div>
            <div><label className={lb}>Stage</label><select className={fld} value={f.stage} onChange={(e) => set({ stage: e.target.value as ScoutStage })}>{STAGES.map((s) => <option key={s} className="bg-[#0a0a0c]">{s}</option>)}</select></div>
            <div className="col-span-2"><label className={lb}>Handle</label><input className={fld} value={f.handle} onChange={(e) => set({ handle: e.target.value })} placeholder="@handle" /></div>
            <div><label className={lb}>Streams</label><input className={fld} value={f.streams} onChange={(e) => set({ streams: e.target.value })} placeholder="8.9M" /></div>
            <div><label className={lb}>Followers</label><input className={fld} value={f.followers} onChange={(e) => set({ followers: e.target.value })} placeholder="2.6M" /></div>
            <div className="col-span-2"><label className={lb}>Notes</label><textarea className={`${fld} min-h-16`} value={f.note ?? ""} onChange={(e) => set({ note: e.target.value })} placeholder="A&R notes…" /></div>
          </div>

          <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm">
            <span>On active roster (managed)</span>
            <button type="button" onClick={() => set({ managed: !f.managed })} className={`relative h-6 w-11 rounded-full transition-colors ${f.managed ? "bg-[oklch(0.82_0.18_150)]" : "bg-white/15"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${f.managed ? "left-[22px]" : "left-0.5"}`} /></button>
          </label>

          <div className="flex gap-2">
            <button onClick={save} className="flex-1 rounded-full bg-white py-2.5 text-sm font-semibold text-black">Save</button>
            <button onClick={draftPitch} className="glass inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm hover:bg-white/5">{copied ? <><Check className="h-4 w-4" /> Copied</> : <><Copy className="h-4 w-4" /> Pitch</>}</button>
            <button onClick={del} className="grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.7_0.2_20)]/40 text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10"><Trash2 className="h-4 w-4" /></button>
          </div>
        </motion.div>
      </motion.div>
    </Portal>
  );
}

/* ── Active roster profiles ─────────────────────────────────── */
function ActiveRoster() {
  const { artists } = useOS();
  const roster = artists.filter((a) => a.managed);
  const [msg, setMsg] = useState<string | null>(null);
  const [statsFor, setStatsFor] = useState<Artist | null>(null);
  function flash(t: string) { setMsg(t); setTimeout(() => setMsg(null), 1600); }
  function pressKit(a: Artist) {
    pressKitPdf(a);
    flash(`Press kit PDF generated for ${a.name}`);
  }
  return (
    <>
      {msg && <div className="mb-4 rounded-xl border border-[oklch(0.85_0.18_150)]/30 bg-[oklch(0.85_0.18_150)]/10 px-4 py-2 text-sm text-[oklch(0.85_0.18_150)]">{msg}</div>}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roster.map((a) => (
          <SpotlightCard key={a.id} className="p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 font-display text-lg font-bold">{a.name.charAt(0)}</div>
              <div><div className="font-display text-lg font-bold">{a.name}</div><div className="text-xs text-muted-foreground">{a.kind === "Music" ? <span className="inline-flex items-center gap-1"><Music2 className="h-3 w-3" /> Music</span> : <span className="inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> Influencer</span>} · {a.handle}</div></div>
            </div>
            <div className="mt-4 glass rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{a.kind === "Music" ? "Streams" : "Followers"}</div>
              <div className="mt-1 font-display text-2xl font-bold text-gradient-neon">{a.kind === "Music" ? a.streams : a.followers}</div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button onClick={() => pressKit(a)} className="inline-flex items-center justify-center gap-2 rounded-full bg-white py-2 text-sm font-medium text-black"><FileText className="h-4 w-4" /> Generate Press Kit (PDF)</button>
              <div className="flex gap-2">
                <button onClick={() => flash(`Deal split logged for ${a.name}`)} className="glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5"><DollarSign className="h-3.5 w-3.5" /> Log Deal Split</button>
                <button onClick={() => setStatsFor(a)} className="glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5"><BarChart3 className="h-3.5 w-3.5" /> Analytics</button>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </section>
      <AnimatePresence>{statsFor && <MarketStatsModal artist={statsFor} onClose={() => setStatsFor(null)} />}</AnimatePresence>
    </>
  );
}

/* ── Live DSP / market-data panel (RIPPL v3.0: DSP Feeds + Chartmetric/Soundcharts) ── */
function MarketStatsModal({ artist, onClose }: { artist: Artist; onClose: () => void }) {
  const [snap, setSnap] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getMarketSnapshot(artist.name).then((s) => { if (!cancelled) { setSnap(s); setLoading(false); } });
    return () => { cancelled = true; };
  }, [artist.name]);

  return (
    <ModalShell eyebrow="Market Intelligence" title={`${artist.name} — Live Stats`} onClose={onClose}>
      {loading && <div className="py-6 text-center text-sm text-muted-foreground">Fetching live stats…</div>}

      {!loading && snap?.youtube && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          {snap.youtube.thumbnail && <img src={snap.youtube.thumbnail} alt="" className="h-12 w-12 rounded-full" />}
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{snap.youtube.title}</div>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
              <span>{formatCount(snap.youtube.subscriberCount)} subscribers</span>
              <span>{formatCount(snap.youtube.viewCount)} views</span>
              <span>{snap.youtube.videoCount} videos</span>
            </div>
          </div>
        </div>
      )}
      {!loading && snap?.youtubeError && (
        <div className="mb-4 rounded-xl border border-[oklch(0.7_0.2_20)]/30 bg-[oklch(0.7_0.2_20)]/10 p-3 text-xs text-[oklch(0.8_0.2_20)]">YouTube lookup failed: {snap.youtubeError}</div>
      )}
      {!loading && !snap?.youtube && !snap?.youtubeError && (
        <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
          No live data source connected yet. Streaming trends, playlist placements and demographics come from a cross-platform aggregator (Chartmetric or Soundcharts) — Spotify and Apple don't publish that data publicly, only inside their own private artist dashboards.
        </div>
      )}

      {!loading && snap && (
        <div className="space-y-2">
          {snap.sources.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2 text-sm">
              <div className="min-w-0">
                <div className="font-medium">{s.label}</div>
                <div className="text-[11px] text-muted-foreground">{s.note}</div>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${s.configured ? "bg-[oklch(0.82_0.18_150)]/15 text-[oklch(0.82_0.18_150)]" : "bg-white/10 text-muted-foreground"}`}>
                {s.configured ? "Connected" : "Not connected"}
              </span>
            </div>
          ))}
        </div>
      )}
    </ModalShell>
  );
}

/* ── Deal sorter table ──────────────────────────────────────── */
function DealSorter() {
  const { deals, update } = useOS();
  const statusColor: Record<DealStatus, string> = {
    Pitching: "oklch(0.7 0.02 260)", Contracting: "oklch(0.8 0.16 80)", "In Production": "oklch(0.72 0.16 200)", Live: "oklch(0.85 0.18 150)", Paid: "oklch(0.7 0.28 328)",
  };
  return (
    <SpotlightCard className="p-6" spotlight={false}>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead><tr className="text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <th className="pb-3">Brand</th><th className="pb-3">Artist</th><th className="pb-3">Deliverables</th><th className="pb-3 text-right">Value</th><th className="pb-3 text-right">Split</th><th className="pb-3">Status</th>
          </tr></thead>
          <tbody>
            {deals.map((d) => (
              <tr key={d.id} className="border-t border-white/[0.06]">
                <td className="py-3 font-medium">{d.brand}</td>
                <td className="py-3 text-muted-foreground">{d.artist}</td>
                <td className="py-3 text-muted-foreground">{d.deliverables}</td>
                <td className="py-3 text-right font-mono">EGP {(d.value / 1000).toFixed(0)}K</td>
                <td className="py-3 text-right font-mono">{d.split}%</td>
                <td className="py-3">
                  <select
                    value={d.status}
                    onChange={(e) => update("deals", (all) => all.map((x) => (x.id === d.id ? { ...x, status: e.target.value as DealStatus } : x)))}
                    className="rounded-full border px-2.5 py-1 text-xs outline-none"
                    style={{ color: statusColor[d.status], borderColor: statusColor[d.status] + "66", background: statusColor[d.status] + "1a" }}
                  >
                    {DEAL_STATUSES.map((s) => <option key={s} className="bg-[#140a1e] text-white">{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {deals.length === 0 && <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No deals yet — log one from the + button.</td></tr>}
          </tbody>
        </table>
      </div>
    </SpotlightCard>
  );
}
