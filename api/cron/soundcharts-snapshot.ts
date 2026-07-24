/* Vercel Cron target — same setup as api/cron/youtube-snapshot.ts, see that
   file for the full explanation of why this lives at the repo ROOT /api
   folder instead of inside src/routes. This one drives the TikTok sound
   video-count growth chart the same way the other drives YouTube view
   velocity: daily re-fetch + snapshot via runSoundSnapshotSweep()
   (src/lib/soundcharts-snapshot-sweep.ts). See vercel.json for the schedule. */
import { runSoundSnapshotSweep } from "../../src/lib/soundcharts-snapshot-sweep";

interface CronRequest {
  headers: Record<string, string | string[] | undefined>;
}
interface CronResponse {
  status: (code: number) => { json: (body: Record<string, unknown>) => void };
}

export default async function handler(req: CronRequest, res: CronResponse) {
  // Same CRON_SECRET as the YouTube cron — see .env.example.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers?.authorization || req.headers?.Authorization;
    if (auth !== `Bearer ${secret}`) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  try {
    const result = await runSoundSnapshotSweep();
    res.status(200).json({ success: true, ...result });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ success: false, error: message });
  }
}
