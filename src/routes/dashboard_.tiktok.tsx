import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlatformDashboard, fmt, type PlatformConfig, type PlatformPanelState } from "@/components/PlatformDashboard";
import { SpotlightCard } from "@/components/SpotlightCard";
import { SoundVelocityChart } from "@/components/SoundVelocityChart";
import { useCampaigns } from "@/lib/campaign-store";
import { getTikTokSoundStats, getSoundVelocity, logManualTikTokCount, type SoundVelocityPoint } from "@/lib/platform-live";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Music4, Radio, Video, PenLine, Loader2, Check, Zap } from "lucide-react";

/* TikTok sound scanner — real "creations using this sound" count for the
   campaign's linked sound, via Soundcharts (see platform-live.ts for why
   Soundcharts rather than TikTok's own API). Video count is the ONLY
   per-sound TikTok metric Soundcharts tracks — no likes/views/comments/
   shares breakdown exists for TikTok on their platform, confirmed against
   their live docs, so this panel only ever shows the one real number. */

const cfg: PlatformConfig = {
  name: "TikTok",
  icon: Music4,
  accent: "oklch(0.72 0.2 200)",
  paidLabel: "Spark Ads",
  panelTitle: "Sound Performance",
  panelIcon: Radio,
  subtitle: "Real sound-usage count for the linked TikTok sound.",
  managerCtas: [
    { label: "Push to Spark Ads", icon: Zap, href: "https://ads.tiktok.com/" },
  ],
};

async function accessToken(): Promise<string | undefined> {
  if (!isSupabaseConfigured || !supabase) return undefined;
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token;
}

function TikTokDashboard() {
  const { active, updateActiveLinks } = useCampaigns();
  const [panel, setPanel] = useState<PlatformPanelState>({ loading: false, connected: false });
  const [velocity, setVelocity] = useState<SoundVelocityPoint[] | undefined>(undefined);
  const [velocityReason, setVelocityReason] = useState<string | undefined>(undefined);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const url = active?.links?.tiktokSound;
    if (!url) { setPanel({ loading: false, connected: false, reason: "No TikTok sound linked yet. Paste the sound's TikTok URL below to scan it." }); setVelocity(undefined); return; }
    setPanel({ loading: true, connected: false });
    setVelocity(undefined);
    setVelocityReason(undefined);
    (async () => {
      const token = await accessToken();
      const res = await getTikTokSoundStats({ data: { tiktokSoundUrl: url, accessToken: token, campaignId: active?.id } }).catch((e) => ({
        ok: false as const,
        reason: e?.message || String(e),
      }));
      if (!res.ok || !res.data) { setPanel({ loading: false, connected: false, reason: res.reason, helpHref: "/settings" }); }
      else {
        const d = res.data;
        setPanel({
          loading: false, connected: true, views: d.videoCount,
          stats: [
            { icon: Video, label: "Creations with sound", value: fmt(d.videoCount), hint: d.asOf ? `as of ${d.asOf}` : "Creations using this sound" },
          ],
        });
      }

      // Fetched right after the panel data — same account access token, no
      // extra round trip for the user. See getSoundVelocity in platform-live.ts.
      // Runs regardless of whether the live panel connected, since manually
      // logged snapshots can still exist even when Soundcharts can't help.
      const vel = await getSoundVelocity({ data: { tiktokSoundUrl: url, accessToken: token } }).catch((e) => ({
        ok: false as const,
        reason: e?.message || String(e),
      }));
      if (vel.ok && vel.data) setVelocity(vel.data);
      else setVelocityReason(vel.reason);
    })();
  }, [active?.id, active?.links?.tiktokSound, refreshKey]);

  const soundUrl = active?.links?.tiktokSound;

  return (
    <PlatformDashboard
      cfg={cfg} panel={panel}
      linkEditor={{
        value: soundUrl ?? "",
        placeholder: "Paste the TikTok sound URL (e.g. tiktok.com/music/...)",
        onSave: (v) => updateActiveLinks({ tiktokSound: v || undefined }),
      }}
      extra={
        soundUrl ? (
          <SpotlightCard className="mt-4 p-5" spotlight={false}>
            <SoundVelocityChart velocity={velocity} reason={velocityReason} />
            <ManualCountEntry tiktokSoundUrl={soundUrl} campaignId={active?.id} onLogged={() => setRefreshKey((k) => k + 1)} />
          </SpotlightCard>
        ) : undefined
      }
    />
  );
}

/** Fallback for links Soundcharts can't match (original sounds) or free-tier
 *  accounts without the audience endpoint — see looksLikeOriginalSound in
 *  soundcharts-snapshot-sweep.ts. Always available, not just when the API
 *  panel fails, since even a connected sound might need a manual correction. */
function ManualCountEntry({
  tiktokSoundUrl,
  campaignId,
  onLogged,
}: {
  tiktokSoundUrl: string;
  campaignId?: string;
  onLogged: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function submit() {
    const n = Number(count);
    if (!Number.isFinite(n) || n < 0) { setError("Enter a valid number."); return; }
    setBusy(true);
    setError(null);
    try {
      const token = await accessToken();
      const res = await logManualTikTokCount({ data: { tiktokSoundUrl, accessToken: token, campaignId, videoCount: n } });
      if (!res.ok) { setError(res.reason || "Couldn't log that."); setBusy(false); return; }
      setDone(true);
      setCount("");
      onLogged();
      setTimeout(() => { setDone(false); setOpen(false); }, 1500);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-white">
        <PenLine className="h-3 w-3" /> Log today's count manually
      </button>
    );
  }
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <input
        type="number" min={0} inputMode="numeric"
        value={count} onChange={(e) => setCount(e.target.value)}
        placeholder="Video count seen on TikTok"
        className="min-w-[180px] flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
      />
      <button onClick={submit} disabled={busy || !count} className="shrink-0 rounded-lg bg-white px-3 py-2 text-xs font-medium text-black disabled:opacity-30">
        {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : done ? <Check className="h-3.5 w-3.5" /> : "Log"}
      </button>
      <button onClick={() => setOpen(false)} className="text-[11px] text-muted-foreground hover:text-white">Cancel</button>
      {error && <div className="w-full text-[11px] text-destructive">{error}</div>}
    </div>
  );
}

export const Route = createFileRoute("/dashboard_/tiktok")({
  head: () => ({ meta: [{ title: "TikTok · RIPPL 360" }, { name: "description", content: "TikTok campaign command." }] }),
  component: TikTokDashboard,
});
