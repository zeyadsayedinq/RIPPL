/* ═══════════════════════════════════════════════════════════
   RIPPL — product identity

   Single source of truth for the version string and the copyright line.
   Import from here rather than hard-coding a year anywhere, so a release
   bump is one edit instead of a search-and-replace across the app.
═══════════════════════════════════════════════════════════ */

export const APP_NAME = "RIPPL";
export const APP_VERSION = "1.2";
export const APP_YEAR = "2026";

/** "RIPPL v1.2 · 2026" — used in the footer, settings and generated documents. */
export const APP_RELEASE = `${APP_NAME} v${APP_VERSION} · ${APP_YEAR}`;

/** Long form for PDF footers and print output. */
export const APP_COPYRIGHT = `© ${APP_YEAR} ${APP_NAME} — ${APP_NAME} v${APP_VERSION}. All rights reserved.`;

/** Used in <title> and meta description defaults. */
export const APP_TAGLINE =
  "360° operating system for artist management, distribution, marketing and revenue.";
