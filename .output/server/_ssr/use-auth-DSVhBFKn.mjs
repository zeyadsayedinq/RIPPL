import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-DSVhBFKn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var url = "https://rhsgpyjdwtjrnvmpoqtj.supabase.co";
var anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoc2dweWpkd3Rqcm52bXBvcXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMDg4NDMsImV4cCI6MjA5OTY4NDg0M30.b9LIGNT7zT2Dlh_6_g990fUSWfZAZMlxGZk2sM7vvhY";
var isSupabaseConfigured = Boolean(anon);
var supabase = isSupabaseConfigured ? createClient(url, anon, { auth: {
	persistSession: true,
	autoRefreshToken: true
} }) : null;
var HQ_EMAIL = "zeyadsayedinq@gmail.com";
function useAuthEmail() {
	const [email, setEmail] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!isSupabaseConfigured || !supabase) return;
		supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user.email ?? null));
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setEmail(s?.user.email ?? null));
		return () => sub.subscription.unsubscribe();
	}, []);
	return email;
}
function useIsHQ() {
	const email = useAuthEmail();
	if (!isSupabaseConfigured) return true;
	return email?.toLowerCase() === HQ_EMAIL;
}
//#endregion
export { useIsHQ as a, useAuthEmail as i, isSupabaseConfigured as n, supabase as r, HQ_EMAIL as t };
