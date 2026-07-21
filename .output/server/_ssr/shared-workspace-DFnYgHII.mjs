import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as HQ_EMAIL } from "./use-auth-DSVhBFKn.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/shared-workspace-DFnYgHII.js
var OS_KEY = "rippl.os.v2";
var K_CAMPAIGNS = "rippl.campaigns.v2";
var K_TASKS = "rippl.tasks.v2";
var K_ASSETS = "rippl.assets.v2";
var K_BUDGET = "rippl.budgetlines.v2";
var K_EVENTS = "rippl.calendarEvents.v1";
var K_TEMPLATES = "rippl.customTemplates.v2";
function adminClient() {
	const url = processModule.env.VITE_SUPABASE_URL;
	const serviceKey = processModule.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url || !serviceKey) return { error: "Supabase service credentials aren't configured on the server (VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)." };
	return createClient(url, serviceKey, { auth: {
		autoRefreshToken: false,
		persistSession: false
	} });
}
async function findHqUid(admin) {
	for (let page = 1; page <= 10; page++) {
		const { data, error } = await admin.auth.admin.listUsers({
			page,
			perPage: 200
		});
		if (error || !data?.users?.length) return null;
		const hit = data.users.find((u) => u.email?.toLowerCase() === HQ_EMAIL);
		if (hit) return hit.id;
		if (data.users.length < 200) return null;
	}
	return null;
}
async function readKey(admin, uid, key, fallback) {
	const { data } = await admin.from("app_state").select("data").eq("user_id", uid).eq("key", key).maybeSingle();
	return data?.data ?? fallback;
}
/** Verify the caller and locate their member record inside HQ's workspace. */
async function resolveCaller(accessToken) {
	const admin = adminClient();
	if ("error" in admin) return admin;
	const { data: userData, error: userErr } = await admin.auth.getUser(accessToken);
	const callerEmail = userData?.user?.email?.toLowerCase();
	if (userErr || !callerEmail) return { error: "Not signed in (invalid access token)." };
	const hqUid = await findHqUid(admin);
	if (!hqUid) return { error: "HQ account not found." };
	const os = await readKey(admin, hqUid, OS_KEY, {});
	return {
		admin,
		hqUid,
		os,
		member: (os.members ?? []).find((m) => m.email?.toLowerCase() === callerEmail) ?? null,
		callerEmail
	};
}
var ids = (arr) => (arr ?? []).map((x) => x.id);
var pick = (arr, allowed) => (arr ?? []).filter((x) => allowed.includes(x.id));
var pickMap = (map, allowed) => Object.fromEntries(Object.entries(map ?? {}).filter(([k]) => allowed.includes(k)));
var fetchShared_createServerFn_handler = createServerRpc({
	id: "df352238fe418ddfe526686cf9806c859301099b6781bc93090f71b60254473c",
	name: "fetchShared",
	filename: "src/lib/shared-workspace.ts"
}, (opts) => fetchShared.__executeServer(opts));
var fetchShared = createServerFn({ method: "POST" }).validator((d) => d).handler(fetchShared_createServerFn_handler, async ({ data }) => {
	const ctx = await resolveCaller(data.accessToken);
	if ("error" in ctx) return {
		ok: false,
		error: ctx.error
	};
	if (ctx.callerEmail === "zeyadsayedinq@gmail.com") return {
		ok: true,
		hq: true
	};
	const { admin, hqUid, os, member } = ctx;
	const hqCampaigns = await readKey(admin, hqUid, K_CAMPAIGNS, []);
	const extraCollections = [
		"artists",
		"deals",
		"notes",
		"mood",
		"projects",
		"prompts",
		"todos"
	];
	const hqIds = [
		...ids(os.releases),
		...ids(os.tracks),
		...ids(os.contracts),
		...ids(hqCampaigns),
		...extraCollections.flatMap((k) => ids(os[k]))
	];
	if (!member) return {
		ok: true,
		payload: {
			role: "None",
			releases: [],
			tracks: [],
			contracts: [],
			campaigns: [],
			tasks: {},
			assets: {},
			budget: {},
			events: {},
			templates: [],
			editable: [],
			hqIds
		}
	};
	const campaigns = pick(hqCampaigns, member.campaigns ?? []);
	const campaignIds = campaigns.map((c) => c.id);
	const [tasks, assets, budget, events, allTemplates] = await Promise.all([
		readKey(admin, hqUid, K_TASKS, {}),
		readKey(admin, hqUid, K_ASSETS, {}),
		readKey(admin, hqUid, K_BUDGET, {}),
		readKey(admin, hqUid, K_EVENTS, {}),
		readKey(admin, hqUid, K_TEMPLATES, [])
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
			hqIds
		}
	};
});
var pushSharedEdit_createServerFn_handler = createServerRpc({
	id: "69d8a6459159597f67f54d4d75a31d20aa5a2a3a8dd731d59bb2fb28b8cbfee8",
	name: "pushSharedEdit",
	filename: "src/lib/shared-workspace.ts"
}, (opts) => pushSharedEdit.__executeServer(opts));
var pushSharedEdit = createServerFn({ method: "POST" }).validator((d) => d).handler(pushSharedEdit_createServerFn_handler, async ({ data }) => {
	const ctx = await resolveCaller(data.accessToken);
	if ("error" in ctx) return {
		ok: false,
		error: ctx.error
	};
	const { admin, hqUid, os, member } = ctx;
	if (!member) return {
		ok: false,
		error: "You aren't a member of this workspace."
	};
	const editable = member.edit ?? [];
	const upsert = (key, value) => admin.from("app_state").upsert({
		user_id: hqUid,
		key,
		data: value
	}, { onConflict: "user_id,key" });
	if (data.kind === "campaignData") {
		if (!editable.includes(data.campaignId)) return {
			ok: false,
			error: "View-only: HQ hasn't given you edit access to this campaign."
		};
		if (!(member.campaigns ?? []).includes(data.campaignId)) return {
			ok: false,
			error: "This campaign isn't assigned to you."
		};
		const jobs = [];
		const patch = async (key, val) => {
			if (val === void 0) return;
			const cur = await readKey(admin, hqUid, key, {});
			await upsert(key, {
				...cur,
				[data.campaignId]: val
			});
		};
		jobs.push(patch(K_TASKS, data.tasks), patch(K_ASSETS, data.assets), patch(K_BUDGET, data.budget), patch(K_EVENTS, data.events));
		await Promise.all(jobs);
		return { ok: true };
	}
	const { kind, item } = data;
	if (!editable.includes(item.id)) return {
		ok: false,
		error: "View-only: HQ hasn't given you edit access to this item."
	};
	if (kind === "campaign") {
		if (!(member.campaigns ?? []).includes(item.id)) return {
			ok: false,
			error: "Not assigned to you."
		};
		await upsert(K_CAMPAIGNS, (await readKey(admin, hqUid, K_CAMPAIGNS, [])).map((c) => c.id === item.id ? {
			...c,
			...item,
			id: c.id
		} : c));
		return { ok: true };
	}
	const listKey = kind + "s";
	if (!(member[listKey] ?? []).includes(item.id)) return {
		ok: false,
		error: "Not assigned to you."
	};
	const list = os[listKey] ?? [];
	await upsert(OS_KEY, {
		...os,
		[listKey]: list.map((x) => x.id === item.id ? {
			...x,
			...item,
			id: x.id
		} : x)
	});
	return { ok: true };
});
//#endregion
export { fetchShared_createServerFn_handler, pushSharedEdit_createServerFn_handler };
