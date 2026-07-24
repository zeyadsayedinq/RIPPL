import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useIsHQ, i as useAuthEmail } from "./use-auth-DSVhBFKn.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as useOS } from "./campaign-store-Cd9pjPrz.mjs";
import { At as Disc3, K as Megaphone, Lt as Clock, Mt as Cpu, St as FilePenLine, V as Music2, Wt as Check, at as Inbox, l as UserPlus, p as TrendingUp, yt as FileText } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { t as SharedBadge } from "./SharedBadge-l4LKisvK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-DwoSz0dJ.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { deals, contracts, releases, projects, todos, update, shared, canEdit } = useOS();
	const isHQ = useIsHQ();
	const email = useAuthEmail();
	const firstName = isHQ ? "Zeyad" : email?.split("@")[0] ?? "there";
	const pendingSignatures = deals.filter((d) => d.status === "Contracting").length + contracts.length;
	const upcoming = releases.filter((r) => r.status === "Scheduled").length;
	const pipelines = projects.filter((p) => p.deploy !== "Error").length;
	const metrics = [
		{
			label: "Blended ROAS",
			value: "—",
			hint: "Connect a live campaign",
			icon: TrendingUp
		},
		{
			label: "Pending Signatures",
			value: `${pendingSignatures}`,
			hint: "Deals + contracts",
			icon: FilePenLine
		},
		{
			label: "Upcoming Releases",
			value: `${upcoming}`,
			hint: "Next 7 days",
			icon: Disc3
		},
		{
			label: "Active AI Pipelines",
			value: `${pipelines}`,
			hint: "SaaS + AI projects",
			icon: Cpu
		}
	];
	function toggleTodo(id) {
		update("todos", (t) => t.map((x) => x.id === id ? {
			...x,
			done: !x.done
		} : x));
	}
	function snooze(id) {
		update("todos", (t) => t.map((x) => x.id === id ? {
			...x,
			snoozed: !x.snoozed
		} : x));
	}
	function delegate(id) {
		update("todos", (t) => t.map((x) => x.id === id ? {
			...x,
			delegated: !x.delegated
		} : x));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-white/40",
					children: "Command Center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Good to see you, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: firstName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Your whole universe — A&R, releases, deals and tech — in one view. Press ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded border border-white/15 px-1 text-[10px]",
							children: "⌘K"
						}),
						" to search anything."
					]
				})
			]
		}),
		!isHQ && shared && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-6 p-6",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: ["Your workspace", shared.role !== "None" ? ` · ${shared.role}` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-1 font-display text-2xl font-bold",
					children: ["Assigned to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "you"
					})]
				})] })
			}), shared.campaigns.length + shared.releases.length + shared.tracks.length + shared.contracts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "h-4 w-4 shrink-0" }), " Nothing assigned to you yet — anything you create here is your own, and HQ can assign campaigns, releases, audio or contracts to this account at any time."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-12 gap-3",
				children: [
					{
						label: "Campaigns",
						icon: Megaphone,
						to: "/dashboard",
						items: shared.campaigns.map((c) => ({
							id: c.id,
							text: `${c.artist} — ${c.title}`
						}))
					},
					{
						label: "Releases",
						icon: Disc3,
						to: "/releases",
						items: shared.releases.map((r) => ({
							id: r.id,
							text: `${r.title} · ${r.artist}`
						}))
					},
					{
						label: "Audio",
						icon: Music2,
						to: "/audio",
						items: shared.tracks.map((t) => ({
							id: t.id,
							text: t.title
						}))
					},
					{
						label: "Contracts",
						icon: FileText,
						to: "/vault",
						items: shared.contracts.map((c) => ({
							id: c.id,
							text: c.name
						}))
					}
				].filter((g) => g.items.length > 0).map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: g.to,
					className: "col-span-12 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.04] sm:col-span-6 xl:col-span-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(g.icon, { className: "h-3.5 w-3.5" }),
							" ",
							g.label,
							" (",
							g.items.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-1.5",
						children: [g.items.slice(0, 4).map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: it.text
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SharedBadge, { editable: canEdit(it.id) })]
						}, it.id)), g.items.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "text-[11px] text-muted-foreground",
							children: [
								"+ ",
								g.items.length - 4,
								" more…"
							]
						})]
					})]
				}, g.label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-6 xl:col-span-3 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
							children: m.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: "h-4 w-4 text-white/40" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 font-display text-3xl font-bold",
						children: m.value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-[11px] text-muted-foreground/70",
						children: m.hint
					})
				]
			}, m.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 grid grid-cols-12 gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-7 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "Schedule"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "This Month"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonthCalendar, {
						releaseCount: releases.length,
						dealCount: deals.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-4 text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-white/80" }), " Release date"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[oklch(0.8_0.16_80)]" }), " Deal milestone"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-[oklch(0.72_0.16_200)]" }), " Social post"]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
				className: "col-span-12 xl:col-span-5 p-6",
				spotlight: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: "Action Center"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl font-bold",
						children: "Today's To-Dos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-2",
						children: todos.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `glass flex items-center gap-3 rounded-xl p-3 ${t.snoozed ? "opacity-50" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleTodo(t.id),
									className: `grid h-5 w-5 shrink-0 place-items-center rounded-md border ${t.done ? "border-white bg-white" : "border-white/25"}`,
									children: t.done && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-black" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `flex-1 text-sm ${t.done ? "text-muted-foreground line-through" : ""}`,
									children: [t.label, t.delegated && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white/60",
										children: "Delegated"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => snooze(t.id),
									title: "Snooze",
									className: "text-muted-foreground hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => delegate(t.id),
									title: "Delegate",
									className: "text-muted-foreground hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4" })
								})
							]
						}, t.id))
					})
				]
			})]
		})
	] });
}
function MonthCalendar({ releaseCount, dealCount }) {
	const now = /* @__PURE__ */ new Date();
	const year = now.getFullYear();
	const month = now.getMonth();
	const first = new Date(year, month, 1).getDay();
	const days = new Date(year, month + 1, 0).getDate();
	const today = now.getDate();
	const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
	const releaseDays = new Set([7, 21].slice(0, Math.min(2, releaseCount)));
	const dealDays = new Set([12].slice(0, Math.min(1, dealCount)));
	const socialDays = /* @__PURE__ */ new Set([
		4,
		15,
		26
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-muted-foreground",
			children: [
				"S",
				"M",
				"T",
				"W",
				"T",
				"F",
				"S"
			].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d }, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 grid grid-cols-7 gap-1",
			children: cells.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative grid h-11 place-items-center rounded-lg text-sm ${d === today ? "bg-white text-black font-bold" : d ? "bg-white/[0.02] text-foreground" : ""}`,
				children: [d, d && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-1 flex gap-0.5",
					children: [
						releaseDays.has(d) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-white/80" }),
						dealDays.has(d) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-[oklch(0.8_0.16_80)]" }),
						socialDays.has(d) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1 w-1 rounded-full bg-[oklch(0.72_0.16_200)]" })
					]
				})]
			}, i))
		})]
	});
}
//#endregion
export { Home as component };
