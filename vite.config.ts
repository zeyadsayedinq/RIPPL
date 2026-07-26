/* ═══════════════════════════════════════════════════════════
   RIPPL — Vite build configuration
   v1.2 · 2026

   Standalone config. Everything the build needs is declared here explicitly:
   Tailwind, tsconfig path aliases, TanStack Start, React, and Nitro for the
   production server bundle. Nothing is inherited from a wrapper package, so
   what you read here is exactly what runs.
═══════════════════════════════════════════════════════════ */

import { defineConfig, loadEnv, type Plugin, type PluginOption } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

/* Excalidraw touches `window` at module-evaluation time, so it must never be
   evaluated on the server. Every in-code guard (route `ssr: false`, the
   `typeof window` check around the dynamic import, dynamic CSS import) failed
   in production because the breakage happens at the BUNDLER level, not in app
   code: nitro bundles the package into `_libs/@excalidraw/excalidraw+[...].mjs`,
   and Rollup hoists the shared CommonJS interop shims for react/react-dom/
   jsx-runtime into that chunk. Result (verified by inspecting .output/server):
   every SSR route chunk contains
     `import { require_react, ... } from "../_libs/@excalidraw/excalidraw+[...].mjs"`
   so rendering ANY route — including "/" — eagerly evaluates the canvas library
   and crashes with "ReferenceError: window is not defined".

   The only deterministic fix is to make sure none of that code exists in the
   server build at all: this plugin resolves every `@excalidraw/excalidraw*`
   import (JS and CSS subpaths) to an inert stub, but only for the SSR
   environment. The client build still gets the real package, which
   MoodboardCanvas dynamically imports behind a `typeof window` guard.
   (`ssr.external` was removed — it's what routed the package into `_libs`
   for nitro to bundle in the first place.) */
function canvasSsrStub(): Plugin {
  const STUB_ID = "\0canvas-ssr-stub";
  return {
    name: "rippl:canvas-ssr-stub",
    enforce: "pre",
    resolveId(id, _importer, opts) {
      const isServer =
        opts?.ssr === true ||
        // Vite environments API (client build has consumer === "client")
        this.environment?.config?.consumer === "server";
      if (
        isServer &&
        (id === "@excalidraw/excalidraw" || id.startsWith("@excalidraw/excalidraw/"))
      ) {
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

export default defineConfig(async ({ command, mode }) => {
  /* VITE_* values are build-time, not runtime — they're inlined into the
     bundle here. Anything secret belongs in a server-only env var instead
     (see SUPABASE_SETUP.md). */
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), "VITE_"))) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const plugins: PluginOption[] = [
    canvasSsrStub(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Fail the build if client code imports anything server-only, rather
      // than shipping it to the browser.
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts
      // (our SSR error wrapper). nitro/vite builds from this.
      server: { entry: "server" },
    }),
  ];

  // Nitro produces the deployable server bundle, and only at build time. It
  // auto-detects the hosting target from the CI environment; the default below
  // is only the fallback when nothing is detected.
  if (command === "build") {
    const { nitro } = await import("nitro/vite");
    plugins.push(nitro({ defaultPreset: "cloudflare-module" }));
  }

  plugins.push(viteReact());

  return {
    define: envDefine,
    /* Lightning CSS in dev as well as build. Vite uses PostCSS in dev and only
       runs Lightning CSS at build, so build-time transforms (e.g. collapsing a
       hand-written `-webkit-backdrop-filter` to the prefixed form Chrome
       ignores) break the built output while the dev preview looks fine.
       Running it in both keeps the preview honest. */
    css: { transformer: "lightningcss" as const },
    resolve: {
      alias: { "@": `${process.cwd()}/src` },
      // One copy of React and the query client, or hooks break across chunks.
      dedupe: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@tanstack/react-query",
        "@tanstack/query-core",
      ],
    },
    /* Dep re-optimization rotates the optimized-dep hash and 504s tabs holding
       the old one; pre-bundle the always-present client deps and tolerate stale
       requests. React core only — including @tanstack/react-start would pull
       its node:async_hooks server entry into the client bundle and crash
       hydration. */
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
      ignoreOutdatedRequests: true,
    },
    server: { host: "::", port: 8080 },
    plugins,
  };
});
