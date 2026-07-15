import { a as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useOS, o as uid } from "./os-store-v2jdVGrV.mjs";
import { d as TriangleAlert, m as Trash2, nt as FilePenLine, u as Upload } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vault-Cs0Nt8Fx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const { contracts, update } = useOS();
	const inputRef = (0, import_react.useRef)(null);
	const [over, setOver] = (0, import_react.useState)(false);
	function add(files) {
		if (!files) return;
		Array.from(files).forEach((file) => update("contracts", (c) => [{
			id: uid("c"),
			name: file.name.replace(/\.[^.]+$/, ""),
			tag: "Other",
			expiresOn: "",
			fileName: file.name
		}, ...c]));
	}
	const expiring = contracts.map((c) => ({
		c,
		d: daysUntil(c.expiresOn)
	})).filter((x) => x.d !== null && x.d <= 30 && x.d >= 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
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
			]
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
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-1 gap-3",
			children: [contracts.map((c) => {
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
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-medium",
									children: c.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs text-muted-foreground",
									children: c.fileName
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: c.tag,
							onChange: (e) => update("contracts", (all) => all.map((x) => x.id === c.id ? {
								...x,
								tag: e.target.value
							} : x)),
							className: "rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs outline-none",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => update("contracts", (all) => all.filter((x) => x.id !== c.id)),
							className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
						})
					]
				}, c.id);
			}), contracts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass rounded-2xl p-8 text-center text-sm text-muted-foreground",
				children: "No contracts yet."
			})]
		})
	] });
}
//#endregion
export { VaultPage as component };
