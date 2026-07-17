import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ComponentType } from "react";
import { useOS, type MoodboardScene } from "@/lib/os-store";
import "@excalidraw/excalidraw/index.css";

/* RIPPL v3.0 plan: "Excalidraw Embed (Moodboards) — visually map out music
   video treatments, creative direction, brand identities, and release
   rollouts right in the dashboard, saving the state to your database."

   Excalidraw touches window/canvas at import + render time, so it can't run
   during SSR. The `mounted`-state gate below stops *this component* from
   rendering it during SSR, but that alone wasn't enough: in production the
   SSR bundle was still invoking this lazy() factory on the Node server,
   crashing every route with "ReferenceError: window is not defined" — since
   OSProvider/CampaignProvider wrap the whole app, this took down "/" itself,
   not just /studio. Guard *inside* the factory too, so the real browser-only
   package can never actually be imported on the server no matter what
   triggers the factory call. */
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
