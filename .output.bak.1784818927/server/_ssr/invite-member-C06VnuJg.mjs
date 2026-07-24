import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/invite-member-C06VnuJg.js
var inviteMember_createServerFn_handler = createServerRpc({
	id: "d58727adc976987b495381b707050a8049015e3f79c6e2f09e66ba0f493ae302",
	name: "inviteMember",
	filename: "src/lib/invite-member.ts"
}, (opts) => inviteMember.__executeServer(opts));
var inviteMember = createServerFn({ method: "POST" }).validator((data) => data).handler(inviteMember_createServerFn_handler, async ({ data }) => {
	const url = processModule.env.VITE_SUPABASE_URL;
	const serviceKey = processModule.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!url) return {
		ok: false,
		error: "VITE_SUPABASE_URL isn't set — Supabase isn't configured on this deployment."
	};
	if (!serviceKey) return {
		ok: false,
		error: "SUPABASE_SERVICE_ROLE_KEY isn't set. Add it in Vercel → Settings → Environment Variables (server-only — do NOT prefix it with VITE_) using the service_role secret from Supabase Dashboard → Project Settings → API, then redeploy."
	};
	const admin = createClient(url, serviceKey, { auth: {
		autoRefreshToken: false,
		persistSession: false
	} });
	const appUrl = processModule.env.VITE_APP_URL || (processModule.env.VERCEL_URL ? `https://${processModule.env.VERCEL_URL}` : void 0);
	const { error } = await admin.auth.admin.inviteUserByEmail(data.email, {
		data: data.name ? { name: data.name } : void 0,
		redirectTo: appUrl ? `${appUrl}/home` : void 0
	});
	if (error) {
		if (/already registered|already exists/i.test(error.message)) return { ok: true };
		return {
			ok: false,
			error: error.message
		};
	}
	return appUrl ? { ok: true } : {
		ok: true,
		warning: "Sent, but VITE_APP_URL isn't set — the link inside will use whatever 'Site URL' is configured in Supabase (often still the localhost default). Set VITE_APP_URL to your real domain, and add it under Supabase → Authentication → URL Configuration → Redirect URLs, or the link will 404."
	};
});
//#endregion
export { inviteMember_createServerFn_handler };
