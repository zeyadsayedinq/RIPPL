import { useState } from "react";
import { Tag, Gauge, Copy, Check, TrendingUp, PlugZap } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import type {
  DeepAnalytics,
  VelocityPoint,
} from "@/lib/youtube-deep-analytics";

/* Presentational only — dashboard_.youtube.tsx owns fetching (calls
   analyzeYoutubeVideo / getVideoVelocity) and passes the results down.
   Matches PlatformDashboard.tsx's split: routes fetch, components render.
   Styled with RIPPL's existing tokens (glass, font-display, oklch accents)
   rather than a bespoke palette, so it sits naturally next to the rest of
   the YouTube campaign page.

   Everything here comes from the YouTube Data API + a local formula — no
   AI/LLM call, no API key beyond the YouTube key RIPPL already uses. */

const ACCENT = "oklch(0.65 0.24 20)"; // same red used for the YouTube platform accent elsewhere

const tooltipStyle = {
  background: "rgba(15,5,25,0.92)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  backdropFilter: "blur(20px)",
} as const;

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
function fmtNum(n: number): string {
  return n >= 1e6
    ? `${(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `${(n / 1e3).toFixed(1)}K`
      : String(n);
}

function ScoreRing({ score }: { score: number }) {
  const color =
    score >= 70
      ? "oklch(0.82 0.18 150)"
      : score >= 40
        ? "oklch(0.82 0.16 90)"
        : "oklch(0.7 0.2 20)";
  const r = 34,
    c = 2 * Math.PI * r;
  const offset = c - (Math.max(0, Math.min(100, score)) / 100) * c;
  return (
    <svg
      width="84"
      height="84"
      viewBox="0 0 84 84"
      className="shrink-0 -rotate-90"
    >
      <circle
        cx="42"
        cy="42"
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="8"
      />
      <circle
        cx="42"
        cy="42"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
      <text
        x="42"
        y="42"
        fill="white"
        fontSize="20"
        fontWeight="700"
        textAnchor="middle"
        dominantBaseline="middle"
        transform="rotate(90 42 42)"
        className="font-display"
      >
        {Math.round(score)}
      </text>
    </svg>
  );
}

function TagsCloud({ tags }: { tags: string[] }) {
  const [copied, setCopied] = useState(false);
  function copyAll() {
    navigator.clipboard?.writeText(tags.join(", ")).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          <Tag className="h-3.5 w-3.5" /> Tags ({tags.length})
        </div>
        {tags.length > 0 && (
          <button
            onClick={copyAll}
            className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] hover:bg-white/5"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}{" "}
            {copied ? "Copied" : "Copy all"}
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {tags.length === 0 ? (
          <span className="text-xs text-muted-foreground">
            No tags set on this video.
          </span>
        ) : (
          tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/80"
            >
              {t}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export function YouTubeDeepAnalytics({
  data,
  velocity,
  velocityReason,
}: {
  data: DeepAnalytics;
  velocity?: VelocityPoint[];
  velocityReason?: string;
}) {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4">
      {/* SEO score + tags */}
      <div className="col-span-12 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:grid-cols-[auto_1fr]">
        <div className="flex items-center gap-4">
          <ScoreRing score={data.seoScore} />
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <Gauge className="h-3.5 w-3.5" /> SEO Score
            </div>
            <div className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Computed locally from tag count, title length, description length,
              and tag/title keyword overlap — no AI, no external call.
            </div>
          </div>
        </div>
        <TagsCloud tags={data.tags} />
      </div>

      {/* SEO recommendations */}
      {data.seoRecommendations.length > 0 && (
        <div className="col-span-12 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            SEO Recommendations
          </div>
          <ul className="mt-2 space-y-1.5">
            {data.seoRecommendations.map((r, i) => (
              <li key={i} className="text-xs leading-relaxed text-white/80">
                · {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Velocity chart */}
      <div className="col-span-12 rounded-xl border border-white/10 bg-white/[0.02] p-4">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" /> View Velocity
        </div>
        {velocity && velocity.length > 1 ? (
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={velocity.map((p) => ({
                  date: fmtDate(p.date),
                  views: p.views,
                }))}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={fmtNum}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: "#fff" }}
                  formatter={(v: number) => fmtNum(v)}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke={ACCENT}
                  strokeWidth={2.5}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4">
            <PlugZap className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {velocityReason ||
                "YouTube doesn't expose historical view counts for other channels' videos — RIPPL builds this itself from daily snapshots. Check back after tomorrow's refresh (or the next time this video is analyzed)."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
