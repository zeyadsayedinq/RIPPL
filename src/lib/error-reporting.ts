/* Local error logger (no third-party reporting). */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof console !== "undefined") console.error("[RIPPL]", context, error);
}
