import { useEffect, useRef, useState } from "react";
import { ExternalLink, Loader2, PlugZap, RefreshCw } from "lucide-react";
import { getLiveEmbed, type OEmbedResult } from "@/lib/oembed";

/* Renders a real TikTok/Instagram oEmbed once a creator's video is live —
   see lib/oembed.ts. The returned `html` is TikTok/Instagram's own
   <blockquote> embed markup; browsers don't execute <script> tags inserted
   via innerHTML, so their embed.js is (re)injected manually below — the
   standard trick for hydrating third-party oEmbeds inside a React SPA
   (their script safely re-scans the whole page for un-hydrated blockquotes
   each time it runs). Falls back to the oEmbed JSON's thumbnail/author/title
   — still real, live data — if the interactive player fails to hydrate. */

export function LiveEmbedCard({ url }: { url: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<OEmbedResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  async function fetchEmbed() {
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await getLiveEmbed({ data: { url: url.trim() } });
      if (!res.ok || !res.data) {
        setError(res.reason || "Couldn't load a live embed for that link.");
      } else {
        setResult(res.data);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  // Auto-fetch once when a live URL is already saved (e.g. reopening the
  // creator later) — no need to click Refresh every time.
  useEffect(() => {
    if (url.trim()) void fetchEmbed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    if (!result?.html || !containerRef.current) return;
    containerRef.current.innerHTML = result.html;
    const src = result.providerName === "TikTok" ? "https://www.tiktok.com/embed.js" : "https://www.instagram.com/embed.js";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    containerRef.current.appendChild(script);
  }, [result]);

  if (!url.trim()) return null;

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Live post {result ? `· ${result.providerName}` : ""}
        </div>
        <button
          onClick={fetchEmbed}
          disabled={loading}
          className="inline-flex items-center gap-1 text-[10px] text-muted-foreground hover:text-white disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />} Refresh
        </button>
      </div>

      {loading && !result && (
        <div className="mt-3 grid place-items-center rounded-lg border border-dashed border-white/10 p-6 text-xs text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-lg border border-dashed border-white/15 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-muted-foreground">
          <PlugZap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/40" /> {error}
        </div>
      )}

      {result && (
        <div className="mt-3">
          {/* Real interactive embed — hydrated by the platform's own embed.js above. */}
          <div ref={containerRef} className="max-h-[420px] overflow-hidden rounded-lg [&_iframe]:max-w-full" />
          {result.thumbnailUrl && (
            <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
              {result.authorName && <span>{result.authorName}</span>}
              {result.title && <span className="truncate">· {result.title}</span>}
            </div>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-1.5 text-xs text-[oklch(0.85_0.18_200)] hover:underline"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open live post
          </a>
        </div>
      )}
    </div>
  );
}
