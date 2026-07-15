import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useOS, o as uid } from "./os-store-v2jdVGrV.mjs";
import { _t as Check, dt as Copy, gt as ChevronDown, w as Plus, x as Rocket } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/techlab-CfgMucA5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLS = [
	"Backlog",
	"In Progress",
	"Done"
];
var deployColor = {
	Building: "oklch(0.82 0.16 90)",
	Ready: "oklch(0.82 0.18 150)",
	Error: "oklch(0.65 0.24 20)"
};
function TechLab() {
	const { projects, prompts, update } = useOS();
	const [drag, setDrag] = (0, import_react.useState)(null);
	function move(pid, tid, col) {
		update("projects", (all) => all.map((p) => p.id === pid ? {
			...p,
			tasks: p.tasks.map((t) => t.id === tid ? {
				...t,
				col
			} : t)
		} : p));
	}
	function addTask(pid) {
		const title = prompt("New task");
		if (!title) return;
		update("projects", (all) => all.map((p) => p.id === pid ? {
			...p,
			tasks: [...p.tasks, {
				id: uid("t"),
				title,
				col: "Backlog"
			}]
		} : p));
	}
	function cycleDeploy(pid) {
		update("projects", (all) => all.map((p) => p.id === pid ? {
			...p,
			deploy: p.deploy === "Ready" ? "Building" : p.deploy === "Building" ? "Error" : "Ready"
		} : p));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
					children: "AI · Tech Lab"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["AI & ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Tech Lab"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Ship your SaaS. Sprint boards + a library of proven AI prompts."
				})
			]
		}),
		projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "p-6",
				spotlight: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "h-5 w-5 text-white/50" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-bold",
								children: p.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => cycleDeploy(p.id),
								title: "Toggle deploy status (Vercel)",
								className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]",
								style: {
									color: deployColor[p.deploy],
									background: deployColor[p.deploy] + "1a"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full",
									style: { background: deployColor[p.deploy] }
								}), p.deploy]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => addTask(p.id),
						className: "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Task"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 grid grid-cols-1 gap-3 md:grid-cols-3",
					children: COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: (e) => e.preventDefault(),
						onDrop: () => drag && move(drag.pid, drag.tid, col),
						className: "rounded-xl border border-white/8 bg-white/[0.01] p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: col
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: p.tasks.filter((t) => t.col === col).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								draggable: true,
								onDragStart: () => setDrag({
									pid: p.id,
									tid: t.id
								}),
								className: "glass cursor-grab rounded-lg p-2.5 text-sm active:cursor-grabbing",
								children: t.title
							}, t.id))
						})]
					}, col))
				})]
			})
		}, p.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-xs uppercase tracking-[0.25em] text-muted-foreground",
				children: "Prompt Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: prompts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptRow, {
					title: p.title,
					category: p.category,
					body: p.body
				}, p.id))
			})]
		})
	] });
}
function PromptRow({ title, category, body }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
		className: "p-0 overflow-hidden",
		spotlight: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((o) => !o),
			className: "flex w-full items-center justify-between p-4 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-medium",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wider text-muted-foreground",
				children: category
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${open ? "rotate-180" : ""}` })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-t border-white/[0.06] p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "whitespace-pre-wrap font-mono text-xs text-muted-foreground",
				children: body
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					navigator.clipboard?.writeText(body).then(() => {
						setCopied(true);
						setTimeout(() => setCopied(false), 1500);
					});
				},
				className: "mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Copy Prompt"] })
			})]
		})]
	});
}
//#endregion
export { TechLab as component };
