import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as useOS, l as uid } from "./campaign-store-Cd9pjPrz.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { A as Rocket, M as Plus, Nt as Copy, O as Save, S as Shuffle, Ut as ChevronDown, Wt as Check, b as Sparkles } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, r as ModalShell, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/techlab-B0tOf0F9.js
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
	const [enhancer, setEnhancer] = (0, import_react.useState)(false);
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
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: "Prompt Library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
					onClick: () => setEnhancer(true),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Enhance a prompt"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [prompts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-2xl p-8 text-center text-sm text-muted-foreground",
					children: "No prompts yet. Use “Enhance a prompt” to build one."
				}), prompts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptRow, {
					title: p.title,
					category: p.category,
					body: p.body
				}, p.id))]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: enhancer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromptEnhancer, { onClose: () => setEnhancer(false) }) })
	] });
}
var BANKS = {
	"Music / Suno": {
		suffix: "Radio-ready, high-fidelity master, emotive and dynamic.",
		groups: [
			{
				label: "Genre",
				options: [
					"Arabic pop",
					"Khaleeji",
					"Shaabi",
					"Trap",
					"Afrobeats",
					"R&B",
					"Amapiano",
					"Cinematic",
					"Lo-fi"
				]
			},
			{
				label: "Mood",
				options: [
					"emotional",
					"euphoric",
					"dark",
					"nostalgic",
					"romantic",
					"energetic",
					"melancholic"
				]
			},
			{
				label: "Tempo",
				options: [
					"70 BPM ballad",
					"90 BPM",
					"110 BPM",
					"128 BPM dance"
				]
			},
			{
				label: "Instruments",
				options: [
					"oud",
					"qanun",
					"808s",
					"live strings",
					"piano",
					"synth pads",
					"hand percussion",
					"nay"
				]
			},
			{
				label: "Vocals",
				options: [
					"powerful female lead",
					"male croon",
					"layered harmonies",
					"whispered",
					"ad-lib heavy"
				]
			},
			{
				label: "Production",
				options: [
					"spacious reverb",
					"warm analog",
					"punchy mix",
					"Dolby Atmos",
					"vintage tape"
				]
			}
		]
	},
	"AI Artist Identity": {
		suffix: "Deliver as a cohesive artist bible: persona, palette, sonic signature.",
		groups: [
			{
				label: "Origin",
				options: [
					"Cairo streets",
					"Gulf heritage",
					"diaspora",
					"Mediterranean",
					"Nubian roots"
				]
			},
			{
				label: "Aesthetic",
				options: [
					"high-fashion editorial",
					"retro-futurist",
					"minimalist",
					"neon maximalist",
					"desert cinematic"
				]
			},
			{
				label: "Sonic signature",
				options: [
					"signature ad-lib",
					"recurring motif",
					"unique vocal texture",
					"trademark drop"
				]
			},
			{
				label: "Persona",
				options: [
					"mysterious",
					"rebellious",
					"romantic",
					"regal",
					"playful"
				]
			}
		]
	},
	"Video / Reel Script": {
		suffix: "Keep it native to the platform, first 2 seconds must hook.",
		groups: [
			{
				label: "Hook",
				options: [
					"bold statement",
					"question",
					"pattern interrupt",
					"POV",
					"before/after"
				]
			},
			{
				label: "Format",
				options: [
					"talking head",
					"b-roll montage",
					"text-on-screen",
					"duet",
					"tutorial"
				]
			},
			{
				label: "Tone",
				options: [
					"raw & real",
					"aspirational",
					"funny",
					"dramatic"
				]
			},
			{
				label: "CTA",
				options: [
					"pre-save link",
					"follow for more",
					"comment below",
					"use this sound"
				]
			}
		]
	},
	"Marketing Copy": {
		suffix: "Concise, on-brand, conversion-focused.",
		groups: [
			{
				label: "Angle",
				options: [
					"FOMO",
					"social proof",
					"transformation",
					"exclusivity",
					"problem-solution"
				]
			},
			{
				label: "Emotion",
				options: [
					"excitement",
					"trust",
					"urgency",
					"belonging"
				]
			},
			{
				label: "Format",
				options: [
					"3 headlines",
					"caption + hashtags",
					"ad primary text",
					"email subject lines"
				]
			},
			{
				label: "CTA",
				options: [
					"shop now",
					"learn more",
					"join the drop",
					"pre-save"
				]
			}
		]
	}
};
var rand = (a) => a[Math.floor(Math.random() * a.length)];
function PromptEnhancer({ onClose }) {
	const { update } = useOS();
	const [category, setCategory] = (0, import_react.useState)("Music / Suno");
	const [idea, setIdea] = (0, import_react.useState)("");
	const [picked, setPicked] = (0, import_react.useState)({});
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const bank = BANKS[category];
	const toggle = (opt) => setPicked((s) => {
		const cur = s[category] ?? [];
		return {
			...s,
			[category]: cur.includes(opt) ? cur.filter((x) => x !== opt) : [...cur, opt]
		};
	});
	function surprise() {
		const sel = [];
		bank.groups.forEach((g) => {
			sel.push(rand(g.options));
			if (Math.random() > .6) sel.push(rand(g.options));
		});
		setPicked((s) => ({
			...s,
			[category]: Array.from(new Set(sel))
		}));
		if (!idea.trim()) setIdea(category === "Music / Suno" ? "a song about the last goodbye" : "");
	}
	const enhanced = (0, import_react.useMemo)(() => {
		const chips = picked[category] ?? [];
		return `${idea.trim() || `${category} concept`}${chips.length ? ` — ${chips.join(", ")}` : ""}. ${bank.suffix}`;
	}, [
		idea,
		picked,
		category,
		bank
	]);
	if (saved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: "Prompt enhancer",
		title: "Saved to library",
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Your enhanced prompt is in the Prompt Library and synced to Supabase."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
				onClick: onClose,
				children: "Done"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		eyebrow: "No-API enhancer",
		title: "Enhance a prompt",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: Object.keys(BANKS).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setCategory(c),
						className: `rounded-full border px-3 py-1.5 text-xs transition-colors ${category === c ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`,
						children: c
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Your idea"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: idea,
					onChange: (e) => setIdea(e.target.value),
					placeholder: "e.g. a heartbreak anthem for the last track of the album",
					className: "min-h-16 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none focus:border-white/40"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: bank.groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1 text-[10px] uppercase tracking-wider text-muted-foreground",
						children: g.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5",
						children: g.options.map((o) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggle(o),
								className: `rounded-full border px-2.5 py-1 text-[11px] transition-colors ${(picked[category] ?? []).includes(o) ? "border-white bg-white/10 text-white" : "border-white/10 text-muted-foreground hover:text-white"}`,
								children: o
							}, o);
						})
					})] }, g.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-1.5 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-[11px] uppercase tracking-wider text-muted-foreground",
						children: "Enhanced prompt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: surprise,
						className: "inline-flex items-center gap-1 text-xs text-white/60 hover:text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shuffle, { className: "h-3.5 w-3.5" }), " Surprise me"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-foreground/90",
					children: enhanced
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							navigator.clipboard?.writeText(enhanced).then(() => {
								setCopied(true);
								setTimeout(() => setCopied(false), 1500);
							});
						},
						className: "glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5",
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), " Copy"] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
						onClick: () => {
							update("prompts", (p) => [{
								id: uid("pr"),
								title: (idea.trim() || category).slice(0, 40),
								category,
								body: enhanced
							}, ...p]);
							setSaved(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), " Save to library"]
					})]
				})
			]
		})
	});
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
