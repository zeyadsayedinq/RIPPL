import { a as __toESM } from "../_runtime.mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { s as useCampaigns } from "./os-store-v2jdVGrV.mjs";
import { $ as File, et as FileText, ft as Clock, it as FileHeadphone, m as Trash2, rt as FileImage, tt as FilePlay, u as Upload } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as EmptyState } from "./EmptyState-DpKuDbDt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assets-DsdvDKG5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var typeIcon = {
	Audio: FileHeadphone,
	Art: FileImage,
	Brief: FileText,
	Video: FilePlay,
	Other: File
};
var statusColor = {
	Draft: "oklch(0.7 0.02 260)",
	"Under Review": "oklch(0.8 0.16 80)",
	Approved: "oklch(0.85 0.18 150)",
	"Needs Revision": "oklch(0.7 0.2 20)"
};
var STATUSES = [
	"Draft",
	"Under Review",
	"Approved",
	"Needs Revision"
];
function detectType(file) {
	const m = file.type;
	if (m.startsWith("image/")) return "Art";
	if (m.startsWith("audio/")) return "Audio";
	if (m.startsWith("video/")) return "Video";
	if (m === "application/pdf" || m.includes("word") || m.includes("document")) return "Brief";
	return "Other";
}
var fmtSize = (b) => b >= 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1e3).toFixed(0)} KB`;
function AssetsPage() {
	const { active, activeAssets, addAsset, setAssetStatus, removeAsset } = useCampaigns();
	const inputRef = (0, import_react.useRef)(null);
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No campaign yet",
		note: "Create a campaign to upload and manage its briefs, audio, artwork and video."
	}) });
	function onFiles(files) {
		if (!files) return;
		Array.from(files).forEach((file) => {
			const type = detectType(file);
			const base = {
				name: file.name,
				type,
				size: file.size
			};
			if (type === "Art" && file.size < 5e5) {
				const reader = new FileReader();
				reader.onload = () => addAsset({
					...base,
					previewUrl: String(reader.result)
				});
				reader.readAsDataURL(file);
			} else addAsset(base);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
							children: ["Library · ", active.artist]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-1 font-display text-3xl font-bold",
							children: ["Asset ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient-neon",
								children: "Vault"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
								activeAssets.length,
								" asset",
								activeAssets.length !== 1 ? "s" : "",
								" · ",
								activeAssets.filter((a) => a.status === "Approved").length,
								" approved"
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: inputRef,
					type: "file",
					multiple: true,
					className: "hidden",
					onChange: (e) => {
						onFiles(e.target.files);
						e.target.value = "";
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
					onClick: () => inputRef.current?.click(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), " Upload asset"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => inputRef.current?.click(),
			onDragOver: (e) => e.preventDefault(),
			onDrop: (e) => {
				e.preventDefault();
				onFiles(e.dataTransfer.files);
			},
			className: "mt-6 w-full rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center transition-colors hover:border-[oklch(0.7_0.28_328)]/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto h-6 w-6 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Drag & drop files here, or click to browse — briefs, audio, artwork, video."
			})]
		}),
		activeAssets.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 glass rounded-2xl p-10 text-center text-sm text-muted-foreground",
			children: "No assets yet. Upload your first file to start the approval workflow."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: activeAssets.map((a, i) => {
				const Icon = typeIcon[a.type];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: i * .04 },
					className: "glass rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glass grid h-11 w-11 place-items-center rounded-xl overflow-hidden",
								children: a.previewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: a.previewUrl,
									alt: "",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-[oklch(0.7_0.28_328)]" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px]",
								style: {
									color: statusColor[a.status],
									background: statusColor[a.status] + "1a"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-1.5 w-1.5 rounded-full",
									style: { background: statusColor[a.status] }
								}), a.status]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 truncate font-semibold",
							title: a.name,
							children: a.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.type }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fmtSize(a.size) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
										" ",
										a.addedAt
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-1.5",
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setAssetStatus(a.id, s),
								className: `rounded-full border px-2.5 py-1 text-[11px] transition-colors ${a.status === s ? "text-white" : "text-muted-foreground hover:text-white"}`,
								style: {
									borderColor: a.status === s ? statusColor[s] : "rgba(255,255,255,0.1)",
									background: a.status === s ? statusColor[s] + "1a" : "transparent"
								},
								children: s
							}, s))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => removeAsset(a.id),
								className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
							})
						})
					]
				}, a.id);
			})
		})
	] });
}
//#endregion
export { AssetsPage as component };
