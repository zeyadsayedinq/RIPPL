import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { useOS, type MoodboardScene } from "@/lib/os-store";
import "@excalidraw/excalidraw/index.css";

/* RIPPL v3.0 plan: "Excalidraw Embed (Moodboards) — visually map out music
   video treatments, creative direction, brand identities, and release
   rollouts right in the dashboard, saving the state to your database."

   Excalidraw touches window/canvas at import + render time, so it can't run
   during SSR. This runtime guard stops OUR code from ever calling into the
   real package on the server. It's paired with `ssr.external` in
   vite.config.ts, which stops Vite/Rollup's SSR bundler from bundling
   Excalidraw into the server output at all — without that, the server build
   was resolving/loading the chunk as part of handling every request even
   though this branch was never reached (confirmed via Vercel logs:
   `ModuleJob.run` — real module evaluation — fired regardless of this
   check). Since OSProvider/CampaignProvider wrap the whole app, this crashed
   "/" itself, not just /studio. Both pieces are required together. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the stub and the real Excalidraw component have deliberately incompatible prop shapes; this file is the only place either is used
const ExcalidrawLazy = lazy(async (): Promise<{ default: ComponentType<any> }> => {
  if (typeof window === "undefined") {
    return { default: () => null };
  }
  const m = await import("@excalidraw/excalidraw");
  return { default: m.Excalidraw };
});

export function MoodboardCanvas() {
  const { moodboardScene, update } = useOS();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Excalidraw's own AppState/element types aren't worth re-declaring here
  const handleChange = useCallback(
    (elements: readonly any[], appState: any) => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        // appState.collaborators is a Map (not JSON-serializable) and
        // irrelevant for a solo/local board — strip it before saving.
        const { collaborators: _collaborators, ...persistable } = appState as Record<string, unknown>;
        const scene: MoodboardScene = { elements: elements as unknown[], appState: persistable };
        update("moodboardScene", () => scene);
      }, 800);
    },
    [update],
  );

  if (!mounted) {
    return (
      <div className="grid h-[70vh] place-items-center rounded-2xl border border-white/10 bg-white/[0.02] text-sm text-muted-foreground">
        Loading canvas…
      </div>
    );
  }

  return (
    <div className="h-[70vh] overflow-hidden rounded-2xl border border-white/10">
      <Suspense fallback={<div className="grid h-full place-items-center text-sm text-muted-foreground">Loading canvas…</div>}>
        <ExcalidrawLazy
          initialData={{
            elements: (moodboardScene?.elements as never[]) ?? [],
            appState: { ...(moodboardScene?.appState as object), theme: "dark" },
            scrollToContent: true,
          }}
          onChange={handleChange}
        />
      </Suspense>
    </div>
  );
}
