import { a as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as createSsrRpc, f as useOS, l as uid } from "./campaign-store-Cd9pjPrz.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { Gt as ChartColumn, Nt as Copy, V as Music2, Wt as Check, a as Users, b as Sparkles, dt as Handshake, h as Trash2, kt as DollarSign, n as X, nt as LayoutGrid, p as TrendingUp, yt as FileText } from "../_libs/lucide-react.mjs";
import { a as Portal, r as ModalShell, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { n as pressKitPdf } from "./pdf-BD3yix15.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roster-DJIp5eKX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var getMarketConfig = createServerFn({ method: "GET" }).handler(createSsrRpc("48a985e631eb6d005ad650ce9b2d2eff69b6f0a2b0bca04c6095038326ad6252"));
var KEY = "AIzaSyDbyiu05XQPlMeg861yytab0O9oGLabFGA";
var BASE = "https://www.googleapis.com/youtube/v3";
var youtubeConfigured = Boolean(KEY);
async function get(path, params) {
	const qs = new URLSearchParams({
		...params,
		key: KEY
	});
	const res = await fetch(`${BASE}/${path}?${qs.toString()}`);
	if (!res.ok) {
		const body = await res.json().catch(() => null);
		throw new Error(body?.error?.message || `YouTube API error (${res.status})`);
	}
	return res.json();
}
/** Best-effort channel lookup by artist/act name. */
async function findChannel(query) {
	const item = (await get("search", {
		part: "snippet",
		type: "channel",
		maxResults: "1",
		q: query
	})).items?.[0];
	if (!item) return null;
	return {
		channelId: item.snippet.channelId ?? item.id.channelId,
		title: item.snippet.title,
		thumbnail: item.snippet.thumbnails?.default?.url ?? ""
	};
}
async function getChannelStats(channelId) {
	const item = (await get("channels", {
		part: "snippet,statistics",
		id: channelId
	})).items?.[0];
	if (!item) return null;
	return {
		channelId,
		title: item.snippet.title,
		thumbnail: item.snippet.thumbnails?.default?.url ?? "",
		subscriberCount: item.statistics.hiddenSubscriberCount ? null : Number(item.statistics.subscriberCount ?? 0),
		viewCount: Number(item.statistics.viewCount ?? 0),
		videoCount: Number(item.statistics.videoCount ?? 0)
	};
}
/** Search for a channel by artist name, then fetch its live stats in one call. */
async function getArtistYoutubeStats(artistName) {
	const channel = await findChannel(`${artistName} official`);
	if (!channel) return null;
	return getChannelStats(channel.channelId);
}
/** Trending music videos for a region — useful for A&R scouting (spot what's
rising before it charts). videoCategoryId 10 = Music. */
async function trendingMusic(regionCode, maxResults = 6) {
	return ((await get("videos", {
		part: "snippet,statistics",
		chart: "mostPopular",
		videoCategoryId: "10",
		regionCode,
		maxResults: String(maxResults)
	})).items ?? []).map((item) => ({
		id: item.id,
		title: item.snippet.title,
		channelTitle: item.snippet.channelTitle,
		thumbnail: item.snippet.thumbnails?.medium?.url ?? item.snippet.thumbnails?.default?.url ?? "",
		viewCount: Number(item.statistics?.viewCount ?? 0),
		publishedAt: item.snippet.publishedAt
	}));
}
function formatCount(n) {
	if (n === null) return "hidden";
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
	return String(n);
}
async function getMarketSnapshot(artist) {
	const [config, youtubeResult] = await Promise.all([getMarketConfig().catch(() => ({
		chartmetric: false,
		soundcharts: false,
		spotify: false,
		apple: false
	})), youtubeConfigured ? getArtistYoutubeStats(artist).then((stats) => ({
		stats,
		error: null
	})).catch((e) => ({
		stats: null,
		error: e?.message || String(e)
	})) : Promise.resolve({
		stats: null,
		error: null
	})]);
	return {
		artist,
		sources: [
			{
				id: "youtube",
				label: "YouTube",
				configured: youtubeConfigured,
				note: youtubeConfigured ? "Live subscriber & view counts via the YouTube Data API." : "Add VITE_YOUTUBE_API_KEY to activate."
			},
			{
				id: "chartmetric",
				label: "Chartmetric",
				configured: config.chartmetric,
				note: "Unified Spotify/Anghami/TikTok/YouTube metrics — the real path to cross-platform data."
			},
			{
				id: "soundcharts",
				label: "Soundcharts",
				configured: config.soundcharts,
				note: "Alternative to Chartmetric, same category of data."
			},
			{
				id: "spotify",
				label: "Spotify Web API",
				configured: config.spotify,
				note: "Catalog data only (search, top tracks, follower counts) — NOT streaming trends or demographics; Spotify doesn't publish that publicly."
			},
			{
				id: "apple",
				label: "Apple Music API",
				configured: config.apple,
				note: "Catalog data only, same limitation as Spotify."
			}
		],
		youtube: youtubeResult.stats,
		youtubeError: youtubeResult.error
	};
}
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
var REGIONS = [
	["EG", "Egypt"],
	["SA", "Saudi"],
	["AE", "UAE"]
];
function TrendingMusicPanel() {
	const [region, setRegion] = (0, import_react.useState)("EG");
	const [videos, setVideos] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!youtubeConfigured) return;
		let cancelled = false;
		setLoading(true);
		setErr(null);
		trendingMusic(region).then((v) => {
			if (!cancelled) setVideos(v);
		}).catch((e) => {
			if (!cancelled) setErr(e?.message || String(e));
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [region]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
		className: "mb-4 p-5",
		spotlight: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5" }), " Trending on YouTube · Music"]
				}), youtubeConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1.5",
					children: REGIONS.map(([code, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setRegion(code),
						className: `rounded-full border px-3 py-1 text-xs ${region === code ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`,
						children: label
					}, code))
				})]
			}),
			!youtubeConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground",
				children: [
					"Not connected. Add ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "rounded bg-white/10 px-1 py-0.5 text-white",
						children: "VITE_YOUTUBE_API_KEY"
					}),
					" in Vercel → Settings → Environment Variables and redeploy to see trending music here."
				]
			}),
			err && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 text-xs text-[oklch(0.8_0.2_20)]",
				children: ["Trending lookup failed: ", err]
			}),
			youtubeConfigured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-3 overflow-x-auto pb-1",
				children: [loading && Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 w-48 shrink-0 animate-pulse rounded-xl bg-white/[0.04]" }, i)), !loading && videos.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: `https://www.youtube.com/watch?v=${v.id}`,
					target: "_blank",
					rel: "noreferrer",
					className: "group w-48 shrink-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-video overflow-hidden rounded-xl bg-white/5",
							children: v.thumbnail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: v.thumbnail,
								alt: v.title,
								className: "h-full w-full object-cover transition-transform group-hover:scale-105"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 truncate text-xs font-medium",
							children: v.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "truncate text-[10px] text-muted-foreground",
							children: [
								v.channelTitle,
								" · ",
								formatCount(v.viewCount),
								" views"
							]
						})
					]
				}, v.id))]
			})
		]
	});
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingMusicPanel, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: cards.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									const name = prompt(`New ${stage} lead — name`);
									if (name) update("artists", (a) => [{
										id: uid("ar"),
										name,
										kind: "Music",
										handle: "",
										streams: "—",
										followers: "—",
										stage,
										managed: stage === "Signed"
									}, ...a]);
								},
								className: "grid h-5 w-5 place-items-center rounded-md border border-white/15 text-muted-foreground hover:text-white",
								title: `Add to ${stage}`,
								children: "+"
							})]
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
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArtistPanel, {
			artist: selected,
			onClose: () => setSelected(null)
		}) })
	] });
}
var fld = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-2 text-sm outline-none focus:border-white/40";
var lb = "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground";
function ArtistPanel({ artist, onClose }) {
	const { update } = useOS();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [f, setF] = (0, import_react.useState)(artist);
	const set = (p) => setF((s) => ({
		...s,
		...p
	}));
	function save() {
		update("artists", (all) => all.map((a) => a.id === f.id ? f : a));
		onClose();
	}
	function del() {
		if (confirm(`Delete ${f.name}?`)) {
			update("artists", (all) => all.filter((a) => a.id !== f.id));
			onClose();
		}
	}
	function draftPitch() {
		const pitch = `Pitch: ${f.name} (${f.kind})\nHandle: ${f.handle}\nReach: ${f.kind === "Music" ? f.streams + " streams" : f.followers + " followers"}\n\n${f.name} is a standout ${f.kind.toLowerCase()} talent with strong regional pull. Proposing a development + release deal to scale their audience across TikTok, Instagram and DSPs.`;
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
			className: "glass-strong relative flex w-full max-w-md flex-col gap-4 overflow-y-auto rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "glass absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-14 w-14 place-items-center rounded-full bg-white/10 text-2xl font-bold",
						children: f.name.charAt(0) || "?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-white/40",
						children: "Edit artist"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lb,
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fld,
								value: f.name,
								onChange: (e) => set({ name: e.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lb,
							children: "Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: fld,
							value: f.kind,
							onChange: (e) => set({ kind: e.target.value }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#0a0a0c]",
								children: "Music"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#0a0a0c]",
								children: "Influencer"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lb,
							children: "Stage"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: fld,
							value: f.stage,
							onChange: (e) => set({ stage: e.target.value }),
							children: STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#0a0a0c]",
								children: s
							}, s))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lb,
								children: "Handle"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: fld,
								value: f.handle,
								onChange: (e) => set({ handle: e.target.value }),
								placeholder: "@handle"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lb,
							children: "Streams"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fld,
							value: f.streams,
							onChange: (e) => set({ streams: e.target.value }),
							placeholder: "8.9M"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lb,
							children: "Followers"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: fld,
							value: f.followers,
							onChange: (e) => set({ followers: e.target.value }),
							placeholder: "2.6M"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lb,
								children: "Notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: `${fld} min-h-16`,
								value: f.note ?? "",
								onChange: (e) => set({ note: e.target.value }),
								placeholder: "A&R notes…"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "On active roster (managed)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => set({ managed: !f.managed }),
						className: `relative h-6 w-11 rounded-full transition-colors ${f.managed ? "bg-[oklch(0.82_0.18_150)]" : "bg-white/15"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${f.managed ? "left-[22px]" : "left-0.5"}` })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: save,
							className: "flex-1 rounded-full bg-white py-2.5 text-sm font-semibold text-black",
							children: "Save"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: draftPitch,
							className: "glass inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm hover:bg-white/5",
							children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }), " Copied"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), " Pitch"] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: del,
							className: "grid h-10 w-10 place-items-center rounded-full border border-[oklch(0.7_0.2_20)]/40 text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				})
			]
		})]
	}) });
}
function ActiveRoster() {
	const { artists } = useOS();
	const roster = artists.filter((a) => a.managed);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const [statsFor, setStatsFor] = (0, import_react.useState)(null);
	function flash(t) {
		setMsg(t);
		setTimeout(() => setMsg(null), 1600);
	}
	function pressKit(a) {
		pressKitPdf(a);
		flash(`Press kit PDF generated for ${a.name}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 rounded-xl border border-[oklch(0.85_0.18_150)]/30 bg-[oklch(0.85_0.18_150)]/10 px-4 py-2 text-sm text-[oklch(0.85_0.18_150)]",
			children: msg
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
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
								onClick: () => setStatsFor(a),
								className: "glass inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-xs hover:bg-white/5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3.5 w-3.5" }), " Analytics"]
							})]
						})]
					})
				]
			}, a.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: statsFor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketStatsModal, {
			artist: statsFor,
			onClose: () => setStatsFor(null)
		}) })
	] });
}
function MarketStatsModal({ artist, onClose }) {
	const [snap, setSnap] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		setLoading(true);
		getMarketSnapshot(artist.name).then((s) => {
			if (!cancelled) {
				setSnap(s);
				setLoading(false);
			}
		});
		return () => {
			cancelled = true;
		};
	}, [artist.name]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: "Market Intelligence",
		title: `${artist.name} — Live Stats`,
		onClose,
		children: [
			loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-6 text-center text-sm text-muted-foreground",
				children: "Fetching live stats…"
			}),
			!loading && snap?.youtube && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4",
				children: [snap.youtube.thumbnail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: snap.youtube.thumbnail,
					alt: "",
					className: "h-12 w-12 rounded-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "truncate text-sm font-medium",
						children: snap.youtube.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatCount(snap.youtube.subscriberCount), " subscribers"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [formatCount(snap.youtube.viewCount), " views"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [snap.youtube.videoCount, " videos"] })
						]
					})]
				})]
			}),
			!loading && snap?.youtubeError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-xl border border-[oklch(0.7_0.2_20)]/30 bg-[oklch(0.7_0.2_20)]/10 p-3 text-xs text-[oklch(0.8_0.2_20)]",
				children: ["YouTube lookup failed: ", snap.youtubeError]
			}),
			!loading && !snap?.youtube && !snap?.youtubeError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground",
				children: "No live data source connected yet. Streaming trends, playlist placements and demographics come from a cross-platform aggregator (Chartmetric or Soundcharts) — Spotify and Apple don't publish that data publicly, only inside their own private artist dashboards."
			}),
			!loading && snap && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: snap.sources.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 rounded-lg border border-white/10 px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium",
							children: s.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-muted-foreground",
							children: s.note
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `shrink-0 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${s.configured ? "bg-[oklch(0.82_0.18_150)]/15 text-[oklch(0.82_0.18_150)]" : "bg-white/10 text-muted-foreground"}`,
						children: s.configured ? "Connected" : "Not connected"
					})]
				}, s.id))
			})
		]
	});
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
