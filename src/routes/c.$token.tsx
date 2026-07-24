import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Users, Radio } from "lucide-react";
import { getSharedCampaign, type SharedCampaignView } from "@/lib/campaign-share";

/* Public, read-only, no-login client dashboard link — /c/$token. Same
   "bypass the auth gate entirely" pattern as /s (see routes/s.tsx +
   __root.tsx's isPublic check), but for a campaign summary instead of a
   single shared track. Data comes from getSharedCampaign() (campaign-share.ts),
   which already stripped anything price-sensitive server-side — this page
   just renders whatever it receives, no client-side gating needed. */

export const Route = createFileRoute("/c/$token")({
  head: () => ({ meta: [{ title: "Shared campaign · RIPPL" }, { name: "robots", content: "noindex" }] }),
  component: SharedCampaignPage,
});

const statusColor: Record<string, string> = {
  Draft: "oklch(0.75 0.02 260)",
  "Under Review": "oklch(0.82 0.16 90)",
  Approved: "oklch(0.82 0.18 150)",
  "Needs Revision": "oklch(0.7 0.2 20)",
};

function SharedCampaignPage() {
  const { token } = Route.useParams();
  const [data, setData] = useState<SharedCampaignView | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getSharedCampaign({ data: { token } })
      .then((res) => {
        if (cancelled) return;
        if (!res.ok || !res.data) setError(res.error || "This share link is invalid or has expired.");
        else setData(res.data);
      })
      .catch((e) => !cancelled && setError(e?.message || String(e)))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [token]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-4 py-10 font-mono text-white">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.08 300) 0%, transparent 65%)" }} />

      <div className="relative mx-auto max-w-2xl">
        <div className="text-center text-[11px] uppercase tracking-[0.4em] text-white/40">RIPPL // CLIENT VIEW</div>

        {loading && <div className="mt-16 text-center text-sm text-white/50">Loading…</div>}
        {error && !loading && (
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center text-sm text-white/50">
            {error}
          </div>
        )}

        {data && !loading && (
          <>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-xs uppercase tracking-[0.3em] text-white/40">{data.status}</div>
              <h1 className="mt-1 text-2xl font-bold">
                {data.artist} <span className="text-white/40">—</span> {data.title}
              </h1>
              {data.subtitle && <p className="mt-1 text-sm text-white/60">{data.subtitle}</p>}
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/50">
                <span>{data.startDate || "TBC"} → {data.endDate || "TBC"}</span>
                {data.platforms.length > 0 && <span>{data.platforms.join(" · ")}</span>}
              </div>
              {data.goal && (
                <div className="mt-3 rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-white/70">Goal: {data.goal}</div>
              )}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/40">Rollout progress</div>
                <div className="text-xl font-bold">{data.taskProgress}%</div>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-white" style={{ width: `${data.taskProgress}%` }} />
              </div>
              {data.checklist.length > 0 && (
                <div className="mt-4 space-y-2">
                  {data.checklist.map((p) => (
                    <div key={p.phase} className="flex items-center justify-between text-xs text-white/70">
                      <span className="flex items-center gap-1.5">
                        {p.done === p.total && p.total > 0 ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-[oklch(0.82_0.18_150)]" />
                        ) : (
                          <Circle className="h-3.5 w-3.5 text-white/25" />
                        )}
                        {p.phase}
                      </span>
                      <span className="text-white/40">{p.done}/{p.total}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {data.creators.length > 0 && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
                  <Users className="h-3.5 w-3.5" /> Creators ({data.creators.length})
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.creators.map((c) => (
                    <span key={c.handle} className="rounded-full bg-white/[0.06] px-3 py-1 text-xs">
                      {c.name} · {c.handle} · {c.status}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40">
                <Radio className="h-3.5 w-3.5" /> Creative status
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {Object.entries(data.assetStatusCounts).map(([status, count]) => (
                  <div key={status} className="rounded-lg border border-white/10 bg-white/[0.02] p-3 text-center">
                    <div className="text-lg font-bold" style={{ color: statusColor[status] }}>{count}</div>
                    <div className="mt-0.5 text-[9px] uppercase tracking-wider text-white/40">{status}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] tracking-wider text-white/25">
              View-only · shared via RIPPL · pricing and internal notes are never included on this page
            </p>
          </>
        )}
      </div>
    </div>
  );
}
