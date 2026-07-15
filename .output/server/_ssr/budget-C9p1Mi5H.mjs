import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as budgetLines, l as useRole, s as useCampaigns } from "./os-store-v2jdVGrV.mjs";
import { f as TrendingUp, mt as CircleCheck, r as Wallet, st as DollarSign } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
import { t as EmptyState } from "./EmptyState-DpKuDbDt.mjs";
import { a as YAxis, f as ResponsiveContainer, l as CartesianGrid, o as XAxis, p as Tooltip, r as BarChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/budget-C9p1Mi5H.js
var import_jsx_runtime = require_jsx_runtime();
var money = (n) => n >= 1e6 ? `EGP ${(n / 1e6).toFixed(2)}M` : `EGP ${(n / 1e3).toFixed(0)}K`;
var tip = {
	background: "rgba(15,5,25,0.92)",
	border: "1px solid rgba(255,255,255,0.1)",
	borderRadius: 12
};
function BudgetPage() {
	const { active } = useCampaigns();
	const { canSeePrice } = useRole();
	const mask = (v) => canSeePrice ? v : "•••••";
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No campaign yet",
		note: "Create a campaign to set its budget and track spend by channel."
	}) });
	const totalPlanned = active.budget || budgetLines.reduce((s, b) => s + b.planned, 0);
	const totalSpent = active.spent || budgetLines.reduce((s, b) => s + b.spent, 0);
	const remaining = totalPlanned - totalSpent;
	const pct = totalPlanned ? Math.round(totalSpent / totalPlanned * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
					children: ["Budget · ", active.artist]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Campaign ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Budget"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [active.title, " · spend by channel, grounded in the marketing plan"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total Budget",
					value: mask(money(totalPlanned)),
					icon: Wallet,
					accent: "oklch(0.55 0.3 300)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Spent",
					value: mask(money(totalSpent)),
					sub: `${pct}% used`,
					icon: DollarSign,
					accent: "oklch(0.7 0.28 328)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Remaining",
					value: mask(money(remaining)),
					icon: CircleCheck,
					accent: "oklch(0.85 0.18 150)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Pacing",
					value: pct < 80 ? "On track" : "Watch",
					icon: TrendingUp,
					accent: "oklch(0.85 0.18 200)"
				})
			]
		}),
		budgetLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
			className: "mt-6 p-10 text-center",
			spotlight: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No budget line items yet. Add spend categories to see allocation and pacing here."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-7 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "Allocation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "Planned vs. Spent by Line"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: budgetLines,
								layout: "vertical",
								margin: { left: 40 },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "rgba(255,255,255,0.05)",
										horizontal: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										stroke: "rgba(255,255,255,0.3)",
										fontSize: 10,
										tickLine: false,
										axisLine: false,
										tickFormatter: money
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "category",
										stroke: "rgba(255,255,255,0.4)",
										fontSize: 9,
										width: 150,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tip,
										formatter: (v) => money(v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "planned",
										name: "Planned",
										fill: "oklch(0.35 0.1 300)",
										radius: [
											0,
											4,
											4,
											0
										],
										barSize: 7
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "spent",
										name: "Spent",
										fill: "oklch(0.7 0.28 328)",
										radius: [
											0,
											4,
											4,
											0
										],
										barSize: 7
									})
								]
							})
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-5 p-6",
				spotlight: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "Line Items"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "Spend Detail"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-3",
						children: budgetLines.map((b, i) => {
							const p = b.planned ? Math.round(b.spent / b.planned * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: b.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: canSeePrice ? `${money(b.spent)} / ${money(b.planned)}` : "•••"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-1.5 overflow-hidden rounded-full bg-white/5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full",
									style: {
										width: `${Math.min(p, 100)}%`,
										background: `oklch(0.7 0.28 ${328 - i * 14})`
									}
								})
							})] }, b.category);
						})
					})
				]
			})]
		})
	] });
}
function Stat({ label, value, sub, icon: Icon, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
		className: "col-span-6 md:col-span-3 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-4 w-4",
					style: { color: accent }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-display text-2xl font-bold",
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-[11px] text-muted-foreground/70",
				children: sub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 h-0.5 w-8 rounded",
				style: { background: accent }
			})
		]
	});
}
//#endregion
export { BudgetPage as component };
