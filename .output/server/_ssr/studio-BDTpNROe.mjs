import { a as __toESM } from "../_runtime.mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useOS, o as uid } from "./os-store-v2jdVGrV.mjs";
import { E as PenLine, F as List, G as Heading1, H as Image, _t as Check, dt as Copy, f as TrendingUp, w as Plus, z as LayoutGrid } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-BDTpNROe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudioPage() {
	const [tab, setTab] = (0, import_react.useState)("scratchpad");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
					children: "Creative · Studio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Creative ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Studio"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Write narratives, collect references, and track paid creative."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5",
			children: [
				{
					key: "scratchpad",
					label: "Scratchpad",
					icon: PenLine
				},
				{
					key: "moodboard",
					label: "Moodboard",
					icon: LayoutGrid
				},
				{
					key: "tracker",
					label: "Campaign Tracker",
					icon: TrendingUp
				}
			].map((t) => {
				const on = tab === t.key;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t.key),
					className: `relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? "text-white" : "text-muted-foreground hover:text-white"}`,
					children: [
						on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "studio-tab",
							className: "absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10",
							transition: {
								type: "spring",
								stiffness: 320,
								damping: 30
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { className: "relative h-4 w-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative whitespace-nowrap",
							children: t.label
						})
					]
				}, t.key);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [
				tab === "scratchpad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scratchpad, {}),
				tab === "moodboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moodboard, {}),
				tab === "tracker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tracker, {})
			]
		})
	] });
}
function Scratchpad() {
	const { notes, update } = useOS();
	const [activeId, setActiveId] = (0, import_react.useState)(notes[0]?.id ?? null);
	const taRef = (0, import_react.useRef)(null);
	const active = notes.find((n) => n.id === activeId) ?? notes[0] ?? null;
	function newNote() {
		const n = {
			id: uid("n"),
			title: "Untitled",
			body: "",
			updatedAt: "just now"
		};
		update("notes", (all) => [n, ...all]);
		setActiveId(n.id);
	}
	function edit(patch) {
		if (!active) return;
		update("notes", (all) => all.map((n) => n.id === active.id ? {
			...n,
			...patch,
			updatedAt: "just now"
		} : n));
	}
	function insert(snippet) {
		if (!active) return;
		const pos = taRef.current?.selectionStart ?? active.body.length;
		edit({ body: active.body.slice(0, pos) + snippet + active.body.slice(pos) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-12 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 md:col-span-4 p-4",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: newNote,
				className: "mb-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-2 text-sm font-medium text-black",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New note"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1",
				children: [notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveId(n.id),
					className: `w-full truncate rounded-lg px-3 py-2 text-left text-sm ${active?.id === n.id ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate",
						children: n.title || "Untitled"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-[11px] text-muted-foreground",
						children: n.updatedAt
					})]
				}, n.id)), notes.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 py-6 text-center text-sm text-muted-foreground",
					children: "No notes."
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
			className: "col-span-12 md:col-span-8 p-5",
			spotlight: false,
			children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: active.title,
					onChange: (e) => edit({ title: e.target.value }),
					placeholder: "Title",
					className: "w-full bg-transparent font-display text-2xl font-bold outline-none placeholder:text-muted-foreground"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => insert("\n# Heading\n"),
							title: "/h1",
							className: "glass inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs hover:bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading1, { className: "h-3.5 w-3.5" }), " /h1"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => insert("\n- Bullet\n"),
							title: "/bullet",
							className: "glass inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs hover:bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { className: "h-3.5 w-3.5" }), " /bullet"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => insert("\n![caption](https://image-url)\n"),
							title: "/image",
							className: "glass inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs hover:bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-3.5 w-3.5" }), " /image"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					ref: taRef,
					value: active.body,
					onChange: (e) => edit({ body: e.target.value }),
					placeholder: "Type / for commands, or write freely…  (# heading, - bullet, ![](url))",
					className: "mt-3 min-h-[280px] w-full resize-y bg-transparent text-sm leading-relaxed outline-none placeholder:text-muted-foreground"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-12 text-center text-sm text-muted-foreground",
				children: "Create a note to start."
			})
		})]
	});
}
function Moodboard() {
	const { mood, update } = useOS();
	const [url, setUrl] = (0, import_react.useState)("");
	const [cap, setCap] = (0, import_react.useState)("");
	function add() {
		if (!url.trim()) return;
		update("mood", (m) => [{
			id: uid("m"),
			url,
			caption: cap
		}, ...m]);
		setUrl("");
		setCap("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
		className: "p-4",
		spotlight: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2 sm:flex-row",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: url,
					onChange: (e) => setUrl(e.target.value),
					placeholder: "Paste image URL…",
					className: "flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: cap,
					onChange: (e) => setCap(e.target.value),
					placeholder: "Caption (optional)",
					className: "rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40 sm:w-48"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: add,
					className: "rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-black",
					children: "Add"
				})
			]
		})
	}), mood.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 glass rounded-2xl p-10 text-center text-sm text-muted-foreground",
		children: "Your moodboard is empty. Paste reference image URLs above."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-4 columns-2 gap-4 md:columns-3 xl:columns-4 [&>*]:mb-4",
		children: mood.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass overflow-hidden rounded-xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: m.url,
				alt: m.caption,
				className: "w-full",
				onError: (e) => {
					e.currentTarget.style.display = "none";
				}
			}), m.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2 text-xs text-muted-foreground",
				children: m.caption
			})]
		}, m.id))
	})] });
}
function Tracker() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const rows = [{
		platform: "TikTok Spark Ads",
		spend: "EGP 84K",
		roas: "5.1x",
		cpm: "EGP 12"
	}, {
		platform: "Meta (FB/IG)",
		spend: "EGP 62K",
		roas: "4.3x",
		cpm: "EGP 21"
	}];
	function copyBrief() {
		navigator.clipboard?.writeText(`CREATOR BRIEF\n\nCampaign: Lead single push\nHook: First 2 seconds — bold statement, native to the platform.\nDeliverables: 1× 15s vertical, 3× story frames.\nDo: use the campaign sound, tag @artist, on-screen captions.\nDon't: over-produce; keep it raw and trend-native.\nCTA: pre-save link in bio.`).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
		className: "p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: "Paid Creative"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-bold",
					children: "TikTok / Meta Tracker"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: copyBrief,
					className: "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), " Copy Creator Brief"] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[520px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Platform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right",
								children: "Spend"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right",
								children: "ROAS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right",
								children: "CPM"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-white/[0.06]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 font-medium",
								children: r.platform
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-mono",
								children: r.spend
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-mono text-[oklch(0.85_0.18_150)]",
								children: r.roas
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right font-mono text-muted-foreground",
								children: r.cpm
							})
						]
					}, r.platform)) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] text-muted-foreground/70",
				children: "Illustrative — connect a live ad account to populate real ROAS."
			})
		]
	});
}
//#endregion
export { StudioPage as component };
