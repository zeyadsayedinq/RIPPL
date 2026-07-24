import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { I as Pause, N as Play } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/s-DRx9YdB5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function decode() {
	if (typeof window === "undefined") return null;
	const m = window.location.hash.match(/t=([^&]+)/);
	if (!m) return null;
	try {
		return JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(m[1])))));
	} catch {
		return null;
	}
}
var fmt = (s) => isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00";
function SharePage() {
	const [data, setData] = (0, import_react.useState)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [cur, setCur] = (0, import_react.useState)(0);
	const [dur, setDur] = (0, import_react.useState)(0);
	const audioRef = (0, import_react.useRef)(null);
	const ctxRef = (0, import_react.useRef)(null);
	const analyserRef = (0, import_react.useRef)(null);
	const rafRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setData(decode());
	}, []);
	(0, import_react.useEffect)(() => {
		if (!data) return;
		const el = new Audio(data.url);
		el.crossOrigin = "anonymous";
		el.ontimeupdate = () => setCur(el.currentTime);
		el.onloadedmetadata = () => setDur(el.duration || 0);
		el.onended = () => setPlaying(false);
		audioRef.current = el;
		return () => {
			el.pause();
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [data]);
	function ensureAnalyser() {
		if (ctxRef.current || !audioRef.current) return;
		try {
			const ctx = new (window.AudioContext || window.webkitAudioContext)();
			const src = ctx.createMediaElementSource(audioRef.current);
			const an = ctx.createAnalyser();
			an.fftSize = 128;
			src.connect(an);
			an.connect(ctx.destination);
			ctxRef.current = ctx;
			analyserRef.current = an;
		} catch {}
	}
	function draw() {
		const an = analyserRef.current, cv = canvasRef.current;
		if (cv) {
			const ctx = cv.getContext("2d");
			if (ctx) {
				ctx.clearRect(0, 0, cv.width, cv.height);
				const bars = 56, bw = cv.width / bars;
				let arr = null;
				if (an) {
					arr = new Uint8Array(an.frequencyBinCount);
					an.getByteFrequencyData(arr);
				}
				for (let i = 0; i < bars; i++) {
					const v = arr ? arr[Math.floor(i / bars * arr.length)] / 255 : 0;
					const h = Math.max(2, v * cv.height);
					ctx.fillStyle = "rgba(255,255,255,0.85)";
					ctx.fillRect(i * bw + 1, (cv.height - h) / 2, bw - 2, h);
				}
			}
		}
		rafRef.current = requestAnimationFrame(draw);
	}
	async function toggle() {
		const el = audioRef.current;
		if (!el) return;
		ensureAnalyser();
		await ctxRef.current?.resume();
		if (el.paused) {
			el.play().catch(() => {});
			setPlaying(true);
			if (rafRef.current == null) draw();
		} else {
			el.pause();
			setPlaying(false);
		}
	}
	function seek(v) {
		const el = audioRef.current;
		if (el) {
			el.currentTime = v;
			setCur(v);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid min-h-screen place-items-center overflow-hidden bg-black px-4 font-mono text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1] blur-3xl",
			style: { background: "radial-gradient(circle, oklch(0.7 0.08 300) 0%, transparent 65%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center backdrop-blur-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-[0.4em] text-white/40",
				children: "RIPPL // SHARED TRACK"
			}), data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: toggle,
					className: "mx-auto mt-7 grid h-20 w-20 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105",
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-7 w-7" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-7 w-7 translate-x-[2px]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-6 text-lg font-bold leading-snug",
					children: data.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-sm text-white/50",
					children: data.artist
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
					ref: canvasRef,
					width: 360,
					height: 64,
					className: "mt-6 h-16 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: dur || 0,
					step: .1,
					value: cur,
					onChange: (e) => seek(Number(e.target.value)),
					className: "dj-fader mt-3 w-full"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex justify-between font-mono text-[11px] text-white/40",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(cur) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmt(dur) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-[10px] tracking-wider text-white/25",
					children: "Listen-only · shared via RIPPL"
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-white/50",
				children: "This share link is invalid or has expired."
			})]
		})]
	});
}
//#endregion
export { SharePage as component };
