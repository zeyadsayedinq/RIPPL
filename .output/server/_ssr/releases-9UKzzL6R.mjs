import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useCampaigns, f as useOS, l as uid } from "./campaign-store-Cd9pjPrz.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { $ as ListChecks, At as Disc3, P as Pencil, Tt as FileDown, Wt as Check, h as Trash2, ot as Image, tt as Link2, x as SlidersHorizontal, z as Music } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, r as ModalShell, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { t as SharedBadge } from "./SharedBadge-l4LKisvK.mjs";
import { r as releaseOnePagerPdf } from "./pdf-BD3yix15.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/releases-9UKzzL6R.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-white/40";
var lbl = "mb-1.5 block text-[11px] uppercase tracking-wider text-muted-foreground";
var cidColor = {
	red: "oklch(0.65 0.24 20)",
	yellow: "oklch(0.82 0.16 90)",
	green: "oklch(0.82 0.18 150)"
};
function ReleasesPage() {
	const { releases, update, isShared, canEdit } = useOS();
	const { campaigns } = useCampaigns();
	const [wizard, setWizard] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const campaignName = (id) => campaigns.find((c) => c.id === id)?.title;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
					children: "Distribution · The Engine"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Releases ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Catalog"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						releases.length,
						" releases · ",
						releases.filter((r) => r.status === "Live").length,
						" live"
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
				onClick: () => setWizard(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disc3, { className: "h-4 w-4" }), " New Release"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
			className: "mt-6 p-6",
			spotlight: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[820px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "text-left text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Artist"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "ISRC"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Release"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "DSPs"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Content ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3",
								children: "Campaign"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-3 text-right",
								children: "Action"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [releases.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						onClick: () => canEdit(r.id) && setEditing(r),
						className: "cursor-pointer border-t border-white/[0.06] hover:bg-white/[0.02]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [r.title, isShared(r.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedBadge, { editable: canEdit(r.id) })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-muted-foreground",
								children: r.artist
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 font-mono text-xs text-muted-foreground",
								children: r.isrc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-muted-foreground",
								children: r.releaseDate
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-xs text-muted-foreground",
								children: [
									r.dsp.spotify && "Spotify",
									r.dsp.anghami && "Anghami",
									r.dsp.youtube && "YouTube"
								].filter(Boolean).join(", ") || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] capitalize",
									style: {
										color: cidColor[r.contentId],
										background: cidColor[r.contentId] + "1a"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "h-2 w-2 rounded-full",
										style: { background: cidColor[r.contentId] }
									}), r.contentId]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-xs text-muted-foreground",
								children: campaignName(r.campaignId) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "h-3 w-3" }),
										" ",
										campaignName(r.campaignId)
									]
								}) : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 text-right",
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => releaseOnePagerPdf(r),
										title: "Download one-pager PDF",
										className: "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "h-3.5 w-3.5" }), " One-pager"]
									}), canEdit(r.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setEditing(r),
										title: "Edit release",
										className: "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => update("releases", (all) => all.map((x) => x.id === r.id ? {
											...x,
											contentId: x.contentId === "green" ? "yellow" : x.contentId === "yellow" ? "red" : "green"
										} : x)),
										className: "glass rounded-full px-3 py-1.5 text-xs hover:bg-white/5",
										children: "Takedown"
									})] })]
								})
							})
						]
					}, r.id)), releases.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 8,
						className: "py-8 text-center text-muted-foreground",
						children: "No releases yet."
					}) })] })]
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: wizard && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseWizard, {
			onClose: () => setWizard(false),
			onCreate: (r) => update("releases", (all) => [r, ...all])
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseEditModal, {
			release: editing,
			onClose: () => setEditing(null),
			onSave: (r) => {
				update("releases", (all) => all.map((x) => x.id === r.id ? r : x));
				setEditing(null);
			},
			onDelete: (id) => {
				update("releases", (all) => all.filter((x) => x.id !== id));
				setEditing(null);
			}
		}) })
	] });
}
function ReleaseEditModal({ release, onClose, onSave, onDelete }) {
	const { campaigns } = useCampaigns();
	const [r, setR] = (0, import_react.useState)(release);
	const set = (k, v) => setR((s) => ({
		...s,
		[k]: v
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: "Distribution",
		title: `Edit — ${release.title}`,
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lbl,
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: r.title,
							onChange: (e) => set("title", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lbl,
							children: "Artist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: r.artist,
							onChange: (e) => set("artist", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lbl,
							children: "ISRC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: r.isrc,
							onChange: (e) => set("isrc", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lbl,
							children: "UPC"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: field,
							value: r.upc,
							onChange: (e) => set("upc", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lbl,
							children: "Release date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							className: field,
							value: r.releaseDate === "TBC" ? "" : r.releaseDate,
							onChange: (e) => set("releaseDate", e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lbl,
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: field,
							value: r.status,
							onChange: (e) => set("status", e.target.value),
							children: [
								"Draft",
								"Scheduled",
								"Live"
							].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#0a0a0c]",
								children: s
							}, s))
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: lbl,
					children: "Content ID"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					className: field,
					value: r.contentId,
					onChange: (e) => set("contentId", e.target.value),
					children: [
						"green",
						"yellow",
						"red"
					].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						className: "bg-[#0a0a0c] capitalize",
						children: c
					}, c))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: lbl,
					children: "Linked campaign"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: field,
					value: r.campaignId ?? "",
					onChange: (e) => set("campaignId", e.target.value || void 0),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						className: "bg-[#0a0a0c]",
						children: "— No campaign —"
					}), campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: c.id,
						className: "bg-[#0a0a0c]",
						children: [
							c.artist,
							" — ",
							c.title
						]
					}, c.id))]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: lbl,
					children: "DSPs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						["spotify", "Spotify"],
						["anghami", "Anghami"],
						["youtube", "YouTube"]
					].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "glass flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: r.dsp[k],
								onChange: (e) => set("dsp", {
									...r.dsp,
									[k]: e.target.checked
								}),
								className: "h-3.5 w-3.5 accent-white"
							}),
							" ",
							label
						]
					}, k))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: lbl,
					children: "Audio QA"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [["atmos", "Dolby Atmos"], ["eq", "Master EQ"]].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "glass flex cursor-pointer items-center gap-2 rounded-full px-3 py-1.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: r.qa[k],
								onChange: (e) => set("qa", {
									...r.qa,
									[k]: e.target.checked
								}),
								className: "h-3.5 w-3.5 accent-white"
							}),
							" ",
							label
						]
					}, k))
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onDelete(release.id),
				className: "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), " Delete"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-full px-4 py-2.5 text-sm text-muted-foreground hover:text-white",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
					onClick: () => onSave(r),
					children: "Save changes"
				})]
			})]
		})]
	});
}
function ReleaseWizard({ onClose, onCreate }) {
	const { campaigns } = useCampaigns();
	const [step, setStep] = (0, import_react.useState)(1);
	const [f, setF] = (0, import_react.useState)({});
	const [dsp, setDsp] = (0, import_react.useState)({
		spotify: true,
		anghami: true,
		youtube: false
	});
	const [qa, setQa] = (0, import_react.useState)({
		atmos: false,
		eq: false
	});
	const set = (k, v) => setF((s) => ({
		...s,
		[k]: v
	}));
	const steps = [
		{
			n: 1,
			label: "Audio & Metadata",
			icon: Music
		},
		{
			n: 2,
			label: "Assets",
			icon: Image
		},
		{
			n: 3,
			label: "DSP Pitching",
			icon: ListChecks
		},
		{
			n: 4,
			label: "Audio QA",
			icon: SlidersHorizontal
		}
	];
	function finish() {
		onCreate({
			id: uid("r"),
			title: f.title || "Untitled",
			artist: f.primary || "—",
			isrc: f.isrc || "—",
			upc: f.upc || "—",
			releaseDate: f.date || "TBC",
			contentId: "yellow",
			status: "Draft",
			dsp,
			qa,
			campaignId: f.campaignId || void 0
		});
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: "Distribution",
		title: "Release Wizard",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-5 flex items-center gap-2",
				children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `grid h-8 w-8 shrink-0 place-items-center rounded-full border text-xs ${step >= s.n ? "border-white bg-white text-black" : "border-white/20 text-muted-foreground"}`,
						children: step > s.n ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : s.n
					}), i < steps.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-px flex-1 ${step > s.n ? "bg-white/60" : "bg-white/10"}` })]
				}, s.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 text-sm font-semibold",
				children: steps[step - 1].label
			}),
			step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: lbl,
							children: "Audio file (WAV/MP3)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "audio/*",
							className: field,
							onChange: (e) => set("audio", e.target.files?.[0]?.name || "")
						}),
						f.audio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-[11px] text-muted-foreground",
							children: f.audio
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: lbl,
						children: "Track title"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: field,
						value: f.title || "",
						onChange: (e) => set("title", e.target.value),
						placeholder: "Sorry"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lbl,
								children: "ISRC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: f.isrc || "",
								onChange: (e) => set("isrc", e.target.value),
								placeholder: "EGA0125..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lbl,
								children: "UPC"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: f.upc || "",
								onChange: (e) => set("upc", e.target.value),
								placeholder: "197..."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lbl,
								children: "Primary artist"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: f.primary || "",
								onChange: (e) => set("primary", e.target.value),
								placeholder: "Latifa"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: lbl,
								children: "Secondary artist(s)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: f.secondary || "",
								onChange: (e) => set("secondary", e.target.value),
								placeholder: "feat. …"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: lbl,
						children: "Release date"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						className: field,
						value: f.date || "",
						onChange: (e) => set("date", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: lbl,
						children: "Link to campaign (optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: field,
						value: f.campaignId || "",
						onChange: (e) => set("campaignId", e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							className: "bg-[#0a0a0c]",
							children: "— No campaign —"
						}), campaigns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							className: "bg-[#0a0a0c]",
							children: [
								c.artist,
								" — ",
								c.title
							]
						}, c.id))]
					})] })
				]
			}),
			step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: lbl,
						children: "Cover art (3000×3000)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*",
						className: field,
						onChange: (e) => set("cover", e.target.files?.[0]?.name || "")
					}),
					f.cover && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: f.cover
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: lbl,
						children: "Canvas (looping video)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "video/*",
						className: field,
						onChange: (e) => set("canvas", e.target.files?.[0]?.name || "")
					}),
					f.canvas && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: f.canvas
					})
				] })]
			}),
			step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "Pitch to DSP editorial teams:"
				}), [
					["spotify", "Spotify"],
					["anghami", "Anghami"],
					["youtube", "YouTube"]
				].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "glass flex cursor-pointer items-center justify-between rounded-xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: dsp[k],
						onChange: (e) => setDsp((s) => ({
							...s,
							[k]: e.target.checked
						})),
						className: "h-4 w-4 accent-white"
					})]
				}, k))]
			}),
			step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm text-muted-foreground",
					children: "Audio supervision sign-off:"
				}), [["atmos", "Dolby Atmos Mix approved"], ["eq", "Master EQ checked"]].map(([k, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "glass flex cursor-pointer items-center justify-between rounded-xl p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setQa((s) => ({
							...s,
							[k]: !s[k]
						})),
						className: `relative h-6 w-11 rounded-full transition-colors ${qa[k] ? "bg-[oklch(0.82_0.18_150)]" : "bg-white/15"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${qa[k] ? "left-[22px]" : "left-0.5"}` })
					})]
				}, k))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => step === 1 ? onClose() : setStep((s) => s - 1),
					className: "rounded-full px-4 py-2 text-sm text-muted-foreground hover:text-white",
					children: step === 1 ? "Cancel" : "Back"
				}), step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
					onClick: () => setStep((s) => s + 1),
					children: "Next"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
					onClick: finish,
					children: "Create release"
				})]
			})
		]
	});
}
//#endregion
export { ReleasesPage as component };
