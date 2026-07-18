import { createServerFn } from "@tanstack/react-start";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { HQ_EMAIL } from "./use-auth";
import type { Release, Track, Contract, Member } from "./os-store";
import type { Campaign } from "./campaign-data";
import type { CampaignTemplate } from "./campaign-templates";
import type { UploadedAsset, BudgetLineItem, CalendarPost } from "./campaign-store";

/* ═══════════════════════════════════════════════════════════
   Shared workspace — how members receive what HQ assigns them.

   Every account's own data lives in its own `app_state` rows (RLS
   owner-only), so members can NEVER read HQ's state directly. These server
   functions run with the service-role key (server-side only — same pattern
   as invite-member.ts), verify the caller's Supabase access token, look the
   caller up in HQ's `members` list, and return ONLY the items HQ assigned
   to them. Assignment filtering therefore happens server-side and can't be
   bypassed from the browser.

   Access model (per member, set in /admin):
   • assigned id in campaigns/releases/tracks/contracts → View
   • id additionally in member.edit → Full edit (changes written back to HQ state
     via pushSharedEdit below)
═══════════════════════════════════════════════════════════ */

const OS_KEY = "rippl.os.v2";
const K_CAMPAIGNS = "rippl.campaigns.v2";
const K_TASKS = "rippl.tasks.v2";
const K_ASSETS = "rippl.assets.v2";
const K_BUDGET = "rippl.budgetlines.v2";
const K_EVENTS = "rippl.calendarEvents.v1";
const K_TEMPLATES = "rippl.customTemplates.v2";

export interface SharedPayload {
  /** member's role as set in /admin (informational) */
  role: string;
  releases: Release[];
  tracks: Track[];
  contracts: Contract[];
  campaigns: Campaign[];
  /** per-campaign collaboration data, only for assigned campaign ids */
  tasks: Record<string, Record<string, boolean>>;
  assets: Record<string, UploadedAsset[]>;
  budget: Record<string, BudgetLineItem[]>;
  events: Record<string, CalendarPost[]>;
  /** HQ custom templates referenced by assigned campaigns (read-only) */
  templates: CampaignTemplate[];
  /** ids (item or campaign) this member may edit; everything else is view-only */
  editable: string[];
  /** ALL ids in HQ's workspace — used client-side to strip leaked copies */
  hqIds: string[];
}

interface HqCtx {
  admin: SupabaseClient;
  hqUid: string;
  os: { releases?: Release[]; tracks?: Track[]; contracts?: Contract[]; members?: Member[] } & Record<string, unknown>;
  member: Member | null;
  callerEmail: string;
}

function adminClient(): SupabaseClient | { error: string } {
  const url = process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return { error: "Supabase service credentials aren't configured on the server (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." };
  return createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
}

async function findHqUid(admin: SupabaseClient): Promise<string | null> {
  // Small-team tool: page through users to find the HQ account.
  for (let page = 1; page <= 10; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error || !data?.users?.length) return null;
    const hit = data.users.find((u) => u.email?.toLowerCase() === HQ_EMAIL);
    if (hit) return hit.id;
    if (data.users.length < 200) return null;
  }
  return null;
}

async function readKey<T>(admin: SupabaseClient, uid: string, key: string, fallback: T): Promise<T> {
  const { data } = await admin.from("app_state").select("data").eq("user_id", uid).eq("key", key).maybeSingle();
  return (data?.data as T) ?? fallback;
}

/** Verify the caller and locate their member record inside HQ's workspace. */
async function resolveCaller(accessToken: string): Promise<HqCtx | { error: string }> {
  const admin = adminClient();
  if ("error" in admin) return admin;
  const { data: userData, error: userErr } = await admin.auth.getUser(accessToken);
  const callerEmail = userData?.user?.email?.toLowerCase();
  if (userErr || !callerEmail) return { error: "Not signed in (invalid access token)." };

  const hqUid = await findHqUid(admin);
  if (!hqUid) return { error: "HQ account not found." };

  const os = await readKey<HqCtx["os"]>(admin, hqUid, OS_KEY, {});
  const member = (os.members ?? []).find((m) => m.email?.toLowerCase() === callerEmail) ?? null;
  return { admin, hqUid, os, member, callerEmail };
}

const ids = (arr: { id: string }[] | undefined) => (arr ?? []).map((x) => x.id);
const pick = <T extends { id: string }>(arr: T[] | undefined, allowed: string[]) => (arr ?? []).filter((x) => allowed.includes(x.id));
const pickMap = <T,>(map: Record<string, T> | undefined, allowed: string[]) =>
  Object.fromEntries(Object.entries(map ?? {}).filter(([k]) => allowed.includes(k)));

