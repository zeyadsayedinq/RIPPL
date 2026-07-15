import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as useRole } from "./os-store-v2jdVGrV.mjs";
import { P as Lock, lt as Database, m as Trash2, v as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CKoNpjts.js
var import_jsx_runtime = require_jsx_runtime();
var url = "https://rhsgpyjdwtjrnvmpoqtj.supabase.co";
var anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoc2dweWpkd3Rqcm52bXBvcXRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMDg4NDMsImV4cCI6MjA5OTY4NDg0M30.b9LIGNT7zT2Dlh_6_g990fUSWfZAZMlxGZk2sM7vvhY";
var isSupabaseConfigured = Boolean(anon);
isSupabaseConfigured && createClient(url, anon, { auth: {
	persistSession: true,
	autoRefreshToken: true
} });
var roles = [
	"Marketing Manager",
	"Team Member",
	"Client"
];
function SettingsPage() {
	const { role, setRole } = useRole();
	function lock() {
		try {
			localStorage.removeItem("rippl.unlocked.v1");
		} catch {}
		location.reload();
	}
	function resetOS() {
		if (!confirm("Reset all RIPPL OS data (roster, deals, releases, vault, notes)? This cannot be undone.")) return;
		try {
			localStorage.removeItem("rippl.os.v1");
		} catch {}
		location.reload();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass rounded-2xl p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
			children: "System"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-1 font-display text-3xl font-bold",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-gradient-neon",
				children: "Settings"
			})
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 grid grid-cols-12 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 md:col-span-6 p-6",
				spotlight: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-white/50" }), " Active role"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Controls what pricing/financials are visible."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRole(r),
							className: `rounded-full border px-4 py-2 text-sm ${r === role ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`,
							children: r
						}, r))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 p-6",
				spotlight: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "h-4 w-4 text-white/50" }), " Backend"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]",
							style: {
								color: isSupabaseConfigured ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.02 260)",
								background: (isSupabaseConfigured ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.02 260)") + "1a"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-1.5 w-1.5 rounded-full",
								style: { background: isSupabaseConfigured ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.02 260)" }
							}), isSupabaseConfigured ? "Supabase connected" : "Local (localStorage)"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: isSupabaseConfigured ? "Data syncs to your Supabase project." : "Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY to .env, run the migration in supabase/migrations, and reload to go cloud-backed."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 md:col-span-6 p-6",
				spotlight: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Security & data"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: lock,
						className: "glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm hover:bg-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), " Lock app (require password)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: resetOS,
						className: "inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.2_20)]/40 px-4 py-2.5 text-sm text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Reset OS data"]
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { SettingsPage as component };
