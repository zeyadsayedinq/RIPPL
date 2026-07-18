// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    ssr: {
      // @excalidraw/excalidraw touches `window` at module-evaluation time and
      // is only ever dynamically imported client-side (see
      // src/components/MoodboardCanvas.tsx). Without this, Rollup's SSR
      // bundler was still resolving/inlining that dynamic import into the
      // server build, so it got evaluated on every request (crashing "/"
      // with "ReferenceError: window is not defined") regardless of the
      // runtime guard around the import call. Marking it external keeps it
      // out of the server bundle's module graph entirely.
      external: ["@excalidraw/excalidraw"],
    },
  },
});
