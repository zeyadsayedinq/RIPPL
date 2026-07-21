import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as signedUrl, f as useOS, i as cloudEnabled, l as uid, u as uploadToBucket } from "./campaign-store-Cd9pjPrz.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { D as Search, Dt as Eye, M as Plus, Ot as Download, St as FilePenLine, bt as FilePlusCorner, f as TriangleAlert, h as Trash2, n as X, u as Upload, yt as FileText } from "../_libs/lucide-react.mjs";
import { a as Portal, n as MagneticButton, r as ModalShell, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SharedBadge } from "./SharedBadge-l4LKisvK.mjs";
import { i as splitSheetPdf } from "./pdf-BD3yix15.mjs";
import { n as utils, t as readSync } from "../_libs/xlsx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault-gK1GuOQa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FileViewer({ url, fileName, onClose }) {
	const ext = (fileName.split(".").pop() || "").toLowerCase();
	const isPdf = ext === "pdf";
	const isSheet = [
		"xlsx",
		"xls",
		"csv",
		"tsv"
	].includes(ext);
	const isImg = [
		"png",
		"jpg",
		"jpeg",
		"gif",
		"webp",
		"svg",
		"avif"
	].includes(ext);
	const [wb, setWb] = (0, import_react.useState)(null);
	const [sheet, setSheet] = (0, import_react.useState)(0);
	const [err, setErr] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!isSheet) return;
		let alive = true;
		(async () => {
			try {
				const book = readSync(await (await fetch(url)).arrayBuffer());
				if (alive) setWb(book);
			} catch (e) {
				if (alive) setErr(e?.message || "Could not read spreadsheet");
			}
		})();
		return () => {
			alive = false;
		};
	}, [url, isSheet]);
	const html = (0, import_react.useMemo)(() => {
		if (!wb) return "";
		const ws = wb.Sheets[wb.SheetNames[sheet]];
		if (!ws) return "";
		try {
			return utils.sheet_to_html(ws, { editable: false });
		} catch {
			return "";
		}
	}, [wb, sheet]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[110] grid place-items-center bg-black/85 p-4 backdrop-blur-md",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .97
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			onClick: (e) => e.stopPropagation(),
			className: "glass-strong flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-white/10 px-5 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 shrink-0 text-white/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate text-sm font-medium",
							children: fileName
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: url,
							download: fileName,
							className: "glass grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5",
							title: "Download",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onClose,
							className: "glass grid h-8 w-8 place-items-center rounded-lg hover:bg-white/5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
						})]
					})]
				}),
				isSheet && wb && wb.SheetNames.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 border-b border-white/10 px-3 py-2",
					children: wb.SheetNames.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSheet(i),
						className: `rounded-md px-3 py-1 text-xs transition-colors ${sheet === i ? "bg-white/10 text-white" : "text-muted-foreground hover:text-white"}`,
						children: n
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-h-0 flex-1 overflow-auto bg-black/40",
					children: [
						isPdf && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							src: url,
							title: fileName,
							className: "h-[78vh] w-full"
						}),
						isImg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: url,
								alt: fileName,
								className: "max-h-[78vh] max-w-full rounded-lg"
							})
						}),
						isSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								err && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm text-[oklch(0.75_0.2_20)]",
									children: [
										"Couldn't render: ",
										err,
										". You can still download it."
									]
								}),
								!err && !wb && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-muted-foreground",
									children: "Loading spreadsheet…"
								}),
								html && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "xlsx-view overflow-auto rounded-lg",
									dangerouslySetInnerHTML: { __html: html }
								})
							]
						}),
						!isPdf && !isImg && !isSheet && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid place-items-center p-16 text-center text-sm text-muted-foreground",
							children: [
								"Preview not available for .",
								ext,
								" files.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: url,
									download: fileName,
									className: "mt-3 inline-block rounded-full bg-white px-4 py-2 text-black",
									children: "Download instead"
								})
							]
						})
					]
				})
			]
		})
	}) });
}
var TAGS = [
	"Split Sheet",
	"Exclusive Recording",
	"Sync License",
	"Management",
	"Other"
];
function daysUntil(iso) {
	if (!iso) return null;
	const d = new Date(iso);
	if (isNaN(d.getTime())) return null;
	return Math.ceil((d.getTime() - Date.now()) / 864e5);
}
function VaultPage() {
	const { contracts, update, isShared, canEdit } = useOS();
	const inputRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	const [blobs, setBlobs] = (0, import_react.useState)({});
	const [err, setErr] = (0, import_react.useState)("");
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [splitOpen, setSplitOpen] = (0, import_react.useState)(false);
	const shown = (0, import_react.useMemo)(() => contracts.filter((c) => !q || `${c.name} ${c.tag} ${c.fileName}`.toLowerCase().includes(q.toLowerCase())), [contracts, q]);
	function add(files) {
		if (!files) return;
		Array.from(files).forEach(async (file) => {
			const id = uid("c");
			const url = URL.createObjectURL(file);
			setBlobs((b) => ({
				...b,
				[id]: url
			}));
			let filePath;
			if (cloudEnabled) try {
				filePath = await uploadToBucket("contracts", file) ?? void 0;
			} catch (e) {
				setErr(`Upload to Storage failed: ${e?.message || e}. Create the "contracts" bucket + run the storage policy (see SUPABASE_SETUP.md).`);
			}
			update("contracts", (c) => [{
				id,
				name: file.name.replace(/\.[^.]+$/, ""),
				tag: "Other",
				expiresOn: "",
				fileName: file.name,
				filePath
			}, ...c]);
		});
	}
	async function resolveUrl(filePath, sessionUrl) {
		return sessionUrl ?? (filePath ? await signedUrl("contracts", filePath) : null);
	}
	async function viewFile(name, filePath, sessionUrl) {
		const url = await resolveUrl(filePath, sessionUrl);
		if (url) setViewer({
			url,
			name
		});
	}
	async function downloadFile(name, filePath, sessionUrl) {
		const url = await resolveUrl(filePath, sessionUrl);
		if (!url) return;
		const a = document.createElement("a");
		a.href = url;
		a.download = name;
		a.click();
	}
	const expiring = contracts.map((c) => ({
		c,
		d: daysUntil(c.expiresOn)
	})).filter((x) => x.d !== null && x.d <= 30 && x.d >= 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
					children: "Legal · The Vault"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Contract ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Vault"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Store, tag and monitor every agreement. Alerts fire 30 days before expiry."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
				onClick: () => setSplitOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "h-4 w-4" }), " Generate split sheet"]
			})]
		}),
		err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 rounded-xl border border-[oklch(0.7_0.2_20)]/40 bg-[oklch(0.7_0.2_20)]/10 p-3 text-sm text-[oklch(0.8_0.2_20)]",
			children: err
		}),
		expiring.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-2xl border border-[oklch(0.82_0.16_90)]/30 bg-[oklch(0.82_0.16_90)]/10 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm font-semibold text-[oklch(0.85_0.16_90)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }), " Contracts expiring soon"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 text-sm text-muted-foreground",
				children: expiring.map(({ c, d }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					"• ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: c.name
					}),
					" — expires in ",
					d,
					" day",
					d === 1 ? "" : "s",
					" (renegotiate)"
				] }, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: inputRef,
			type: "file",
			multiple: true,
			className: "hidden",
			onChange: (e) => {
				add(e.target.files);
				e.target.value = "";
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => inputRef.current?.click(),
			onDragOver: (e) => {
				e.preventDefault();
				setOver(true);
			},
			onDragLeave: () => setOver(false),
			onDrop: (e) => {
				e.preventDefault();
				setOver(false);
				add(e.dataTransfer.files);
			},
			className: `mt-6 w-full rounded-2xl border border-dashed p-10 text-center transition-colors ${over ? "border-white/50 bg-white/[0.04]" : "border-white/15 bg-white/[0.02] hover:border-white/30"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "mx-auto h-7 w-7 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Drop contracts here, or click to upload — split sheets, recording, sync & management agreements."
			})]
		}),
		contracts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Search contracts by name, tag or file…",
				className: "w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm outline-none focus:border-white/40"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 grid grid-cols-1 gap-3",
			children: [
				shown.map((c) => {
					const d = daysUntil(c.expiresOn);
					const warn = d !== null && d <= 30 && d >= 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 flex-1 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePenLine, { className: "h-5 w-5 text-white/50" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 truncate font-medium",
										children: [c.name, isShared(c.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedBadge, { editable: canEdit(c.id) })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs text-muted-foreground",
										children: c.fileName
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: c.tag,
								disabled: !canEdit(c.id),
								onChange: (e) => update("contracts", (all) => all.map((x) => x.id === c.id ? {
									...x,
									tag: e.target.value
								} : x)),
								className: "rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs outline-none disabled:opacity-60",
								children: TAGS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#140a1e]",
									children: t
								}, t))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "date",
								value: c.expiresOn,
								onChange: (e) => update("contracts", (all) => all.map((x) => x.id === c.id ? {
									...x,
									expiresOn: e.target.value
								} : x)),
								className: `rounded-full border bg-white/[0.03] px-3 py-1.5 text-xs outline-none ${warn ? "border-[oklch(0.82_0.16_90)]/60 text-[oklch(0.85_0.16_90)]" : "border-white/10"}`
							}),
							blobs[c.id] || c.filePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => viewFile(c.fileName, c.filePath, blobs[c.id]),
									title: "View",
									className: "glass grid h-7 w-7 place-items-center rounded-lg hover:bg-white/5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => downloadFile(c.fileName, c.filePath, blobs[c.id]),
									title: "Download",
									className: "glass grid h-7 w-7 place-items-center rounded-lg hover:bg-white/5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" })
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								title: "Metadata only — no file bytes stored",
								className: "text-[10px] text-muted-foreground/60",
								children: "no file"
							}),
							!isShared(c.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => update("contracts", (all) => all.filter((x) => x.id !== c.id)),
								className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					}, c.id);
				}),
				contracts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "glass rounded-2xl p-8 text-center text-sm text-muted-foreground",
					children: "No contracts yet."
				}),
				contracts.length > 0 && shown.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-8 text-center text-sm text-muted-foreground",
					children: [
						"No contracts match \"",
						q,
						"\"."
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: viewer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileViewer, {
			url: viewer.url,
			fileName: viewer.name,
			onClose: () => setViewer(null)
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: splitOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SplitSheetModal, {
			onClose: () => setSplitOpen(false),
			onGenerated: (name) => update("contracts", (c) => [{
				id: uid("c"),
				name,
				tag: "Split Sheet",
				expiresOn: "",
				fileName: `${name.replace(/\s+/g, "_")}_Split_Sheet.pdf`
			}, ...c])
		}) })
	] });
}
var field = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40";
function SplitSheetModal({ onClose, onGenerated }) {
	const [trackTitle, setTrackTitle] = (0, import_react.useState)("");
	const [artist, setArtist] = (0, import_react.useState)("");
	const [date, setDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [entries, setEntries] = (0, import_react.useState)([{
		name: "",
		role: "Producer",
		percent: 50
	}, {
		name: "",
		role: "Writer",
		percent: 50
	}]);
	const total = entries.reduce((sum, e) => sum + (Number(e.percent) || 0), 0);
	function updateEntry(i, patch) {
		setEntries((all) => all.map((e, idx) => idx === i ? {
			...e,
			...patch
		} : e));
	}
	function addEntry() {
		setEntries((all) => [...all, {
			name: "",
			role: "Featured Artist",
			percent: 0
		}]);
	}
	function removeEntry(i) {
		setEntries((all) => all.filter((_, idx) => idx !== i));
	}
	function generate() {
		if (!trackTitle.trim() || entries.every((e) => !e.name.trim())) return;
		splitSheetPdf({
			trackTitle,
			artist,
			date,
			entries: entries.filter((e) => e.name.trim())
		});
		onGenerated(trackTitle.trim());
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: "The Vault · Auto-generated",
		title: "Split sheet",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2 sm:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Track title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: trackTitle,
							onChange: (e) => setTrackTitle(e.target.value),
							placeholder: "Track name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2 sm:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Artist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: artist,
							onChange: (e) => setArtist(e.target.value),
							placeholder: "Artist name"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: field,
							value: date,
							onChange: (e) => setDate(e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: "Contributors"
					}),
					entries.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-12 items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${field} col-span-5`,
								placeholder: "Name",
								value: e.name,
								onChange: (ev) => updateEntry(i, { name: ev.target.value })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: `${field} col-span-4`,
								placeholder: "Role (Producer, Writer…)",
								value: e.role,
								onChange: (ev) => updateEntry(i, { role: ev.target.value })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								min: 0,
								max: 100,
								className: `${field} col-span-2`,
								value: e.percent,
								onChange: (ev) => updateEntry(i, { percent: Number(ev.target.value) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeEntry(i),
								className: "col-span-1 grid h-8 w-8 place-items-center text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							})
						]
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: addEntry,
						className: "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add contributor"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `mt-3 text-right text-xs ${total === 100 ? "text-muted-foreground" : "text-[oklch(0.82_0.16_90)]"}`,
				children: [
					"Total: ",
					total,
					"%",
					total !== 100 && " — should add up to 100%"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "glass rounded-full px-4 py-2.5 text-sm hover:bg-white/5",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
					onClick: generate,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePlusCorner, { className: "h-4 w-4" }), " Generate PDF"]
				})]
			})
		]
	});
}
//#endregion
export { VaultPage as component };
