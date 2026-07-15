import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/os-store-v2jdVGrV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx$1 = (0, import_react.createContext)(null);
function RoleProvider({ children }) {
	const [role, setRole] = (0, import_react.useState)("Marketing Manager");
	const canSeePrice = role === "Marketing Manager";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx$1.Provider, {
		value: {
			role,
			setRole,
			canSeePrice
		},
		children
	});
}
function useRole() {
	const c = (0, import_react.useContext)(Ctx$1);
	if (!c) throw new Error("useRole outside provider");
	return c;
}
var budgetLines = [];
var seedCampaigns = [];
var campaignTemplates = [
	{
		id: "single-release",
		name: "Single Release",
		source: "D4 Music Marketing — Ultimate Single Release Checklist",
		description: "The complete 6-phase rollout for one single: preparation, distribution, promotion, launch day and post-release.",
		bestFor: "A single or lead track with a 4–6 week runway.",
		checklist: [
			{
				phase: "1 · Preparation",
				items: [
					{
						id: "prep-master",
						label: "Mixed & mastered audio (16-bit/44.1kHz WAV)",
						done: false
					},
					{
						id: "prep-art",
						label: "Cover art designed (3000×3000 JPEG/PNG)",
						done: false
					},
					{
						id: "prep-content",
						label: "Plan promo content (videos + photos)",
						done: false
					},
					{
						id: "prep-pro",
						label: "Register song with PRO / publishing admin",
						done: false
					},
					{
						id: "prep-splits",
						label: "Decide song splits + set release date (2–4 wks out)",
						done: false
					}
				]
			},
			{
				phase: "2 · Distribution",
				items: [
					{
						id: "dist-isrc",
						label: "ISRC code + songwriter credits",
						done: false
					},
					{
						id: "dist-upload",
						label: "Upload to distributor",
						done: false
					},
					{
						id: "dist-lyrics",
						label: "Lyrics formatted (Apple Music, Musixmatch)",
						done: false
					},
					{
						id: "dist-schedule",
						label: "Schedule release across DSPs",
						done: false
					}
				]
			},
			{
				phase: "3 · Promotion Planning",
				items: [
					{
						id: "promo-presave",
						label: "Pre-save / pre-order smart link live",
						done: false
					},
					{
						id: "promo-editorial",
						label: "Submit for editorial playlist consideration",
						done: false
					},
					{
						id: "promo-announce",
						label: "Single announcement post prepared",
						done: false
					},
					{
						id: "promo-live",
						label: "Plan live stream (IG / YouTube Live)",
						done: false
					}
				]
			},
			{
				phase: "4 · Days Before Release",
				items: [
					{
						id: "before-posts",
						label: "Social posts ready w/ captions + hashtags",
						done: false
					},
					{
						id: "before-video",
						label: "Music video scheduled (YouTube + FB)",
						done: false
					},
					{
						id: "before-ads",
						label: "Video clips prepped for social ads",
						done: false
					},
					{
						id: "before-email",
						label: "Email newsletter designed",
						done: false
					}
				]
			},
			{
				phase: "5 · Day of Release",
				items: [
					{
						id: "day-promote",
						label: "Promote across FB / IG / Stories / TikTok / X",
						done: false
					},
					{
						id: "day-video",
						label: "Upload music video (YouTube, FB, IGTV)",
						done: false
					},
					{
						id: "day-links",
						label: "Update smart link + profiles + banners",
						done: false
					},
					{
						id: "day-ads",
						label: "Launch FB/IG + Spotify + YouTube ad campaigns",
						done: false
					}
				]
			},
			{
				phase: "6 · Post-Release",
				items: [
					{
						id: "post-promote",
						label: "Keep promoting + resend email to non-openers",
						done: false
					},
					{
						id: "post-blogs",
						label: "Pitch independent blog coverage (SubmitHub)",
						done: false
					},
					{
						id: "post-playlists",
						label: "Chase playlist adds + build themed playlist",
						done: false
					},
					{
						id: "post-next",
						label: "Schedule next single",
						done: false
					}
				]
			}
		],
		timeline: [
			{
				date: "Week -4",
				title: "Master + art locked, release date set",
				type: "Announce",
				channel: "Internal"
			},
			{
				date: "Week -2",
				title: "Pre-save link live + editorial submitted",
				type: "Announce",
				channel: "DSPs · Social"
			},
			{
				date: "Week -1",
				title: "Announcement post + video scheduled",
				type: "Video",
				channel: "YouTube · Social"
			},
			{
				date: "Day 0",
				title: "Single + music video release",
				type: "Single",
				channel: "All platforms"
			},
			{
				date: "Week +2",
				title: "Blog + playlist push, next single planned",
				type: "Event",
				channel: "PR · Playlists"
			}
		],
		channels: {
			social: [{
				name: "TikTok — teaser + trend",
				owner: "Social",
				status: "Planned",
				metric: "—",
				note: "Hook-led short clips"
			}, {
				name: "Instagram Reels + Stories",
				owner: "Social",
				status: "Planned",
				metric: "—",
				note: "Countdown, snippets"
			}],
			paid: [{
				name: "Meta (FB/IG) ads",
				owner: "Media buyer",
				status: "Planned",
				metric: "—",
				note: "Pre-save conversion"
			}, {
				name: "YouTube + Spotify Ads",
				owner: "Media buyer",
				status: "Planned",
				metric: "—",
				note: "Video views + audio"
			}],
			playlists: [{
				name: "Editorial + curator submissions (SubmitHub)",
				followers: "—",
				status: "Planned"
			}],
			press: [],
			radio: []
		}
	},
	{
		id: "album-rollout",
		name: "Album / EP Rollout",
		source: "Latifa 'The Story of Us' + EP Marketing Plan",
		description: "Multi-phase rollout: a commercial single every ~3 weeks, then the full project. Two marketing phases (commercial appeal → emotional depth).",
		bestFor: "An album or EP with several singles and a phased narrative.",
		checklist: [
			{
				phase: "Phase 1 · Commercial",
				items: [
					{
						id: "p1-teaser",
						label: "Album teaser — visual concept reveal",
						done: false
					},
					{
						id: "p1-lead",
						label: "Lead single + flagship music video",
						done: false
					},
					{
						id: "p1-tiktok",
						label: "TikTok dance/lip-sync challenge for lead",
						done: false
					},
					{
						id: "p1-singles",
						label: "Roll one commercial single every ~3 weeks",
						done: false
					},
					{
						id: "p1-sync",
						label: "Brand partnerships & sync for anthem track",
						done: false
					}
				]
			},
			{
				phase: "Phase 2 · Emotional",
				items: [
					{
						id: "p2-open",
						label: "Phase 2 opener — story-driven MV",
						done: false
					},
					{
						id: "p2-lyric",
						label: "Lyric videos + playlist placement",
						done: false
					},
					{
						id: "p2-radio",
						label: "Radio exclusives + interviews",
						done: false
					},
					{
						id: "p2-press",
						label: "Press features & photoshoots",
						done: false
					}
				]
			},
			{
				phase: "Finale · Full Project",
				items: [
					{
						id: "fin-album",
						label: "Full album release + headline collab",
						done: false
					},
					{
						id: "fin-tv",
						label: "TV special performance",
						done: false
					},
					{
						id: "fin-awards",
						label: "Awards submission + recap report",
						done: false
					}
				]
			}
		],
		timeline: [
			{
				date: "Wk 0",
				title: "Album teaser — concept reveal",
				type: "Announce",
				channel: "All platforms"
			},
			{
				date: "Wk 3",
				title: "Lead single + music video",
				type: "Single",
				channel: "TikTok · YouTube · Radio"
			},
			{
				date: "Wk 6",
				title: "Single 2 — viral Reels push",
				type: "Single",
				channel: "TikTok · Instagram"
			},
			{
				date: "Wk 9",
				title: "Single 3 — anthem + sync",
				type: "Single",
				channel: "Instagram · Brand"
			},
			{
				date: "Wk 12",
				title: "Phase 2 opener",
				type: "Video",
				channel: "YouTube"
			},
			{
				date: "Finale",
				title: "Full album + headline collab",
				type: "Album",
				channel: "Anghami · TV · Press"
			}
		],
		channels: {
			social: [
				{
					name: "TikTok — phase challenges",
					owner: "Creator team",
					status: "Planned",
					metric: "—",
					note: "Dance (P1) → lyric (P2)"
				},
				{
					name: "Instagram — visual drops",
					owner: "Social",
					status: "Planned",
					metric: "—",
					note: "Concept reveals, story polls"
				},
				{
					name: "YouTube — MV + making-of",
					owner: "Video",
					status: "Planned",
					metric: "—",
					note: "Premieres + docs"
				}
			],
			paid: [{
				name: "TikTok Spark Ads",
				owner: "Media buyer",
				status: "Planned",
				metric: "—",
				note: "Amplify top organic"
			}, {
				name: "YouTube + Meta ads",
				owner: "Media buyer",
				status: "Planned",
				metric: "—",
				note: "Trailer + conversion"
			}],
			playlists: [{
				name: "Anghami editorial — Arabic Pop",
				followers: "editorial",
				status: "Planned"
			}],
			press: [{
				outlet: "Vogue Arabia",
				region: "MENA",
				type: "Feature",
				contact: "Editorial",
				status: "Planned"
			}, {
				outlet: "MBC",
				region: "MENA",
				type: "TV feature",
				contact: "Programming",
				status: "Planned"
			}],
			radio: [{
				station: "Gulf radio network",
				region: "GCC",
				note: "Regional single priority"
			}]
		}
	},
	{
		id: "pr-playlist-push",
		name: "360 PR & Playlist Push",
		source: "ETOLUBOV ft. Ramy Sabry — 'Attraction' promo plan",
		description: "PR-led international campaign: online media features, playlist pitching, radio network plays and social seeding.",
		bestFor: "Building press, playlist and radio reach across regions.",
		checklist: [
			{
				phase: "PR / Online Media",
				items: [
					{
						id: "pr-features",
						label: "Secure guaranteed reviews/features",
						done: false
					},
					{
						id: "pr-submissions",
						label: "Submit to non-guaranteed tier (Billboard, CLASH, FADER…)",
						done: false
					},
					{
						id: "pr-crosspost",
						label: "Cross-post published articles to social",
						done: false
					}
				]
			},
			{
				phase: "Playlists",
				items: [{
					id: "pl-editorial",
					label: "Submit to editorial + curator playlists",
					done: false
				}, {
					id: "pl-services",
					label: "Run pitching services (Playlist Push, SoundCampaign, Groover)",
					done: false
				}]
			},
			{
				phase: "Radio",
				items: [{
					id: "rad-network",
					label: "Book indie radio network plays (3-month window)",
					done: false
				}, {
					id: "rad-interview",
					label: "Secure on-air interviews",
					done: false
				}]
			},
			{
				phase: "Targeting",
				items: [{
					id: "tgt-growth",
					label: "Launch IG + Spotify growth targeting",
					done: false
				}, {
					id: "tgt-report",
					label: "Track submissions in reporting sheet",
					done: false
				}]
			}
		],
		timeline: [
			{
				date: "Wk 0",
				title: "PR kit + press list finalised",
				type: "Announce",
				channel: "PR"
			},
			{
				date: "Wk 1",
				title: "Playlist pitching begins",
				type: "Event",
				channel: "Playlists"
			},
			{
				date: "Wk 2",
				title: "Radio network plays start",
				type: "Event",
				channel: "Radio"
			},
			{
				date: "Wk 3",
				title: "Feature waves + social cross-post",
				type: "Event",
				channel: "Press · Social"
			}
		],
		channels: {
			social: [{
				name: "TikTok + IG creator seeding",
				owner: "Social",
				status: "Planned",
				metric: "—",
				note: "Submit to curators/influencers"
			}],
			paid: [{
				name: "IG + Spotify growth (Your Music Marketing / Toneden)",
				owner: "Media buyer",
				status: "Planned",
				metric: "—",
				note: "AI-assisted targeting"
			}],
			playlists: [
				{
					name: "Eric Alper (Spotify)",
					followers: "28,927",
					status: "Planned"
				},
				{
					name: "Main Character Vibes (indie pop)",
					followers: "2,295",
					status: "Planned"
				},
				{
					name: "Playlist Push / SoundCampaign / Groover",
					followers: "pitching svc",
					status: "Planned"
				}
			],
			press: [
				{
					outlet: "EARMILK",
					region: "US/CA",
					type: "Review",
					contact: "Editorial",
					status: "Planned"
				},
				{
					outlet: "CLASH",
					region: "UK",
					type: "Review",
					contact: "Robin Murray",
					status: "Planned"
				},
				{
					outlet: "Billboard Fresh Picks",
					region: "US",
					type: "Submission",
					contact: "Editorial",
					status: "Planned"
				}
			],
			radio: [{
				station: "European Indie Music Network",
				region: "Global",
				note: "5,400 plays / 3 months"
			}, {
				station: "BORDO FM & TV",
				region: "France",
				note: "Web + FM plays"
			}]
		}
	},
	{
		id: "regional-release",
		name: "Regional Release (Gulf / MENA)",
		source: "Antigoni 2025 — Dubai/Cairo release plan",
		description: "Location-based rollout with studio sessions, music-video shoots, local content and regional marketing spend.",
		bestFor: "A release anchored on a city/region with on-the-ground production.",
		checklist: [
			{
				phase: "Production Trip",
				items: [
					{
						id: "reg-studio",
						label: "Book studio sessions + local collaborators",
						done: false
					},
					{
						id: "reg-mv",
						label: "Shoot music video + social content on location",
						done: false
					},
					{
						id: "reg-meetings",
						label: "Label / DSP meetings (e.g. Anghami)",
						done: false
					}
				]
			},
			{
				phase: "Content",
				items: [{
					id: "reg-visualisers",
					label: "Cut visualisers for TikTok/Instagram/Shorts",
					done: false
				}, {
					id: "reg-bts",
					label: "Behind-the-scenes + photoshoot",
					done: false
				}]
			},
			{
				phase: "Release + Remix",
				items: [{
					id: "reg-original",
					label: "Original version release",
					done: false
				}, {
					id: "reg-remix",
					label: "Regional remix with local DJ/artist",
					done: false
				}]
			},
			{
				phase: "Marketing Spend",
				items: [
					{
						id: "reg-yt",
						label: "YouTube Ads",
						done: false
					},
					{
						id: "reg-tt",
						label: "TikTok campaign",
						done: false
					},
					{
						id: "reg-reels",
						label: "Reels boost",
						done: false
					},
					{
						id: "reg-playlist",
						label: "Playlisting",
						done: false
					}
				]
			}
		],
		timeline: [
			{
				date: "Days 1–7",
				title: "Production trip — sessions + MV shoot",
				type: "Event",
				channel: "On location"
			},
			{
				date: "Wk 4",
				title: "Original version release + music video",
				type: "Single",
				channel: "TikTok · YouTube"
			},
			{
				date: "Wk 7",
				title: "Regional remix release",
				type: "Remix",
				channel: "Spotify · Radio"
			}
		],
		channels: {
			social: [{
				name: "Location content — TikTok/IG/Shorts",
				owner: "Content",
				status: "Planned",
				metric: "—",
				note: "Visualisers + BTS"
			}],
			paid: [{
				name: "YouTube Ads",
				owner: "Media buyer",
				status: "Planned",
				metric: "—",
				note: "MV push"
			}, {
				name: "TikTok campaign + Reels",
				owner: "Media buyer",
				status: "Planned",
				metric: "—",
				note: "Regional targeting"
			}],
			playlists: [{
				name: "Regional editorial playlisting",
				followers: "—",
				status: "Planned"
			}],
			press: [],
			radio: [{
				station: "Regional radio",
				region: "MENA/Gulf",
				note: "Original + remix rotation"
			}]
		}
	},
	{
		id: "blank",
		name: "Blank Campaign",
		source: "—",
		description: "Start from scratch with no pre-filled checklist, timeline or channels.",
		bestFor: "A custom campaign you'll build up yourself.",
		checklist: [],
		timeline: [],
		channels: {
			social: [],
			paid: [],
			playlists: [],
			press: [],
			radio: []
		}
	}
];
function getTemplate(id) {
	return campaignTemplates.find((t) => t.id === id);
}
var LS_CAMPAIGNS = "rippl.campaigns.v2";
var LS_ACTIVE = "rippl.activeCampaign.v2";
var LS_TASKS = "rippl.tasks.v2";
var LS_ASSIGN = "rippl.assignments.v2";
var LS_ASSETS = "rippl.assets.v2";
var Ctx = (0, import_react.createContext)(null);
function load$1(key, fallback) {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallback;
	} catch {
		return fallback;
	}
}
function save(key, val) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, JSON.stringify(val));
	} catch {}
}
function CampaignProvider({ children }) {
	const [campaigns, setCampaigns] = (0, import_react.useState)(seedCampaigns);
	const [activeId, setActiveId] = (0, import_react.useState)(seedCampaigns[0]?.id ?? "");
	const [tasks, setTasks] = (0, import_react.useState)({});
	const [assignments, setAssignments] = (0, import_react.useState)({});
	const [assets, setAssets] = (0, import_react.useState)({});
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const userMade = load$1(LS_CAMPAIGNS, []).filter((c) => !c.seeded);
		const all = [...seedCampaigns, ...userMade];
		if (userMade.length) setCampaigns(all);
		setActiveId(load$1(LS_ACTIVE, all[0]?.id ?? ""));
		setTasks(load$1(LS_TASKS, {}));
		setAssignments(load$1(LS_ASSIGN, {}));
		setAssets(load$1(LS_ASSETS, {}));
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) save(LS_CAMPAIGNS, campaigns.filter((c) => !c.seeded));
	}, [campaigns, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated) save(LS_ACTIVE, activeId);
	}, [activeId, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated) save(LS_TASKS, tasks);
	}, [tasks, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated) save(LS_ASSIGN, assignments);
	}, [assignments, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated) save(LS_ASSETS, assets);
	}, [assets, hydrated]);
	const active = (0, import_react.useMemo)(() => campaigns.find((c) => c.id === activeId) ?? campaigns[0] ?? null, [campaigns, activeId]);
	const activeTemplate = (0, import_react.useMemo)(() => getTemplate(active?.templateId), [active]);
	const activeChecklist = activeTemplate?.checklist ?? [];
	function addCampaign(c) {
		const id = c.id ?? `c-${Date.now()}`;
		const created = {
			...c,
			id,
			seeded: false
		};
		setCampaigns((prev) => [...prev, created]);
		setTasks((prev) => ({
			...prev,
			[id]: {}
		}));
		setAssignments((prev) => ({
			...prev,
			[id]: []
		}));
		setAssets((prev) => ({
			...prev,
			[id]: []
		}));
		setActiveId(id);
		return created;
	}
	const isTaskDone = (itemId) => !!tasks[activeId]?.[itemId];
	function toggleTask(itemId) {
		setTasks((prev) => {
			const cur = prev[activeId] ?? {};
			return {
				...prev,
				[activeId]: {
					...cur,
					[itemId]: !cur[itemId]
				}
			};
		});
	}
	const taskProgress = (0, import_react.useMemo)(() => {
		const ids = activeChecklist.flatMap((p) => p.items.map((i) => i.id));
		if (!ids.length) return 0;
		const done = ids.filter((id) => tasks[activeId]?.[id]).length;
		return Math.round(done / ids.length * 100);
	}, [
		activeChecklist,
		tasks,
		activeId
	]);
	const assignedIds = assignments[activeId] ?? [];
	const isAssigned = (creatorId) => (assignments[activeId] ?? []).includes(creatorId);
	function toggleAssignment(creatorId) {
		setAssignments((prev) => {
			const cur = prev[activeId] ?? [];
			return {
				...prev,
				[activeId]: cur.includes(creatorId) ? cur.filter((x) => x !== creatorId) : [...cur, creatorId]
			};
		});
	}
	const activeAssets = assets[activeId] ?? [];
	function addAsset(a) {
		const item = {
			...a,
			id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
			status: a.status ?? "Draft",
			addedAt: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
				month: "short",
				day: "2-digit"
			})
		};
		setAssets((prev) => ({
			...prev,
			[activeId]: [item, ...prev[activeId] ?? []]
		}));
	}
	function setAssetStatus(assetId, status) {
		setAssets((prev) => ({
			...prev,
			[activeId]: (prev[activeId] ?? []).map((x) => x.id === assetId ? {
				...x,
				status
			} : x)
		}));
	}
	function removeAsset(assetId) {
		setAssets((prev) => ({
			...prev,
			[activeId]: (prev[activeId] ?? []).filter((x) => x.id !== assetId)
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			campaigns,
			activeId,
			active,
			setActive: setActiveId,
			addCampaign,
			activeTemplate,
			activeChecklist,
			isTaskDone,
			toggleTask,
			taskProgress,
			assignedIds,
			isAssigned,
			toggleAssignment,
			activeAssets,
			addAsset,
			setAssetStatus,
			removeAsset
		},
		children
	});
}
function useCampaigns() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCampaigns outside provider");
	return c;
}
var seed = {
	artists: [
		{
			id: "ar1",
			name: "Shehab",
			kind: "Music",
			handle: "@shehab.eldin",
			streams: "8.9M",
			followers: "8.9M",
			stage: "Signed",
			managed: true,
			note: "Lead roster artist — album cycle."
		},
		{
			id: "ar2",
			name: "Zyad ElShazly",
			kind: "Influencer",
			handle: "@zyad_elshazly",
			streams: "—",
			followers: "2.6M",
			stage: "Signed",
			managed: true,
			note: "Lifestyle / brand deals."
		},
		{
			id: "ar3",
			name: "Nourhan",
			kind: "Music",
			handle: "@nourhan.sings",
			streams: "120K",
			followers: "310K",
			stage: "Evaluating",
			managed: false,
			note: "Strong TikTok pull."
		},
		{
			id: "ar4",
			name: "DJ Habibeats",
			kind: "Music",
			handle: "@habibeats",
			streams: "540K",
			followers: "790K",
			stage: "Negotiating",
			managed: false,
			note: "Arab House remixes."
		},
		{
			id: "ar5",
			name: "Layla",
			kind: "Influencer",
			handle: "@laylavibes",
			streams: "—",
			followers: "88K",
			stage: "Discovered",
			managed: false
		}
	],
	deals: [{
		id: "d1",
		brand: "Anghami",
		artist: "Shehab",
		deliverables: "Editorial + billboard",
		value: 25e4,
		split: 20,
		status: "Contracting"
	}, {
		id: "d2",
		brand: "Vodafone",
		artist: "Zyad ElShazly",
		deliverables: "3 Reels + 1 TikTok",
		value: 18e4,
		split: 25,
		status: "Pitching"
	}],
	releases: [{
		id: "r1",
		title: "Sorry",
		artist: "Latifa",
		isrc: "EGA012500001",
		upc: "197...014",
		releaseDate: "Mar 07, 2026",
		contentId: "green",
		status: "Live",
		dsp: {
			spotify: true,
			anghami: true,
			youtube: true
		},
		qa: {
			atmos: true,
			eq: true
		}
	}, {
		id: "r2",
		title: "Ma3rafaksh",
		artist: "Latifa",
		isrc: "EGA012500002",
		upc: "197...021",
		releaseDate: "Mar 28, 2026",
		contentId: "yellow",
		status: "Scheduled",
		dsp: {
			spotify: true,
			anghami: true,
			youtube: false
		},
		qa: {
			atmos: false,
			eq: true
		}
	}],
	contracts: [{
		id: "c1",
		name: "Shehab — Management Agreement",
		tag: "Management",
		expiresOn: "2026-08-01",
		fileName: "shehab_mgmt.pdf"
	}, {
		id: "c2",
		name: "Latifa x Kadim — Split Sheet",
		tag: "Split Sheet",
		expiresOn: "2027-01-15",
		fileName: "story_of_us_splits.pdf"
	}],
	notes: [{
		id: "n1",
		title: "Q3 campaign narrative",
		body: "Hook: 'from the first to the last.' Lead with confrontation → resolution arc.",
		updatedAt: "today"
	}],
	mood: [],
	projects: [{
		id: "p1",
		name: "Mi-Assignment",
		deploy: "Ready",
		tasks: [
			{
				id: "t1",
				title: "Grading rubric engine",
				col: "Done"
			},
			{
				id: "t2",
				title: "Bulk import CSV",
				col: "In Progress"
			},
			{
				id: "t3",
				title: "Student portal redesign",
				col: "Backlog"
			}
		]
	}],
	prompts: [{
		id: "pr1",
		title: "Arabic soundscape (Suno)",
		category: "Suno Pro",
		body: "Cinematic Arabic pop, oud + 808, Latifa-style vocal, emotional, 90 BPM, radio-ready master."
	}, {
		id: "pr2",
		title: "AI artist identity framework",
		category: "Identity",
		body: "Define persona: origin, visual palette, sonic signature, 3 pillar themes, target subculture."
	}],
	tracks: [{
		id: "tr1",
		title: "Sorry — Master v1.2",
		artist: "Latifa · KAIRO SOUND"
	}, {
		id: "tr2",
		title: "Untitled demo",
		artist: "Shehab"
	}],
	todos: [
		{
			id: "td1",
			label: "Approve Shehab MV rough cut",
			done: false,
			snoozed: false,
			delegated: false
		},
		{
			id: "td2",
			label: "Countersign Anghami deal",
			done: false,
			snoozed: false,
			delegated: false
		},
		{
			id: "td3",
			label: "Pitch Ma3rafaksh to editorial",
			done: true,
			snoozed: false,
			delegated: false
		}
	]
};
var LS = "rippl.os.v1";
var C = (0, import_react.createContext)(null);
function load() {
	if (typeof window === "undefined") return seed;
	try {
		const raw = window.localStorage.getItem(LS);
		return raw ? JSON.parse(raw) : seed;
	} catch {
		return seed;
	}
}
function OSProvider({ children }) {
	const [os, setOs] = (0, import_react.useState)(seed);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [paletteOpen, setPaletteOpen] = (0, import_react.useState)(false);
	const [currentTrack, setCurrentTrack] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setOs(load());
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated) try {
			window.localStorage.setItem(LS, JSON.stringify(os));
		} catch {}
	}, [os, hydrated]);
	(0, import_react.useEffect)(() => {
		const h = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setPaletteOpen((o) => !o);
			}
			if (e.key === "Escape") setPaletteOpen(false);
		};
		window.addEventListener("keydown", h);
		return () => window.removeEventListener("keydown", h);
	}, []);
	function set(key, val) {
		setOs((p) => ({
			...p,
			[key]: val
		}));
	}
	function update(key, fn) {
		setOs((p) => ({
			...p,
			[key]: fn(p[key])
		}));
	}
	function playTrack(t) {
		setCurrentTrack(t);
		setPlaying(true);
	}
	function togglePlay() {
		setPlaying((p) => !p);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(C.Provider, {
		value: {
			...os,
			set,
			update,
			paletteOpen,
			setPaletteOpen,
			currentTrack,
			playing,
			playTrack,
			togglePlay
		},
		children
	});
}
function useOS() {
	const c = (0, import_react.useContext)(C);
	if (!c) throw new Error("useOS outside provider");
	return c;
}
var uid = (p = "x") => `${p}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
//#endregion
export { campaignTemplates as a, useOS as c, budgetLines as i, useRole as l, OSProvider as n, uid as o, RoleProvider as r, useCampaigns as s, CampaignProvider as t };
