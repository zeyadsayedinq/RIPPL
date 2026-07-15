import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useCampaigns } from "./os-store-v2jdVGrV.mjs";
import { _t as Check } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
import { t as EmptyState } from "./EmptyState-DpKuDbDt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tasks-DPvWyDMa.js
var import_jsx_runtime = require_jsx_runtime();
function TasksPage() {
	const { active, activeChecklist, activeTemplate, isTaskDone, toggleTask, taskProgress } = useCampaigns();
	if (!active || activeChecklist.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: active ? "No checklist for this campaign" : "No campaign yet",
		note: active ? "This campaign was created from a blank template. Create a new one from a template to seed a release checklist." : "Create a campaign to work its release checklist."
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
					children: ["Release Checklist · ", active.artist]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Campaign ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Tasks"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [activeTemplate ? `${activeTemplate.name} template · ${activeTemplate.source}` : "Rollout checklist", " · progress saves automatically."]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass grid place-items-center rounded-2xl px-6 py-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-4xl font-bold text-gradient-neon",
					children: [taskProgress, "%"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-wider text-muted-foreground",
					children: "Complete"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 h-2 overflow-hidden rounded-full bg-white/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] transition-all duration-500",
				style: { width: `${taskProgress}%` }
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: activeChecklist.map((phase) => {
				const done = phase.items.filter((i) => isTaskDone(i.id)).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
					className: "col-span-12 md:col-span-6 xl:col-span-4 p-5",
					spotlight: false,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold uppercase tracking-wider text-muted-foreground",
							children: ["Phase ", phase.phase]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: [
								done,
								"/",
								phase.items.length
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-1.5",
						children: phase.items.map((item) => {
							const checked = isTaskDone(item.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => toggleTask(item.id),
								className: "flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors hover:bg-white/[0.03]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors ${checked ? "border-[oklch(0.7_0.28_328)] bg-[oklch(0.7_0.28_328)]" : "border-white/20"}`,
									children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-white" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-sm leading-snug ${checked ? "text-muted-foreground line-through" : "text-foreground"}`,
									children: item.label
								})]
							}, item.id);
						})
					})]
				}, phase.phase);
			})
		})
	] });
}
//#endregion
export { TasksPage as component };
