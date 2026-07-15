import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as campaignTemplates } from "./os-store-v2jdVGrV.mjs";
import { C as Radio, L as ListChecks, bt as CalendarClock, et as FileText } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, r as ModalShell, t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-DDzH2Kjs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TemplatesPage() {
	const [preview, setPreview] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
					children: "Knowledge Library"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Campaign ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Templates"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Reusable rollout playbooks extracted from real marketing plans. Pick one when you create a campaign to seed its checklist, timeline and channel plan."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: campaignTemplates.filter((t) => t.id !== "blank").map((t) => {
				const tasks = t.checklist.reduce((n, p) => n + p.items.length, 0);
				const chans = t.channels.social.length + t.channels.paid.length + t.channels.playlists.length + t.channels.press.length + t.channels.radio.length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
					className: "col-span-12 md:col-span-6 xl:col-span-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 place-items-center rounded-xl bg-[oklch(0.7_0.28_328)]/15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-[oklch(0.8_0.25_328)]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-lg font-bold",
								children: t.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: t.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2 text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-3 w-3" }),
										" ",
										tasks,
										" tasks"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "h-3 w-3" }),
										" ",
										t.timeline.length,
										" milestones"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-white/[0.04] px-2 py-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-3 w-3" }),
										" ",
										chans,
										" channels"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-[11px] text-muted-foreground/70",
							children: ["Source: ", t.source]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
								variant: "ghost",
								onClick: () => setPreview(t),
								children: "Preview template"
							})
						})
					]
				}, t.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
			eyebrow: `Template · ${preview.source}`,
			title: preview.name,
			onClose: () => setPreview(null),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: preview.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-muted-foreground/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Best for:" }),
						" ",
						preview.bestFor
					]
				}),
				preview.checklist.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: "Checklist"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-3",
						children: preview.checklist.map((ph) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold",
							children: ph.phase
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1 space-y-0.5",
							children: ph.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "text-[13px] text-muted-foreground",
								children: ["• ", it.label]
							}, it.id))
						})] }, ph.phase))
					})]
				}),
				preview.timeline.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: "Timeline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1",
						children: preview.timeline.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-[13px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[oklch(0.85_0.25_328)]",
									children: t.date
								}),
								" — ",
								t.title
							]
						}, i))
					})]
				})
			]
		}) })
	] });
}
//#endregion
export { TemplatesPage as component };
