import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as DollarSign, D as ArrowUpRight, T as CircleCheck, a as Tag, i as TrendingUp, m as Instagram, o as Sparkles, p as Layers, r as Users, t as Youtube, u as Music2, w as Clock, x as Facebook } from "../_libs/lucide-react.mjs";
import { a as conversionTrend, c as platformStats, d as viralTriggers, l as rolloutPhases, n as MagneticButton, o as creators, r as SpotlightCard, s as influencerPipeline, t as AppShell, u as useRole } from "./mock-data-B-aB0cXw.mjs";
import { a as Area, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as AreaChart, o as RadialBar, r as YAxis, s as PolarAngleAxis, t as RadialBarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-t83S4fI3.js
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
function Dashboard() {
	const totalCreators = creators.length + 85;
	const pending = creators.filter((c) => c.status === "Pending").length + 18;
	const priced = creators.filter((c) => c.status === "Priced").length + 22;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: Users,
					label: "Total Creators",
					value: totalCreators,
					accent: "magenta",
					span: "col-span-6 md:col-span-3 lg:col-span-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: Clock,
					label: "Pending",
					value: pending,
					accent: "cyan",
					span: "col-span-6 md:col-span-3 lg:col-span-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: Tag,
					label: "Priced",
					value: priced,
					accent: "purple",
					span: "col-span-6 md:col-span-3 lg:col-span-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					icon: Layers,
					label: "Tiers",
					value: 5,
					accent: "magenta",
					span: "col-span-6 md:col-span-3 lg:col-span-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignValueCard, { totalValue: 505e3 })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marquee, { items: viralTriggers })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-8 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
							children: "Main Campaign HUD"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl font-bold",
							children: "Platform Conversion · 7d"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
							variant: "ghost",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" }), " Full report"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-3",
						children: platformStats.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformTile, {
							name: p.name,
							followers: p.followers,
							reach: p.reach,
							growth: p.growth,
							color: p.color
						}, p.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-64",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
								data: conversionTrend,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "gTT",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "oklch(0.7 0.28 328)",
												stopOpacity: .6
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "oklch(0.7 0.28 328)",
												stopOpacity: 0
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "gIG",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "oklch(0.55 0.3 300)",
												stopOpacity: .5
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "oklch(0.55 0.3 300)",
												stopOpacity: 0
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "gYT",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "oklch(0.75 0.2 60)",
												stopOpacity: .4
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "oklch(0.75 0.2 60)",
												stopOpacity: 0
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
											id: "gFB",
											x1: "0",
											y1: "0",
											x2: "0",
											y2: "1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "0%",
												stopColor: "oklch(0.85 0.18 200)",
												stopOpacity: .4
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
												offset: "100%",
												stopColor: "oklch(0.85 0.18 200)",
												stopOpacity: 0
											})]
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										dataKey: "day",
										stroke: "rgba(255,255,255,0.3)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										stroke: "rgba(255,255,255,0.3)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: {
											background: "rgba(15,5,25,0.9)",
											border: "1px solid rgba(255,255,255,0.1)",
											borderRadius: 12,
											backdropFilter: "blur(20px)"
										},
										labelStyle: { color: "#fff" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "TikTok",
										stroke: "oklch(0.7 0.28 328)",
										strokeWidth: 2,
										fill: "url(#gTT)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "YouTube",
										stroke: "oklch(0.75 0.2 60)",
										strokeWidth: 2,
										fill: "url(#gYT)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Instagram",
										stroke: "oklch(0.55 0.3 300)",
										strokeWidth: 2,
										fill: "url(#gIG)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
										type: "monotone",
										dataKey: "Facebook",
										stroke: "oklch(0.85 0.18 200)",
										strokeWidth: 2,
										fill: "url(#gFB)"
									})
								]
							})
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "Influencer Campaign HUD"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "Pipeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 h-48",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadialBarChart, {
								innerRadius: "30%",
								outerRadius: "100%",
								data: influencerPipeline,
								startAngle: 180,
								endAngle: -180,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
										type: "number",
										domain: [0, 150],
										tick: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialBar, {
										background: { fill: "rgba(255,255,255,0.04)" },
										dataKey: "count",
										cornerRadius: 8,
										fill: "oklch(0.7 0.28 328)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
										background: "rgba(15,5,25,0.9)",
										border: "1px solid rgba(255,255,255,0.1)",
										borderRadius: 12
									} })
								]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-2",
						children: influencerPipeline.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-1.5 w-1.5 rounded-full",
									style: { background: `oklch(0.7 0.28 ${328 - i * 15})` }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: s.stage
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-foreground",
								children: s.count
							})]
						}, s.stage))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "2026 Rollout"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "Milestone Timeline"
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
		})
	] });
}
function Header() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
				children: "Command · Overview"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-1 font-display text-3xl font-bold tracking-tight",
				children: ["Rollout HQ / ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-neon",
					children: "Q1 2026"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
				variant: "ghost",
				children: "Export brief"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, { children: "+ New campaign" })]
		})]
	});
}
function MetricCard({ icon: Icon, label, value, accent, span }) {
	const colors = {
		magenta: "oklch(0.7 0.28 328)",
		purple: "oklch(0.55 0.3 300)",
		cyan: "oklch(0.85 0.18 200)"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
		className: `${span} p-5`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-4 w-4",
					style: { color: colors[accent] }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 font-display text-4xl font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 h-0.5 w-8 rounded",
				style: { background: colors[accent] }
			})
		]
	});
}
function PlatformTile({ name, followers, reach, growth, color }) {
	const Icon = {
		TikTok: Music2,
		Instagram,
		Facebook,
		YouTube: Youtube
	}[name];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "h-4 w-4",
					style: { color }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs text-[oklch(0.85_0.18_200)]",
					children: [
						"+",
						growth,
						"%"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-sm font-medium",
				children: name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-display text-xl font-bold",
				children: followers
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground",
				children: ["Reach ", reach]
			})
		]
	});
}
function CampaignValueCard({ totalValue }) {
	const { canSeePrice } = useRole();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
		className: "col-span-12 lg:col-span-4 p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-3.5 w-3.5" }), " Total Campaign Value"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 font-display text-5xl font-bold text-gradient-neon",
						children: canSeePrice ? `$${totalValue.toLocaleString()}` : "•••••"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2 text-xs text-[oklch(0.85_0.18_200)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), " +18.4% vs. Q4 forecast"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass grid h-14 w-14 shrink-0 place-items-center rounded-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-[oklch(0.7_0.28_328)]" })
			})]
		})
	});
}
//#endregion
export { Dashboard as component };
