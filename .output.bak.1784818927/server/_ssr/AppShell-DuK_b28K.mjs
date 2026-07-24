import { a as __toESM } from "../_runtime.mjs";
import { _ as require_react_dom, g as Link, l as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { a as useIsHQ } from "./use-auth-DSVhBFKn.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as signedUrl, d as useCampaigns, f as useOS, i as cloudEnabled, l as uid, s as onSync, u as uploadToBucket } from "./campaign-store-Cd9pjPrz.mjs";
import { n as useRole } from "./role-context-Dr49T2SH.mjs";
import { a as AnimatePresence, i as motion, r as useMotionValue, t as useSpring } from "../_libs/framer-motion.mjs";
import { $ as ListChecks, At as Disc3, C as ShieldCheck, D as Search, Et as Facebook, G as MessageSquarePlus, Ht as ChevronLeft, I as Pause, It as CloudOff, K as Megaphone, Kt as CalendarDays, L as Palette, M as Plus, Mt as Cpu, N as Play, Pt as Cloud, Rt as Clapperboard, St as FilePenLine, T as Settings, Ut as ChevronDown, V as Music2, Vt as CircleCheck, Wt as Check, X as LoaderCircle, Yt as Bell, _ as StickyNote, a as Users, c as UserSearch, d as Twitter, dt as Handshake, gt as FolderLock, ht as FolderOpen, it as Instagram, j as Radio, o as UsersRound, r as Wallet, rt as LayoutDashboard, s as User, st as House, t as Youtube, u as Upload, yt as FileText } from "../_libs/lucide-react.mjs";
import { t as w } from "../_libs/wavesurfer.js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DuK_b28K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom());
var groups = [
	{
		label: "Personal OS",
		items: [
			{
				to: "/home",
				label: "Home",
				icon: House
			},
			{
				to: "/roster",
				label: "Roster",
				icon: Users
			},
			{
				to: "/releases",
				label: "Releases",
				icon: Disc3
			},
			{
				to: "/audio",
				label: "Audio",
				icon: Music2
			},
			{
				to: "/vault",
				label: "The Vault",
				icon: FolderLock
			},
			{
				to: "/studio",
				label: "Studio",
				icon: Palette
			},
			{
				to: "/techlab",
				label: "Tech Lab",
				icon: Cpu
			}
		]
	},
	{
		label: "Marketing",
		items: [
			{
				to: "/dashboard",
				label: "Overview",
				icon: LayoutDashboard
			},
			{
				to: "/campaigns",
				label: "Campaigns",
				icon: Megaphone
			},
			{
				to: "/calendar",
				label: "Calendar",
				icon: CalendarDays
			},
			{
				to: "/channels",
				label: "Channels",
				icon: Radio
			},
			{
				to: "/tasks",
				label: "Tasks",
				icon: ListChecks
			},
			{
				to: "/budget",
				label: "Budget",
				icon: Wallet
			},
			{
				to: "/templates",
				label: "Templates",
				icon: FileText
			},
			{
				to: "/creators",
				label: "Creators",
				icon: UsersRound
			},
			{
				to: "/assets",
				label: "Assets",
				icon: FolderOpen
			}
		]
	},
	{
		label: "Platforms",
		items: [
			{
				to: "/dashboard/tiktok",
				label: "TikTok",
				icon: Clapperboard
			},
			{
				to: "/dashboard/instagram",
				label: "Instagram",
				icon: Instagram
			},
			{
				to: "/dashboard/youtube",
				label: "YouTube",
				icon: Youtube
			},
			{
				to: "/dashboard/facebook",
				label: "Facebook",
				icon: Facebook
			},
			{
				to: "/dashboard/x",
				label: "X",
				icon: Twitter
			}
		]
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
	const { campaigns, active, setActive } = useCampaigns();
	const isHQ = useIsHQ();
	const [roleOpen, setRoleOpen] = (0, import_react.useState)(false);
	const [campOpen, setCampOpen] = (0, import_react.useState)(false);
	const [collapsed, setCollapsed] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: `glass sticky top-4 z-20 flex h-[calc(100vh-2rem)] shrink-0 flex-col gap-4 rounded-2xl p-3 transition-[width] ${collapsed ? "w-20 items-center" : "w-64 p-5"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							width: "22",
							height: "22",
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
									d: "M 2.5 8 A 12.5 12.5 0 0 1 15 19.5",
									stroke: "white",
									strokeWidth: "1.8",
									strokeLinecap: "round",
									opacity: "0.65"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M 2.5 2 A 18.5 18.5 0 0 1 21 19.5",
									stroke: "white",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									opacity: "0.35"
								})
							]
						})
					}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-sm font-bold tracking-widest",
						children: "RIPPL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
						children: "360° OS"
					})] })]
				}), !collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setCollapsed(true),
					className: "text-muted-foreground hover:text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" })
				})]
			}),
			collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setCollapsed(false),
				className: "text-muted-foreground hover:text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 -rotate-90" })
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-1.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
						children: "Active campaign"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setCampOpen((o) => !o),
						className: "glass flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm font-semibold",
								children: active ? active.artist : "No campaign"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-[11px] text-muted-foreground",
								children: active ? active.title : "Create one to begin"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 shrink-0 transition-transform ${campOpen ? "rotate-180" : ""}` })]
					}),
					campOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong absolute left-0 right-0 z-30 mt-1 flex flex-col gap-0.5 rounded-xl p-1",
						children: [campaigns.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 py-2 text-[11px] text-muted-foreground",
							children: "No campaigns yet."
						}), campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setActive(c.id);
								setCampOpen(false);
							},
							className: "flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate",
									children: c.artist
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block truncate text-[10px] text-muted-foreground",
									children: [
										c.status,
										" · ",
										c.title
									]
								})]
							}), c.id === active?.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 shrink-0 text-white" })]
						}, c.id))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex w-full flex-1 flex-col gap-3 overflow-y-auto pr-1",
				children: [
					groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-0.5",
						children: [!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/60",
							children: g.label
						}), g.items.map((n) => {
							const on = pathname === n.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: n.to,
								title: n.label,
								className: `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${collapsed ? "justify-center" : ""} ${on ? "text-white" : "text-muted-foreground hover:text-white"}`,
								children: [
									on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										layoutId: "nav-active",
										className: "absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10",
										transition: {
											type: "spring",
											stiffness: 300,
											damping: 30
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "relative h-4 w-4 shrink-0" }),
									!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative",
										children: n.label
									})
								]
							}, n.to);
						})]
					}, g.label)),
					isHQ && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						title: "Admin",
						className: `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${collapsed ? "justify-center" : ""} ${pathname === "/admin" ? "text-white" : "text-muted-foreground hover:text-white"}`,
						children: [
							pathname === "/admin" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "nav-active",
								className: "absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "relative h-4 w-4 shrink-0" }),
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative",
								children: "Admin"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/settings",
						title: "Settings",
						className: `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${collapsed ? "justify-center" : ""} ${pathname === "/settings" ? "text-white" : "text-muted-foreground hover:text-white"}`,
						children: [
							pathname === "/settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "nav-active",
								className: "absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "relative h-4 w-4 shrink-0" }),
							!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "relative",
								children: "Settings"
							})
						]
					})
				]
			}),
			!collapsed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground",
						children: "Signed in as"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setRoleOpen(!roleOpen),
						className: "glass relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: role
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${roleOpen ? "rotate-180" : ""}` })]
					}),
					roleOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass-strong flex flex-col rounded-xl p-1",
						children: roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setRole(r);
								setRoleOpen(false);
							},
							className: `rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5 ${r === role ? "text-white" : "text-foreground"}`,
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
				className: "absolute -top-1/3 left-1/2 h-[60vw] w-[60vw] -translate-x-1/2 rounded-full opacity-[0.06] blur-3xl",
				style: { background: "radial-gradient(circle, oklch(0.7 0.05 300) 0%, transparent 65%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-[0.03] mix-blend-overlay",
				style: { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")" }
			})
		]
	});
}
function Portal({ children }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted || typeof document === "undefined") return null;
	return (0, import_react_dom.createPortal)(children, document.body);
}
function CommandPalette() {
	const { paletteOpen, setPaletteOpen, artists, deals, releases, notes, update } = useOS();
	const { campaigns } = useCampaigns();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const creates = [
		{
			icon: StickyNote,
			label: "New note / idea",
			run: () => {
				update("notes", (n) => [{
					id: uid("n"),
					title: "Untitled",
					body: "",
					updatedAt: "just now"
				}, ...n]);
				go("/studio");
			}
		},
		{
			icon: User,
			label: "New scouting lead",
			run: () => {
				update("artists", (a) => [{
					id: uid("ar"),
					name: "New lead",
					kind: "Music",
					handle: "",
					streams: "—",
					followers: "—",
					stage: "Discovered",
					managed: false
				}, ...a]);
				go("/roster");
			}
		},
		{
			icon: Disc3,
			label: "New release",
			run: () => go("/releases")
		},
		{
			icon: Handshake,
			label: "New brand deal",
			run: () => {
				update("deals", (d) => [{
					id: uid("d"),
					brand: "Brand",
					artist: "—",
					deliverables: "",
					value: 0,
					split: 0,
					status: "Pitching"
				}, ...d]);
				go("/roster");
			}
		},
		{
			icon: Megaphone,
			label: "New campaign",
			run: () => go("/campaigns")
		}
	];
	const items = (0, import_react.useMemo)(() => {
		const all = [
			...artists.map((a) => ({
				icon: User,
				label: a.name,
				sub: `Artist · ${a.handle}`,
				to: "/roster"
			})),
			...deals.map((d) => ({
				icon: Handshake,
				label: `${d.brand} × ${d.artist}`,
				sub: `Deal · ${d.status}`,
				to: "/roster"
			})),
			...releases.map((r) => ({
				icon: Disc3,
				label: r.title,
				sub: `Release · ${r.artist}`,
				to: "/releases"
			})),
			...notes.map((n) => ({
				icon: StickyNote,
				label: n.title,
				sub: "Note",
				to: "/studio"
			})),
			...campaigns.map((c) => ({
				icon: Megaphone,
				label: c.title,
				sub: `Campaign · ${c.artist}`,
				to: "/campaigns"
			}))
		];
		if (!q.trim()) return all.slice(0, 8);
		const s = q.toLowerCase();
		return all.filter((i) => `${i.label} ${i.sub}`.toLowerCase().includes(s)).slice(0, 12);
	}, [
		q,
		artists,
		deals,
		releases,
		notes,
		campaigns
	]);
	if (!paletteOpen) return null;
	function go(to) {
		setPaletteOpen(false);
		setQ("");
		navigate({ to });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		className: "fixed inset-0 z-[120] grid place-items-start justify-center bg-black/70 p-4 pt-[12vh] backdrop-blur-md",
		onClick: () => setPaletteOpen(false),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -12,
				scale: .98
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c]/95 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-white/10 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-white/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search artists, deals, releases, campaigns, notes…",
						className: "w-full bg-transparent py-4 text-sm outline-none placeholder:text-white/30"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded border border-white/15 px-1.5 py-0.5 text-[10px] text-white/40",
						children: "ESC"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-80 overflow-y-auto p-2",
				children: [
					(() => {
						const cs = creates.filter((c) => !q.trim() || c.label.toLowerCase().includes(q.toLowerCase()));
						return cs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-white/30",
								children: "Create"
							}), cs.map((c, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									c.run();
								},
								className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-4 w-4 place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5 text-white/50" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-white",
									children: c.label
								})]
							}, idx))]
						});
					})(),
					items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 py-6 text-center text-sm text-white/40",
						children: "No matches."
					}),
					items.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => go(i.to),
						className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "h-4 w-4 shrink-0 text-white/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-sm text-white",
								children: i.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-[11px] text-white/40",
								children: i.sub
							})]
						})]
					}, idx))
				]
			})]
		})
	}) });
}
var FAKE_BARS = Array.from({ length: 56 }, (_, i) => 30 + Math.abs(Math.sin(i * .6)) * 60);
function AudioPlayer() {
	const { currentTrack, playing, togglePlay, tracks, playTrack, update } = useOS();
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [noteOpen, setNoteOpen] = (0, import_react.useState)(false);
	const [noteText, setNoteText] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	const [srcUrl, setSrcUrl] = (0, import_react.useState)(null);
	const waveRef = (0, import_react.useRef)(null);
	const wsRef = (0, import_react.useRef)(null);
	const [waveReady, setWaveReady] = (0, import_react.useState)(false);
	async function onUpload(file) {
		if (!file) return;
		const url = URL.createObjectURL(file);
		const id = uid("tr");
		const title = file.name.replace(/\.[^.]+$/, "");
		playTrack({
			id,
			title,
			artist: "Upload",
			url
		});
		setProgress(0);
		let path;
		if (cloudEnabled) try {
			path = await uploadToBucket("audio", file) ?? void 0;
		} catch {}
		update("tracks", (t) => [{
			id,
			title,
			artist: "Upload",
			url,
			path
		}, ...t]);
	}
	const track = currentTrack ?? tracks[0] ?? null;
	(0, import_react.useEffect)(() => {
		let alive = true;
		(async () => {
			if (track?.path) {
				const u = await signedUrl("audio", track.path);
				if (alive) setSrcUrl(u);
				return;
			}
			if (track?.url && track.url.startsWith("blob:")) {
				setSrcUrl(track.url);
				return;
			}
			if (track?.url) {
				setSrcUrl(track.url);
				return;
			}
			setSrcUrl(null);
		})();
		return () => {
			alive = false;
		};
	}, [track]);
	(0, import_react.useEffect)(() => {
		setWaveReady(false);
		setProgress(0);
		if (!waveRef.current || !srcUrl) {
			wsRef.current?.destroy();
			wsRef.current = null;
			return;
		}
		const ws = w.create({
			container: waveRef.current,
			waveColor: "rgba(255,255,255,0.22)",
			progressColor: "rgba(255,255,255,0.9)",
			cursorColor: "transparent",
			height: 32,
			barWidth: 2,
			barGap: 2,
			barRadius: 2,
			normalize: true,
			url: srcUrl
		});
		wsRef.current = ws;
		const updateProgress = () => {
			const d = ws.getDuration();
			setProgress(d ? ws.getCurrentTime() / d * 100 : 0);
		};
		ws.on("ready", () => {
			setWaveReady(true);
			if (playing) ws.play().catch(() => {});
		});
		ws.on("audioprocess", updateProgress);
		ws.on("interaction", updateProgress);
		ws.on("finish", () => {
			if (playing) togglePlay();
		});
		return () => {
			ws.destroy();
			wsRef.current = null;
		};
	}, [srcUrl]);
	(0, import_react.useEffect)(() => {
		if (!playing || srcUrl) return;
		const id = setInterval(() => setProgress((p) => p >= 100 ? 0 : p + .5), 120);
		return () => clearInterval(id);
	}, [playing, srcUrl]);
	(0, import_react.useEffect)(() => {
		const ws = wsRef.current;
		if (!ws || !waveReady) return;
		if (playing) ws.play().catch(() => {});
		else ws.pause();
	}, [playing, waveReady]);
	if (!track) return null;
	function saveNote() {
		if (!noteText.trim()) {
			setNoteOpen(false);
			return;
		}
		update("notes", (n) => [{
			id: uid("n"),
			title: `Feedback · ${track.title}`,
			body: `@ ${Math.round(progress)}% — ${noteText}`,
			updatedAt: "just now"
		}, ...n]);
		setNoteText("");
		setNoteOpen(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0a0c]/95 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-2.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: togglePlay,
					className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105",
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 translate-x-[1px]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden min-w-0 sm:block",
					style: { width: 180 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 truncate text-sm font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "h-3.5 w-3.5 text-white/40" }), track.title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-[11px] text-white/40",
						children: track.artist
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-8 flex-1 overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: waveRef,
						className: "absolute inset-0",
						style: { visibility: srcUrl ? "visible" : "hidden" }
					}), !srcUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute inset-0 flex items-center gap-[2px]",
						onClick: (e) => {
							const r = e.currentTarget.getBoundingClientRect();
							setProgress((e.clientX - r.left) / r.width * 100);
						},
						children: FAKE_BARS.map((h, i) => {
							const on = i / FAKE_BARS.length * 100 <= progress;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 rounded-full",
								style: {
									height: `${h}%`,
									background: on ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.18)"
								}
							}, i);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden w-10 shrink-0 text-right font-mono text-[11px] text-white/40 md:block",
					children: [Math.round(progress), "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "audio/*",
					className: "hidden",
					onChange: (e) => {
						onUpload(e.target.files?.[0]);
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => fileRef.current?.click(),
					title: "Load an audio file to play",
					className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-3.5 w-3.5" }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Load audio"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setNoteOpen((o) => !o),
					className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-white/40 hover:text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquarePlus, { className: "h-3.5 w-3.5" }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Feedback"
						})
					]
				}),
				tracks.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: track.id,
					onChange: (e) => {
						const t = tracks.find((x) => x.id === e.target.value);
						if (t) playTrack(t);
					},
					className: "hidden shrink-0 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-1.5 text-xs outline-none lg:block",
					children: tracks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: t.id,
						className: "bg-[#140a1e]",
						children: t.title
					}, t.id))
				})
			]
		}), noteOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-[1600px] items-center gap-2 px-4 pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				autoFocus: true,
				value: noteText,
				onChange: (e) => setNoteText(e.target.value),
				onKeyDown: (e) => e.key === "Enter" && saveNote(),
				placeholder: `Leave a note at ${Math.round(progress)}%…`,
				className: "flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: saveNote,
				className: "rounded-lg bg-white px-4 py-2 text-sm font-medium text-black",
				children: "Save note"
			})]
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
		className: `inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors ${{
			primary: "bg-white text-black hover:bg-white/90",
			ghost: "glass text-foreground hover:bg-white/5",
			danger: "bg-transparent text-[oklch(0.7_0.2_20)] border border-[oklch(0.7_0.2_20)]/40 hover:bg-[oklch(0.7_0.2_20)]/10"
		}[variant]} ${className}`,
		children
	});
}
var PLATFORMS = [
	"TikTok",
	"Instagram",
	"YouTube",
	"Facebook",
	"X",
	"Anghami",
	"Spotify",
	"Radio",
	"TV"
];
var field$1 = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-[oklch(0.7_0.28_328)]/40";
function ModalShell({ title, eyebrow, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[100] grid place-items-center bg-black/80 p-4 backdrop-blur-md",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .96,
				y: 12
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .96,
				y: 12
			},
			transition: {
				type: "spring",
				stiffness: 320,
				damping: 28
			},
			onClick: (e) => e.stopPropagation(),
			className: "glass-strong relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 text-left",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-white",
					children: "✕"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-2xl font-bold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children
				})
			]
		})
	}) });
}
function NewCampaignModal({ onClose }) {
	const { addCampaign, allTemplates } = useCampaigns();
	const campaignTemplates = allTemplates;
	const [saved, setSaved] = (0, import_react.useState)(null);
	const [picked, setPicked] = (0, import_react.useState)([
		"TikTok",
		"Instagram",
		"YouTube"
	]);
	const [artist, setArtist] = (0, import_react.useState)("");
	const [title, setTitle] = (0, import_react.useState)("");
	const [budget, setBudget] = (0, import_react.useState)("");
	const [goal, setGoal] = (0, import_react.useState)("Streams & chart performance");
	const [templateId, setTemplateId] = (0, import_react.useState)("single-release");
	const toggle = (p) => setPicked((s) => s.includes(p) ? s.filter((x) => x !== p) : [...s, p]);
	const chosenTemplate = campaignTemplates.find((t) => t.id === templateId);
	if (saved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: "Campaign created",
		title: "You're all set",
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 rounded-xl border border-[oklch(0.85_0.18_150)]/30 bg-[oklch(0.85_0.18_150)]/10 p-4 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0 text-[oklch(0.85_0.18_150)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: saved }),
				" is now your active campaign across ",
				picked.length,
				" platform",
				picked.length !== 1 ? "s" : "",
				". It’s saved and will persist after refresh. Open the Tasks tab to work the release checklist."
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
				onClick: onClose,
				children: "Done"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		eyebrow: "New campaign",
		title: "Launch a 360 campaign",
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				const b = Number(budget) || 0;
				addCampaign({
					artist: artist || "Untitled Artist",
					title: title || "New Campaign",
					subtitle: `${goal} · ${picked.length} platforms`,
					status: "Planning",
					budget: b,
					spent: 0,
					startDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
						month: "short",
						day: "2-digit",
						year: "numeric"
					}),
					endDate: "TBC",
					platforms: picked,
					goal,
					reach: "—",
					templateId
				});
				setSaved(`${artist || "Untitled Artist"} — ${title || "New Campaign"}`);
			},
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "Artist / Brand"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: artist,
							onChange: (e) => setArtist(e.target.value),
							placeholder: "e.g. Latifa",
							className: field$1
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "Campaign name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Lead single rollout",
							className: field$1
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "Total budget (EGP)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "number",
							value: budget,
							onChange: (e) => setBudget(e.target.value),
							placeholder: "250000",
							className: field$1
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground",
							children: "Primary goal"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: field$1,
							value: goal,
							onChange: (e) => setGoal(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#140a1e]",
									children: "Streams & chart performance"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#140a1e]",
									children: "Followers & audience growth"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#140a1e]",
									children: "Playlist & editorial reach"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#140a1e]",
									children: "Press & critical acclaim"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#140a1e]",
									children: "Conversions & sales"
								})
							]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground",
						children: "Start from template"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						className: field$1,
						value: templateId,
						onChange: (e) => setTemplateId(e.target.value),
						children: campaignTemplates.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: t.id,
							className: "bg-[#140a1e]",
							children: t.name
						}, t.id))
					}),
					chosenTemplate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1.5 text-[11px] leading-relaxed text-muted-foreground/80",
						children: [chosenTemplate.description, chosenTemplate.checklist.length > 0 && ` · seeds ${chosenTemplate.checklist.reduce((n, p) => n + p.items.length, 0)} checklist tasks`]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Target channels"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: PLATFORMS.map((p) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggle(p),
							className: `rounded-full border px-3 py-1.5 text-xs transition-colors ${picked.includes(p) ? "border-[oklch(0.7_0.28_328)] bg-[oklch(0.7_0.28_328)]/20 text-white" : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-white"}`,
							children: p
						}, p);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, { children: "Create campaign" })]
				})
			]
		})
	});
}
var field = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-white/40";
var label = "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground";
function QuickActionFAB() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [action, setAction] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-20 right-6 z-40 flex flex-col items-end gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && [
			{
				key: "note",
				label: "New Note / Idea",
				icon: StickyNote
			},
			{
				key: "contract",
				label: "Upload Contract",
				icon: FilePenLine
			},
			{
				key: "deal",
				label: "Log Brand Deal",
				icon: Handshake
			},
			{
				key: "lead",
				label: "Add Scouting Lead",
				icon: UserSearch
			}
		].map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			initial: {
				opacity: 0,
				y: 10,
				scale: .9
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 10,
				scale: .9
			},
			transition: { delay: i * .04 },
			onClick: () => {
				setAction(m.key);
				setOpen(false);
			},
			className: "flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0c]/95 py-2 pl-3 pr-4 text-sm text-white shadow-xl backdrop-blur hover:border-white/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "h-4 w-4 text-white/60" }),
				" ",
				m.label
			]
		}, m.key)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: () => setOpen((o) => !o),
			className: "grid h-14 w-14 place-items-center rounded-full bg-white text-black shadow-2xl transition-transform hover:scale-105",
			"aria-label": "Quick actions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: `h-6 w-6 transition-transform ${open ? "rotate-45" : ""}` })
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickModal, {
		action,
		onClose: () => setAction(null)
	}) })] });
}
function QuickModal({ action, onClose }) {
	const { update } = useOS();
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [f, setF] = (0, import_react.useState)({});
	const set = (k, v) => setF((s) => ({
		...s,
		[k]: v
	}));
	function submit(e) {
		e.preventDefault();
		if (action === "note") update("notes", (n) => [{
			id: uid("n"),
			title: f.title || "Untitled",
			body: f.body || "",
			updatedAt: "just now"
		}, ...n]);
		if (action === "contract") update("contracts", (c) => [{
			id: uid("c"),
			name: f.name || "Untitled contract",
			tag: f.tag || "Other",
			expiresOn: f.expires || "",
			fileName: f.file || "contract.pdf"
		}, ...c]);
		if (action === "deal") update("deals", (d) => [{
			id: uid("d"),
			brand: f.brand || "Brand",
			artist: f.artist || "—",
			deliverables: f.deliverables || "",
			value: Number(f.value) || 0,
			split: Number(f.split) || 0,
			status: f.status || "Pitching"
		}, ...d]);
		if (action === "lead") update("artists", (a) => [{
			id: uid("ar"),
			name: f.name || "New lead",
			kind: f.kind || "Music",
			handle: f.handle || "",
			streams: f.streams || "—",
			followers: f.followers || "—",
			stage: "Discovered",
			managed: false
		}, ...a]);
		setSaved(true);
	}
	const meta = {
		note: {
			eyebrow: "Quick action",
			title: "New Note / Idea"
		},
		contract: {
			eyebrow: "Quick action",
			title: "Upload Contract"
		},
		deal: {
			eyebrow: "Quick action",
			title: "Log Brand Deal"
		},
		lead: {
			eyebrow: "Quick action",
			title: "Add Scouting Lead"
		}
	};
	if (saved) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: meta[action].eyebrow,
		title: "Saved",
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Added to your RIPPL OS. You'll find it in the relevant module."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
				onClick: onClose,
				children: "Done"
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModalShell, {
		eyebrow: meta[action].eyebrow,
		title: meta[action].title,
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "space-y-4",
			children: [
				action === "note" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: label,
					children: "Title"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: field,
					value: f.title || "",
					onChange: (e) => set("title", e.target.value),
					placeholder: "Idea title"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: label,
					children: "Note"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: `${field} min-h-24`,
					value: f.body || "",
					onChange: (e) => set("body", e.target.value),
					placeholder: "Write your idea…"
				})] })] }),
				action === "contract" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: label,
						children: "Contract name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						value: f.name || "",
						onChange: (e) => set("name", e.target.value),
						placeholder: "Artist — Agreement"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Tag"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: field,
							value: f.tag || "Split Sheet",
							onChange: (e) => set("tag", e.target.value),
							children: [
								"Split Sheet",
								"Exclusive Recording",
								"Sync License",
								"Management",
								"Other"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#140a1e]",
								children: t
							}, t))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Expires on"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: field,
							value: f.expires || "",
							onChange: (e) => set("expires", e.target.value)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: label,
						children: "File"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						className: field,
						onChange: (e) => set("file", e.target.files?.[0]?.name || "")
					})] })
				] }),
				action === "deal" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Brand"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: f.brand || "",
							onChange: (e) => set("brand", e.target.value),
							placeholder: "Vodafone"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Artist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: f.artist || "",
							onChange: (e) => set("artist", e.target.value),
							placeholder: "Shehab"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Value (EGP)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: field,
							value: f.value || "",
							onChange: (e) => set("value", e.target.value),
							placeholder: "180000"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Split %"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							className: field,
							value: f.split || "",
							onChange: (e) => set("split", e.target.value),
							placeholder: "25"
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: label,
					children: "Deliverables"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: field,
					value: f.deliverables || "",
					onChange: (e) => set("deliverables", e.target.value),
					placeholder: "3 Reels + 1 TikTok"
				})] })] }),
				action === "lead" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: f.name || "",
							onChange: (e) => set("name", e.target.value),
							placeholder: "Artist name"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: field,
							value: f.kind || "Music",
							onChange: (e) => set("kind", e.target.value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#140a1e]",
								children: "Music"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#140a1e]",
								children: "Influencer"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Handle"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: f.handle || "",
							onChange: (e) => set("handle", e.target.value),
							placeholder: "@handle"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: label,
							children: "Followers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: f.followers || "",
							onChange: (e) => set("followers", e.target.value),
							placeholder: "310K"
						})] })
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2 pt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, { children: "Save" })]
				})
			]
		})
	});
}
function daysUntil(iso) {
	if (!iso) return null;
	const d = new Date(iso);
	if (isNaN(d.getTime())) return null;
	return Math.ceil((d.getTime() - Date.now()) / 864e5);
}
function NotificationsBell() {
	const { contracts, releases, deals } = useOS();
	const navigate = useNavigate();
	const [open, setOpen] = (0, import_react.useState)(false);
	const items = [
		...contracts.map((c) => ({
			c,
			d: daysUntil(c.expiresOn)
		})).filter((x) => x.d !== null && x.d <= 30 && x.d >= 0).map((x) => ({
			icon: FilePenLine,
			text: `${x.c.name} expires in ${x.d}d`,
			to: "/vault"
		})),
		...releases.filter((r) => r.status === "Scheduled").map((r) => ({
			icon: Disc3,
			text: `${r.title} scheduled — ${r.releaseDate}`,
			to: "/releases"
		})),
		...deals.filter((d) => d.status === "Contracting").map((d) => ({
			icon: Handshake,
			text: `${d.brand} × ${d.artist} — awaiting signature`,
			to: "/roster"
		}))
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed right-6 top-6 z-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((o) => !o),
			className: "relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#0a0a0c]/90 backdrop-blur hover:border-white/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-white/70" }), items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[oklch(0.7_0.2_20)] px-1 text-[9px] font-bold text-white",
				children: items.length
			})]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0a0a0c]/95 p-2 shadow-2xl backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-white/40",
					children: "Notifications"
				}),
				items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 py-6 text-center text-sm text-white/40",
					children: "All clear — nothing needs you."
				}),
				items.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => {
						setOpen(false);
						navigate({ to: n.to });
					},
					className: "flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left hover:bg-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "mt-0.5 h-4 w-4 shrink-0 text-white/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-white/80",
						children: n.text
					})]
				}, i))
			]
		})]
	});
}
function SyncBadge() {
	const [state, setState] = (0, import_react.useState)("idle");
	const [err, setErr] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => onSync((s, e) => {
		setState(s);
		setErr(e);
		if (s === "synced") {
			setShow(true);
			const t = setTimeout(() => setShow(false), 1400);
			return () => clearTimeout(t);
		}
		setShow(s === "saving" || s === "error");
	}), []);
	if (!show) return null;
	const cfg = {
		saving: {
			icon: LoaderCircle,
			text: "Saving…",
			color: "oklch(0.8 0.02 260)",
			spin: true
		},
		synced: {
			icon: Cloud,
			text: "Synced",
			color: "oklch(0.82 0.18 150)",
			spin: false
		},
		error: {
			icon: CloudOff,
			text: "Sync error",
			color: "oklch(0.7 0.2 20)",
			spin: false
		},
		idle: {
			icon: Cloud,
			text: "",
			color: "",
			spin: false
		}
	}[state];
	const Icon = cfg.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-24 left-6 z-40 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs backdrop-blur",
		title: err,
		style: {
			borderColor: cfg.color + "55",
			background: cfg.color + "1a",
			color: cfg.color
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-3.5 w-3.5 ${cfg.spin ? "animate-spin" : ""}` }), cfg.text]
	});
}
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeshGradient, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 mx-auto flex min-h-screen max-w-[1600px] gap-6 p-4 pb-24",
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
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsBell, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncBadge, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActionFAB, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioPlayer, {})
	] });
}
//#endregion
export { Portal as a, NewCampaignModal as i, MagneticButton as n, ModalShell as r, AppShell as t };
