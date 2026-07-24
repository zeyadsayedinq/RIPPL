import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { campaignTemplates } from "./campaign-templates";
import type { Campaign, ChecklistPhase } from "./campaign-data";
import type { CampaignTemplate } from "./campaign-templates";
import type { Creator } from "./mock-data";
import type { UploadedAsset } from "./campaign-store";

/* ═══════════════════════════════════════════════════════════
   Client-facing share links — a read-only, no-login URL (/c/$token) for one
   campaign. Same "server verifies, browser never sees the real data
   directly" shape as shared-workspace.ts, except the reader here has no
   account at all: getSharedCampaign() is a PUBLIC server fn (no
   accessToken), and campaign_shares has no anon RLS policy — the service
   role, gated by a valid unrevoked token, is the only way to reach it. The
   projection it returns deliberately drops everything price-sensitive
   (budget/spent, creator rate cards, messages, uploaded file paths) — the
   same fields a "Client" role already can't see in role-context.tsx, just
   enforced server-side instead of merely hidden in the UI, since this page
   has no auth gate at all. */

const OS_KEY = "rippl.os.v2";
const K_CAMPAIGNS = "rippl.campaigns.v2";
const K_TASKS = "rippl.tasks.v2";
const K_ASSIGN = "rippl.assignments.v2";
const K_ASSETS = "rippl.assets.v2";
const K_TEMPLATES = "rippl.customTemplates.v2";

function adminClient(): SupabaseClient | { error: string } {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey)
    return { error: "Supabase service credentials aren't configured on the server (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." };
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function readKey<T>(admin: SupabaseClient, uid: string, key: string, fallback: T): Promise<T> {
  const { data } = await admin.from("app_state").select("data").eq("user_id", uid).eq("key", key).maybeSingle();
  return (data?.data as T) ?? fallback;
}

function appUrl(): string {
  const KNOWN_PRODUCTION_URL = "https://rippl-mu.vercel.app";
  return (
    process.env.VITE_APP_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
    KNOWN_PRODUCTION_URL
  );
}

/* ── Create a share link (owner only) ────────────────────────── */
export const createCampaignShare = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; campaignId: string }) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; url?: string; token?: string; error?: string }> => {
    const admin = adminClient();
    if ("error" in admin) return { ok: false, error: admin.error };
    const { data: userData, error: userErr } = await admin.auth.getUser(data.accessToken);
    if (userErr || !userData?.user) return { ok: false, error: "Not signed in." };
    const uid = userData.user.id;

    const campaigns = await readKey<Campaign[]>(admin, uid, K_CAMPAIGNS, []);
    const campaign = campaigns.find((c) => c.id === data.campaignId);
    if (!campaign) return { ok: false, error: "Campaign not found in your workspace." };

    const token =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID().replace(/-/g, "")
        : Math.random().toString(36).slice(2) + Date.now().toString(36);

    const { error } = await admin.from("campaign_shares").insert({
      token,
      user_id: uid,
      campaign_id: campaign.id,
      campaign_title: `${campaign.artist} — ${campaign.title}`,
    });
    if (error) return { ok: false, error: error.message };

    return { ok: true, token, url: `${appUrl()}/c/${token}` };
  });

/* ── List / revoke existing links for a campaign (owner only) ──── */
export const listCampaignShares = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; campaignId: string }) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; shares?: { token: string; createdAt: string }[]; error?: string }> => {
    const admin = adminClient();
    if ("error" in admin) return { ok: false, error: admin.error };
    const { data: userData, error: userErr } = await admin.auth.getUser(data.accessToken);
    if (userErr || !userData?.user) return { ok: false, error: "Not signed in." };
    const { data: rows, error } = await admin
      .from("campaign_shares")
      .select("token,created_at")
      .eq("user_id", userData.user.id)
      .eq("campaign_id", data.campaignId)
      .eq("revoked", false)
      .order("created_at", { ascending: false });
    if (error) return { ok: false, error: error.message };
    return { ok: true, shares: (rows ?? []).map((r) => ({ token: r.token, createdAt: r.created_at })) };
  });

