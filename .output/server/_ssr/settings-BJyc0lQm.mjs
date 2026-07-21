import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as isSupabaseConfigured, r as supabase } from "./use-auth-DSVhBFKn.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { o as diagnose, r as clearEverything } from "./campaign-store-Cd9pjPrz.mjs";
import { n as useRole } from "./role-context-Dr49T2SH.mjs";
import { C as ShieldCheck, J as LogOut, U as Minus, Wt as Check, Y as Lock, h as Trash2, jt as Database, n as X } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BJyc0lQm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var roles = [
	"Marketing Manager",
	"Team Member",
	"Client"
];
var PERM_KEYS = [
	{
		key: "pricing",
		label: "Pricing & financials"
	},
	{
		key: "edit",
		label: "Edit content"
	},
	{
		key: "approve",
		label: "Approve / sign off"
	},
	{
		key: "export",
		label: "Export & reports"
	}
];
var PERMS = {
	"Marketing Manager": {
		blurb: "Full access — owner view of budgets, deals and approvals.",
		perms: {
			pricing: true,
			edit: true,
			approve: true,
			export: true
		}
	},
	"Team Member": {
		blurb: "Can build and edit, but financials stay hidden.",
		perms: {
			pricing: false,
			edit: true,
			approve: false,
			export: true
		}
	},
	"Client": {
		blurb: "Read-only presentation view — no prices, no edits.",
		perms: {
			pricing: false,
			edit: false,
			approve: false,
			export: true
		}
	}
};
function DiagRow({ label, ok, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5 font-mono",
			style: { color: ok ? "oklch(0.85 0.18 150)" : "oklch(0.75 0.2 20)" },
			children: [note, ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })]
		})]
	});
}
function SettingsPage() {
	const { role, setRole } = useRole();
	const [diag, setDiag] = (0, import_react.useState)(null);
	const [diagBusy, setDiagBusy] = (0, import_react.useState)(false);
	async function runDiag() {
		setDiagBusy(true);
		setDiag(await diagnose());
		setDiagBusy(false);
	}
	async function lock() {
		if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
		try {
			localStorage.removeItem("rippl.unlocked.v1");
		} catch {}
		location.reload();
	}
	async function resetOS() {
		if (!confirm("Reset EVERYTHING — all campaigns, roster, deals, releases, contracts, files, notes (local + Supabase)? This cannot be undone.")) return;
		await clearEverything();
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
				className: "col-span-12 p-6",
				spotlight: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-sm font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-white/50" }), " Access control"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Choose who's viewing. Each role sees a different slice of pricing, editing, approvals and exports."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-1 gap-3 md:grid-cols-3",
						children: roles.map((r) => {
							const on = r === role;
							const p = PERMS[r];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setRole(r),
								className: `rounded-2xl border p-4 text-left transition-colors ${on ? "border-white bg-white/[0.06]" : "border-white/10 hover:border-white/30"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold",
											children: r
										}), on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black",
											children: "Active"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] leading-relaxed text-muted-foreground",
										children: p.blurb
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 space-y-1.5",
										children: PERM_KEYS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between text-[11px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: k.label
											}), p.perms[k.key] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-flex h-4 w-4 items-center justify-center rounded-full bg-[oklch(0.82_0.18_150)]/20 text-[oklch(0.85_0.18_150)]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" })
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/5 text-white/30",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
											})]
										}, k.key))
									})
								]
							}, r);
						})
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
						children: isSupabaseConfigured ? "Data should sync to your Supabase project. Run diagnostics to confirm." : "Env vars missing in THIS build. Add VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY in Vercel → Settings → Environment Variables, then Redeploy."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: runDiag,
						disabled: diagBusy,
						className: "glass mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5 disabled:opacity-50",
						children: diagBusy ? "Testing…" : "Run diagnostics"
					}),
					diag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagRow, {
								label: "Env vars present (VITE_…)",
								ok: diag.configured,
								note: diag.url ? diag.url : "missing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagRow, {
								label: "Signed in to Supabase",
								ok: diag.signedIn,
								note: diag.email || "no session"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiagRow, {
								label: "Can write to database (app_state)",
								ok: diag.canWrite,
								note: diag.canWrite ? "sync working ✓" : "blocked"
							}),
							diag.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 rounded-lg bg-[oklch(0.7_0.2_20)]/10 p-2 text-[oklch(0.8_0.2_20)]",
								children: diag.error
							})
						]
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
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: lock,
						className: "glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm hover:bg-white/5",
						children: isSupabaseConfigured ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" }), " Sign out"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4" }), " Lock app (require password)"] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: resetOS,
						className: "inline-flex items-center gap-2 rounded-full border border-[oklch(0.7_0.2_20)]/40 px-4 py-2.5 text-sm text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Reset everything (local + cloud)"]
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { SettingsPage as component };