/* ── Fetch everything assigned to the signed-in member ──────── */
export const fetchShared = createServerFn({ method: "POST" })
  .validator((d: { accessToken: string }) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string; hq?: boolean; payload?: SharedPayload }> => {
    const ctx = await resolveCaller(data.accessToken);
    if ("error" in ctx) return { ok: false, error: ctx.error };
    if (ctx.callerEmail === HQ_EMAIL) return { ok: true, hq: true };

    const { admin, hqUid, os, member } = ctx;
    const hqCampaigns = await readKey<Campaign[]>(admin, hqUid, K_CAMPAIGNS, []);
    // Ids across ALL of HQ's collections — the client uses these to strip
    // leaked copies of HQ data out of member accounts (see os-store.tsx).
    const extraCollections = ["artists", "deals", "notes", "mood", "projects", "prompts", "todos"] as const;
    const hqIds = [
      ...ids(os.releases), ...ids(os.tracks), ...ids(os.contracts), ...ids(hqCampaigns),
      ...extraCollections.flatMap((k) => ids(os[k] as { id: string }[] | undefined)),
    ];

    if (!member) {
      // Not a member of the workspace: zero assigned content, but still
      // report hqIds so any previously-leaked copies get cleaned up.
      return { ok: true, payload: { role: "None", releases: [], tracks: [], contracts: [], campaigns: [], tasks: {}, assets: {}, budget: {}, events: {}, templates: [], editable: [], hqIds } };
    }

    const campaigns = pick(hqCampaigns, member.campaigns ?? []);
    const campaignIds = campaigns.map((c) => c.id);
    const [tasks, assets, budget, events, allTemplates] = await Promise.all([
      readKey<SharedPayload["tasks"]>(admin, hqUid, K_TASKS, {}),
      readKey<SharedPayload["assets"]>(admin, hqUid, K_ASSETS, {}),
      readKey<SharedPayload["budget"]>(admin, hqUid, K_BUDGET, {}),
      readKey<SharedPayload["events"]>(admin, hqUid, K_EVENTS, {}),
      readKey<CampaignTemplate[]>(admin, hqUid, K_TEMPLATES, []),
    ]);
    const templateIds = campaigns.map((c) => c.templateId).filter(Boolean);
    return {
      ok: true,
      payload: {
        role: member.role,
        releases: pick(os.releases, member.releases ?? []),
        tracks: pick(os.tracks, member.tracks ?? []),
        contracts: pick(os.contracts, member.contracts ?? []),
        campaigns,
        tasks: pickMap(tasks, campaignIds),
        assets: pickMap(assets, campaignIds),
        budget: pickMap(budget, campaignIds),
        events: pickMap(events, campaignIds),
        templates: (allTemplates ?? []).filter((t) => templateIds.includes(t.id)),
        editable: member.edit ?? [],
        hqIds,
      },
    };
  });

/* ── Write a member's edit back into HQ's workspace ─────────── */
type EditInput =
  | { accessToken: string; kind: "release" | "track" | "contract"; item: Release | Track | Contract }
  | { accessToken: string; kind: "campaign"; item: Campaign }
  | { accessToken: string; kind: "campaignData"; campaignId: string; tasks?: Record<string, boolean>; assets?: UploadedAsset[]; budget?: BudgetLineItem[]; events?: CalendarPost[] };

export const pushSharedEdit = createServerFn({ method: "POST" })
  .validator((d: EditInput) => d)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    const ctx = await resolveCaller(data.accessToken);
    if ("error" in ctx) return { ok: false, error: ctx.error };
    const { admin, hqUid, os, member } = ctx;
    if (!member) return { ok: false, error: "You aren't a member of this workspace." };
    const editable = member.edit ?? [];

    const upsert = (key: string, value: unknown) =>
      admin.from("app_state").upsert({ user_id: hqUid, key, data: value }, { onConflict: "user_id,key" });

    if (data.kind === "campaignData") {
      if (!editable.includes(data.campaignId)) return { ok: false, error: "View-only: HQ hasn't given you edit access to this campaign." };
      if (!(member.campaigns ?? []).includes(data.campaignId)) return { ok: false, error: "This campaign isn't assigned to you." };
      const jobs: Promise<unknown>[] = [];
      const patch = async <T,>(key: string, val: T | undefined) => {
        if (val === undefined) return;
        const cur = await readKey<Record<string, T>>(admin, hqUid, key, {});
        await upsert(key, { ...cur, [data.campaignId]: val });
      };
      jobs.push(patch(K_TASKS, data.tasks), patch(K_ASSETS, data.assets), patch(K_BUDGET, data.budget), patch(K_EVENTS, data.events));
      await Promise.all(jobs);
      return { ok: true };
    }

    const { kind, item } = data;
    if (!editable.includes(item.id)) return { ok: false, error: "View-only: HQ hasn't given you edit access to this item." };

    if (kind === "campaign") {
      if (!(member.campaigns ?? []).includes(item.id)) return { ok: false, error: "Not assigned to you." };
      const cur = await readKey<Campaign[]>(admin, hqUid, K_CAMPAIGNS, []);
      await upsert(K_CAMPAIGNS, cur.map((c) => (c.id === item.id ? { ...c, ...(item as Campaign), id: c.id } : c)));
      return { ok: true };
    }

    const listKey = (kind + "s") as "releases" | "tracks" | "contracts";
    if (!((member[listKey] ?? []) as string[]).includes(item.id)) return { ok: false, error: "Not assigned to you." };
    const list = (os[listKey] ?? []) as { id: string }[];
    const nextOs = { ...os, [listKey]: list.map((x) => (x.id === item.id ? { ...x, ...item, id: x.id } : x)) };
    await upsert(OS_KEY, nextOs);
    return { ok: true };
  });
