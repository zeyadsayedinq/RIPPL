import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useCampaigns } from "./campaign-store-Cd9pjPrz.mjs";
import { n as useRole } from "./role-context-Dr49T2SH.mjs";
import { a as AnimatePresence, i as motion } from "../_libs/framer-motion.mjs";
import { D as Search, Dt as Eye, V as Music2, Wt as Check, a as Users, ct as Heart, it as Instagram, n as X, p as TrendingUp } from "../_libs/lucide-react.mjs";
import { a as Portal, n as MagneticButton, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { o as creators, u as platformColors } from "./mock-data-D43v3GLl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/creators-BMQlN91d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var platforms = [
	"All",
	"TikTok",
	"Instagram"
];
var tiers = [
	"All",
	"Featured",
	"Mega",
	"Macro",
	"Mid",
	"Micro"
];
var statuses = [
	"All",
	"Confirmed",
	"Pending",
	"Priced",
	"Rejected"
];
function CreatorsPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [platform, setPlatform] = (0, import_react.useState)("All");
	const [tier, setTier] = (0, import_react.useState)("All");
	const [status, setStatus] = (0, import_react.useState)("All");
	const [assignedOnly, setAssignedOnly] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const { active, assignedIds, isAssigned } = useCampaigns();
	const filtered = (0, import_react.useMemo)(() => creators.filter((c) => {
		if (q && !`${c.name} ${c.handle} ${c.city}`.toLowerCase().includes(q.toLowerCase())) return false;
		if (platform !== "All" && c.platform !== platform) return false;
		if (tier !== "All" && c.tier !== tier) return false;
		if (status !== "All" && c.status !== status) return false;
		if (assignedOnly && !isAssigned(c.id)) return false;
		return true;
	}), [
		q,
		platform,
		tier,
		status,
		assignedOnly,
		assignedIds
	]);
	const assignedList = creators.filter((c) => assignedIds.includes(c.id));
	const totalFee = assignedList.reduce((s, c) => s + c.price, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-end md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
					children: "Directory · List Builder"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Build your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "campaign list"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						filtered.length,
						" shown · pick creators for ",
						active ? active.artist : "your campaign",
						" using the checkboxes."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass rounded-2xl px-5 py-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] uppercase tracking-wider text-muted-foreground",
						children: ["On ", active ? active.title : "campaign"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-2xl font-bold",
						children: assignedList.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] text-muted-foreground",
						children: "creators"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-6 p-5",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 lg:flex-row lg:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search creators, handles, cities…",
							className: "w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-white/40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
						label: "Platform",
						value: platform,
						options: platforms,
						onChange: (v) => setPlatform(v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setAssignedOnly((o) => !o),
						className: `shrink-0 rounded-full border px-4 py-2 text-xs transition-colors ${assignedOnly ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`,
						children: assignedOnly ? "Showing campaign list" : "Show campaign list only"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
					label: "Tier",
					value: tier,
					options: tiers,
					onChange: (v) => setTier(v)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterGroup, {
					label: "Status",
					value: status,
					options: statuses,
					onChange: (v) => setStatus(v)
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorsList, {
			filtered,
			selected,
			onSelectChange: setSelected
		}),
		assignedList.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-4 p-5",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: ["Campaign List · ", active?.artist]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm text-muted-foreground",
					children: ["Total fees: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-foreground",
						children: ["EGP ", totalFee.toLocaleString()]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: assignedList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full bg-white/[0.06] px-3 py-1 text-xs",
					children: [
						c.name,
						" · ",
						c.handle
					]
				}, c.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatorModal, {
			creator: selected,
			onClose: () => setSelected(null)
		}) })
	] });
}
function CreatorsList({ filtered, selected, onSelectChange }) {
	const { canSeePrice } = useRole();
	const { isAssigned, toggleAssignment } = useCampaigns();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 grid grid-cols-1 gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:grid grid-cols-[auto_2fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Add" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Creator" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Platform" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Tier" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Followers" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Engagement" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: canSeePrice ? "Price" : "Tier Rate" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Status" })
			]
		}), filtered.map((c, i) => {
			const on = isAssigned(c.id);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: i * .03 },
				className: `glass grid grid-cols-[auto_1fr] lg:grid-cols-[auto_2fr_1fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 rounded-2xl p-4 text-left transition-colors ${on ? "border-[oklch(0.82_0.18_150)]/40" : "hover:border-white/25"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => toggleAssignment(c.id),
						title: on ? "Remove from campaign list" : "Add to campaign list",
						className: `grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${on ? "border-[oklch(0.82_0.18_150)] bg-[oklch(0.82_0.18_150)]" : "border-white/25 hover:border-white"}`,
						children: on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-black" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onSelectChange(c),
						className: "col-span-1 lg:col-span-1 flex items-center gap-3 min-w-0 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)]/60 to-[oklch(0.5_0.3_300)]/60 font-display font-bold",
							children: c.name.charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate font-medium",
									children: c.name
								}), isAssigned(c.id) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									title: "Assigned to active campaign",
									className: "shrink-0 rounded-full bg-[oklch(0.85_0.18_150)]/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[oklch(0.85_0.18_150)]",
									children: "On campaign"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									c.handle,
									" · ",
									c.city
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformBadge, { platform: c.platform }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierBadge, { tier: c.tier }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-sm",
						children: formatK(c.followers)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-mono text-sm text-[oklch(0.85_0.18_200)]",
						children: [c.engagement, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-sm",
						children: canSeePrice ? `EGP ${c.price.toLocaleString()}` : "•••••"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: c.status })
				]
			}, c.id);
		})]
	});
}
function FilterGroup({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass flex rounded-full p-1",
			children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => onChange(o),
				className: `relative rounded-full px-3 py-1 text-xs transition-colors ${value === o ? "text-white" : "text-muted-foreground hover:text-white"}`,
				children: [value === o && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layoutId: `f-${label}`,
					className: "absolute inset-0 rounded-full bg-gradient-to-r from-[oklch(0.7_0.28_328)]/40 to-[oklch(0.5_0.3_300)]/40 border border-[oklch(0.7_0.28_328)]/40",
					transition: {
						type: "spring",
						stiffness: 300,
						damping: 30
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "relative",
					children: o
				})]
			}, o))
		})]
	});
}
function PlatformBadge({ platform }) {
	const { icon: Icon, color } = {
		TikTok: {
			icon: Music2,
			color: platformColors.TikTok
		},
		Instagram: {
			icon: Instagram,
			color: platformColors.Instagram
		},
		Facebook: {
			icon: Music2,
			color: platformColors.Facebook
		},
		YouTube: {
			icon: Music2,
			color: platformColors.YouTube
		}
	}[platform] ?? {
		icon: Music2,
		color: platformColors[platform]
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "h-3.5 w-3.5",
			style: { color }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: platform
		})]
	});
}
function TierBadge({ tier }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${{
			Featured: "border-[oklch(0.7_0.28_328)]/50 text-[oklch(0.85_0.25_328)]",
			Mega: "border-[oklch(0.55_0.3_300)]/50 text-[oklch(0.7_0.28_300)]",
			Macro: "border-[oklch(0.85_0.18_200)]/40 text-[oklch(0.85_0.18_200)]",
			Mid: "border-white/15 text-foreground",
			Micro: "border-white/10 text-muted-foreground"
		}[tier]}`,
		children: tier
	});
}
function StatusPill({ status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `rounded-full px-2.5 py-1 text-[10px] uppercase tracking-widest ${{
			Confirmed: "bg-[oklch(0.85_0.18_200)]/15 text-[oklch(0.85_0.18_200)]",
			Pending: "bg-white/5 text-muted-foreground",
			Priced: "bg-[oklch(0.7_0.28_328)]/15 text-[oklch(0.85_0.25_328)]",
			Rejected: "bg-destructive/15 text-destructive"
		}[status]}`,
		children: status
	});
}
function formatK(n) {
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
	return `${n}`;
}
function CreatorModal({ creator, onClose }) {
	const { canSeePrice } = useRole();
	const { active, isAssigned, toggleAssignment } = useCampaigns();
	const assigned = isAssigned(creator.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[100] flex items-stretch justify-end p-4",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				x: 400,
				opacity: 0
			},
			animate: {
				x: 0,
				opacity: 1
			},
			exit: {
				x: 400,
				opacity: 0
			},
			transition: {
				type: "spring",
				stiffness: 260,
				damping: 30
			},
			className: "glass-strong relative flex w-full max-w-md flex-col gap-6 overflow-y-auto rounded-2xl p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "glass absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] font-display text-2xl font-bold shadow-[0_0_32px_rgba(232,121,249,0.5)]",
						children: creator.name.charAt(0)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-xl font-bold",
								children: creator.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm text-muted-foreground",
								children: [
									creator.handle,
									" · ",
									creator.city
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TierBadge, { tier: creator.tier })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: Users,
							label: "Followers",
							value: formatK(creator.followers)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: Eye,
							label: "Avg Views",
							value: formatK(creator.avgViews)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: Heart,
							label: "Engagement",
							value: `${creator.engagement}%`
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Deliverable Preview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 aspect-[9/16] w-40 mx-auto rounded-lg bg-gradient-to-br from-[oklch(0.15_0.05_320)] to-black relative overflow-hidden border border-white/10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 grid place-items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Music2, { className: "h-8 w-8 mx-auto text-[oklch(0.7_0.28_328)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-xs text-muted-foreground",
									children: [
										creator.platform,
										" spec ·",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"15s vertical"
									]
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-2 left-2 right-2 text-[10px] text-white/60",
							children: creator.handle
						})]
					})]
				}),
				canSeePrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "Negotiated Rate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 font-display text-2xl font-bold text-gradient-neon",
						children: ["EGP ", creator.price.toLocaleString()]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-6 w-6 text-[oklch(0.85_0.18_200)]" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "Campaign assignment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-muted-foreground",
							children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Active: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-foreground",
								children: [
									active.artist,
									" — ",
									active.title
								]
							})] }) : "No active campaign. Create one first."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: !active,
							onClick: () => toggleAssignment(creator.id),
							className: `mt-3 w-full rounded-full px-4 py-2 text-sm font-medium transition-colors disabled:opacity-40 ${assigned ? "bg-[oklch(0.85_0.18_150)]/20 text-[oklch(0.85_0.18_150)]" : "bg-gradient-to-r from-[oklch(0.7_0.28_328)] to-[oklch(0.55_0.3_300)] text-white"}`,
							children: assigned ? "✓ Assigned — remove from campaign" : "+ Assign to active campaign"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							variant: "primary",
							children: "Approve"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							variant: "danger",
							children: "Reject"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							variant: "ghost",
							children: "Message"
						})
					]
				})
			]
		})]
	}) });
}
function Stat({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-xl p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-[oklch(0.7_0.28_328)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 font-display text-lg font-bold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-widest text-muted-foreground",
				children: label
			})
		]
	});
}
//#endregion
export { CreatorsPage as component };
