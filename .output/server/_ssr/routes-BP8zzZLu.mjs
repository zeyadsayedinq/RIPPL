import { a as __toESM } from "../_runtime.mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Radio, Ct as ArrowRight, J as Globe, R as Linkedin, V as Instagram, Y as Ghost, a as Users, at as Facebook, b as Search, f as TrendingUp, j as Music2, st as DollarSign, t as Youtube, xt as AtSign } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BP8zzZLu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SCENES = [
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
		label: "Campaign Launch"
	},
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
		label: "Creator Network"
	},
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
		label: "Paid Strategy"
	},
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
		label: "Night Ops"
	}
];
function XIcon({ className, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className,
		style,
		fill: "currentColor",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817-5.966 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" })
	});
}
var PLATFORMS = [
	{
		name: "TikTok",
		Icon: Music2,
		hex: "#00f2ea",
		glow: "rgba(0,242,234,0.55)"
	},
	{
		name: "Instagram",
		Icon: Instagram,
		hex: "#e1306c",
		glow: "rgba(225,48,108,0.55)"
	},
	{
		name: "YouTube",
		Icon: Youtube,
		hex: "#ff0000",
		glow: "rgba(255,0,0,0.55)"
	},
	{
		name: "Facebook",
		Icon: Facebook,
		hex: "#1877f2",
		glow: "rgba(24,119,242,0.55)"
	},
	{
		name: "X",
		Icon: XIcon,
		hex: "#ffffff",
		glow: "rgba(255,255,255,0.30)"
	},
	{
		name: "LinkedIn",
		Icon: Linkedin,
		hex: "#0a66c2",
		glow: "rgba(10,102,194,0.55)"
	},
	{
		name: "Snapchat",
		Icon: Ghost,
		hex: "#fffc00",
		glow: "rgba(255,252,0,0.45)"
	},
	{
		name: "Threads",
		Icon: AtSign,
		hex: "#ffffff",
		glow: "rgba(255,255,255,0.30)"
	}
];
var PORTALS = [
	{
		role: "Agency Marketer",
		title: "Marketer Portal",
		desc: "Media buys, budgets, creator approvals, cross-platform analytics — the full 360 picture.",
		accent: "#e879f9",
		border: "rgba(232,121,249,0.25)",
		to: "/dashboard"
	},
	{
		role: "Creator",
		title: "Creator Portal",
		desc: "Submit drafts, read your brief, track views and what you're owed.",
		accent: "#818cf8",
		border: "rgba(129,140,248,0.25)",
		to: "/creators"
	},
	{
		role: "Manager",
		title: "Manager Portal",
		desc: "Oversee your whole roster, verify payouts, and manage who sees what.",
		accent: "#34d399",
		border: "rgba(52,211,153,0.25)",
		to: "/assets"
	}
];
var FILTERS = [
	"Last 24 Hours",
	"Active Campaigns",
	"Projected Q3"
];
var METRIC_SETS = [
	[
		{
			label: "Reach · 24h",
			value: "6.1M",
			note: "+4.2% vs yesterday",
			Icon: Globe
		},
		{
			label: "Live Conversions",
			value: "18.4K",
			note: "pre-saves + sales",
			Icon: TrendingUp
		},
		{
			label: "Spend · 24h",
			value: "$41.2K",
			note: "blended 4.3x ROAS",
			Icon: DollarSign
		}
	],
	[
		{
			label: "Total Ecosystem Reach",
			value: "128.6M",
			note: "+21.4% this week",
			Icon: Globe
		},
		{
			label: "Active Creator Nodes",
			value: "142",
			note: "across 9 platforms",
			Icon: Users
		},
		{
			label: "Blended ROAS",
			value: "4.19x",
			note: "$3.11M attributed",
			Icon: TrendingUp
		}
	],
	[
		{
			label: "Projected Reach",
			value: "310M",
			note: "Q3 forecast",
			Icon: Globe
		},
		{
			label: "Planned Budget",
			value: "$950K",
			note: "78% committed",
			Icon: DollarSign
		},
		{
			label: "Target CPA",
			value: "$1.40",
			note: "-8% vs current",
			Icon: TrendingUp
		}
	]
];
var PILLARS = [
	{
		key: "Organic",
		Icon: Radio
	},
	{
		key: "Ads",
		Icon: DollarSign
	},
	{
		key: "Creators",
		Icon: Users
	},
	{
		key: "Search",
		Icon: Search
	}
];
var MATRIX_PLATFORMS = [
	"TikTok",
	"Instagram",
	"YouTube",
	"Facebook",
	"X",
	"LinkedIn"
];
var MATRIX = {
	Organic: { rows: [
		{
			label: "Hook Type",
			values: [
				"Trend-driven",
				"Visual-aesthetic",
				"Search-intent",
				"Community",
				"Real-time takes",
				"Thought-leadership"
			]
		},
		{
			label: "Format",
			values: [
				"FYP series",
				"Reels + Stories",
				"Shorts → long-form",
				"Groups",
				"Threads/replies",
				"Documents + posts"
			]
		},
		{
			label: "Primary KPI",
			values: [
				"Discovery rate",
				"Saves + shares",
				"Watch time",
				"Group activity",
				"Reply depth",
				"Dwell + follows"
			]
		}
	] },
	Ads: { rows: [
		{
			label: "Ad Format",
			values: [
				"Spark Ads",
				"Partnership + Reels",
				"Bumper / TrueView",
				"Advantage+",
				"Promoted trend",
				"Lead-gen"
			]
		},
		{
			label: "Objective",
			values: [
				"Video views",
				"Conversions",
				"View-through",
				"Sales / retarget",
				"Awareness",
				"B2B pipeline"
			]
		},
		{
			label: "Primary KPI",
			values: [
				"CPM + CPE",
				"ROAS",
				"CPV",
				"CPA",
				"Reach/Freq",
				"CPL"
			]
		}
	] },
	Creators: { rows: [
		{
			label: "Model",
			values: [
				"Co-creation",
				"Affiliate + tags",
				"Segment sponsor",
				"Local experts",
				"Commentary",
				"Exec voices"
			]
		},
		{
			label: "Tier Focus",
			values: [
				"Micro → mega",
				"Micro (10–100k)",
				"Long-form hosts",
				"Subject experts",
				"Reply guys",
				"Employees"
			]
		},
		{
			label: "Primary KPI",
			values: [
				"Adoption rate",
				"Affiliate sales",
				"Integration CTR",
				"Sentiment",
				"Amplification",
				"Employer brand"
			]
		}
	] },
	Search: { rows: [
		{
			label: "Surface",
			values: [
				"TikTok Search",
				"Explore + tags",
				"YouTube search",
				"Marketplace",
				"Trends",
				"Skills / jobs"
			]
		},
		{
			label: "Play",
			values: [
				"Keyword captions",
				"Hashtag SEO",
				"SEO titles + chapters",
				"Local intent",
				"Real-time news",
				"Intent targeting"
			]
		},
		{
			label: "Primary KPI",
			values: [
				"Search share",
				"Tag reach",
				"Impressions → subs",
				"Inquiry rate",
				"Trend capture",
				"Qualified clicks"
			]
		}
	] }
};
function LandingPage() {
	const [activeScene, setActiveScene] = (0, import_react.useState)(0);
	const [transitioning, setTransitioning] = (0, import_react.useState)(false);
	const [activeFilter, setActiveFilter] = (0, import_react.useState)(1);
	const [hoveredPlatform, setHoveredPlatform] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setActiveScene((prev) => (prev + 1) % SCENES.length), 8e3);
		return () => clearInterval(id);
	}, []);
	const switchScene = (0, import_react.useCallback)((idx) => {
		if (transitioning || idx === activeScene) return;
		setTransitioning(true);
		setActiveScene(idx);
		setTimeout(() => setTransitioning(false), 1e3);
	}, [transitioning, activeScene]);
	const metrics = METRIC_SETS[activeFilter];
	const hovered = PLATFORMS.find((p) => p.name === hoveredPlatform);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full bg-black font-display",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative w-full h-screen overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 z-0",
					children: SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						src: s.url,
						autoPlay: true,
						muted: true,
						loop: true,
						playsInline: true,
						className: "absolute inset-0 w-full h-full object-cover",
						style: {
							opacity: i === activeScene ? 1 : 0,
							filter: "brightness(0.42) saturate(1.05) contrast(1.05)",
							transition: "opacity 1000ms ease-in-out"
						}
					}, s.url))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-0 bg-black/40 pointer-events-none" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 z-10 pointer-events-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png",
						alt: "",
						className: "w-full h-full object-cover train-bob select-none opacity-80"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/75 via-black/45 to-black/90" }),
				hovered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 z-10 pointer-events-none",
					style: {
						opacity: .2,
						background: `radial-gradient(ellipse 55% 55% at 50% 55%, ${hovered.hex} 0%, transparent 100%)`,
						transition: "opacity 400ms ease"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 z-20 flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center justify-between px-6 py-4 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 22 22",
										fill: "none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "2.5",
												cy: "19.5",
												r: "2",
												fill: "white"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 2.5 13.5 A 7 7 0 0 1 9.5 19.5",
												stroke: "white",
												strokeWidth: "2",
												strokeLinecap: "round"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 2.5 8   A 12.5 12.5 0 0 1 15 19.5",
												stroke: "white",
												strokeWidth: "1.8",
												strokeLinecap: "round",
												opacity: "0.65"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 2.5 2   A 18.5 18.5 0 0 1 21 19.5",
												stroke: "white",
												strokeWidth: "1.5",
												strokeLinecap: "round",
												opacity: "0.35"
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-xl bg-[oklch(0.7_0.28_328)] blur-xl opacity-40 -z-10" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white font-bold tracking-[0.2em] text-sm",
									children: "RIPPL"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "liquid-glass rounded-full px-4 py-2 flex items-center gap-3 text-xs text-white/60",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "14 active campaigns" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px h-3 bg-white/15" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "73% budget utilized" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "liquid-glass rounded-full flex items-center gap-0.5 px-2 py-1.5",
									children: [NAV_LINKS.map(({ label, to }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to,
										className: "px-3 py-1.5 text-xs text-white/70 hover:text-white rounded-full transition-colors",
										children: label
									}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/dashboard",
										className: "ml-1 rounded-full bg-white text-black text-xs font-semibold px-4 py-1.5 hover:bg-white/90 transition-colors",
										children: "Enter"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col items-center justify-center px-6 text-center gap-4 min-h-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .1,
										duration: .5
									},
									className: "liquid-glass rounded-full px-4 py-2 text-xs text-white/70 tracking-wide",
									children: "9 platforms · paid, organic & creator — one command center"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
									initial: {
										opacity: 0,
										y: 12
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .2,
										duration: .55
									},
									className: "text-white font-bold leading-[1.06]",
									style: { fontSize: "clamp(2rem, 4.8vw, 4.2rem)" },
									children: [
										"Where Campaigns Drop",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient-neon",
											children: "and Culture Follows"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: {
										opacity: 0,
										y: 10
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .3,
										duration: .5
									},
									className: "text-white/60 max-w-md text-sm leading-relaxed",
									children: "Every platform, every format, every buy — paid, organic, and creator. One place to run the whole funnel, built for the people doing the actual work."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .35,
										duration: .5
									},
									className: "liquid-glass rounded-full flex items-center p-1 gap-0.5",
									children: FILTERS.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setActiveFilter(i),
										className: `rounded-full px-4 py-1.5 text-xs font-medium transition-all ${activeFilter === i ? "bg-white text-black" : "text-white/55 hover:text-white"}`,
										children: f
									}, f))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 10
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { duration: .4 },
									className: "flex gap-3 flex-wrap justify-center",
									children: metrics.map(({ label, value, note, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "liquid-glass rounded-2xl px-5 py-4 text-center min-w-[138px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												className: "h-4 w-4 mx-auto mb-2",
												style: { color: "oklch(0.7 0.28 328)" }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-white text-2xl tracking-tight",
												children: value
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-white/45 text-[10px] mt-1 uppercase tracking-wide",
												children: label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] mt-0.5",
												style: { color: "oklch(0.85 0.18 200)" },
												children: note
											})
										]
									}, label))
								}, activeFilter),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .5,
										duration: .5
									},
									className: "flex flex-wrap items-center justify-center gap-3",
									children: PLATFORMS.map(({ name, Icon, hex, glow }) => {
										const isHovered = hoveredPlatform === name;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onMouseEnter: () => setHoveredPlatform(name),
											onMouseLeave: () => setHoveredPlatform(null),
											onClick: () => navigate({ to: "/dashboard" }),
											className: "group flex flex-col items-center gap-1.5",
											title: `${name} analytics`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "liquid-glass grid h-14 w-14 place-items-center rounded-2xl transition-all duration-300 group-hover:scale-[1.12]",
												style: { boxShadow: isHovered ? `0 0 30px ${glow}, inset 0 1px 1px rgba(255,255,255,0.15)` : void 0 },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
													className: "h-6 w-6 transition-colors duration-300",
													style: { color: isHovered ? hex : "rgba(255,255,255,0.55)" }
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] transition-colors duration-300",
												style: { color: isHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" },
												children: name
											})]
										}, name);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
									initial: { opacity: 0 },
									animate: { opacity: 1 },
									transition: { delay: .9 },
									onClick: () => document.getElementById("matrix")?.scrollIntoView({ behavior: "smooth" }),
									className: "mt-1 text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white/70 transition-colors",
									children: "Platform playbook ↓"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .6,
								duration: .55
							},
							className: "px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-3 shrink-0",
							children: PORTALS.map((portal) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => navigate({ to: portal.to }),
								className: "liquid-glass rounded-2xl p-4 text-left group hover:bg-white/[0.04] transition-all duration-200",
								style: { borderLeft: `2px solid ${portal.border}` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] uppercase tracking-[0.25em] font-semibold",
											style: { color: portal.accent },
											children: portal.role
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											className: "h-3.5 w-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200",
											style: { color: portal.accent }
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-white text-sm font-semibold mb-1",
										children: portal.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-white/40 text-xs leading-relaxed",
										children: portal.desc
									})
								]
							}, portal.role))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-5 right-6 z-30 flex items-center gap-2",
					children: SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => switchScene(i),
						title: s.label,
						className: "rounded-full transition-all duration-300",
						style: {
							height: "3px",
							width: i === activeScene ? "28px" : "14px",
							background: i === activeScene ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)"
						}
					}, i))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixSection, {})]
	});
}
var NAV_LINKS = [
	{
		label: "Campaigns",
		to: "/dashboard"
	},
	{
		label: "Creators",
		to: "/creators"
	},
	{
		label: "Analytics",
		to: "/dashboard"
	},
	{
		label: "Assets",
		to: "/assets"
	}
];
function MatrixSection() {
	const [pillar, setPillar] = (0, import_react.useState)("Ads");
	const platformTint = {
		TikTok: "#00f2ea",
		Instagram: "#e1306c",
		YouTube: "#ff0000",
		Facebook: "#1877f2",
		X: "#ffffff",
		LinkedIn: "#0a66c2"
	};
	const rows = MATRIX[pillar].rows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "matrix",
		className: "relative w-full bg-[oklch(0.14_0.02_300)] px-6 py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
							children: "The 360 Playbook"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-2 font-bold text-white",
							style: { fontSize: "clamp(1.8rem, 3.6vw, 3rem)" },
							children: ["Social Platform ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-neon",
								children: "Marketing Matrix"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/55",
							children: "In 2026 the lines between organic, paid, and creator marketing are blurred — creators run your ads and organic comments drive the creative. Switch the pillar to see how each platform's play changes."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "liquid-glass inline-flex flex-wrap justify-center gap-1 rounded-full p-1",
						children: PILLARS.map(({ key, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setPillar(key),
							className: `inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all ${pillar === key ? "bg-white text-black" : "text-white/60 hover:text-white"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }),
								" ",
								key
							]
						}, key))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass mt-8 overflow-x-auto rounded-3xl p-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[820px] border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-4 text-left text-[11px] uppercase tracking-[0.2em] text-white/40",
							children: "Strategy"
						}), MATRIX_PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "p-4 text-left text-sm font-semibold text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2 w-2 rounded-full",
									style: { background: platformTint[p] }
								}), p]
							})
						}, p))] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.tr, {
							initial: {
								opacity: 0,
								y: 6
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .3,
								delay: ri * .06
							},
							className: ri % 2 ? "bg-white/[0.02]" : "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4 text-sm font-medium text-white/70",
								children: row.label
							}), row.values.map((v, vi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-4 text-sm text-white/85",
								children: v
							}, vi))]
						}, `${pillar}-${row.label}`)) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-center gap-8 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.25em] text-white/40",
							children: "Active Platforms"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-2xl font-bold text-white",
							children: MATRIX_PLATFORMS.length
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-px bg-white/15" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.25em] text-white/40",
							children: "Selected Pillar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-2xl font-bold text-gradient-neon",
							children: pillar
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/dashboard",
						className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(232,121,249,0.4)] transition-shadow hover:shadow-[0_0_44px_rgba(232,121,249,0.6)]",
						children: ["Open the 360° command center ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				})
			]
		})
	});
}
//#endregion
export { LandingPage as component };
