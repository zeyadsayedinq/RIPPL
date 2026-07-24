import { a as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useCampaigns } from "./campaign-store-Cd9pjPrz.mjs";
import { n as useRole } from "./role-context-Dr49T2SH.mjs";
import { A as Rocket, Ft as CloudUpload, Rt as Clapperboard, Tt as FileDown, Vt as CircleCheck, Wt as Check, Xt as BadgeCheck, _t as Flame, i as Video, r as Wallet } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { t as SharedBadge } from "./SharedBadge-l4LKisvK.mjs";
import { o as creators } from "./mock-data-D43v3GLl.mjs";
import { a as YAxis, f as ResponsiveContainer, l as CartesianGrid, m as Legend, n as AreaChart, o as XAxis, p as Tooltip, s as Area } from "../_libs/recharts+[...].mjs";
import { t as campaignBriefPdf } from "./pdf-BD3yix15.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PlatformDashboard-3JM4PhXj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function rng(seed) {
	let h = 1779033703 ^ seed.length;
	for (let i = 0; i < seed.length; i++) {
		h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
		h = h << 13 | h >>> 19;
	}
	let a = h >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var fmt = (n) => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${(n / 1e3).toFixed(1)}K` : `${Math.round(n)}`;
function PlatformDashboard({ cfg }) {
	const { active, activeIsShared, activeEditable, activeAssets, taskProgress, setAssetStatus, activeChecklist, assignedIds } = useCampaigns();
	const { role, canSeePrice } = useRole();
	const [queued, setQueued] = (0, import_react.useState)(null);
	const stats = (0, import_react.useMemo)(() => {
		const r = rng(`${cfg.name}:${active?.id ?? "no-campaign"}`);
		const goal = 1e7;
		const views = Math.round(goal * (.15 + r() * .65));
		const spent = active ? Math.min(active.spent || Math.round((active.budget || 5e4) * (.2 + r() * .5)), active.budget || Infinity) : 0;
		const cpm = views ? spent / views * 1e3 : 0;
		const engagements = Math.round(views * (.05 + r() * .07));
		return {
			goal,
			views,
			spent,
			cpm,
			cpe: engagements ? spent / engagements : 0,
			series: Array.from({ length: 14 }, (_, i) => {
				return {
					d: (/* @__PURE__ */ new Date(Date.now() - (13 - i) * 864e5)).toLocaleDateString("en-US", {
						month: "short",
						day: "numeric"
					}),
					organic: Math.round(views / 24 * (.4 + r())),
					paid: Math.round(views / 30 * (.3 + r())),
					eng: +(4 + r() * 6).toFixed(1)
				};
			}),
			panel: cfg.stats(r, views, spent)
		};
	}, [active, cfg]);
	const progress = Math.min(100, Math.round(stats.views / stats.goal * 100));
	const creatives = activeAssets.filter((a) => a.type === "Video" || a.type === "Art" || a.type === "Other");
	function downloadBrief() {
		if (!active) return;
		const names = creators.filter((c) => assignedIds.includes(c.id)).map((c) => c.name);
		campaignBriefPdf(active, activeChecklist, names);
	}
	function act(label) {
		if (label === "Download Brief") {
			downloadBrief();
			return;
		}
		setQueued(label);
		setTimeout(() => setQueued(null), 1800);
	}
	const actions = role === "Marketing Manager" ? [
		{
			label: `Push to ${cfg.paidLabel}`,
			icon: Rocket,
			primary: true
		},
		{
			label: "Approve Content",
			icon: CircleCheck
		},
		{
			label: "Download Brief",
			icon: FileDown
		}
	] : role === "Team Member" ? [{
		label: "Submit New Draft",
		icon: CloudUpload,
		primary: true
	}, {
		label: "Download Brief",
		icon: FileDown
	}] : [{
		label: "Approve Contract Amendment",
		icon: BadgeCheck,
		primary: true
	}, {
		label: "Verify Payout",
		icon: Wallet
	}];
	const statusColor = {
		"Draft": "oklch(0.75 0.02 260)",
		"Under Review": "oklch(0.82 0.16 90)",
		"Approved": "oklch(0.82 0.18 150)",
		"Needs Revision": "oklch(0.7 0.2 20)"
	};
	const CfgIcon = cfg.icon;
	const PanelIcon = cfg.panelIcon;
	const visibleStats = stats.panel.filter((s) => !s.priceGated || canSeePrice);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.35em]",
						style: { color: cfg.accent },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CfgIcon, { className: "h-3.5 w-3.5" }),
							" Platform · ",
							cfg.name
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 flex flex-wrap items-center gap-3 font-display text-3xl font-bold",
						children: [active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							active.artist,
							" / ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-neon",
								children: active.title
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-gradient-neon",
							children: [cfg.name, " Command"]
						}), activeIsShared && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedBadge, {
							editable: activeEditable,
							className: "!text-[10px]"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: active ? cfg.subtitle : "Create a campaign to activate tracking."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
					variant: a.primary ? void 0 : "ghost",
					onClick: () => act(a.label),
					children: [
						queued === a.label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "h-4 w-4" }),
						" ",
						queued === a.label ? "Queued ✓" : a.label
					]
				}, a.label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 p-5 xl:col-span-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
							children: "Campaign Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "h-4 w-4 text-white/40" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-end justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-display text-3xl font-bold",
							children: [
								fmt(stats.views),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-base font-normal text-muted-foreground",
									children: [
										"/ ",
										fmt(stats.goal),
										" views"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: [
								active?.goal || "Goal: 10M views",
								" · checklist ",
								taskProgress,
								"% done"
							]
						})] }), canSeePrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-display text-xl font-bold",
								children: ["$", fmt(stats.spent)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "spent"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-2 overflow-hidden rounded-full bg-white/[0.06]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full",
							style: {
								width: `${progress}%`,
								background: `linear-gradient(90deg, ${cfg.accent}, oklch(0.85 0.25 328))`
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-3",
						children: [
							canSeePrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "CPM (live)",
								value: `$${stats.cpm.toFixed(2)}`
							}),
							canSeePrice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "CPE (live)",
								value: `$${stats.cpe.toFixed(3)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Progress",
								value: `${progress}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
								label: "Engagement rate",
								value: `${stats.series.at(-1)?.eng ?? 0}%`
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 p-5 xl:col-span-7",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
							children: cfg.panelTitle
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelIcon, { className: "h-4 w-4 text-white/40" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `mt-3 grid grid-cols-1 gap-3 ${visibleStats.length >= 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-3"}`,
						children: visibleStats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoundStat, {
							icon: s.icon,
							label: s.label,
							value: s.value,
							hint: s.hint
						}, s.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[11px] text-muted-foreground/70",
						children: cfg.panelNote ?? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							"Deterministic placeholder metrics — wire the ",
							cfg.name,
							" feed in ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
								className: "text-[10px]",
								children: "market-data.ts"
							}),
							" to go live."
						] })
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-4 p-5",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
				children: "Analytics · last 14 days"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-1 font-display text-xl font-bold",
				children: ["Organic vs ", cfg.paidLabel]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 h-64",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: stats.series,
						margin: {
							top: 4,
							right: 8,
							left: -14,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: `org-${cfg.name}`,
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: cfg.accent,
									stopOpacity: .5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: cfg.accent,
									stopOpacity: 0
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: `paid-${cfg.name}`,
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "oklch(0.85 0.25 328)",
									stopOpacity: .5
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "oklch(0.85 0.25 328)",
									stopOpacity: 0
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "rgba(255,255,255,0.06)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "d",
								tick: {
									fill: "rgba(255,255,255,0.4)",
									fontSize: 10
								},
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "rgba(255,255,255,0.4)",
									fontSize: 10
								},
								tickLine: false,
								axisLine: false,
								tickFormatter: (v) => fmt(v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: {
									background: "#0a0a0c",
									border: "1px solid rgba(255,255,255,0.1)",
									borderRadius: 12,
									fontSize: 12
								},
								formatter: (v, name) => [fmt(v), name === "organic" ? "Organic views" : `${cfg.paidLabel} views`]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { formatter: (v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: v === "organic" ? "Organic" : cfg.paidLabel
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "organic",
								stroke: cfg.accent,
								fill: `url(#org-${cfg.name})`,
								strokeWidth: 2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "paid",
								stroke: "oklch(0.85 0.25 328)",
								fill: `url(#paid-${cfg.name})`,
								strokeWidth: 2
							})
						]
					})
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-4 p-5",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
					children: "Creatives & Assets"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-xl font-bold",
					children: "Drafted content"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/assets",
					className: "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clapperboard, { className: "h-3.5 w-3.5" }), " Asset pipeline"]
				})]
			}), creatives.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-muted-foreground",
				children: [
					"No drafted content on this campaign yet — upload drafts in ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/assets",
						className: "text-white underline underline-offset-2",
						children: "Assets"
					}),
					" and they'll appear here with their approval status."
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4",
				children: creatives.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass overflow-hidden rounded-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid aspect-video place-items-center bg-white/[0.03]",
						children: [a.previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: a.previewUrl,
							alt: a.name,
							className: "h-full w-full object-cover"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "h-6 w-6 text-white/25" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute right-2 top-2 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wider",
							style: {
								color: statusColor[a.status],
								background: "rgba(0,0,0,0.55)",
								border: `1px solid ${statusColor[a.status]}`
							},
							children: a.status
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate text-xs font-medium",
								children: a.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 text-[10px] text-muted-foreground",
								children: [
									a.type,
									" · ",
									a.addedAt
								]
							}),
							role === "Marketing Manager" && a.status !== "Approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setAssetStatus(a.id, "Approved"),
									className: "rounded-full border border-[oklch(0.82_0.18_150)]/40 px-2 py-0.5 text-[10px] text-[oklch(0.82_0.18_150)] hover:bg-[oklch(0.82_0.18_150)]/10",
									children: "Approve"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setAssetStatus(a.id, "Needs Revision"),
									className: "rounded-full border border-[oklch(0.7_0.2_20)]/40 px-2 py-0.5 text-[10px] text-[oklch(0.8_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10",
									children: "Revise"
								})]
							})
						]
					})]
				}, a.id))
			})]
		})
	] });
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-white/10 bg-white/[0.02] p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-lg font-bold",
			children: value
		})]
	});
}
function SoundStat({ icon: Icon, label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-white/10 bg-white/[0.02] p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
					" ",
					label
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-display text-2xl font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-[10px] text-muted-foreground/70",
				children: hint
			})
		]
	});
}
//#endregion
export { fmt as n, PlatformDashboard as t };
