import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useCampaigns } from "./campaign-store-Cd9pjPrz.mjs";
import { n as useRole } from "./role-context-Dr49T2SH.mjs";
import { M as Plus, U as Minus, Vt as CircleCheck, h as Trash2, kt as DollarSign, p as TrendingUp, r as Wallet } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { t as EmptyState } from "./EmptyState-5qR3rxdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/budget-CI7bJ-W2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var money = (n) => n >= 1e6 ? `EGP ${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `EGP ${(n / 1e3).toFixed(1)}K` : `EGP ${n}`;
var KINDS = [
	"Budget",
	"Expense",
	"Payment"
];
function BudgetPage() {
	const { active, activeBudgetLines, addBudgetLine, updateBudgetLine, removeBudgetLine } = useCampaigns();
	const { canSeePrice } = useRole();
	const mask = (v) => canSeePrice ? v : "•••••";
	const [form, setForm] = (0, import_react.useState)({
		category: "",
		planned: "",
		spent: "",
		kind: "Budget"
	});
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No campaign yet",
		note: "Create a campaign to set its budget and log expenses & payments."
	}) });
	const totalPlanned = activeBudgetLines.reduce((s, b) => s + b.planned, 0) || active.budget || 0;
	const totalSpent = activeBudgetLines.reduce((s, b) => s + b.spent, 0);
	const remaining = totalPlanned - totalSpent;
	const pct = totalPlanned ? Math.round(totalSpent / totalPlanned * 100) : 0;
	function submit(e) {
		e.preventDefault();
		if (!form.category.trim()) return;
		addBudgetLine({
			category: form.category,
			planned: Number(form.planned) || 0,
			spent: Number(form.spent) || 0,
			kind: form.kind
		});
		setForm({
			category: "",
			planned: "",
			spent: "",
			kind: form.kind
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
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
					children: [active.title, " · add budgets, expenses & payments below"]
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
					accent: "oklch(0.7 0.02 260)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Spent",
					value: mask(money(totalSpent)),
					sub: `${pct}% used`,
					icon: DollarSign,
					accent: "oklch(0.85 0.02 260)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Remaining",
					value: mask(money(remaining)),
					icon: CircleCheck,
					accent: "oklch(0.82 0.18 150)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Pacing",
					value: pct <= 100 ? "On track" : "Over",
					icon: TrendingUp,
					accent: pct <= 100 ? "oklch(0.82 0.18 150)" : "oklch(0.7 0.2 20)"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-6 p-5",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
				children: "Add a line"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-3 grid grid-cols-12 items-end gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-12 sm:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: form.category,
							onChange: (e) => setForm({
								...form,
								category: e.target.value
							}),
							placeholder: "e.g. TikTok Spark Ads",
							className: "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-4 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.kind,
							onChange: (e) => setForm({
								...form,
								kind: e.target.value
							}),
							className: "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none",
							children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#0a0a0c]",
								children: k
							}, k))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-4 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Planned (EGP)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: form.planned,
							onChange: (e) => setForm({
								...form,
								planned: e.target.value
							}),
							placeholder: "0",
							className: "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-4 sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Spent (EGP)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: form.spent,
							onChange: (e) => setForm({
								...form,
								spent: e.target.value
							}),
							placeholder: "0",
							className: "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-12 sm:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-medium text-black",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add"]
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
			className: "mt-4 p-5",
			spotlight: false,
			children: activeBudgetLines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 text-center text-sm text-muted-foreground",
				children: "No line items yet. Add a budget, expense or payment above."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: activeBudgetLines.map((b) => {
					const p = b.planned ? Math.round(b.spent / b.planned * 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex flex-wrap items-center gap-3 rounded-xl p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground",
								children: b.kind
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-0 flex-1 truncate text-sm font-medium",
								children: b.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateBudgetLine(b.id, { spent: Math.max(0, b.spent - 1e3) }),
										className: "grid h-6 w-6 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-24 text-center font-mono text-xs",
										children: canSeePrice ? money(b.spent) : "•••"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateBudgetLine(b.id, { spent: b.spent + 1e3 }),
										className: "grid h-6 w-6 place-items-center rounded-md border border-white/10 text-muted-foreground hover:text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-24 text-right font-mono text-xs text-muted-foreground",
								children: ["/ ", canSeePrice ? money(b.planned) : "•••"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden h-1.5 w-20 overflow-hidden rounded-full bg-white/5 sm:block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-white/70",
									style: { width: `${Math.min(p, 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeBudgetLine(b.id),
								className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					}, b.id);
				})
			})
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
