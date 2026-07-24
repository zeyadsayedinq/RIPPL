import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { buildCampaignBriefDoc } from "./pdf";
import { campaignTemplates } from "./campaign-templates";
import type { Campaign, ChecklistPhase } from "./campaign-data";
import type { CampaignTemplate } from "./campaign-templates";
import type { Creator } from "./mock-data";

/* ═══════════════════════════════════════════════════════════
   Monday morning digest — for every account with at least one real
   (non-seed) campaign, auto-generate that campaign's brief PDF (the same
   one the "Download Brief" button produces — see pdf.ts) and log it to
   weekly_digests (supabase/migrations/0003_soundcharts_digest_shares.sql)
   so it shows up as an in-app notification (NotificationsBell) the next
   time HQ opens RIPPL.

   Why in-app rather than email/Slack: RIPPL has no email-sending capability
   beyond Supabase Auth's built-in (templated, invite-only) email flow —
   see invite-member.ts — and no Slack/webhook integration exists anywhere
   in the app. Rather than wire up a new third-party service with its own
   unconfigured API key (and a fake "not connected" state until someone
   adds one), this reuses what's already real and always-on: Storage (the
   PDF itself, downloadable via a signed URL) + the Notifications Bell,
   which is global chrome on every page — the one place in RIPPL you're
   guaranteed to already be looking. A future version could add outbound
   email the same way once there's an actual provider configured.

   Deliberately has ZERO dependency on @tanstack/react-start, same reason as
   youtube-snapshot-sweep.ts / soundcharts-snapshot-sweep.ts — this runs
   directly from api/cron/weekly-digest.ts, a plain Vercel Node function
   outside TanStack Router. */

const OS_KEY = "rippl.os.v2";
const K_CAMPAIGNS = "rippl.campaigns.v2";
const K_ACTIVE = "rippl.activeCampaign.v2";
const K_TASKS = "rippl.tasks.v2";
const K_ASSIGN = "rippl.assignments.v2";
const K_TEMPLATES = "rippl.customTemplates.v2";

export function serviceClient(): SupabaseClient | null {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

async function readKey<T>(
  admin: SupabaseClient,
  uid: string,
  key: string,
  fallback: T,
): Promise<T> {
  const { data } = await admin
    .from("app_state")
    .select("data")
    .eq("user_id", uid)
    .eq("key", key)
    .maybeSingle();
  return (data?.data as T) ?? fallback;
}

async function listAllUserIds(admin: SupabaseClient): Promise<string[]> {
  const ids: string[] = [];
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error || !data?.users?.length) break;
    ids.push(...data.users.map((u) => u.id));
    if (data.users.length < 200) break;
  }
  return ids;
}

interface DigestResult {
  userId: string;
  campaignId: string;
  campaignTitle: string;
  pdfPath: string | null;
  creatorsCount: number;
  taskProgress: number;
}

async function buildDigestForUser(
  admin: SupabaseClient,
  uid: string,
): Promise<DigestResult | null> {
  const campaigns = await readKey<Campaign[]>(admin, uid, K_CAMPAIGNS, []);
  const userMade = campaigns.filter((c) => c && !c.seeded);
  if (userMade.length === 0) return null; // nothing real to brief — honest no-op, not an error

  const activeId = await readKey<string>(admin, uid, K_ACTIVE, "");
  const campaign = userMade.find((c) => c.id === activeId) ?? userMade[0];

  const [assignments, customTemplates, os, tasks] = await Promise.all([
    readKey<Record<string, string[]>>(admin, uid, K_ASSIGN, {}),
    readKey<CampaignTemplate[]>(admin, uid, K_TEMPLATES, []),
    readKey<{ creators?: Creator[] }>(admin, uid, OS_KEY, {}),
    readKey<Record<string, Record<string, boolean>>>(admin, uid, K_TASKS, {}),
  ]);

  const allTemplates = [...campaignTemplates, ...customTemplates];
  const template = allTemplates.find((t) => t.id === campaign.templateId);
  const checklist: ChecklistPhase[] = template?.checklist ?? [];

  const assignedIds = assignments[campaign.id] ?? [];
  const creators = Array.isArray(os.creators) ? os.creators : [];
  const creatorNames = creators
    .filter((c) => assignedIds.includes(c.id))
    .map((c) => c.name);

  const itemIds = checklist.flatMap((p) => p.items.map((i) => i.id));
  const taskMap = tasks[campaign.id] ?? {};
  const taskProgress = itemIds.length
    ? Math.round((itemIds.filter((id) => taskMap[id]).length / itemIds.length) * 100)
    : 0;

  const doc = buildCampaignBriefDoc(campaign, checklist, creatorNames);
  const buffer = doc.output("arraybuffer");
  const dateStr = new Date().toISOString().slice(0, 10);
  const path = `${uid}/${campaign.id}-${dateStr}.pdf`;

  let pdfPath: string | null = null;
  try {
    const { error } = await admin.storage
      .from("reports")
      .upload(path, buffer, { contentType: "application/pdf", upsert: true });
    if (!error) pdfPath = path;
  } catch {
    /* Storage bucket "reports" may not exist yet on this project (created
       manually, see 0003 migration's comment) — the digest row still gets
       logged below without a pdfPath so NotificationsBell can say so. */
  }

  return {
    userId: uid,
    campaignId: campaign.id,
    campaignTitle: campaign.title || campaign.artist || "Untitled campaign",
    pdfPath,
    creatorsCount: creatorNames.length,
    taskProgress,
  };
}

export async function runWeeklyDigestSweep(): Promise<{
  generated: number;
  skipped: number;
  failed: number;
  total: number;
}> {
  const admin = serviceClient();
  if (!admin)
    throw new Error(
      "Supabase service credentials aren't configured (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );

  const userIds = await listAllUserIds(admin);
  let generated = 0;
  let skipped = 0;
  let failed = 0;
  for (const uid of userIds) {
    try {
      const result = await buildDigestForUser(admin, uid);
      if (!result) {
        skipped++;
        continue;
      }
      const { error } = await admin.from("weekly_digests").insert({
        user_id: result.userId,
        campaign_id: result.campaignId,
        campaign_title: result.campaignTitle,
        pdf_path: result.pdfPath,
        creators_count: result.creatorsCount,
        task_progress: result.taskProgress,
      });
      if (error) failed++;
      else generated++;
    } catch {
      failed++;
    }
  }
  return { generated, skipped, failed, total: userIds.length };
}
