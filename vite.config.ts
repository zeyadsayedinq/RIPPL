// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/* Excalidraw touches `window` at module-evaluation time, so it must never be
   evaluated on the server. Every in-code guard (route `ssr: false`, the
   `typeof window` check around the dynamic import, dynamic CSS import) failed
   in production because the breakage happens at the BUNDLER level, not in app
   code: nitro bundles the package into `_libs/@excalidraw/excalidraw+[...].mjs`,
   and Rollup hoists the shared CommonJS interop shims for react/react-dom/
   jsx-runtime into that chunk. Result (verified by inspecting .output/server):
   every SSR route chunk contains
     `import { require_react, ... } from "../_libs/@excalidraw/excalidraw+[...].mjs"`
   so rendering ANY route — including "/" — eagerly evaluates Excalidraw and
   crashes with "ReferenceError: window is not defined".

   The only deterministic fix is to make sure no Excalidraw code exists in the
   server build at all: this plugin resolves every `@excalidraw/excalidraw*`
   import (JS and CSS subpaths) to an inert stub, but only for the SSR
   environment. The client build still gets the real package, which
   MoodboardCanvas dynamically imports behind a `typeof window` guard.
   (`ssr.external` was removed — it's what routed the package into `_libs`
   for nitro to bundle in the first place.) */
function excalidrawSsrStub(): Plugin {
  const STUB_ID = "\0excalidraw-ssr-stub";
  return {
    name: "rippl:excalidraw-ssr-stub",
    enforce: "pre",
    resolveId(id, _importer, opts) {
      const isServer =
        opts?.ssr === true ||
        // Vite environments API (client build has consumer === "client")
        this.environment?.config?.consumer === "server";
      if (isServer && (id === "@excalidraw/excalidraw" || id.startsWith("@excalidraw/excalidraw/"))) {
        return STUB_ID;
      }
      return null;
    },
    load(id) {
      if (id === STUB_ID) {
        // Matches the shape MoodboardCanvas uses; never rendered server-side.
        return "export const Excalidraw = () => null;\nexport default {};";
      }
      return null;
    },
  };
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [excalidrawSsrStub()],
  },
});
