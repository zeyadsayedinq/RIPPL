/* Vercel Cron target — Monday-morning campaign brief digest. Same shape as
   api/cron/youtube-snapshot.ts / soundcharts-snapshot.ts (see those for why
   this lives at the repo ROOT /api folder). Runs runWeeklyDigestSweep()
   (src/lib/weekly-digest-sweep.ts): generates each account's active-campaign
   brief PDF, uploads it to Storage, and logs a weekly_digests row that
   NotificationsBell surfaces in-app. See vercel.json for the schedule. */
import { runWeeklyDigestSweep } from "../../src/lib/weekly-digest-sweep";

interface CronRequest {
  headers: Record<string, string | string[] | undefined>;
}
interface CronResponse {
  status: (code: number) => { json: (body: Record<string, unknown>) => void };
}

export default async function handler(req: CronRequest, res: CronResponse) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers?.authorization || req.headers?.Authorization;
    if (auth !== `Bearer ${secret}`) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  try {
    const result = await runWeeklyDigestSweep();
    res.status(200).json({ success: true, ...result });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    res.status(500).json({ success: false, error: message });
  }
}
