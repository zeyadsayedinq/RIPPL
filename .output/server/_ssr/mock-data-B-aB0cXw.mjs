import { a as __toESM } from "../_runtime.mjs";
import { i as motion, n as useTransform, r as useMotionValue, t as useSpring } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as useRouterState, f as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as ChevronDown, f as LayoutDashboard, g as FolderOpen, l as Radio, r as Users } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mock-data-B-aB0cXw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
function RoleProvider({ children }) {
	const [role, setRole] = (0, import_react.useState)("Marketing Manager");
	const canSeePrice = role === "Marketing Manager";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			role,
			setRole,
			canSeePrice
		},
		children
	});
}
function useRole() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useRole outside provider");
	return c;
}
var nav = [
	{
		to: "/",
		label: "Overview",
		icon: LayoutDashboard
	},
	{
		to: "/creators",
		label: "Creators",
		icon: Users
	},
	{
		to: "/assets",
		label: "Assets",
		icon: FolderOpen
	}
];
var roles = [
	"Marketing Manager",
	"Team Member",
	"Client"
];
function Sidebar() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { role, setRole } = useRole();
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "glass sticky top-4 z-20 flex h-[calc(100vh-2rem)] w-64 shrink-0 flex-col gap-6 rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "h-5 w-5 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-xl bg-[oklch(0.7_0.28_328)] blur-xl opacity-40 -z-10" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-sm font-bold uppercase tracking-widest",
						children: "LATIFA"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
						children: "2026 · ROLLOUT"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col gap-1",
				children: nav.map((n) => {
					const active = pathname === n.to;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: n.to,
						className: `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? "text-white" : "text-muted-foreground hover:text-white"}`,
						children: [
							active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "nav-active",
								className: "absolute inset-0 rounded-xl bg-gradient-to-r from-[oklch(0.7_0.28_328)]/25 to-[oklch(0.5_0.3_300)]/10 border border-[oklch(0.7_0.28_328)]/30",
								transition: {
									type: "spring",
									stiffness: 300,
									damping: 30
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "relative h-4 w-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative",
								children: n.label
							})
						]
					}, n.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
						children: "Signed in as"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setOpen(!open),
						className: "glass relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: role
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${open ? "rotate-180" : ""}` })]
					}),
					open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass-strong flex flex-col rounded-xl p-1",
						children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setRole(r);
								setOpen(false);
							},
							className: `rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5 ${r === role ? "text-[oklch(0.8_0.25_328)]" : "text-foreground"}`,
							children: r
						}, r))
					})
				]
			})
		]
	});
}
function MeshGradient() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -top-1/4 -left-1/4 h-[70vw] w-[70vw] rounded-full opacity-60 blur-3xl",
				style: {
					background: "radial-gradient(circle, oklch(0.55 0.32 328) 0%, transparent 60%)",
					animation: "mesh-drift 22s ease-in-out infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-1/3 -right-1/4 h-[60vw] w-[60vw] rounded-full opacity-50 blur-3xl",
				style: {
					background: "radial-gradient(circle, oklch(0.5 0.3 295) 0%, transparent 60%)",
					animation: "mesh-drift 28s ease-in-out infinite reverse"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -bottom-1/4 left-1/4 h-[55vw] w-[55vw] rounded-full opacity-40 blur-3xl",
				style: {
					background: "radial-gradient(circle, oklch(0.6 0.28 340) 0%, transparent 60%)",
					animation: "mesh-drift 34s ease-in-out infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.15] mix-blend-overlay",
				style: { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")" }
			})
		]
	});
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RoleProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshGradient, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10 mx-auto flex min-h-screen max-w-[1600px] gap-6 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.main, {
			initial: {
				opacity: 0,
				y: 12
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: {
				duration: .35,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: "min-w-0 flex-1 pb-16",
			children
		})]
	})] });
}
function SpotlightCard({ children, className = "", spotlight = true }) {
	const ref = (0, import_react.useRef)(null);
	const mx = useMotionValue(-200);
	const my = useMotionValue(-200);
	const bg = useTransform([mx, my], ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(232, 121, 249, 0.15), transparent 60%)`);
	function onMove(e) {
		if (!ref.current) return;
		const r = ref.current.getBoundingClientRect();
		mx.set(e.clientX - r.left);
		my.set(e.clientY - r.top);
	}
	function onLeave() {
		mx.set(-200);
		my.set(-200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		onMouseMove: onMove,
		onMouseLeave: onLeave,
		className: `glass relative overflow-hidden rounded-2xl ${className}`,
		children: [spotlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			className: "pointer-events-none absolute inset-0 z-0",
			style: { background: bg }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10",
			children
		})]
	});
}
function MagneticButton({ children, className = "", onClick, variant = "primary" }) {
	const ref = (0, import_react.useRef)(null);
	const x = useSpring(useMotionValue(0), {
		stiffness: 200,
		damping: 15
	});
	const y = useSpring(useMotionValue(0), {
		stiffness: 200,
		damping: 15
	});
	function onMove(e) {
		if (!ref.current) return;
		const r = ref.current.getBoundingClientRect();
		const cx = r.left + r.width / 2;
		const cy = r.top + r.height / 2;
		x.set((e.clientX - cx) * .35);
		y.set((e.clientY - cy) * .35);
	}
	function onLeave() {
		x.set(0);
		y.set(0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		onMouseMove: onMove,
		onMouseLeave: onLeave,
		onClick,
		style: {
			x,
			y
		},
		whileTap: { scale: .95 },
		className: `inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-shadow hover:shadow-[0_0_36px_rgba(232,121,249,0.55)] ${{
			primary: "bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] text-white shadow-[0_0_24px_rgba(232,121,249,0.35)]",
			ghost: "glass text-foreground",
			danger: "bg-destructive/80 text-white border border-destructive"
		}[variant]} ${className}`,
		children
	});
}
var creators = [
	{
		id: "1",
		name: "Pasmala",
		handle: "@pasmala24",
		platform: "TikTok",
		tier: "Featured",
		followers: 51e5,
		avgViews: 102e4,
		engagement: 12.1,
		price: 15e3,
		status: "Priced",
		city: "Cairo"
	},
	{
		id: "2",
		name: "Zyad Elshazly",
		handle: "@zyad_elshazly",
		platform: "TikTok",
		tier: "Featured",
		followers: 26e5,
		avgViews: 78e4,
		engagement: 11.8,
		price: 8e4,
		status: "Confirmed",
		city: "Cairo"
	},
	{
		id: "3",
		name: "Bassant",
		handle: "@bassant33",
		platform: "Instagram",
		tier: "Featured",
		followers: 71e5,
		avgViews: 71e4,
		engagement: 9.2,
		price: 15e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "4",
		name: "Haneen Hena",
		handle: "@haneenhena",
		platform: "TikTok",
		tier: "Featured",
		followers: 39e5,
		avgViews: 585e3,
		engagement: 10.5,
		price: 2e4,
		status: "Confirmed",
		city: "Cairo"
	},
	{
		id: "5",
		name: "Renad Mohammed",
		handle: "@renaddmuhammed",
		platform: "Instagram",
		tier: "Featured",
		followers: 35e5,
		avgViews: 35e4,
		engagement: 8.9,
		price: 8e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "6",
		name: "Sandiiyy",
		handle: "@sandiiyy_",
		platform: "TikTok",
		tier: "Featured",
		followers: 13e5,
		avgViews: 325e3,
		engagement: 11.2,
		price: 5e3,
		status: "Confirmed",
		city: "Cairo"
	},
	{
		id: "7",
		name: "Sherif Khalid",
		handle: "@sherifkhalidd",
		platform: "TikTok",
		tier: "Mega",
		followers: 112e5,
		avgViews: 336e4,
		engagement: 13.4,
		price: 15e3,
		status: "Confirmed",
		city: "Cairo"
	},
	{
		id: "8",
		name: "Ozooo19",
		handle: "@ozooo19",
		platform: "TikTok",
		tier: "Mega",
		followers: 106e5,
		avgViews: 318e4,
		engagement: 12.8,
		price: 8e3,
		status: "Priced",
		city: "Cairo"
	},
	{
		id: "9",
		name: "Abdullah El Tourky",
		handle: "@abdullah_eltourky",
		platform: "Instagram",
		tier: "Macro",
		followers: 97e5,
		avgViews: 873e3,
		engagement: 8.5,
		price: 8e4,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "10",
		name: "Shehab Eldin",
		handle: "@shehab.eldin",
		platform: "Instagram",
		tier: "Macro",
		followers: 89e5,
		avgViews: 801e3,
		engagement: 8.2,
		price: 2e4,
		status: "Priced",
		city: "Cairo"
	},
	{
		id: "11",
		name: "Gehad Hassan",
		handle: "@gehadhassann",
		platform: "Instagram",
		tier: "Macro",
		followers: 87e5,
		avgViews: 783e3,
		engagement: 8.4,
		price: 15e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "12",
		name: "Haidy Kamel",
		handle: "@haidyykamel",
		platform: "Instagram",
		tier: "Macro",
		followers: 64e5,
		avgViews: 576e3,
		engagement: 7.8,
		price: 7e4,
		status: "Confirmed",
		city: "Cairo"
	},
	{
		id: "13",
		name: "Malak Abdelnaby",
		handle: "@malakabdelnaby3",
		platform: "Instagram",
		tier: "Macro",
		followers: 69e5,
		avgViews: 621e3,
		engagement: 8.1,
		price: 25e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "14",
		name: "Mayar Nagiib",
		handle: "@mayare.nagiib",
		platform: "TikTok",
		tier: "Macro",
		followers: 28e5,
		avgViews: 56e4,
		engagement: 9.8,
		price: 7e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "15",
		name: "Shahd Mohamed",
		handle: "@shahd_m7amed1",
		platform: "Instagram",
		tier: "Macro",
		followers: 19e5,
		avgViews: 285e3,
		engagement: 7.2,
		price: 5e3,
		status: "Priced",
		city: "Cairo"
	},
	{
		id: "16",
		name: "Heba Khalid",
		handle: "@wwwhabo.comm",
		platform: "TikTok",
		tier: "Macro",
		followers: 24e5,
		avgViews: 432e3,
		engagement: 9.5,
		price: 1e4,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "17",
		name: "Haneen (xx_haneen)",
		handle: "@xx_haneen0_1xx",
		platform: "TikTok",
		tier: "Mid",
		followers: 58e5,
		avgViews: 116e4,
		engagement: 10.3,
		price: 2e4,
		status: "Confirmed",
		city: "Cairo"
	},
	{
		id: "18",
		name: "Moonly",
		handle: "@momeenalaa",
		platform: "TikTok",
		tier: "Mid",
		followers: 41e5,
		avgViews: 656e3,
		engagement: 10.1,
		price: 12e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "19",
		name: "Bombenoz",
		handle: "@Bombenoz",
		platform: "TikTok",
		tier: "Mid",
		followers: 44e5,
		avgViews: 88e4,
		engagement: 11.2,
		price: 8e3,
		status: "Priced",
		city: "Cairo"
	},
	{
		id: "20",
		name: "Nancy Yasser",
		handle: "@nancyy.yasserr",
		platform: "TikTok",
		tier: "Mid",
		followers: 31e5,
		avgViews: 465e3,
		engagement: 9.8,
		price: 8e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "21",
		name: "Rahma Ayman",
		handle: "@rahmaaayman_",
		platform: "Instagram",
		tier: "Mid",
		followers: 593900,
		avgViews: 89085,
		engagement: 7.1,
		price: 5e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "22",
		name: "Salwa Hijazi",
		handle: "@salwahijazi_",
		platform: "Instagram",
		tier: "Mid",
		followers: 14e5,
		avgViews: 28e4,
		engagement: 8.2,
		price: 5e3,
		status: "Priced",
		city: "Cairo"
	},
	{
		id: "23",
		name: "Rahma Waled",
		handle: "@rahmawaled230",
		platform: "TikTok",
		tier: "Mid",
		followers: 2e6,
		avgViews: 4e5,
		engagement: 9.4,
		price: 5e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "24",
		name: "Romisaa Faried",
		handle: "@romisaafaried.official",
		platform: "Instagram",
		tier: "Mid",
		followers: 16e5,
		avgViews: 32e4,
		engagement: 8.3,
		price: 5e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "25",
		name: "Dahab Elmessiri",
		handle: "@dahabelmessiri",
		platform: "TikTok",
		tier: "Mid",
		followers: 17e5,
		avgViews: 34e4,
		engagement: 9.1,
		price: 6e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "26",
		name: "Hamo Elkot",
		handle: "@hamoelkot74",
		platform: "TikTok",
		tier: "Mid",
		followers: 13e5,
		avgViews: 26e4,
		engagement: 8.9,
		price: 6e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "27",
		name: "Sohila Alia",
		handle: "@sohilaqotb1",
		platform: "Instagram",
		tier: "Mid",
		followers: 11e5,
		avgViews: 22e4,
		engagement: 7.8,
		price: 4e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "28",
		name: "Donia Doka",
		handle: "@doniadoka_official",
		platform: "TikTok",
		tier: "Mid",
		followers: 14e5,
		avgViews: 28e4,
		engagement: 8.6,
		price: 7e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "29",
		name: "Eslam Atef Saed",
		handle: "@eslamatefsaed_",
		platform: "TikTok",
		tier: "Mid",
		followers: 18e5,
		avgViews: 36e4,
		engagement: 9.2,
		price: 8e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "30",
		name: "Mayaa Felfel",
		handle: "@mayaafelfel",
		platform: "TikTok",
		tier: "Micro",
		followers: 163400,
		avgViews: 49020,
		engagement: 11.8,
		price: 7e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "31",
		name: "Lujain Kamell",
		handle: "@lujainkamell",
		platform: "Instagram",
		tier: "Micro",
		followers: 650700,
		avgViews: 130140,
		engagement: 8.5,
		price: 5e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "32",
		name: "Youssef Khaled",
		handle: "@yousseff.khaled",
		platform: "TikTok",
		tier: "Micro",
		followers: 10700,
		avgViews: 3210,
		engagement: 9.8,
		price: 3e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "33",
		name: "Ahmed Nagy",
		handle: "@ahmednagy1010",
		platform: "TikTok",
		tier: "Mid",
		followers: 15e5,
		avgViews: 45e4,
		engagement: 10.2,
		price: 15e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "34",
		name: "Ebram Saeed",
		handle: "@ebramsaed1",
		platform: "TikTok",
		tier: "Mid",
		followers: 12e5,
		avgViews: 36e4,
		engagement: 9.5,
		price: 2e4,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "35",
		name: "Rehab Ali",
		handle: "@_rehab_alii0",
		platform: "TikTok",
		tier: "Micro",
		followers: 5e5,
		avgViews: 125e3,
		engagement: 8.1,
		price: 3e3,
		status: "Pending",
		city: "Cairo"
	},
	{
		id: "36",
		name: "Nada Mahmoud",
		handle: "@nada_mahmooud1",
		platform: "TikTok",
		tier: "Micro",
		followers: 35e4,
		avgViews: 87500,
		engagement: 7.4,
		price: 1500,
		status: "Pending",
		city: "Cairo"
	}
];
var rolloutPhases = [
	{
		name: "Teaser Drop",
		date: "Jan 14, 2026",
		status: "complete",
		progress: 100
	},
	{
		name: "Lead Single",
		date: "Feb 28, 2026",
		status: "active",
		progress: 68
	},
	{
		name: "Music Video",
		date: "Mar 20, 2026",
		status: "upcoming",
		progress: 32
	},
	{
		name: "Pre-Save Push",
		date: "Apr 10, 2026",
		status: "upcoming",
		progress: 15
	},
	{
		name: "Album Release",
		date: "May 8, 2026",
		status: "upcoming",
		progress: 5
	},
	{
		name: "Tour Announce",
		date: "Jun 1, 2026",
		status: "upcoming",
		progress: 0
	}
];
var conversionTrend = [
	{
		day: "Mon",
		TikTok: 4200,
		Instagram: 2400,
		Facebook: 1800,
		YouTube: 3100
	},
	{
		day: "Tue",
		TikTok: 5100,
		Instagram: 2800,
		Facebook: 1600,
		YouTube: 3400
	},
	{
		day: "Wed",
		TikTok: 6800,
		Instagram: 3200,
		Facebook: 2100,
		YouTube: 3800
	},
	{
		day: "Thu",
		TikTok: 8200,
		Instagram: 3600,
		Facebook: 1900,
		YouTube: 4200
	},
	{
		day: "Fri",
		TikTok: 11400,
		Instagram: 4400,
		Facebook: 2400,
		YouTube: 5100
	},
	{
		day: "Sat",
		TikTok: 14200,
		Instagram: 5200,
		Facebook: 2800,
		YouTube: 6300
	},
	{
		day: "Sun",
		TikTok: 16800,
		Instagram: 6100,
		Facebook: 3200,
		YouTube: 7400
	}
];
var platformStats = [
	{
		name: "TikTok",
		followers: "8.4M",
		reach: "42.1M",
		growth: 24.6,
		color: "oklch(0.7 0.28 328)"
	},
	{
		name: "Instagram",
		followers: "5.2M",
		reach: "18.7M",
		growth: 12.3,
		color: "oklch(0.55 0.3 300)"
	},
	{
		name: "Facebook",
		followers: "3.1M",
		reach: "9.4M",
		growth: 4.8,
		color: "oklch(0.85 0.18 200)"
	},
	{
		name: "YouTube",
		followers: "2.8M",
		reach: "22.6M",
		growth: 18.1,
		color: "oklch(0.75 0.2 60)"
	}
];
var influencerPipeline = [
	{
		stage: "Sourced",
		count: 142
	},
	{
		stage: "Contacted",
		count: 97
	},
	{
		stage: "Priced",
		count: 64
	},
	{
		stage: "Confirmed",
		count: 36
	},
	{
		stage: "Delivered",
		count: 12
	}
];
var assets = [
	{
		id: "a1",
		name: "Lead Single — Master v1.2",
		type: "Audio",
		version: "v1.2",
		updated: "2h ago",
		owner: "Latifa",
		comments: [{
			id: "c1",
			author: "Marwan",
			role: "Producer",
			text: "Bumped low-end 2dB, check the drop at 1:24.",
			time: "2h ago"
		}, {
			id: "c2",
			author: "Latifa",
			role: "Artist",
			text: "Love it. Ship for mastering.",
			time: "1h ago"
		}]
	},
	{
		id: "a2",
		name: "Album Cover — Concept A",
		type: "Art",
		version: "v2.0",
		updated: "6h ago",
		owner: "Studio Noir",
		comments: [{
			id: "c3",
			author: "Client",
			role: "Client",
			text: "Warmer on the gradient?",
			time: "5h ago"
		}]
	},
	{
		id: "a3",
		name: "TikTok Creator Brief",
		type: "Brief",
		version: "v1.4",
		updated: "1d ago",
		owner: "Sara",
		comments: []
	},
	{
		id: "a4",
		name: "Teaser 15s Cut",
		type: "Video",
		version: "v3.1",
		updated: "1d ago",
		owner: "Edit Team",
		comments: [{
			id: "c4",
			author: "Zyad",
			role: "Creator",
			text: "Can I get vertical crop?",
			time: "12h ago"
		}]
	},
	{
		id: "a5",
		name: "Press Kit EPK",
		type: "Brief",
		version: "v2.3",
		updated: "3d ago",
		owner: "PR",
		comments: []
	},
	{
		id: "a6",
		name: "Music Video Storyboard",
		type: "Art",
		version: "v0.8",
		updated: "4d ago",
		owner: "Director",
		comments: []
	}
];
var viralTriggers = [
	"@zyad_elshazly reached 1M views on Teaser",
	"@pasmala trending #3 in Egypt",
	"Lead Single pre-saves crossed 210K",
	"@habiba.t duet chain hit 4.2M plays",
	"TikTok sound library — Latifa hook adopted by 8.4K creators",
	"Instagram Reels engagement +38% WoW",
	"@shehab.official story swipe-ups peaked at 12%"
];
//#endregion
export { conversionTrend as a, platformStats as c, viralTriggers as d, assets as i, rolloutPhases as l, MagneticButton as n, creators as o, SpotlightCard as r, influencerPipeline as s, AppShell as t, useRole as u };
