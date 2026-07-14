import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as FileText, b as FileHeadphone, d as MessageSquare, s as Send, v as FilePlay, w as Clock, y as FileImage } from "../_libs/lucide-react.mjs";
import { i as assets, n as MagneticButton, r as SpotlightCard, t as AppShell } from "./mock-data-B-aB0cXw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets-Bcsnxxqh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var typeIcon = {
	Audio: FileHeadphone,
	Art: FileImage,
	Brief: FileText,
	Video: FilePlay
};
function AssetsPage() {
	const [selected, setSelected] = (0, import_react.useState)(assets[0]);
	const [filter, setFilter] = (0, import_react.useState)("All");
	const list = assets.filter((a) => filter === "All" || a.type === filter);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
				children: "Library"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-1 font-display text-3xl font-bold",
				children: ["Asset ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-neon",
					children: "Vault"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2",
			children: [
				"All",
				"Brief",
				"Audio",
				"Art",
				"Video"
			].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setFilter(t),
				className: `relative rounded-full px-3 py-1.5 text-xs transition-colors ${filter === t ? "text-white" : "text-muted-foreground hover:text-white"}`,
				children: [filter === t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layoutId: "asset-filter",
					className: "absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)]/40 to-[oklch(0.5_0.3_300)]/40 border border-[oklch(0.7_0.28_328)]/40"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative",
					children: t
				})]
			}, t))
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 grid grid-cols-12 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4",
			children: list.map((a, i) => {
				const Icon = typeIcon[a.type];
				const isActive = selected?.id === a.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
					onClick: () => setSelected(a),
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .05 },
					className: `glass group relative rounded-2xl p-5 text-left transition-all ${isActive ? "border-[oklch(0.7_0.28_328)]/50 shadow-[0_0_32px_rgba(232,121,249,0.15)]" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass grid h-11 w-11 place-items-center rounded-xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-[oklch(0.7_0.28_328)]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground",
								children: a.version
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 font-semibold",
							children: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: a.owner
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
									" ",
									a.updated
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3" }),
									" ",
									a.comments.length
								]
							})]
						})
					]
				}, a.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
			className: "col-span-12 lg:col-span-4 p-5 h-fit sticky top-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					exit: {
						opacity: 0,
						y: -8
					},
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: "Discussion"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-display text-lg font-bold truncate",
							children: selected.name
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 max-h-80 overflow-y-auto pr-1",
							children: [selected.comments.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass rounded-xl p-4 text-center text-sm text-muted-foreground",
								children: "No comments yet. Kick off the thread."
							}), selected.comments.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-xl p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] text-[10px] font-bold",
												children: c.author.charAt(0)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: c.author
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: ["· ", c.role]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: c.time
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-foreground/90",
									children: c.text
								})]
							}, c.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass flex items-center gap-2 rounded-xl p-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Reply to thread…",
								className: "flex-1 bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" }) })]
						})
					]
				}, selected.id)
			})
		})]
	})] });
}
//#endregion
export { AssetsPage as component };
