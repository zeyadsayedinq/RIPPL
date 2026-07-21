import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useCampaigns } from "./campaign-store-Cd9pjPrz.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { $ as ListChecks, M as Plus, Nt as Copy, P as Pencil, h as Trash2, j as Radio, n as X, qt as CalendarClock, yt as FileText } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, r as ModalShell, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-Du4AQ4HY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var uid = () => `custom-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
function blankTemplate() {
	return {
		id: uid(),
		name: "New Template",
		source: "Custom",
		description: "Your custom playbook.",
		bestFor: "—",
		checklist: [{
			phase: "Phase 1",
			items: []
		}],
		timeline: [],
		channels: {
			social: [],
			paid: [],
			playlists: [],
			press: [],
			radio: []
		}
	};
}
function duplicate(t) {
	return {
		...structuredClone(t),
		id: uid(),
		name: `${t.name} (copy)`,
		source: "Custom"
	};
}
function TemplatesPage() {
	const { allTemplates, customTemplates, saveTemplate, deleteTemplate } = useCampaigns();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const isCustom = (id) => customTemplates.some((t) => t.id === id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
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
					children: "Reusable infrastructure, checklists & ideas — duplicate, edit, remove items, or build your own."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
				onClick: () => setEditing(blankTemplate()),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New template"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: allTemplates.filter((t) => t.id !== "blank").map((t) => {
				const tasks = t.checklist.reduce((n, p) => n + p.items.length, 0);
				const chans = t.channels.social.length + t.channels.paid.length + t.channels.playlists.length + t.channels.press.length + t.channels.radio.length;
				const custom = isCustom(t.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
					className: "col-span-12 md:col-span-6 xl:col-span-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-white/60" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-lg font-bold",
									children: t.name
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider",
								style: {
									background: custom ? "oklch(0.82 0.18 150 / 0.15)" : "rgba(255,255,255,0.06)",
									color: custom ? "oklch(0.85 0.18 150)" : "rgba(255,255,255,0.5)"
								},
								children: custom ? "Custom" : "Built-in"
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex gap-2",
							children: custom ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setEditing(structuredClone(t)),
								className: "glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									if (confirm(`Delete "${t.name}"?`)) deleteTemplate(t.id);
								},
								className: "inline-flex items-center justify-center gap-1.5 rounded-full border border-[oklch(0.7_0.2_20)]/40 px-3 py-2 text-xs text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => saveTemplate(duplicate(t)),
								className: "glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), " Duplicate & edit"]
							})
						})
					]
				}, t.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TemplateEditor, {
			draft: editing,
			onClose: () => setEditing(null),
			onSave: (t) => {
				saveTemplate(t);
				setEditing(null);
			}
		}) })
	] });
}
var inp = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-sm outline-none focus:border-white/40";
function TemplateEditor({ draft, onClose, onSave }) {
	const [t, setT] = (0, import_react.useState)(draft);
	const patch = (p) => setT((s) => ({
		...s,
		...p
	}));
	const addPhase = () => patch({ checklist: [...t.checklist, {
		phase: `Phase ${t.checklist.length + 1}`,
		items: []
	}] });
	const removePhase = (pi) => patch({ checklist: t.checklist.filter((_, i) => i !== pi) });
	const renamePhase = (pi, v) => patch({ checklist: t.checklist.map((ph, i) => i === pi ? {
		...ph,
		phase: v
	} : ph) });
	const addItem = (pi, label) => patch({ checklist: t.checklist.map((ph, i) => i === pi ? {
		...ph,
		items: [...ph.items, {
			id: uid(),
			label,
			done: false
		}]
	} : ph) });
	const removeItem = (pi, id) => patch({ checklist: t.checklist.map((ph, i) => i === pi ? {
		...ph,
		items: ph.items.filter((x) => x.id !== id)
	} : ph) });
	const addMilestone = (date, title) => patch({ timeline: [...t.timeline, {
		date,
		title,
		type: "Event",
		channel: "—"
	}] });
	const removeMilestone = (idx) => patch({ timeline: t.timeline.filter((_, i) => i !== idx) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		eyebrow: draft.source === "Custom" ? "Edit template" : "Template",
		title: "Template editor",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						value: t.name,
						onChange: (e) => patch({ name: e.target.value })
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: inp,
						value: t.description,
						onChange: (e) => patch({ description: e.target.value })
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: "Checklist"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: addPhase,
						className: "text-xs text-white/60 hover:text-white",
						children: "+ phase"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-3",
					children: t.checklist.map((ph, pi) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-white/8 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: `${inp} font-semibold`,
									value: ph.phase,
									onChange: (e) => renamePhase(pi, e.target.value)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removePhase(pi),
									className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-2 space-y-1",
								children: ph.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex-1 text-muted-foreground",
										children: it.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => removeItem(pi, it.id),
										className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
									})]
								}, it.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddInline, {
								placeholder: "Add task…",
								onAdd: (v) => addItem(pi, v)
							})
						]
					}, pi))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: "Timeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1",
						children: t.timeline.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[oklch(0.85_0.25_328)]",
									children: m.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-muted-foreground",
									children: m.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeMilestone(i),
									className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3.5 w-3.5" })
								})
							]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddMilestone, { onAdd: addMilestone })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
						onClick: () => onSave(t),
						children: "Save template"
					})]
				})
			]
		})
	});
}
function AddInline({ placeholder, onAdd }) {
	const [v, setV] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			className: inp,
			value: v,
			placeholder,
			onChange: (e) => setV(e.target.value),
			onKeyDown: (e) => {
				if (e.key === "Enter" && v.trim()) {
					onAdd(v.trim());
					setV("");
				}
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => {
				if (v.trim()) {
					onAdd(v.trim());
					setV("");
				}
			},
			className: "glass grid h-8 w-8 shrink-0 place-items-center rounded-lg hover:bg-white/5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
		})]
	});
}
function AddMilestone({ onAdd }) {
	const [d, setD] = (0, import_react.useState)("");
	const [ti, setTi] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-2 flex gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: `${inp} w-24 shrink-0`,
				value: d,
				placeholder: "Wk 0",
				onChange: (e) => setD(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: inp,
				value: ti,
				placeholder: "Milestone…",
				onChange: (e) => setTi(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					if (ti.trim()) {
						onAdd(d.trim() || "—", ti.trim());
						setD("");
						setTi("");
					}
				},
				className: "glass grid h-8 w-8 shrink-0 place-items-center rounded-lg hover:bg-white/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
			})
		]
	});
}
//#endregion
export { TemplatesPage as component };
