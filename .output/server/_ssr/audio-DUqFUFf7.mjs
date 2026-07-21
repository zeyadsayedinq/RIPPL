import { a as __toESM } from "../_runtime.mjs";
import { n as init_performance, r as performance_default } from "../_libs/canvg+[...].mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as signedUrl, f as useOS, i as cloudEnabled, l as uid, u as uploadToBucket } from "./campaign-store-Cd9pjPrz.mjs";
import { At as Disc3, I as Pause, N as Play, O as Save, Ot as Download, Wt as Check, X as LoaderCircle, b as Sparkles, h as Trash2, k as RotateCcw, pt as Gauge, u as Upload, v as Square, w as Share2, zt as Circle } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { t as SharedBadge } from "./SharedBadge-l4LKisvK.mjs";
import { t as analyze } from "../_libs/web-audio-beat-detector+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audio-DUqFUFf7.js
init_performance();
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = () => ({
	trackId: "",
	playing: false,
	vol: .8,
	low: 0,
	mid: 0,
	high: 0,
	rate: 1,
	bpm: null
});
function DjMixer() {
	const { tracks, update } = useOS();
	const [savedMix, setSavedMix] = (0, import_react.useState)(false);
	const audioA = (0, import_react.useRef)(null);
	const audioB = (0, import_react.useRef)(null);
	const ctxRef = (0, import_react.useRef)(null);
	const recDest = (0, import_react.useRef)(null);
	const nA = (0, import_react.useRef)(null);
	const nB = (0, import_react.useRef)(null);
	const recorder = (0, import_react.useRef)(null);
	const chunks = (0, import_react.useRef)([]);
	const [a, setA] = (0, import_react.useState)(initial());
	const [b, setB] = (0, import_react.useState)(initial());
	const [xf, setXf] = (0, import_react.useState)(.5);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [recUrl, setRecUrl] = (0, import_react.useState)(null);
	const [recSecs, setRecSecs] = (0, import_react.useState)(0);
	function buildDeck(ctx, el, rec) {
		const src = ctx.createMediaElementSource(el);
		const low = ctx.createBiquadFilter();
		low.type = "lowshelf";
		low.frequency.value = 220;
		const mid = ctx.createBiquadFilter();
		mid.type = "peaking";
		mid.frequency.value = 1e3;
		mid.Q.value = 1;
		const high = ctx.createBiquadFilter();
		high.type = "highshelf";
		high.frequency.value = 3500;
		const gain = ctx.createGain();
		const xfg = ctx.createGain();
		src.connect(low);
		low.connect(mid);
		mid.connect(high);
		high.connect(gain);
		gain.connect(xfg);
		xfg.connect(ctx.destination);
		xfg.connect(rec);
		return {
			src,
			low,
			mid,
			high,
			gain,
			xf: xfg
		};
	}
	function ensureEngine() {
		if (ctxRef.current || !audioA.current || !audioB.current) return;
		try {
			const ctx = new (window.AudioContext || window.webkitAudioContext)();
			ctxRef.current = ctx;
			const rec = ctx.createMediaStreamDestination();
			recDest.current = rec;
			nA.current = buildDeck(ctx, audioA.current, rec);
			nB.current = buildDeck(ctx, audioB.current, rec);
			applyXf(xf);
		} catch {}
	}
	function applyXf(x) {
		if (nA.current) nA.current.xf.gain.value = Math.cos(x * Math.PI / 2);
		if (nB.current) nB.current.xf.gain.value = Math.cos((1 - x) * Math.PI / 2);
	}
	(0, import_react.useEffect)(() => {
		if (nA.current) {
			nA.current.gain.gain.value = a.vol;
			nA.current.low.gain.value = a.low;
			nA.current.mid.gain.value = a.mid;
			nA.current.high.gain.value = a.high;
		}
		if (audioA.current) audioA.current.playbackRate = a.rate;
	}, [a]);
	(0, import_react.useEffect)(() => {
		if (nB.current) {
			nB.current.gain.gain.value = b.vol;
			nB.current.low.gain.value = b.low;
			nB.current.mid.gain.value = b.mid;
			nB.current.high.gain.value = b.high;
		}
		if (audioB.current) audioB.current.playbackRate = b.rate;
	}, [b]);
	(0, import_react.useEffect)(() => {
		applyXf(xf);
	}, [xf]);
	(0, import_react.useEffect)(() => {
		if (!recording) return;
		const id = setInterval(() => setRecSecs((s) => s + 1), 1e3);
		return () => clearInterval(id);
	}, [recording]);
	async function resolve(t) {
		return t.path ? await signedUrl("audio", t.path) : t.url ?? null;
	}
	async function load(deck, trackId) {
		const t = tracks.find((x) => x.id === trackId);
		if (!t) return;
		const el = deck === "A" ? audioA.current : audioB.current;
		if (!el) return;
		el.crossOrigin = "anonymous";
		const url = await resolve(t);
		if (!url) return;
		el.src = url;
		(deck === "A" ? setA : setB)((s) => ({
			...s,
			trackId,
			playing: false
		}));
	}
	async function toggle(deck) {
		ensureEngine();
		await ctxRef.current?.resume();
		const el = deck === "A" ? audioA.current : audioB.current;
		if (!el || !el.src) return;
		if (el.paused) {
			el.play().catch(() => {});
			(deck === "A" ? setA : setB)((s) => ({
				...s,
				playing: true
			}));
		} else {
			el.pause();
			(deck === "A" ? setA : setB)((s) => ({
				...s,
				playing: false
			}));
		}
	}
	function cue(deck) {
		const el = deck === "A" ? audioA.current : audioB.current;
		if (el) el.currentTime = 0;
	}
	async function saveMix() {
		if (!recUrl) return;
		const title = `RIPPL Mix ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`;
		let path;
		if (cloudEnabled) try {
			const blob = await (await fetch(recUrl)).blob();
			path = await uploadToBucket("audio", new File([blob], `${title}.webm`, { type: "audio/webm" })) ?? void 0;
		} catch {}
		update("tracks", (t) => [{
			id: uid("tr"),
			title,
			artist: "DJ Mix",
			url: recUrl,
			path
		}, ...t]);
		setSavedMix(true);
		setTimeout(() => setSavedMix(false), 1600);
	}
	function toggleRec() {
		ensureEngine();
		if (recording) {
			recorder.current?.stop();
			return;
		}
		if (!recDest.current) return;
		ctxRef.current?.resume();
		try {
			const mr = new MediaRecorder(recDest.current.stream);
			chunks.current = [];
			mr.ondataavailable = (e) => {
				if (e.data.size) chunks.current.push(e.data);
			};
			mr.onstop = () => {
				const blob = new Blob(chunks.current, { type: "audio/webm" });
				setRecUrl(URL.createObjectURL(blob));
				setRecording(false);
			};
			mr.start();
			recorder.current = mr;
			setRecSecs(0);
			setRecording(true);
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			ref: audioA,
			loop: true,
			onEnded: () => setA((s) => ({
				...s,
				playing: false
			}))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
			ref: audioB,
			loop: true,
			onEnded: () => setB((s) => ({
				...s,
				playing: false
			}))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Deck, {
					side: "A",
					state: a,
					setState: setA,
					tracks,
					onLoad: (id) => load("A", id),
					onToggle: () => toggle("A"),
					onCue: () => cue("A")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-row items-center justify-center gap-4 lg:flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] text-muted-foreground",
						children: "Crossfade"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs text-white/40",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "A" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .01,
								value: xf,
								onChange: (e) => setXf(Number(e.target.value)),
								className: "dj-fader w-40 lg:w-56"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "B" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Deck, {
					side: "B",
					state: b,
					setState: setB,
					tracks,
					onLoad: (id) => load("B", id),
					onToggle: () => toggle("B"),
					onCue: () => cue("B"),
					accent: "oklch(0.72 0.16 200)"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-wrap items-center justify-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: toggleRec,
				className: `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${recording ? "bg-[oklch(0.65_0.24_20)] text-white" : "bg-white text-black"}`,
				children: recording ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-4 w-4" }),
					" Stop (",
					Math.floor(recSecs / 60),
					":",
					String(recSecs % 60).padStart(2, "0"),
					")"
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-4 w-4" }), " Record mix"] })
			}), recUrl && !recording && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: recUrl,
				download: "rippl-mix.webm",
				className: "glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download mix"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: saveMix,
				className: "glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:bg-white/5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
					" ",
					savedMix ? "Saved ✓" : "Save to library"
				]
			})] })]
		})
	] });
}
function Deck({ side, state, setState, tracks, onLoad, onToggle, onCue, accent = "oklch(0.7 0.28 328)" }) {
	const set = (p) => setState((s) => ({
		...s,
		...p
	}));
	const taps = (0, import_react.useRef)([]);
	function tap() {
		const now = performance_default.now();
		taps.current = [...taps.current.filter((t) => now - t < 3e3), now].slice(-6);
		if (taps.current.length >= 2) {
			const intervals = taps.current.slice(1).map((t, i) => t - taps.current[i]);
			const avg = intervals.reduce((s, v) => s + v, 0) / intervals.length;
			set({ bpm: Math.round(6e4 / avg) });
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm font-bold tracking-widest",
					style: { color: accent },
					children: ["DECK ", side]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-[11px] text-white/40",
					children: [Math.round((state.rate - 1) * 100), "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-black/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disc3, {
						className: "h-24 w-24 text-white/15",
						style: { animation: state.playing ? "spin 2.4s linear infinite" : "none" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute h-3 w-3 rounded-full",
						style: { background: accent }
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: state.trackId,
				onChange: (e) => onLoad(e.target.value),
				className: "mt-4 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					className: "bg-[#0a0a0c]",
					children: "Load a track…"
				}), tracks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: t.id,
					className: "bg-[#0a0a0c]",
					children: t.title
				}, t.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onToggle,
						className: "grid h-10 w-10 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105",
						children: state.playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 translate-x-[1px]" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCue,
						title: "Cue to start",
						className: "glass grid h-10 w-10 place-items-center rounded-full hover:bg-white/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: tap,
						title: "Tap tempo",
						className: "glass grid h-10 min-w-[3.5rem] place-items-center rounded-full px-2 text-xs hover:bg-white/5",
						children: state.bpm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono",
							children: [state.bpm, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-white/40",
								children: " BPM"
							})]
						}) : "TAP"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-1 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-1 text-[9px] uppercase tracking-wider text-white/40",
							children: "Tempo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: .85,
							max: 1.15,
							step: .01,
							value: state.rate,
							onChange: (e) => set({ rate: Number(e.target.value) }),
							className: "dj-fader w-full"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-4 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
						label: "LOW",
						value: state.low,
						onChange: (v) => set({ low: v }),
						accent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
						label: "MID",
						value: state.mid,
						onChange: (v) => set({ mid: v }),
						accent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
						label: "HIGH",
						value: state.high,
						onChange: (v) => set({ high: v }),
						accent
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Knob, {
						label: "VOL",
						value: state.vol,
						min: 0,
						max: 1,
						onChange: (v) => set({ vol: v }),
						accent,
						unit: ""
					})
				]
			})
		]
	});
}
function Knob({ label, value, onChange, min = -12, max = 12, accent, unit = "dB" }) {
	const drag = (0, import_react.useRef)(false);
	const startY = (0, import_react.useRef)(0);
	const startV = (0, import_react.useRef)(0);
	const deg = (value - min) / (max - min) * 270 - 135;
	function down(e) {
		drag.current = true;
		startY.current = e.clientY;
		startV.current = value;
		e.target.setPointerCapture?.(e.pointerId);
	}
	function move(e) {
		if (!drag.current) return;
		const dv = (startY.current - e.clientY) / 120 * (max - min);
		onChange(Math.max(min, Math.min(max, startV.current + dv)));
	}
	function up() {
		drag.current = false;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onPointerDown: down,
				onPointerMove: move,
				onPointerUp: up,
				onDoubleClick: () => onChange(unit === "" ? .8 : 0),
				className: "relative grid h-12 w-12 cursor-ns-resize touch-none place-items-center rounded-full border border-white/15 bg-black/40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute h-4 w-[2px] rounded-full",
					style: {
						background: accent,
						transform: `rotate(${deg}deg) translateY(-9px)`,
						transformOrigin: "center bottom"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5 w-1.5 rounded-full bg-white/30" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[9px] uppercase tracking-wider text-white/40",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-mono text-[9px] text-white/30",
				children: [unit === "" ? Math.round(value * 100) : (value > 0 ? "+" : "") + value.toFixed(0), unit && unit]
			})
		]
	});
}
var BASE = "http://localhost:8000";
var VIBE_OFFLINE_HINT = "Vibe Analyzer service isn't reachable. Run it with: cd services/vibe-analyzer && uvicorn main:app --reload (see services/vibe-analyzer/README.md).";
var TIMEOUT_MS = 6e4;
var MAX_UPLOAD_BYTES = 30 * 1024 * 1024;
async function postAudio(path, blob, filename) {
	if (blob.size > MAX_UPLOAD_BYTES) throw new Error(`File is ${(blob.size / 1024 / 1024).toFixed(1)}MB — that's too large to upload to the analyzer reliably on a free-tier host. Try a shorter clip or an MP3 instead of a full WAV master.`);
	const form = new FormData();
	form.append("file", blob, filename || "track.wav");
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
	let res;
	try {
		res = await fetch(`${BASE}${path}`, {
			method: "POST",
			body: form,
			signal: controller.signal
		});
	} catch (e) {
		if (e?.name === "AbortError") throw new Error(`Vibe Analyzer didn't respond within ${TIMEOUT_MS / 1e3}s. If it's on a free-tier host (Render), it may still be waking up from sleep — wait ~30s and try again. If it keeps happening, the file may be too large or the service may have crashed.`);
		throw new Error(VIBE_OFFLINE_HINT);
	} finally {
		clearTimeout(timeout);
	}
	if (!res.ok) {
		const detail = await res.json().catch(() => null);
		throw new Error(detail?.detail || `Vibe Analyzer error (${res.status})`);
	}
	return res.json();
}
function analyzeVibe(blob, filename) {
	return postAudio("/analyze", blob, filename);
}
function scoreHit(blob, filename) {
	return postAudio("/score", blob, filename);
}
function encodeShare(o) {
	return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(o)))));
}
function AudioPage() {
	const { tracks, update, currentTrack, playing, playTrack, togglePlay, isShared: isHqShared, canEdit } = useOS();
	const fileRef = (0, import_react.useRef)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [err, setErr] = (0, import_react.useState)("");
	const [shared, setShared] = (0, import_react.useState)(null);
	const [vibeBusy, setVibeBusy] = (0, import_react.useState)(null);
	async function runVibe(t) {
		setErr("");
		setVibeBusy(t.id);
		try {
			const url = t.path ? await signedUrl("audio", t.path) : t.url;
			if (!url) throw new Error("No audio source available for this track.");
			const blob = await (await fetch(url)).blob();
			const [feats, hit] = await Promise.all([analyzeVibe(blob, t.title), scoreHit(blob, t.title)]);
			update("tracks", (all) => all.map((x) => x.id === t.id ? {
				...x,
				bpm: Math.round(feats.bpm),
				key: feats.key,
				energy: feats.energy,
				mood: feats.mood,
				hitScore: hit.hit_probability
			} : x));
		} catch (e) {
			setErr(e?.message || String(e));
		} finally {
			setVibeBusy(null);
		}
	}
	async function share(t) {
		const url = t.path ? await signedUrl("audio", t.path, 3600 * 24 * 7) : t.url;
		if (!url) {
			setErr("Upload this track to the cloud first to share it (needs the audio bucket).");
			return;
		}
		const link = `${window.location.origin}/s#t=${encodeShare({
			title: t.title,
			artist: t.artist,
			url
		})}`;
		await navigator.clipboard?.writeText(link);
		setShared(t.id);
		setTimeout(() => setShared(null), 1800);
	}
	async function onFiles(files) {
		if (!files) return;
		setErr("");
		for (const file of Array.from(files)) {
			const id = uid("tr");
			const title = file.name.replace(/\.[^.]+$/, "");
			const url = URL.createObjectURL(file);
			let path;
			if (cloudEnabled) {
				setBusy(true);
				try {
					path = await uploadToBucket("audio", file) ?? void 0;
				} catch (e) {
					setErr(`Upload to Storage failed: ${e?.message || e}. Create the "audio" bucket + run the storage policy.`);
				}
				setBusy(false);
			}
			update("tracks", (t) => [{
				id,
				title,
				artist: "Upload",
				url,
				path
			}, ...t]);
			detectBpm(file, id);
		}
	}
	async function detectBpm(file, id) {
		try {
			const arrayBuffer = await file.arrayBuffer();
			const ctx = new (window.AudioContext || window.webkitAudioContext)();
			const bpm = await analyze(await ctx.decodeAudioData(arrayBuffer));
			update("tracks", (all) => all.map((t) => t.id === id ? {
				...t,
				bpm: Math.round(bpm)
			} : t));
			ctx.close();
		} catch {}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
						children: "KAIRO SOUND · Audio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 font-display text-3xl font-bold",
						children: ["Audio ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient-neon",
							children: "Lab"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Upload masters & demos, review them in the bottom player, leave timestamped feedback."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "audio/*",
					multiple: true,
					className: "hidden",
					onChange: (e) => {
						onFiles(e.target.files);
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
					onClick: () => fileRef.current?.click(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }),
						" ",
						busy ? "Uploading…" : "Upload audio"
					]
				})
			]
		}),
		err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 rounded-xl border border-[oklch(0.7_0.2_20)]/40 bg-[oklch(0.7_0.2_20)]/10 p-3 text-sm text-[oklch(0.8_0.2_20)]",
			children: err
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => fileRef.current?.click(),
			onDragOver: (e) => e.preventDefault(),
			onDrop: (e) => {
				e.preventDefault();
				onFiles(e.dataTransfer.files);
			},
			className: "mt-6 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-white/40",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto h-6 w-6 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Drag & drop audio here, or click to browse — WAV / MP3."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-7 p-5",
				spotlight: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "Library"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "Tracks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-2",
						children: [tracks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass rounded-xl p-6 text-center text-sm text-muted-foreground",
							children: "No audio yet. Upload a master or demo to start."
						}), tracks.map((t) => {
							const isCurrent = currentTrack?.id === t.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `glass flex flex-wrap items-center gap-3 rounded-xl p-3 ${isCurrent ? "border-white/25" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => isCurrent ? togglePlay() : playTrack(t),
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105",
										children: isCurrent && playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 translate-x-[1px]" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 truncate text-sm font-medium",
											children: [t.title, isHqShared(t.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedBadge, { editable: canEdit(t.id) })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "truncate text-[11px] text-muted-foreground",
											children: [t.artist, t.path ? " · cloud" : t.url ? " · this session" : ""]
										})]
									}),
									t.bpm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[11px] text-muted-foreground",
										title: "Auto-detected tempo",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-3 w-3" }),
											" ",
											t.bpm,
											" BPM"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => runVibe(t),
										disabled: vibeBusy === t.id,
										title: "Analyze Key / Mood / Hit Score",
										className: "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] text-muted-foreground hover:text-white disabled:opacity-50",
										children: [
											vibeBusy === t.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
											" ",
											vibeBusy === t.id ? "Analyzing…" : "Analyze Vibe"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => share(t),
										title: "Copy view-only share link",
										className: "text-muted-foreground hover:text-white",
										children: shared === t.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-[oklch(0.85_0.18_150)]" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" })
									}),
									!isHqShared(t.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => update("tracks", (all) => all.filter((x) => x.id !== t.id)),
										className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									}),
									(t.key || t.mood || t.hitScore !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex w-full flex-wrap gap-1.5 pl-12",
										children: [
											t.key && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground",
												children: ["Key: ", t.key]
											}),
											t.mood && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground",
												children: t.mood
											}),
											t.energy !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground",
												children: [
													"Energy ",
													Math.round(t.energy * 100),
													"%"
												]
											}),
											t.hitScore !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "rounded-full border border-[oklch(0.82_0.18_150)]/40 bg-[oklch(0.82_0.18_150)]/10 px-2 py-0.5 text-[10px] text-[oklch(0.82_0.18_150)]",
												title: "Placeholder baseline — see services/vibe-analyzer/README.md",
												children: [
													"Hit Score ",
													t.hitScore,
													"%"
												]
											})
										]
									})
								]
							}, t.id);
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-5 p-5",
				spotlight: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "How to"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "Mix it"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"• Load a track into ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "Deck A"
								}),
								" and another into ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "Deck B"
								}),
								"."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"• Hit play on both, then ride the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "crossfader"
								}),
								" between them."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"• Twist the ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "LOW / MID / HIGH"
								}),
								" knobs (drag up/down) to EQ each deck."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"• Nudge ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									className: "text-foreground",
									children: "Tempo"
								}),
								" to beat-match; double-click a knob to reset."
							] })
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "p-6",
				spotlight: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "Studio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "DJ / Mixer"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-white/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Live · Web Audio"
					})]
				}), tracks.length < 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid place-items-center rounded-2xl border border-dashed border-white/15 p-10 text-center text-sm text-muted-foreground",
					children: "Upload at least one track to start mixing."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DjMixer, {})]
			})
		})
	] });
}
//#endregion
export { AudioPage as component };
