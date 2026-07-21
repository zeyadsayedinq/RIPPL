import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  PlatformDashboard,
  fmt,
  type PlatformConfig,
  type PlatformPanelState,
} from "@/components/PlatformDashboard";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { YouTubeDeepAnalytics } from "@/components/YouTubeDeepAnalytics";
import { useCampaigns } from "@/lib/campaign-store";
import { getVideoStats, youtubeConfigured } from "@/lib/youtube-api";
import {
  analyzeYoutubeVideo,
  getVideoVelocity,
  type DeepAnalytics,
  type VelocityPoint,
} from "@/lib/youtube-deep-analytics";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  Youtube,
  PlaySquare,
  Eye,
  ThumbsUp,
  MessageCircle,
  Search,
  Loader2,
} from "lucide-react";

/* YouTube — real, live view/like/comment counts for the campaign's linked
   video via the Data API v3 (already working elsewhere in the app — see
   youtube-api.ts). Retention/completion-rate/est.-revenue (the old fake
   panel) need YouTube Analytics OAuth on the channel owner's account, not
   just an API key, so they're out of scope here — this panel only shows
   numbers the public API can actually give us. */

const cfg: PlatformConfig = {
  name: "YouTube",
  icon: Youtube,
  accent: "oklch(0.65 0.24 20)",
  paidLabel: "Paid",
  panelTitle: "Video Performance",
  panelIcon: PlaySquare,
  subtitle: "Real view/like/comment counts for the linked video.",
};

function YoutubeDashboard() {
  const { active, updateActiveLinks } = useCampaigns();
  const [panel, setPanel] = useState<PlatformPanelState>({
    loading: false,
    connected: false,
  });

  useEffect(() => {
    const url = active?.links?.youtube;
    if (!youtubeConfigured) {
      setPanel({
        loading: false,
        connected: false,
        reason:
          "VITE_YOUTUBE_API_KEY isn't set. Add it in Vercel env vars, then redeploy.",
        helpHref: "/settings",
      });
      return;
    }
    if (!url) {
      setPanel({
        loading: false,
        connected: false,
        reason: "No YouTube video linked yet. Paste the video URL below.",
      });
      return;
    }
    setPanel({ loading: true, connected: false });
    getVideoStats(url)
      .then((stats) => {
        if (!stats) {
          setPanel({
            loading: false,
            connected: false,
            reason: "Video not found — check the link.",
          });
          return;
        }
        setPanel({
          loading: false,
          connected: true,
          views: stats.viewCount,
          stats: [
            {
              icon: Eye,
              label: "Views",
              value: fmt(stats.viewCount),
              hint: stats.title,
            },
            {
              icon: ThumbsUp,
              label: "Likes",
              value: stats.likeCount === null ? "hidden" : fmt(stats.likeCount),
              hint: "public like count",
            },
            {
              icon: MessageCircle,
              label: "Comments",
              value: fmt(stats.commentCount),
              hint: "top-level comments",
            },
          ],
        });
      })
      .catch((e) =>
        setPanel({
          loading: false,
          connected: false,
          reason: e?.message || String(e),
        }),
      );
  }, [active?.id, active?.links?.youtube]);

  return (
    <PlatformDashboard
      cfg={cfg}
      panel={panel}
      linkEditor={{
        value: active?.links?.youtube ?? "",
        placeholder: "Paste the YouTube video URL",
        onSave: (v) => updateActiveLinks({ youtube: v || undefined }),
      }}
      extra={
        <DeepAnalyticsPanel
          defaultUrl={active?.links?.youtube}
          campaignId={active?.id}
        />
      }
    />
  );
}

/* Video Intel — vidIQ/TubeBuddy-style SEO panel for any pasted YouTube
   video (not just the one linked to this campaign — useful for A&R/scouting
   research on competitor or reference videos too). Tags, SEO score, and
   view velocity, all from the YouTube Data API + a local formula — no
   AI/LLM call, no extra API key. Fetching lives here per the
   PlatformDashboard convention (routes fetch, components render);
   YouTubeDeepAnalytics itself is purely presentational. */
function DeepAnalyticsPanel({
  defaultUrl,
  campaignId,
}: {
  defaultUrl?: string;
  campaignId?: string;
}) {
  const [url, setUrl] = useState(defaultUrl ?? "");
  useEffect(() => {
    if (defaultUrl) setUrl(defaultUrl);
  }, [defaultUrl]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DeepAnalytics | null>(null);
  const [velocity, setVelocity] = useState<VelocityPoint[] | undefined>(
    undefined,
  );
  const [velocityReason, setVelocityReason] = useState<string | undefined>(
    undefined,
  );

  async function accessToken(): Promise<string | undefined> {
    if (!isSupabaseConfigured || !supabase) return undefined;
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token;
  }

  async function analyze() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setVelocity(undefined);
    setVelocityReason(undefined);
    try {
      const token = await accessToken();
      const res = await analyzeYoutubeVideo({
        data: { videoUrl: url.trim(), accessToken: token, campaignId },
      });
      if (!res.ok || !res.data) {
        setError(res.reason || "Analysis failed.");
        setLoading(false);
        return;
      }
      setResult(res.data);
      setLoading(false);

      const vel = await getVideoVelocity({
        data: { youtubeVideoId: res.data.videoId, accessToken: token },
      }).catch((e) => ({
        ok: false as const,
        reason: String(e?.message || e),
      }));
      if (vel.ok && vel.data) setVelocity(vel.data);
      else setVelocityReason(vel.reason);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
      setLoading(false);
    }
  }

  return (
    <SpotlightCard className="mt-4 p-5" spotlight={false}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <Search className="h-3.5 w-3.5" /> Video Intel
          </div>
          <h2 className="mt-1 font-display text-xl font-bold">
            Tags, SEO score, and view velocity
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste any YouTube video — this campaign's, a competitor's, or a
            scouting reference — for its tags, an SEO score, and a growth curve
            RIPPL builds from daily snapshots.
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a YouTube video URL"
          className="min-w-[220px] flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
          onKeyDown={(e) => {
            if (e.key === "Enter") analyze();
          }}
        />
        <MagneticButton onClick={analyze}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}{" "}
          {loading ? "Analyzing…" : "Analyze"}
        </MagneticButton>
      </div>

      {error && (
        <div className="mt-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-xs leading-relaxed text-muted-foreground">
          {error}
        </div>
      )}

      {result && (
        <YouTubeDeepAnalytics
          data={result}
          velocity={velocity}
          velocityReason={velocityReason}
        />
      )}
    </SpotlightCard>
  );
}

export const Route = createFileRoute("/dashboard_/youtube")({
  head: () => ({
    meta: [
      { title: "YouTube · RIPPL 360" },
      { name: "description", content: "YouTube campaign command." },
    ],
  }),
  component: YoutubeDashboard,
});
