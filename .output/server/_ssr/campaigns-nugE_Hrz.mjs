import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as useRole, s as useCampaigns } from "./os-store-v2jdVGrV.mjs";
import { _t as Check, pt as Circle, st as DollarSign } from "../_libs/lucide-react.mjs";
import { i as NewCampaignModal, n as MagneticButton, t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
import { t as EmptyState } from "./EmptyState-DpKuDbDt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaigns-nugE_Hrz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var money = (n) => n >= 1e6 ? `EGP ${(n / 1e6).toFixed(2)}M` : `EGP ${(n / 1e3).toFixed(0)}K`;
var statusColor = {
	Active: "oklch(0.85 0.18 150)",
	Planning: "oklch(0.8 0.16 80)",
	Wrapped: "oklch(0.6 0.02 260)"
};
function CampaignsPage() {
	const { campaigns, active, setActive } = useCampaigns();
	const { canSeePrice } = useRole();
	const [modal, setModal] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
					children: "Portfolio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Campaigns"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						campaigns.length,
						" campaigns · ",
						campaigns.filter((c) => c.status === "Active").length,
						" active"
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
				onClick: () => setModal(true),
				children: "+ New campaign"
			})]
		}),
		campaigns.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No campaigns yet",
			note: "Create your first campaign to start planning channels, tasks and budget."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: campaigns.map((c) => {
				const isActive = c.id === active?.id;
				const pct = c.budget ? Math.round(c.spent / c.budget * 100) : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
					className: `col-span-12 md:col-span-6 xl:col-span-4 p-5 ${isActive ? "ring-1 ring-[oklch(0.7_0.28_328)]/50" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-lg font-bold",
									children: c.artist
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm text-muted-foreground",
									children: c.title
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]",
								style: {
									color: statusColor[c.status],
									background: statusColor[c.status] + "1a"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full",
									style: { background: statusColor[c.status] }
								}), c.status]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground/80",
							children: c.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid grid-cols-2 gap-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Reach",
									value: c.reach
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Goal",
									value: c.goal,
									small: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Window",
									value: `${c.startDate} → ${c.endDate}`,
									small: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "Budget",
									value: canSeePrice ? money(c.budget) : "•••"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-3 w-3" }), " Spend"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									canSeePrice ? `${money(c.spent)} / ${money(c.budget)}` : "•••",
									" · ",
									pct,
									"%"
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1.5 overflow-hidden rounded-full bg-white/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)]",
									style: { width: `${pct}%` }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-1",
							children: c.platforms.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-muted-foreground",
								children: p
							}, p))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActive(c.id),
							className: `mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${isActive ? "bg-white/10 text-white" : "glass text-foreground hover:bg-white/5"}`,
							children: isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Active"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4" }), " Set active"] })
						})
					]
				}, c.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: modal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewCampaignModal, { onClose: () => setModal(false) }) })
	] });
}
function Stat({ label, value, small }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-lg p-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[9px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-0.5 font-semibold ${small ? "text-[11px] leading-tight" : "text-sm"}`,
			children: value
		})]
	});
}
//#endregion
export { CampaignsPage as component };
