import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useOS } from "./os-store-v2jdVGrV.mjs";
import { _t as Check, a as Users, dt as Copy, et as FileText, g as Sparkles, j as Music2, n as X, q as Handshake, st as DollarSign, vt as ChartColumn, z as LayoutGrid } from "../_libs/lucide-react.mjs";
import { a as Portal, t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roster-CHYqqSzk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	"Discovered",
	"Evaluating",
	"Negotiating",
	"Signed"
];
var DEAL_STATUSES = [
	"Pitching",
	"Contracting",
	"In Production",
	"Live",
	"Paid"
];
function RosterPage() {
	const [tab, setTab] = (0, import_react.useState)("scouting");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
					children: "A&R · CRM"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Roster ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Management"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Scout, sign and manage talent — drag cards across the pipeline."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5",
			children: [
				{
					key: "scouting",
					label: "Scouting Board",
					icon: LayoutGrid
				},
				{
					key: "roster",
					label: "Active Roster",
					icon: Users
				},
				{
					key: "deals",
					label: "Deal Sorter",
					icon: Handshake
				}
			].map((t) => {
				const on = tab === t.key;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t.key),
					className: `relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? "text-white" : "text-muted-foreground hover:text-white"}`,
					children: [
						on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "roster-tab",
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
				tab === "scouting" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoutingBoard, {}),
				tab === "roster" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveRoster, {}),
				tab === "deals" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DealSorter, {})
			]
		})
	] });
}
function ScoutingBoard() {
	const { artists, update } = useOS();
	const [drag, setDrag] = (0, import_react.useState)(null);
	const [over, setOver] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	function drop(stage) {
		if (!drag) return;
		update("artists", (a) => a.map((x) => x.id === drag ? {
			...x,
			stage,
			managed: stage === "Signed" ? x.managed : x.managed
		} : x));
		setDrag(null);
		setOver(null);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4",
		children: STAGES.map((stage) => {
			const cards = artists.filter((a) => a.stage === stage);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setOver(stage);
				},
				onDragLeave: () => setOver(null),
				onDrop: () => drop(stage),
				className: `rounded-2xl border p-3 transition-colors ${over === stage ? "border-white/40 bg-white/[0.04]" : "border-white/8 bg-white/[0.01]"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-1 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: stage
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-xs text-muted-foreground",
						children: cards.length
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [cards.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						draggable: true,
						onDragStart: () => setDrag(a.id),
						onClick: () => setSelected(a),
						className: "glass cursor-grab rounded-xl p-3 active:cursor-grabbing hover:border-white/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold",
								children: a.name.charAt(0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-sm font-medium",
									children: a.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "truncate text-[11px] text-muted-foreground",
									children: [
										a.kind,
										" · ",
										a.handle
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex justify-between text-[11px] text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.kind === "Music" ? `${a.streams} streams` : `${a.followers} followers` })
						})]
					}, a.id)), cards.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-xl border border-dashed border-white/10 p-4 text-center text-[11px] text-muted-foreground",
						children: "Drop here"
					})]
				})]
			}, stage);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistPanel, {
		artist: selected,
		onClose: () => setSelected(null)
	}) })] });
}
function ArtistPanel({ artist, onClose }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	function draftPitch() {
		const pitch = `Pitch: ${artist.name} (${artist.kind})\nHandle: ${artist.handle}\nReach: ${artist.kind === "Music" ? artist.streams + " streams" : artist.followers + " followers"}\n\n${artist.name} is a standout ${artist.kind.toLowerCase()} talent with strong regional pull. Proposing a development + release deal to scale their audience across TikTok, Instagram and DSPs.`;
		navigator.clipboard?.writeText(pitch).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[100] flex justify-end p-4",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { x: 400 },
			animate: { x: 0 },
			exit: { x: 400 },
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 30
			},
			className: "glass-strong relative flex w-full max-w-md flex-col gap-5 overflow-y-auto rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "glass absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-16 w-16 place-items-center rounded-full bg-white/10 font-display text-2xl font-bold",
						children: artist.name.charAt(0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-xl font-bold",
							children: artist.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-muted-foreground",
							children: [
								artist.kind,
								" · ",
								artist.handle
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-white/40",
							children: ["Stage: ", artist.stage]
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: artist.kind === "Music" ? "Streams" : "Followers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-display text-lg font-bold",
							children: artist.kind === "Music" ? artist.streams : artist.followers
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "Handle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 truncate text-sm",
							children: artist.handle
						})]
					})]
				}),
				artist.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-xl p-4 text-sm text-muted-foreground",
					children: artist.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: draftPitch,
					className: "inline-flex items-center justify-center gap-2 rounded-full bg-white py-2.5 text-sm font-semibold text-black",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Pitch copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), " Draft Pitch"] })
				})
			]
		})]
	}) });
}
function ActiveRoster() {
	const { artists } = useOS();
	const roster = artists.filter((a) => a.managed);
	const [msg, setMsg] = (0, import_react.useState)(null);
	function flash(t) {
		setMsg(t);
		setTimeout(() => setMsg(null), 1600);
	}
	function pressKit(a) {
		const kit = `PRESS KIT — ${a.name}\n${a.kind} · ${a.handle}\nReach: ${a.kind === "Music" ? a.streams + " streams" : a.followers + " followers"}\n\nBio: ${a.name} is a leading ${a.kind.toLowerCase()} artist managed by RIPPL.`;
		const blob = new Blob([kit], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const el = document.createElement("a");
		el.href = url;
		el.download = `${a.name}_press_kit.txt`;
		el.click();
		URL.revokeObjectURL(url);
		flash(`Press kit generated for ${a.name}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-4 rounded-xl border border-[oklch(0.85_0.18_150)]/30 bg-[oklch(0.85_0.18_150)]/10 px-4 py-2 text-sm text-[oklch(0.85_0.18_150)]",
		children: msg
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3",
		children: roster.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-full bg-white/10 font-display text-lg font-bold",
						children: a.name.charAt(0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg font-bold",
						children: a.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-xs text-muted-foreground",
						children: [
							a.kind === "Music" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "h-3 w-3" }), " Music"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Influencer"]
							}),
							" · ",
							a.handle
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 glass rounded-xl p-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: a.kind === "Music" ? "Streams" : "Followers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-2xl font-bold text-gradient-neon",
						children: a.kind === "Music" ? a.streams : a.followers
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => pressKit(a),
						className: "inline-flex items-center justify-center gap-2 rounded-full bg-white py-2 text-sm font-medium text-black",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" }), " Generate Press Kit (PDF)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => flash(`Deal split logged for ${a.name}`),
							className: "glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-3.5 w-3.5" }), " Log Deal Split"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => flash(`Opening analytics for ${a.name}`),
							className: "glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3.5 w-3.5" }), " Analytics"]
						})]
					})]
				})
			]
		}, a.id))
	})] });
}
function DealSorter() {
	const { deals, update } = useOS();
	const statusColor = {
		Pitching: "oklch(0.7 0.02 260)",
		Contracting: "oklch(0.8 0.16 80)",
		"In Production": "oklch(0.72 0.16 200)",
		Live: "oklch(0.85 0.18 150)",
		Paid: "oklch(0.7 0.28 328)"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
		className: "p-6",
		spotlight: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3",
							children: "Brand"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3",
							children: "Artist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3",
							children: "Deliverables"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 text-right",
							children: "Value"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3 text-right",
							children: "Split"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-3",
							children: "Status"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [deals.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-white/[0.06]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 font-medium",
							children: d.brand
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 text-muted-foreground",
							children: d.artist
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3 text-muted-foreground",
							children: d.deliverables
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 text-right font-mono",
							children: [
								"EGP ",
								(d.value / 1e3).toFixed(0),
								"K"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-3 text-right font-mono",
							children: [d.split, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: d.status,
								onChange: (e) => update("deals", (all) => all.map((x) => x.id === d.id ? {
									...x,
									status: e.target.value
								} : x)),
								className: "rounded-full border px-2.5 py-1 text-xs outline-none",
								style: {
									color: statusColor[d.status],
									borderColor: statusColor[d.status] + "66",
									background: statusColor[d.status] + "1a"
								},
								children: DEAL_STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#140a1e] text-white",
									children: s
								}, s))
							})
						})
					]
				}, d.id)), deals.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 6,
					className: "py-8 text-center text-muted-foreground",
					children: "No deals yet — log one from the + button."
				}) })] })]
			})
		})
	});
}
//#endregion
export { RosterPage as component };