export const revokeCampaignShare = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string; token: string }) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    const admin = adminClient();
    if ("error" in admin) return { ok: false, error: admin.error };
    const { data: userData, error: userErr } = await admin.auth.getUser(data.accessToken);
    if (userErr || !userData?.user) return { ok: false, error: "Not signed in." };
    const { error } = await admin
      .from("campaign_shares")
      .update({ revoked: true })
      .eq("token", data.token)
      .eq("user_id", userData.user.id);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  });

/* ── Public read (no login) ──────────────────────────────────── */
export interface SharedCreatorView {
  name: string;
  handle: string;
  platform: string;
  tier: string;
  status: string;
}
export interface SharedCampaignView {
  artist: string;
  title: string;
  subtitle: string;
  status: string;
  startDate: string;
  endDate: string;
  platforms: string[];
  goal: string;
  taskProgress: number;
  checklist: { phase: string; total: number; done: number }[];
  creators: SharedCreatorView[];
  assetStatusCounts: Record<UploadedAsset["status"], number>;
  generatedAt: string;
}

export const getSharedCampaign = createServerFn({ method: "POST" })
  .validator((d: { token: string }) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; data?: SharedCampaignView; error?: string }> => {
    const admin = adminClient();
    if ("error" in admin) return { ok: false, error: admin.error };

    const { data: share, error: shareErr } = await admin
      .from("campaign_shares")
      .select("user_id,campaign_id,revoked")
      .eq("token", data.token)
      .maybeSingle();
    if (shareErr || !share || share.revoked)
      return { ok: false, error: "This share link is invalid or has been revoked." };

    const uid = share.user_id as string;
    const campaigns = await readKey<Campaign[]>(admin, uid, K_CAMPAIGNS, []);
    const campaign = campaigns.find((c) => c.id === share.campaign_id);
    if (!campaign) return { ok: false, error: "This campaign no longer exists." };

    const [assignments, customTemplates, os, tasks, assets] = await Promise.all([
      readKey<Record<string, string[]>>(admin, uid, K_ASSIGN, {}),
      readKey<CampaignTemplate[]>(admin, uid, K_TEMPLATES, []),
      readKey<{ creators?: Creator[] }>(admin, uid, OS_KEY, {}),
      readKey<Record<string, Record<string, boolean>>>(admin, uid, K_TASKS, {}),
      readKey<Record<string, UploadedAsset[]>>(admin, uid, K_ASSETS, {}),
    ]);

    const allTemplates = [...campaignTemplates, ...customTemplates];
    const template = allTemplates.find((t) => t.id === campaign.templateId);
    const checklistPhases: ChecklistPhase[] = template?.checklist ?? [];
    const taskMap = tasks[campaign.id] ?? {};
    const allItemIds = checklistPhases.flatMap((p) => p.items.map((i) => i.id));
    const taskProgress = allItemIds.length
      ? Math.round((allItemIds.filter((id) => taskMap[id]).length / allItemIds.length) * 100)
      : 0;
    const checklist = checklistPhases.map((p) => ({
      phase: p.phase,
      total: p.items.length,
      done: p.items.filter((i) => taskMap[i.id]).length,
    }));

    const assignedIds = assignments[campaign.id] ?? [];
    const creators = Array.isArray(os.creators) ? os.creators : [];
    const sharedCreators: SharedCreatorView[] = creators
      .filter((c) => assignedIds.includes(c.id))
      .map((c) => ({ name: c.name, handle: c.handle, platform: c.platform, tier: c.tier, status: c.status }));

    const campaignAssets = assets[campaign.id] ?? [];
    const assetStatusCounts: Record<UploadedAsset["status"], number> = {
      Draft: 0, "Under Review": 0, Approved: 0, "Needs Revision": 0,
    };
    for (const a of campaignAssets) assetStatusCounts[a.status]++;

    return {
      ok: true,
      data: {
        artist: campaign.artist,
        title: campaign.title,
        subtitle: campaign.subtitle,
        status: campaign.status,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        platforms: campaign.platforms ?? [],
        goal: campaign.goal,
        taskProgress,
        checklist,
        creators: sharedCreators,
        assetStatusCounts,
        generatedAt: new Date().toISOString(),
      },
    };
  });
