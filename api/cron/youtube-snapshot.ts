/* Vercel Cron target — a plain Node serverless function living at the repo
   ROOT /api folder, deliberately OUTSIDE src/routes (TanStack Router) and
   outside TanStack Start's createServerFn RPC layer. Vercel auto-detects
   any file under /api as its own serverless function regardless of which
   frontend framework the rest of the repo uses, so this works whether or
   not TanStack Start's own catch-all route ends up handling everything
   else. See vercel.json for the daily schedule.

   Calls the same runSnapshotSweep() used by the manual "Refresh views"
   button (src/lib/youtube-deep-analytics.ts → refreshTrackedVideoSnapshots)
   so there's exactly one implementation of "re-fetch every tracked video's
   stats and snapshot them" — this file is just the scheduler's entry point.

   Minimal local req/res types (avoids adding @vercel/node as a dependency
   just for types) — Vercel's Node runtime passes the classic (req, res)
   signature, a structural subset of which is all this handler needs. */
import { runSnapshotSweep } from "../../src/lib/youtube-snapshot-sweep";

interface CronRequest {
  headers: Record<string, string | string[] | undefined>;
}
interface CronResponse {
  status: (code: number) => { json: (body: Record<string, unknown>) => void };
}

export default async function handler(req: CronRequest, res: CronResponse) {
  // Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` automatically
  // when CRON_SECRET is set in env vars — see .env.example. Without it set,
  // this endpoint is left open (fine for a single-user personal tool, but
  // set CRON_SECRET if you'd rather not have it publicly triggerable).
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers?.authorization || req.headers?.Authorization;
    if (auth !== `Bearer ${secret}`) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  try {
    const result = await runSnapshotSweep();
    res.status(200).json({ success: true, ...result });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ success: false, error: message });
  }
}
