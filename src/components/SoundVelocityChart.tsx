import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, PlugZap } from "lucide-react";
import type { SoundVelocityPoint } from "@/lib/platform-live";

/* Growth chart for the TikTok sound scanner — same "we build our own
   history from daily snapshots" story as YouTubeDeepAnalytics' view
   velocity chart, just for Soundcharts' one TikTok metric (video count)
   instead of views/likes/comments. Kept as its own small component rather
   than folded into YouTubeDeepAnalytics.tsx since the two panels don't
   otherwise share layout — this one only ever renders a single line. */

const ACCENT = "oklch(0.72 0.2 200)"; // same teal used for the TikTok platform accent elsewhere

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
  return n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : String(n);
}

export function SoundVelocityChart({
  velocity,
  reason,
}: {
  velocity?: SoundVelocityPoint[];
  reason?: string;
}) {
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
        <TrendingUp className="h-3.5 w-3.5" /> Sound Video-Count Growth
      </div>
      {velocity && velocity.length > 1 ? (
        <div className="mt-3 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={velocity.map((p) => ({ date: fmtDate(p.date), videoCount: p.videoCount }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={fmtNum} />
              <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "#fff" }} formatter={(v: number) => fmtNum(v)} />
              <Line type="monotone" dataKey="videoCount" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="mt-3 flex items-start gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4">
          <PlugZap className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            {reason ||
              "Soundcharts doesn't expose historical video counts either — RIPPL builds this itself from daily snapshots (api/cron/soundcharts-snapshot.ts). Check back tomorrow."}
          </p>
        </div>
      )}
    </div>
  );
}
