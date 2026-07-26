import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
/* The XP skin. A second, UNLAYERED stylesheet loaded after appCss — every
   Tailwind rule sits inside @layer, and unlayered CSS outranks layered CSS,
   so this wins without touching a single component. Keyed on
   <html data-skin="xp">; drop the attribute and the neon app returns. */
import xpCss from "../styles/xp.css?url";
import { reportError } from "../lib/error-reporting";
import { RoleProvider } from "../lib/role-context";
import { CampaignProvider } from "../lib/campaign-store";
import { OSProvider } from "../lib/os-store";
import { WindowProvider, useWindows } from "../lib/window-store";
import { AppGate } from "../components/AppGate";
import { XPChrome } from "../components/xp/XPShell";
import { BSOD, BootScreen, ShutdownScreen } from "../components/xp/SystemScreens";

/* The error boundaries render OUTSIDE WindowProvider (that's the point of a
   boundary), so they read the skin off the DOM rather than from context. */
function isXP() {
  return typeof document !== "undefined" && document.documentElement.getAttribute("data-skin") === "xp";
}

function NotFoundComponent() {
  const [xp, setXp] = useState(false);
  useEffect(() => setXp(isXP()), []);

  if (xp) {
    return (
      <XPErrorDialog title="RIPPL" heading="Cannot find file">
        <p style={{ margin: 0 }}>
          Windows cannot find <b>{typeof window !== "undefined" ? window.location.pathname : ""}</b>.
        </p>
        <p style={{ margin: "10px 0 0", color: "#4A4A42" }}>
          Make sure you typed the name correctly, and then try again.
        </p>
      </XPErrorDialog>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const [xp, setXp] = useState(false);
  useEffect(() => {
    reportError(error, { boundary: "root_error_component" });
    setXp(isXP());
  }, [error]);

  /* A crash under the XP skin is a Stop error, with the real stack in the
     technical information block. */
  if (xp) {
    return <BSOD error={error} onReset={() => { router.invalidate(); reset(); }} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RIPPL · My Universe" },
      { name: "description", content: "Zeyad's universe — every artist, release, deal, contract, campaign and build, in one operating system." },
      { property: "og:title", content: "RIPPL · My Universe" },
      { property: "og:description", content: "More than a dashboard — the operating system for everything Zeyad builds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: xpCss },
      { rel: "icon", href: "/icon.svg", type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

/* Standalone XP dialog — used by the boundaries, which can't reach the
   window manager. */
function XPErrorDialog({
  title, heading, children,
}: { title: string; heading: string; children: ReactNode }) {
  return (
    <div className="xp-chrome" style={{
      minHeight: "100vh", display: "grid", placeItems: "center", padding: 18,
      background: "linear-gradient(180deg,#1F4FA8 0%,#4A8FD8 60%,#8FC4EC 100%)",
      fontFamily: 'Tahoma, "Segoe UI", sans-serif',
    }}>
      <div style={{
        width: "100%", maxWidth: 380, background: "#ECE9D8",
        border: "1px solid #0831D9", borderTop: "none", borderRadius: "8px 8px 0 0",
        boxShadow: "3px 3px 12px rgba(0,0,0,.45)", overflow: "hidden",
      }}>
        <div style={{
          height: 28, display: "flex", alignItems: "center", padding: "0 8px",
          background: "linear-gradient(180deg,#0058EE 0%,#3F8CF3 8%,#1868E0 40%,#0F5BD8 88%,#3F8CF3 100%)",
          borderRadius: "7px 7px 0 0", color: "#fff", fontSize: 12, fontWeight: "bold",
          textShadow: "1px 1px 1px rgba(0,0,0,.5)",
        }}>
          {title}
        </div>
        <div style={{ display: "flex", gap: 12, padding: "18px 16px", fontSize: 12, color: "#000", lineHeight: 1.55 }}>
          <svg width="34" height="34" viewBox="0 0 32 32" style={{ flex: "0 0 34px" }} aria-hidden="true">
            <circle cx="16" cy="16" r="13" fill="#C4402A" stroke="#8A2A18" strokeWidth="2" />
            <path d="M10 10l12 12M22 10L10 22" stroke="#fff" strokeWidth="3.5" />
          </svg>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: "0 0 8px", fontWeight: "bold" }}>{heading}</p>
            {children}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 14px 16px" }}>
          <a href="/" style={{
            background: "linear-gradient(180deg,#fdfdfc 0%,#ece9d8 45%,#d9d5c5 100%)",
            border: "1px solid #ACA899", borderRadius: 3, padding: "4px 20px",
            fontSize: 12, color: "#000", textDecoration: "none",
            boxShadow: "inset 0 0 0 1px #fff",
          }}>
            OK
          </a>
        </div>
      </div>
    </div>
  );
}

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // /s = shared track, /c/$token = shared read-only client campaign view — both bypass the gate.
  const isPublic = pathname === "/s" || pathname.startsWith("/s/") || pathname.startsWith("/c/");

  return (
    <QueryClientProvider client={queryClient}>
      {isPublic ? (
        <Outlet />
      ) : (
        /* WindowProvider sits ABOVE the gate on purpose: it's what puts
           data-skin on <html>, so the login screen is already skinned, and
           it owns the boot sequence, which must run before login the way
           a real machine does. */
        <WindowProvider>
          <BootGate>
            {/* Access gate: Supabase Auth when configured, else master-password. */}
            <AppGate>
              {/* Providers live at the root so every route (at any nesting level) has context. */}
              <OSProvider>
                <CampaignProvider>
                  <RoleProvider>
                    <Shell />
                  </RoleProvider>
                </CampaignProvider>
              </OSProvider>
            </AppGate>
          </BootGate>
        </WindowProvider>
      )}
    </QueryClientProvider>
  );
}

/* Boot / shutdown take over the whole screen, before anything else mounts. */
function BootGate({ children }: { children: ReactNode }) {
  const { phase, skin } = useWindows();
  if (skin !== "xp") return <>{children}</>;
  if (phase === "boot") return <BootScreen />;
  if (phase === "shutdown" || phase === "off") return <ShutdownScreen />;
  return <>{children}</>;
}

function Shell() {
  const { skin } = useWindows();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  /* Under XP the desktop IS the home screen, so "/" renders no route
     window — just wallpaper and icons. Every other route renders its
     page inside the route window (see AppShell). */
  const desktopOnly = skin === "xp" && pathname === "/";

  return (
    <>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      {!desktopOnly && <Outlet />}
      {skin === "xp" && <XPChrome />}
    </>
  );
}
