import { a as __toESM } from "../_runtime.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as isSupabaseConfigured, r as supabase } from "./use-auth-DSVhBFKn.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-DbFw49T-.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campaign-store-Cd9pjPrz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var cloudEnabled = isSupabaseConfigured;
async function currentUid() {
	if (!supabase) return null;
	const { data } = await supabase.auth.getSession();
	return data.session?.user.id ?? null;
}
function localKey(key, uid) {
	return uid ? `u.${uid}.${key}` : key;
}
function readLocal(key, uid) {
	if (typeof window === "undefined") return void 0;
	try {
		const raw = window.localStorage.getItem(localKey(key, uid));
		if (raw) return JSON.parse(raw);
	} catch {}
}
function looksEmpty(v) {
	if (v == null) return true;
	if (Array.isArray(v)) return v.length === 0;
	if (typeof v === "string") return v === "";
	if (typeof v === "object") return Object.values(v).every(looksEmpty);
	return false;
}
async function loadState(key, fallback) {
	if (isSupabaseConfigured && supabase) {
		const { data: s } = await supabase.auth.getSession();
		const uid = s.session?.user.id ?? null;
		const email = s.session?.user.email?.toLowerCase() ?? "";
		if (uid) {
			const { data, error } = await supabase.from("app_state").select("data").eq("user_id", uid).eq("key", key).maybeSingle();
			const cloudVal = !error && data ? data.data : void 0;
			if (cloudVal !== void 0 && !looksEmpty(cloudVal)) return cloudVal;
			const cached = readLocal(key, uid);
			if (cached !== void 0 && !looksEmpty(cached)) return cached;
			if (email === "zeyadsayedinq@gmail.com") {
				const legacy = readLocal(key, null);
				if (legacy !== void 0 && !looksEmpty(legacy)) return legacy;
			}
			if (cloudVal !== void 0) return cloudVal;
			return cached !== void 0 ? cached : fallback;
		}
	}
	const cached = readLocal(key, null);
	return cached !== void 0 ? cached : fallback;
}
var syncState = "idle";
var syncError = "";
var subs = /* @__PURE__ */ new Set();
function setSync(s, e = "") {
	syncState = s;
	syncError = e;
	subs.forEach((f) => f(s, e));
}
function onSync(cb) {
	subs.add(cb);
	cb(syncState, syncError);
	return () => {
		subs.delete(cb);
	};
}
async function saveState(key, data) {
	const uid = isSupabaseConfigured && supabase ? await currentUid() : null;
	if (typeof window !== "undefined") try {
		window.localStorage.setItem(localKey(key, uid), JSON.stringify(data));
	} catch {}
	if (uid && supabase) {
		setSync("saving");
		const { error } = await supabase.from("app_state").upsert({
			user_id: uid,
			key,
			data
		}, { onConflict: "user_id,key" });
		setSync(error ? "error" : "synced", error?.message ?? "");
	}
}
async function clearEverything() {
	if (typeof window !== "undefined") try {
		Object.keys(window.localStorage).filter((k) => k.startsWith("rippl.") || k.includes(".rippl.")).forEach((k) => window.localStorage.removeItem(k));
	} catch {}
	if (isSupabaseConfigured && supabase) {
		const uid = await currentUid();
		if (uid) {
			await supabase.from("app_state").delete().eq("user_id", uid);
			for (const bucket of [
				"audio",
				"art",
				"contracts"
			]) {
				const { data } = await supabase.storage.from(bucket).list(uid);
				if (data?.length) await supabase.storage.from(bucket).remove(data.map((f) => `${uid}/${f.name}`));
			}
		}
	}
}
async function uploadToBucket(bucket, file) {
	if (!supabase) return null;
	const uid = await currentUid();
	if (!uid) return null;
	const rand = Math.random().toString(36).slice(2, 8);
	const path = `${uid}/${Date.now()}-${rand}-${file.name.replace(/[^\w.\-]/g, "_")}`;
	const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
	if (error) throw error;
	return path;
}
async function signedUrl(bucket, path, expires = 3600) {
	if (!supabase) return null;
	const { data } = await supabase.storage.from(bucket).createSignedUrl(path, expires);
	return data?.signedUrl ?? null;
}
async function diagnose() {
	const out = {
		configured: isSupabaseConfigured,
		url: "",
		signedIn: false,
		email: "",
		canWrite: false,
		error: ""
	};
	out.url = "https://rhsgpyjdwtjrnvmpoqtj.supabase.co".replace(/^https?:\/\//, "").slice(0, 30);
	if (!supabase) {
		out.error = "No Supabase client — env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing in THIS build. Add them in Vercel → Settings → Environment Variables, then Redeploy.";
		return out;
	}
	try {
		const { data: s } = await supabase.auth.getSession();
		out.signedIn = !!s.session;
		out.email = s.session?.user.email ?? "";
		if (!s.session) {
			out.error = "Not signed in to Supabase Auth (no session).";
			return out;
		}
		const uidv = s.session.user.id;
		const { error: e1 } = await supabase.from("app_state").upsert({
			user_id: uidv,
			key: "diag",
			data: { t: Date.now() }
		}, { onConflict: "user_id,key" });
		if (e1) throw new Error(`write: ${e1.message}`);
		const { error: e2 } = await supabase.from("app_state").select("data").eq("user_id", uidv).eq("key", "diag").maybeSingle();
		if (e2) throw new Error(`read: ${e2.message}`);
		out.canWrite = true;
	} catch (e) {
		out.error = e?.message || String(e);
	}
	return out;
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/** Verify the caller and locate their member record inside HQ's workspace. */
var fetchShared = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("df352238fe418ddfe526686cf9806c859301099b6781bc93090f71b60254473c"));
var pushSharedEdit = createServerFn({ method: "POST" }).validator((d) => d).handler(createSsrRpc("69d8a6459159597f67f54d4d75a31d20aa5a2a3a8dd731d59bb2fb28b8cbfee8"));
var seed = {
	artists: [],
	deals: [],
	releases: [],
	contracts: [],
	notes: [],
	mood: [],
	projects: [],
	prompts: [],
	tracks: [],
	todos: [],
	members: [],
	moodboardScene: null
};
var LS = "rippl.os.v2";
function normalizeOS(raw) {
	const o = {
		...seed,
		...raw ?? {}
	};
	for (const key of Object.keys(seed)) if (Array.isArray(seed[key]) && !Array.isArray(o[key])) o[key] = seed[key];
	o.members = (o.members ?? []).filter(Boolean).map((m) => ({
		id: m.id,
		email: m.email,
		name: m.name,
		role: m.role,
		campaigns: Array.isArray(m.campaigns) ? m.campaigns : [],
		releases: Array.isArray(m.releases) ? m.releases : [],
		tracks: Array.isArray(m.tracks) ? m.tracks : [],
		contracts: Array.isArray(m.contracts) ? m.contracts : [],
		edit: Array.isArray(m.edit) ? m.edit : []
	}));
	return o;
}
var SHARED_KEYS = [
	"releases",
	"tracks",
	"contracts"
];
var C = (0, import_react.createContext)(null);
function OSProvider({ children }) {
	const [os, setOs] = (0, import_react.useState)(seed);
	const [shared, setShared] = (0, import_react.useState)(null);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [paletteOpen, setPaletteOpen] = (0, import_react.useState)(false);
	const [currentTrack, setCurrentTrack] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const pushTimers = (0, import_react.useRef)({});
	const dirty = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		(async () => {
			let own = normalizeOS(await loadState(LS, seed));
			if (cloudEnabled && supabase) try {
				const { data: s } = await supabase.auth.getSession();
				const token = s.session?.access_token;
				if (token) {
					const res = await fetchShared({ data: { accessToken: token } });
					if (res.ok && res.payload) {
						const hq = new Set(res.payload.hqIds);
						for (const k of SHARED_KEYS) own = {
							...own,
							[k]: own[k].filter((x) => !hq.has(x.id))
						};
						own = {
							...own,
							artists: own.artists.filter((x) => !hq.has(x.id)),
							deals: own.deals.filter((x) => !hq.has(x.id)),
							notes: own.notes.filter((x) => !hq.has(x.id)),
							mood: own.mood.filter((x) => !hq.has(x.id)),
							projects: own.projects.filter((x) => !hq.has(x.id)),
							prompts: own.prompts.filter((x) => !hq.has(x.id)),
							todos: own.todos.filter((x) => !hq.has(x.id)),
							members: []
						};
						setShared(res.payload);
					}
				}
			} catch {}
			if (Object.keys(seed).some((k) => Array.isArray(own[k]) && own[k].length > 0)) dirty.current = true;
			setOs(own);
			setHydrated(true);
		})();
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) saveState(LS, os);
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
	const sharedIds = (key) => new Set((shared?.[key] ?? []).map((x) => x.id));
	const editableSet = new Set(shared?.editable ?? []);
	const isShared = (id) => !!shared && (sharedIds("releases").has(id) || sharedIds("tracks").has(id) || sharedIds("contracts").has(id) || (shared.campaigns ?? []).some((c) => c.id === id));
	const canEdit = (id) => !isShared(id) || editableSet.has(id);
	function pushEdit(kind, item) {
		if (!supabase) return;
		const tKey = `${kind}:${item.id}`;
		clearTimeout(pushTimers.current[tKey]);
		pushTimers.current[tKey] = setTimeout(async () => {
			const { data: s } = await supabase.auth.getSession();
			const token = s.session?.access_token;
			if (token) pushSharedEdit({ data: {
				accessToken: token,
				kind,
				item
			} });
		}, 600);
	}
	function applyShared(key, next) {
		if (!shared || !SHARED_KEYS.includes(key)) return next;
		const k = key;
		const sIds = sharedIds(k);
		const arr = next;
		const nextOwn = arr.filter((x) => !sIds.has(x.id));
		const kindOf = {
			releases: "release",
			tracks: "track",
			contracts: "contract"
		};
		const nextSharedArr = shared[k].map((prev) => {
			const cand = arr.find((x) => x.id === prev.id);
			if (!cand || JSON.stringify(cand) === JSON.stringify(prev)) return prev;
			if (!editableSet.has(prev.id)) return prev;
			pushEdit(kindOf[k], cand);
			return cand;
		});
		setShared((p) => p ? {
			...p,
			[k]: nextSharedArr
		} : p);
		return nextOwn;
	}
	function set(key, val) {
		dirty.current = true;
		setOs((p) => ({
			...p,
			[key]: applyShared(key, val)
		}));
	}
	function update(key, fn) {
		dirty.current = true;
		setOs((p) => {
			const merged = shared && SHARED_KEYS.includes(key) ? [...p[key], ...shared[key]] : p[key];
			return {
				...p,
				[key]: applyShared(key, fn(merged))
			};
		});
	}
	function playTrack(t) {
		setCurrentTrack(t);
		setPlaying(true);
	}
	function togglePlay() {
		setPlaying((p) => !p);
	}
	const view = shared ? {
		...os,
		releases: [...os.releases, ...shared.releases],
		tracks: [...os.tracks, ...shared.tracks],
		contracts: [...os.contracts, ...shared.contracts]
	} : os;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(C.Provider, {
		value: {
			...view,
			set,
			update,
			isShared,
			canEdit,
			shared,
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
var LS_CAMPAIGNS = "rippl.campaigns.v2";
var LS_ACTIVE = "rippl.activeCampaign.v2";
var LS_TASKS = "rippl.tasks.v2";
var LS_ASSIGN = "rippl.assignments.v2";
var LS_ASSETS = "rippl.assets.v2";
var LS_BUDGET = "rippl.budgetlines.v2";
var LS_TEMPLATES = "rippl.customTemplates.v2";
var LS_EVENTS = "rippl.calendarEvents.v1";
var Ctx = (0, import_react.createContext)(null);
var save = (key, val) => {
	saveState(key, val);
};
var asArray = (v) => Array.isArray(v) ? v : [];
var asObject = (v) => v && typeof v === "object" && !Array.isArray(v) ? v : {};
function CampaignProvider({ children }) {
	const [campaigns, setCampaigns] = (0, import_react.useState)(seedCampaigns);
	const [activeId, setActiveId] = (0, import_react.useState)(seedCampaigns[0]?.id ?? "");
	const [tasks, setTasks] = (0, import_react.useState)({});
	const [assignments, setAssignments] = (0, import_react.useState)({});
	const [assets, setAssets] = (0, import_react.useState)({});
	const [budgetLines, setBudgetLines] = (0, import_react.useState)({});
	const [customTemplates, setCustomTemplates] = (0, import_react.useState)([]);
	const [events, setEvents] = (0, import_react.useState)({});
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const dirty = (0, import_react.useRef)(false);
	const { shared } = useOS();
	const sharedCampaigns = (0, import_react.useMemo)(() => shared?.campaigns ?? [], [shared]);
	const sharedCampaignIds = (0, import_react.useMemo)(() => new Set(sharedCampaigns.map((c) => c.id)), [sharedCampaigns]);
	const canEditShared = (id) => !!shared?.editable.includes(id);
	const [sharedData, setSharedData] = (0, import_react.useState)({
		tasks: {},
		assets: {},
		budget: {},
		events: {}
	});
	(0, import_react.useEffect)(() => {
		if (shared) setSharedData({
			tasks: asObject(shared.tasks),
			assets: asObject(shared.assets),
			budget: asObject(shared.budget),
			events: asObject(shared.events)
		});
	}, [shared]);
	(0, import_react.useEffect)(() => {
		if (!shared || !hydrated) return;
		const hq = new Set(shared.hqIds);
		const dropHq = (m) => Object.fromEntries(Object.entries(m).filter(([k]) => !hq.has(k)));
		dirty.current = true;
		setCampaigns((prev) => prev.filter((c) => c.seeded || !hq.has(c.id)));
		setTasks((p) => dropHq(p));
		setAssets((p) => dropHq(p));
		setBudgetLines((p) => dropHq(p));
		setEvents((p) => dropHq(p));
		setAssignments((p) => dropHq(p));
	}, [shared, hydrated]);
	const pushTimer = (0, import_react.useRef)(null);
	function pushCampaignData(campaignId, patch) {
		if (!supabase || !canEditShared(campaignId)) return;
		if (pushTimer.current) clearTimeout(pushTimer.current);
		pushTimer.current = setTimeout(async () => {
			const { data: s } = await supabase.auth.getSession();
			const token = s.session?.access_token;
			if (token) pushSharedEdit({ data: {
				accessToken: token,
				kind: "campaignData",
				campaignId,
				...patch
			} });
		}, 600);
	}
	(0, import_react.useEffect)(() => {
		(async () => {
			const userMade = asArray(await loadState(LS_CAMPAIGNS, [])).filter((c) => c && !c.seeded);
			const all = [...seedCampaigns, ...userMade];
			if (userMade.length) setCampaigns(all);
			setActiveId(await loadState(LS_ACTIVE, all[0]?.id ?? ""));
			const tk = asObject(await loadState(LS_TASKS, {}));
			const asg = asObject(await loadState(LS_ASSIGN, {}));
			const ast = asObject(await loadState(LS_ASSETS, {}));
			const bl = asObject(await loadState(LS_BUDGET, {}));
			const tpl = asArray(await loadState(LS_TEMPLATES, []));
			const ev = asObject(await loadState(LS_EVENTS, {}));
			setTasks(tk);
			setAssignments(asg);
			setAssets(ast);
			setBudgetLines(bl);
			setCustomTemplates(tpl);
			setEvents(ev);
			if (userMade.length || [
				tk,
				asg,
				ast,
				bl,
				tpl,
				ev
			].some((m) => (Array.isArray(m) ? m.length : Object.keys(m).length) > 0)) dirty.current = true;
			setHydrated(true);
		})();
	}, []);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_CAMPAIGNS, campaigns.filter((c) => !c.seeded));
	}, [campaigns, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_ACTIVE, activeId);
	}, [activeId, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_TASKS, tasks);
	}, [tasks, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_ASSIGN, assignments);
	}, [assignments, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_ASSETS, assets);
	}, [assets, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_BUDGET, budgetLines);
	}, [budgetLines, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_TEMPLATES, customTemplates);
	}, [customTemplates, hydrated]);
	(0, import_react.useEffect)(() => {
		if (hydrated && dirty.current) save(LS_EVENTS, events);
	}, [events, hydrated]);
	const allCampaigns = (0, import_react.useMemo)(() => [...campaigns, ...sharedCampaigns.filter((c) => !campaigns.some((o) => o.id === c.id))], [campaigns, sharedCampaigns]);
	const active = (0, import_react.useMemo)(() => allCampaigns.find((c) => c.id === activeId) ?? allCampaigns[0] ?? null, [allCampaigns, activeId]);
	const activeIsShared = !!active && sharedCampaignIds.has(active.id);
	const activeEditable = !activeIsShared || canEditShared(active?.id ?? "");
	const allTemplates = (0, import_react.useMemo)(() => [
		...campaignTemplates,
		...customTemplates,
		...(shared?.templates ?? []).filter((t) => !campaignTemplates.some((b) => b.id === t.id) && !customTemplates.some((c) => c.id === t.id))
	], [customTemplates, shared]);
	const activeTemplate = (0, import_react.useMemo)(() => allTemplates.find((t) => t.id === active?.templateId), [allTemplates, active]);
	const activeChecklist = activeTemplate?.checklist ?? [];
	function saveTemplate(t) {
		dirty.current = true;
		setCustomTemplates((prev) => prev.some((x) => x.id === t.id) ? prev.map((x) => x.id === t.id ? t : x) : [...prev, t]);
	}
	function deleteTemplate(id) {
		dirty.current = true;
		setCustomTemplates((prev) => prev.filter((x) => x.id !== id));
	}
	function addCampaign(c) {
		dirty.current = true;
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
	const taskMapFor = (cid) => (sharedCampaignIds.has(cid) ? sharedData.tasks[cid] : tasks[cid]) ?? {};
	const isTaskDone = (itemId) => !!taskMapFor(activeId)[itemId];
	function toggleTask(itemId) {
		if (activeIsShared) {
			if (!activeEditable) return;
			const next = {
				...taskMapFor(activeId),
				[itemId]: !taskMapFor(activeId)[itemId]
			};
			setSharedData((p) => ({
				...p,
				tasks: {
					...p.tasks,
					[activeId]: next
				}
			}));
			pushCampaignData(activeId, { tasks: next });
			return;
		}
		dirty.current = true;
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
		const map = (sharedCampaignIds.has(activeId) ? sharedData.tasks[activeId] : tasks[activeId]) ?? {};
		const done = ids.filter((id) => map[id]).length;
		return Math.round(done / ids.length * 100);
	}, [
		activeChecklist,
		tasks,
		activeId,
		sharedCampaignIds,
		sharedData.tasks
	]);
	const assignedIds = assignments[activeId] ?? [];
	const isAssigned = (creatorId) => (assignments[activeId] ?? []).includes(creatorId);
	function toggleAssignment(creatorId) {
		dirty.current = true;
		setAssignments((prev) => {
			const cur = prev[activeId] ?? [];
			return {
				...prev,
				[activeId]: cur.includes(creatorId) ? cur.filter((x) => x !== creatorId) : [...cur, creatorId]
			};
		});
	}
	function mutateList(kind, own, fn) {
		if (activeIsShared) {
			if (!activeEditable) return;
			const next = fn(sharedData[kind][activeId] ?? []);
			setSharedData((p) => ({
				...p,
				[kind]: {
					...p[kind],
					[activeId]: next
				}
			}));
			pushCampaignData(activeId, { [kind]: next });
			return;
		}
		dirty.current = true;
		own[1]((prev) => ({
			...prev,
			[activeId]: fn(prev[activeId] ?? [])
		}));
	}
	const activeAssets = (activeIsShared ? sharedData.assets[activeId] : assets[activeId]) ?? [];
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
		mutateList("assets", [assets, setAssets], (cur) => [item, ...cur]);
	}
	function setAssetStatus(assetId, status) {
		mutateList("assets", [assets, setAssets], (cur) => cur.map((x) => x.id === assetId ? {
			...x,
			status
		} : x));
	}
	function removeAsset(assetId) {
		mutateList("assets", [assets, setAssets], (cur) => cur.filter((x) => x.id !== assetId));
	}
	const activeBudgetLines = (activeIsShared ? sharedData.budget[activeId] : budgetLines[activeId]) ?? [];
	function addBudgetLine(line) {
		mutateList("budget", [budgetLines, setBudgetLines], (cur) => [{
			...line,
			id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`
		}, ...cur]);
	}
	function updateBudgetLine(id, patch) {
		mutateList("budget", [budgetLines, setBudgetLines], (cur) => cur.map((x) => x.id === id ? {
			...x,
			...patch
		} : x));
	}
	function removeBudgetLine(id) {
		mutateList("budget", [budgetLines, setBudgetLines], (cur) => cur.filter((x) => x.id !== id));
	}
	const activeEvents = (activeIsShared ? sharedData.events[activeId] : events[activeId]) ?? [];
	function addEvent(e) {
		const item = {
			...e,
			id: `ce-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
		};
		mutateList("events", [events, setEvents], (cur) => [...cur, item]);
	}
	function moveEvent(id, date) {
		mutateList("events", [events, setEvents], (cur) => cur.map((x) => x.id === id ? {
			...x,
			date
		} : x));
	}
	function removeEvent(id) {
		mutateList("events", [events, setEvents], (cur) => cur.filter((x) => x.id !== id));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			campaigns: allCampaigns,
			activeId,
			active,
			activeIsShared,
			activeEditable,
			setActive: (id) => {
				dirty.current = true;
				setActiveId(id);
			},
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
			removeAsset,
			activeBudgetLines,
			addBudgetLine,
			updateBudgetLine,
			removeBudgetLine,
			allTemplates,
			customTemplates,
			saveTemplate,
			deleteTemplate,
			activeEvents,
			addEvent,
			moveEvent,
			removeEvent
		},
		children
	});
}
function useCampaigns() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useCampaigns outside provider");
	return c;
}
//#endregion
export { createSsrRpc as a, signedUrl as c, useCampaigns as d, useOS as f, cloudEnabled as i, uid as l, OSProvider as n, diagnose as o, clearEverything as r, onSync as s, CampaignProvider as t, uploadToBucket as u };
