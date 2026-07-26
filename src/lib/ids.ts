/* ═══════════════════════════════════════════════════════════
   ID GUARDS

   No imports on purpose. This is used by the snapshot-sweep modules, which
   are pulled in both by the TanStack Start app AND directly by the plain
   Vercel Node cron functions in api/ — so it must stay dependency-free.

   RIPPL has two kinds of id and they are NOT interchangeable:

     • Postgres rows use real uuids (gen_random_uuid()).
     • app_state records — campaigns, artists, notes, deals — use
       `${prefix}-${Date.now()}-${random}` (see uid() in os-store.tsx),
       e.g. "c-1753476912345".

   Several tables (tracked_videos, tracked_sounds) carry a nullable
   `campaign_id uuid` FK. Writing an app_state id into one makes Postgres
   reject the ENTIRE row with 22P02 "invalid input syntax for type uuid".
   That single mistake caused two separate user-visible failures:

     • logging a manual TikTok count returned "Couldn't save that — try again",
       which no amount of retrying could fix;
     • YouTube video tracking silently never persisted whenever a campaign
       happened to be active, so the velocity curve stayed empty.

   Those columns are documented as best-effort and nullable, so the correct
   behaviour is to drop a non-uuid rather than lose the whole write.
═══════════════════════════════════════════════════════════ */

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_RE.test(value.trim());
}

/** Returns the value only if it's a real uuid, otherwise null. */
export function asUuidOrNull(value: string | undefined | null): string | null {
  return isUuid(value) ? value.trim() : null;
}
