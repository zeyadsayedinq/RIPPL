import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as useCampaigns } from "./os-store-v2jdVGrV.mjs";
import { C as Radio, I as ListMusic, k as Newspaper, st as DollarSign, wt as Antenna } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
import { t as EmptyState } from "./EmptyState-DpKuDbDt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/channels-DfZ2h9BN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		key: "social",
		label: "Social",
		icon: Radio
	},
	{
		key: "paid",
		label: "Paid Ads",
		icon: DollarSign
	},
	{
		key: "playlists",
		label: "Playlists",
		icon: ListMusic
	},
	{
		key: "press",
		label: "PR / Press",
		icon: Newspaper
	},
	{
		key: "radio",
		label: "Radio & TV",
		icon: Antenna
	}
];
var statusColor = {
	Live: "oklch(0.85 0.18 150)",
	Booked: "oklch(0.85 0.18 200)",
	Planned: "oklch(0.8 0.16 80)"
};
function ChannelsPage() {
	const { active, activeTemplate } = useCampaigns();
	const [tab, setTab] = (0, import_react.useState)("social");
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No campaign yet",
		note: "Create a campaign to plan its 360° channel mix — social, paid, playlists, press and broadcast."
	}) });
	const ch = activeTemplate?.channels ?? {
		social: [],
		paid: [],
		playlists: [],
		press: [],
		radio: []
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
					children: ["360° Channel Plan · ", active.artist]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Every ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Channel"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: ["Organic, paid, playlists, press and broadcast — not just influencers.", activeTemplate ? ` Plan seeded from the ${activeTemplate.name} template.` : ""]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5",
			children: TABS.map((t) => {
				const on = tab === t.key;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t.key),
					className: `relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${on ? "text-white" : "text-muted-foreground hover:text-white"}`,
					children: [
						on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "ch-tab",
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 8
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -8
				},
				transition: { duration: .2 },
				className: "mt-6",
				children: [
					(tab === "social" || tab === "paid") && ((tab === "social" ? ch.social : ch.paid).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { label: tab === "social" ? "social" : "paid" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelGrid, { rows: tab === "social" ? ch.social : ch.paid })),
					tab === "playlists" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
						className: "p-6",
						spotlight: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Playlist & Pitching Targets",
							note: "Editorial playlists, curators and pitching services."
						}), ch.playlists.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { label: "playlist" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, { rows: ch.playlists.map((p) => ({
							a: p.name,
							b: `${p.followers} followers`,
							status: p.status
						})) })]
					}),
					tab === "press" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
						className: "p-6",
						spotlight: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "PR & Press Campaign",
							note: "Guaranteed features + non-guaranteed submissions across regions."
						}), ch.press.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { label: "press" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full min-w-[620px] text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3",
											children: "Outlet"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3",
											children: "Region"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3",
											children: "Type"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3",
											children: "Contact"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 text-right",
											children: "Status"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: ch.press.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t border-white/[0.06]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 font-medium",
											children: p.outlet
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-muted-foreground",
											children: p.region
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-muted-foreground",
											children: p.type
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-muted-foreground",
											children: p.contact
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 text-right",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: p.status })
										})
									]
								}, p.outlet)) })]
							})
						})]
					}),
					tab === "radio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
						className: "p-6",
						spotlight: false,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
							title: "Radio & TV Broadcasting",
							note: "Regional rotation and radio-network plays."
						}), ch.radio.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { label: "radio" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List$1, { rows: ch.radio.map((r) => ({
							a: r.station,
							b: `${r.region} — ${r.note}`,
							status: "Planned"
						})) })]
					})
				]
			}, tab)
		})
	] });
}
function EmptyNote({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-4 text-sm text-muted-foreground",
		children: [
			"No ",
			label,
			" channels planned for this campaign yet."
		]
	});
}
function ChannelGrid({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid grid-cols-12 gap-4",
		children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 md:col-span-6 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold",
						children: r.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: r.status })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 font-display text-2xl font-bold text-gradient-neon",
					children: r.metric
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-xs text-muted-foreground",
					children: r.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 text-[11px] uppercase tracking-wider text-muted-foreground/70",
					children: ["Owner · ", r.owner]
				})
			]
		}, r.name))
	});
}
function SectionHead({ title, note }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "font-display text-2xl font-bold",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-sm text-muted-foreground",
		children: note
	})] });
}
function List$1({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 space-y-2",
		children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass flex items-center justify-between rounded-xl p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm font-medium",
					children: r.a
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-xs text-muted-foreground",
					children: r.b
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { status: r.status })]
		}, r.a))
	});
}
function Badge({ status }) {
	const c = statusColor[status] ?? "oklch(0.6 0.02 260)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]",
		style: {
			color: c,
			background: c + "1a"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-1.5 w-1.5 rounded-full",
			style: { background: c }
		}), status]
	});
}
//#endregion
export { ChannelsPage as component };
