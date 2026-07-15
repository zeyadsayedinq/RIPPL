import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as useRole, s as useCampaigns } from "./os-store-v2jdVGrV.mjs";
import { C as Radio, K as Hash, R as Linkedin, St as ArrowUpRight, V as Instagram, X as Funnel, Y as Ghost, at as Facebook, f as TrendingUp, g as Sparkles, j as Music2, mt as CircleCheck, p as TrendingDown, r as Wallet, st as DollarSign, t as Youtube, xt as AtSign, z as LayoutGrid } from "../_libs/lucide-react.mjs";
import { i as NewCampaignModal, n as MagneticButton, r as ModalShell, t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
import { t as EmptyState } from "./EmptyState-DpKuDbDt.mjs";
import { a as YAxis, c as Line, d as Cell, f as ResponsiveContainer, i as LineChart, l as CartesianGrid, m as Legend, n as AreaChart, o as XAxis, p as Tooltip, r as BarChart, s as Area, t as ComposedChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { a as channelMix, c as paidCampaigns, d as platformMetrics, f as rolloutPhases, i as campaignKpis, l as paidVsOrganic, n as attribution, r as budget, s as funnel, t as activityFeed, u as platformColors } from "./mock-data-D43v3GLl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-LZPDpk1i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Marquee({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "glass relative overflow-hidden rounded-full py-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-marquee flex whitespace-nowrap gap-12 font-mono text-xs uppercase tracking-[0.25em]",
			children: [...items, ...items].map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[oklch(0.7_0.28_328)]",
					children: "▲▲▲"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground/80",
					children: t
				})]
			}, i))
		})
	});
}
var fmt = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(0)}K` : `${n}`;
var money = (n) => n >= 1e6 ? `EGP ${(n / 1e6).toFixed(2)}M` : n >= 1e3 ? `EGP ${(n / 1e3).toFixed(0)}K` : `EGP ${n}`;
var platformIcon = {
	TikTok: Music2,
	Instagram,
	Facebook,
	YouTube: Youtube,
	X: Hash,
	LinkedIn: Linkedin,
	Snapchat: Ghost,
	Threads: AtSign,
	Pinterest: Radio
};
var tooltipStyle = {
	background: "rgba(15,5,25,0.92)",
	border: "1px solid rgba(255,255,255,0.1)",
	borderRadius: 12,
	backdropFilter: "blur(20px)"
};
var TABS = [
	{
		key: "overview",
		label: "Overview",
		icon: LayoutGrid
	},
	{
		key: "paid",
		label: "Paid Media",
		icon: DollarSign
	},
	{
		key: "organic",
		label: "Organic & Social",
		icon: Radio
	},
	{
		key: "funnel",
		label: "Funnel & Attribution",
		icon: Funnel
	},
	{
		key: "budget",
		label: "Budget",
		icon: Wallet
	}
];
function Dashboard() {
	const [tab, setTab] = (0, import_react.useState)("overview");
	const { active } = useCampaigns();
	if (!active || campaignKpis.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: active ? "No metrics yet" : "No campaign yet",
		note: active ? "This campaign has no performance data yet. Connect your channels or add data to populate the 360° command center." : "Create your first campaign to start tracking reach, spend, funnel and attribution across every channel."
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex gap-1.5 overflow-x-auto rounded-2xl glass p-1.5",
			children: TABS.map((t) => {
				const active = tab === t.key;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t.key),
					className: `relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${active ? "text-white" : "text-muted-foreground hover:text-white"}`,
					children: [
						active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layoutId: "tab-active",
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
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: -10
				},
				transition: { duration: .25 },
				children: [
					tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OverviewTab, {}),
					tab === "paid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaidTab, {}),
					tab === "organic" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrganicTab, {}),
					tab === "funnel" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FunnelTab, {}),
					tab === "budget" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetTab, {})
				]
			}, tab)
		})
	] });
}
function Header() {
	const [modal, setModal] = (0, import_react.useState)(null);
	const { active } = useCampaigns();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
						children: ["360° Command", active ? ` · ${active.status} · Live` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-3xl font-bold tracking-tight",
						children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							active.artist,
							" / ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-neon",
								children: active.title
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient-neon",
							children: "Campaign HQ"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: active ? `${active.subtitle} · ${active.platforms.length} channels · full-funnel attribution` : "No active campaign — create one to begin."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
					variant: "ghost",
					onClick: () => setModal("export"),
					children: "Export report"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
					onClick: () => setModal("new"),
					children: "+ New campaign"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [modal === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewCampaignModal, { onClose: () => setModal(null) }), modal === "export" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExportModal, { onClose: () => setModal(null) })] })
		]
	});
}
function ExportModal({ onClose }) {
	const [downloaded, setDownloaded] = (0, import_react.useState)(false);
	const doExport = () => {
		const lines = [
			"RIPPL — 360° Campaign Report",
			"Campaign HQ / Q3 2026",
			"",
			...campaignKpis.map((k) => `${k.label}: ${k.value} (${k.delta >= 0 ? "+" : ""}${k.delta}%)`),
			"",
			"Channel Mix:",
			...channelMix.map((c) => `  ${c.channel}: spend ${money(c.spend)}, revenue ${money(c.revenue)}, ROAS ${c.roas}x`)
		].join("\n");
		const blob = new Blob([lines], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "rippl-campaign-report-q3-2026.txt";
		a.click();
		URL.revokeObjectURL(url);
		setDownloaded(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: "Export report",
		title: "Campaign report",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Generate a snapshot of the current 360° view — top-line KPIs and channel mix. Downloads a report file you can share with clients."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2",
				children: campaignKpis.slice(0, 4).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: k.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-lg font-bold",
						children: k.value
					})]
				}, k.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex items-center justify-end gap-2",
				children: [
					downloaded && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mr-auto inline-flex items-center gap-1.5 text-xs text-[oklch(0.85_0.18_150)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Report downloaded"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white",
						children: "Close"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
						onClick: doExport,
						children: "Download report"
					})
				]
			})
		]
	});
}
function SectionTitle({ eyebrow, title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
			children: eyebrow
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-1 font-display text-2xl font-bold",
			children: title
		})] }), action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
			variant: "ghost",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" }),
				" ",
				action
			]
		})]
	});
}
function KpiCard({ kpi }) {
	const { canSeePrice } = useRole();
	const up = kpi.delta >= 0;
	const hidden = kpi.format === "money" && !canSeePrice && (kpi.key === "spend" || kpi.key === "revenue");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
		className: "col-span-6 md:col-span-3 xl:col-span-3 p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
					children: kpi.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `flex items-center gap-1 font-mono text-[11px] ${up ? "text-[oklch(0.85_0.18_150)]" : "text-[oklch(0.7_0.2_20)]"}`,
					children: [
						up ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-3 w-3" }),
						up ? "+" : "",
						kpi.delta,
						"%"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-display text-3xl font-bold",
				children: hidden ? "•••••" : kpi.value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-[11px] text-muted-foreground/70",
				children: kpi.hint
			})
		]
	});
}
function OverviewTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: campaignKpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, { kpi: k }, k.key))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, { items: activityFeed })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-7 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Reach · Last 8 weeks",
					title: "Paid vs. Organic",
					action: "Full report"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
							data: paidVsOrganic,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "gOrg",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "oklch(0.7 0.28 328)",
										stopOpacity: .55
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "oklch(0.7 0.28 328)",
										stopOpacity: 0
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
									id: "gPaid",
									x1: "0",
									y1: "0",
									x2: "0",
									y2: "1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "oklch(0.72 0.16 200)",
										stopOpacity: .55
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "oklch(0.72 0.16 200)",
										stopOpacity: 0
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "rgba(255,255,255,0.05)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "week",
									stroke: "rgba(255,255,255,0.3)",
									fontSize: 11,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									stroke: "rgba(255,255,255,0.3)",
									fontSize: 11,
									tickLine: false,
									axisLine: false,
									tickFormatter: fmt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: tooltipStyle,
									labelStyle: { color: "#fff" },
									formatter: (v) => fmt(v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									name: "Organic",
									dataKey: "organic",
									stroke: "oklch(0.7 0.28 328)",
									strokeWidth: 2,
									fill: "url(#gOrg)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
									type: "monotone",
									name: "Paid",
									dataKey: "paid",
									stroke: "oklch(0.72 0.16 200)",
									strokeWidth: 2,
									fill: "url(#gPaid)"
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					eyebrow: "Channel Mix",
					title: "Spend → Revenue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
							data: channelMix,
							layout: "vertical",
							margin: { left: 24 },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									type: "number",
									stroke: "rgba(255,255,255,0.3)",
									fontSize: 10,
									tickLine: false,
									axisLine: false,
									tickFormatter: money
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									type: "category",
									dataKey: "channel",
									stroke: "rgba(255,255,255,0.4)",
									fontSize: 10,
									width: 110,
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: tooltipStyle,
									formatter: (v) => money(v)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "spend",
									name: "Spend",
									fill: "oklch(0.55 0.3 300)",
									radius: [
										0,
										4,
										4,
										0
									],
									barSize: 9
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "revenue",
									name: "Revenue",
									fill: "oklch(0.72 0.16 200)",
									radius: [
										0,
										4,
										4,
										0
									],
									barSize: 9
								})
							]
						})
					})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhaseTracker, {})
	] });
}
function PaidTab() {
	const { canSeePrice } = useRole();
	const spendByPlatform = platformMetrics.filter((p) => p.spend > 0).map((p) => ({
		name: p.name,
		spend: p.spend,
		roas: p.roas
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 grid grid-cols-12 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 lg:col-span-7 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Paid Media",
				title: "Spend by Platform"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: spendByPlatform,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "rgba(255,255,255,0.05)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								stroke: "rgba(255,255,255,0.35)",
								fontSize: 10,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "rgba(255,255,255,0.3)",
								fontSize: 11,
								tickLine: false,
								axisLine: false,
								tickFormatter: money
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: tooltipStyle,
								formatter: (v, n) => n === "spend" ? money(v) : `${v}x`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "spend",
								radius: [
									6,
									6,
									0,
									0
								],
								barSize: 34,
								children: spendByPlatform.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: platformColors[p.name] }, p.name))
							})
						]
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 lg:col-span-5 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Efficiency",
				title: "ROAS by Platform"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-3",
				children: [...spendByPlatform].sort((a, b) => b.roas - a.roas).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-20 shrink-0 text-xs text-muted-foreground",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 flex-1 overflow-hidden rounded-full bg-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full",
								style: {
									width: `${p.roas / 6 * 100}%`,
									background: platformColors[p.name]
								}
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "w-10 text-right font-mono text-xs text-foreground",
							children: [p.roas, "x"]
						})
					]
				}, p.name))
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "p-6",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Active Buys",
				title: "Campaign Manager"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[860px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 font-medium",
								children: "Campaign"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 font-medium",
								children: "Platform"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 font-medium",
								children: "Objective"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-medium",
								children: "Spend"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-medium",
								children: "Impr."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-medium",
								children: "CTR"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right font-medium",
								children: "ROAS"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: paidCampaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignRow, {
						c,
						canSeePrice
					}, c.id)) })]
				})
			})]
		})
	})] });
}
function CampaignRow({ c, canSeePrice }) {
	const Icon = platformIcon[c.platform];
	const statusColor = {
		Active: "oklch(0.85 0.18 150)",
		Paused: "oklch(0.8 0.16 80)",
		Scheduled: "oklch(0.72 0.16 250)",
		Ended: "oklch(0.6 0.02 260)"
	};
	const pct = c.budget ? Math.round(c.spend / c.budget * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-t border-white/[0.06] transition-colors hover:bg-white/[0.02]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-medium",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 h-1 w-28 overflow-hidden rounded-full bg-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)]",
						style: { width: `${pct}%` }
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					style: { color: platformColors[c.platform] },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), c.platform]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 text-muted-foreground",
				children: c.objective
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 text-xs",
					style: { color: statusColor[c.status] },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-1.5 w-1.5 rounded-full",
						style: { background: statusColor[c.status] }
					}), c.status]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 text-right font-mono",
				children: canSeePrice ? money(c.spend) : "•••"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 text-right font-mono text-muted-foreground",
				children: fmt(c.impressions)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "py-3 text-right font-mono text-muted-foreground",
				children: [c.ctr, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "py-3 text-right font-mono",
				style: { color: c.roas >= 4 ? "oklch(0.85 0.18 150)" : "inherit" },
				children: c.roas ? `${c.roas}x` : "—"
			})
		]
	});
}
function OrganicTab() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4",
		children: platformMetrics.map((p) => {
			const Icon = platformIcon[p.name];
			const color = platformColors[p.name];
			const paidPct = p.reach ? Math.round(p.paidReach / p.reach * 100) : 0;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-2 font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "h-4 w-4",
								style: { color }
							}), p.name]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs text-[oklch(0.85_0.18_150)]",
							children: [
								"+",
								p.growth,
								"%"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 font-display text-2xl font-bold",
						children: fmt(p.reach)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: [
							"Reach · ",
							p.followers,
							" followers"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex h-1.5 overflow-hidden rounded-full bg-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full",
							style: {
								width: `${100 - paidPct}%`,
								background: color,
								opacity: .9
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full",
							style: {
								width: `${paidPct}%`,
								background: color,
								opacity: .35
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1.5 flex justify-between text-[10px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Organic ",
								100 - paidPct,
								"%"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"ER ",
								p.engagementRate,
								"%"
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Paid ",
								paidPct,
								"%"
							] })
						]
					})
				]
			}, p.name);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Organic Health",
				title: "Engagement Rate by Platform"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: [...platformMetrics].sort((a, b) => b.engagementRate - a.engagementRate),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "rgba(255,255,255,0.05)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								stroke: "rgba(255,255,255,0.35)",
								fontSize: 10,
								tickLine: false,
								axisLine: false,
								interval: 0,
								angle: -18,
								textAnchor: "end",
								height: 50
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "rgba(255,255,255,0.3)",
								fontSize: 11,
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => `${v}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: tooltipStyle,
								formatter: (v) => `${v}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "engagementRate",
								radius: [
									6,
									6,
									0,
									0
								],
								barSize: 30,
								children: platformMetrics.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: platformColors[p.name] }, p.name))
							})
						]
					})
				})
			})]
		})
	})] });
}
function FunnelTab() {
	const max = funnel[0].value;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 grid grid-cols-12 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 xl:col-span-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Awareness → Conversion",
				title: "Marketing Funnel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-2.5",
				children: funnel.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: s.stage
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-foreground",
						children: [
							fmt(s.value),
							" ",
							i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground/60",
								children: [
									"· ",
									s.rate,
									"%"
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-8 overflow-hidden rounded-lg bg-white/[0.03]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { width: 0 },
						animate: { width: `${s.value / max * 100}%` },
						transition: {
							duration: .6,
							delay: i * .08,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "h-full rounded-lg",
						style: { background: `linear-gradient(90deg, ${s.color}, ${s.color}55)` }
					})
				})] }, s.stage))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 xl:col-span-6 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Multi-Touch",
				title: "Attribution by Channel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: attribution,
						layout: "vertical",
						margin: { left: 32 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								type: "number",
								stroke: "rgba(255,255,255,0.3)",
								fontSize: 10,
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => `${v}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								type: "category",
								dataKey: "channel",
								stroke: "rgba(255,255,255,0.4)",
								fontSize: 10,
								width: 120,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: tooltipStyle,
								formatter: (v) => `${v}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "firstTouch",
								name: "First-touch",
								stackId: "a",
								fill: "oklch(0.72 0.16 200)",
								barSize: 16
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "lastTouch",
								name: "Last-touch",
								stackId: "a",
								fill: "oklch(0.6 0.26 300)",
								barSize: 16
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "linear",
								name: "Linear",
								stackId: "a",
								fill: "oklch(0.7 0.28 328)",
								radius: [
									0,
									4,
									4,
									0
								],
								barSize: 16
							})
						]
					})
				})
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "p-6",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Assisted Conversions",
				title: "Channel Contribution"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3",
				children: attribution.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground",
							children: a.channel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-display text-xl font-bold",
							children: fmt(a.assisted)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono text-[11px] text-[oklch(0.85_0.18_150)]",
							children: [a.roas, "x ROAS"]
						})
					]
				}, a.channel))
			})]
		})
	})] });
}
function BudgetTab() {
	const { canSeePrice } = useRole();
	const pctSpent = Math.round(budget.spent / budget.total * 100);
	const mask = (v) => canSeePrice ? v : "•••••";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 grid grid-cols-12 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetStat, {
				label: "Total Budget",
				value: mask(money(budget.total)),
				accent: "oklch(0.55 0.3 300)",
				icon: Wallet
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetStat, {
				label: "Spent",
				value: mask(money(budget.spent)),
				accent: "oklch(0.7 0.28 328)",
				icon: DollarSign,
				sub: `${pctSpent}% of budget`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetStat, {
				label: "Committed",
				value: mask(money(budget.committed)),
				accent: "oklch(0.8 0.16 80)",
				icon: CircleCheck
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetStat, {
				label: "Remaining",
				value: mask(money(budget.remaining)),
				accent: "oklch(0.85 0.18 150)",
				icon: Sparkles
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 grid grid-cols-12 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 xl:col-span-7 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Pacing · 8 weeks",
				title: "Budget Burndown"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: budget.burndown,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "rgba(255,255,255,0.05)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "week",
								stroke: "rgba(255,255,255,0.3)",
								fontSize: 11,
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								stroke: "rgba(255,255,255,0.3)",
								fontSize: 11,
								tickLine: false,
								axisLine: false,
								tickFormatter: money
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: tooltipStyle,
								formatter: (v) => money(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 11 } }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "planned",
								name: "Planned",
								stroke: "oklch(0.6 0.02 260)",
								strokeWidth: 2,
								strokeDasharray: "5 5",
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "actual",
								name: "Actual",
								stroke: "oklch(0.7 0.28 328)",
								strokeWidth: 2.5,
								dot: { r: 3 }
							})
						]
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 xl:col-span-5 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
				eyebrow: "Allocation",
				title: "Spend by Channel"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 space-y-3",
				children: channelMix.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: c.channel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono",
						children: [
							canSeePrice ? money(c.spend) : "•••",
							" · ",
							c.share,
							"%"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-2 overflow-hidden rounded-full bg-white/5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full",
						style: {
							width: `${c.share}%`,
							background: `oklch(0.7 0.28 ${328 - i * 18})`
						}
					})
				})] }, c.channel))
			})]
		})]
	})] });
}
function BudgetStat({ label, value, accent, icon: Icon, sub }) {
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
				className: "mt-3 font-display text-3xl font-bold",
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
function PhaseTracker() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6 grid grid-cols-12 gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "col-span-12 p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: "Campaign Timeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-bold",
					children: "Phase Tracker"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass hidden sm:flex items-center gap-2 rounded-full px-3 py-1.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.28_328)] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Live sync"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 right-0 top-6 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4",
					children: rolloutPhases.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-start",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `relative grid h-12 w-12 place-items-center rounded-full border-2 ${p.status === "complete" ? "border-[oklch(0.7_0.28_328)] bg-[oklch(0.7_0.28_328)]/20" : p.status === "active" ? "border-[oklch(0.85_0.18_200)] bg-[oklch(0.85_0.18_200)]/10" : "border-white/15 bg-white/[0.03]"}`,
									children: [p.status === "complete" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 text-[oklch(0.85_0.25_328)]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-xs text-foreground",
										children: [p.progress, "%"]
									}), p.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full bg-[oklch(0.85_0.18_200)]/30 blur-md animate-pulse -z-10" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 text-sm font-semibold",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: p.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 h-1 w-full overflow-hidden rounded-full bg-white/5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)]",
										style: { width: `${p.progress}%` }
									})
								})
							]
						})
					}, p.name))
				})]
			})]
		})
	});
}
//#endregion
export { Dashboard as component };
