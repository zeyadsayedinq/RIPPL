import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useCampaigns } from "./campaign-store-Cd9pjPrz.mjs";
import { M as Plus, h as Trash2 } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
import { t as EmptyState } from "./EmptyState-5qR3rxdk.mjs";
import "./router-HSnWfBE1.mjs";
import { n as Calendar_default, r as dateFnsLocalizer, t as require_dragAndDrop } from "../_libs/react-big-calendar+[...].mjs";
import { a as addWeeks, i as enUS, n as getDay, o as startOfWeek, r as format, s as addDays, t as parse } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-CBcfw5jl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_dragAndDrop = /* @__PURE__ */ __toESM(require_dragAndDrop());
var localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales: { "en-US": enUS }
});
var DnDCalendar = (0, import_dragAndDrop.default)(Calendar_default);
var PLATFORMS = [
	"TikTok",
	"Instagram",
	"YouTube",
	"Facebook",
	"X",
	"Other"
];
var platformColor = {
	TikTok: "oklch(0.7 0.24 20)",
	Instagram: "oklch(0.68 0.24 340)",
	YouTube: "oklch(0.65 0.24 25)",
	Facebook: "oklch(0.6 0.2 255)",
	X: "oklch(0.85 0 0)",
	Other: "oklch(0.7 0.02 270)"
};
var milestoneColor = "oklch(0.7 0.28 328 / 0.75)";
function resolveMilestoneDate(label, anchor) {
	const s = label.trim();
	let m;
	if ((m = /^Week\s*([+-]?\d+)$/i.exec(s)) || (m = /^Wk\s*([+-]?\d+)$/i.exec(s))) return addWeeks(anchor, parseInt(m[1], 10));
	if (m = /^Day\s*([+-]?\d+)$/i.exec(s)) return addDays(anchor, parseInt(m[1], 10));
	if (m = /^Days\s*(\d+)\s*[–-]\s*\d+$/i.exec(s)) return addDays(anchor, parseInt(m[1], 10) - 1);
	if (/finale/i.test(s)) return addWeeks(anchor, 16);
	return anchor;
}
function CalendarPage() {
	const { active, activeTemplate, activeEvents, addEvent, moveEvent, removeEvent } = useCampaigns();
	const [view, setView] = (0, import_react.useState)("month");
	const [date, setDate] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		platform: "TikTok",
		date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	const anchor = (0, import_react.useMemo)(() => {
		const d = new Date(active?.startDate ?? "");
		return isNaN(d.getTime()) ? /* @__PURE__ */ new Date() : d;
	}, [active?.startDate]);
	const milestoneEvents = (0, import_react.useMemo)(() => (activeTemplate?.timeline ?? []).map((t, i) => {
		const d = resolveMilestoneDate(t.date, anchor);
		return {
			id: `m-${i}`,
			title: `${t.title} · ${t.channel}`,
			start: d,
			end: d,
			allDay: true,
			color: milestoneColor,
			editable: false
		};
	}), [activeTemplate, anchor]);
	const postEvents = (0, import_react.useMemo)(() => activeEvents.map((e) => {
		const d = new Date(e.date);
		return {
			id: e.id,
			title: `${e.platform} · ${e.title}`,
			start: d,
			end: d,
			allDay: true,
			color: platformColor[e.platform],
			editable: true,
			platform: e.platform
		};
	}), [activeEvents]);
	const events = [...milestoneEvents, ...postEvents];
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No campaign yet",
		note: "Create a campaign to plan its content calendar and rollout timeline."
	}) });
	const onEventDrop = ({ event, start }) => {
		if (!event.editable) return;
		moveEvent(event.id, start.toISOString().slice(0, 10));
	};
	function submitAdd(e) {
		e.preventDefault();
		if (!form.title.trim()) return;
		addEvent({
			title: form.title.trim(),
			platform: form.platform,
			date: form.date
		});
		setForm({
			title: "",
			platform: "TikTok",
			date: form.date
		});
		setAdding(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass flex flex-col gap-4 rounded-2xl p-5 md:flex-row md:items-center md:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
					children: ["Rollout · ", active.artist]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Content ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Calendar"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						active.title,
						activeTemplate ? ` · ${activeTemplate.name} template` : "",
						" — drag any platform post to reschedule it."
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setAdding((a) => !a),
				className: "inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add post"]
			})]
		}),
		adding && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
			className: "mt-4 p-4",
			spotlight: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submitAdd,
				className: "grid grid-cols-12 items-end gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-12 sm:col-span-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "What's posting"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: form.title,
							onChange: (e) => setForm((f) => ({
								...f,
								title: e.target.value
							})),
							placeholder: "Teaser clip, BTS reel…",
							className: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-6 sm:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Platform"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.platform,
							onChange: (e) => setForm((f) => ({
								...f,
								platform: e.target.value
							})),
							className: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none",
							children: PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								className: "bg-[#0a0a0c]",
								children: p
							}, p))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-6 sm:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: form.date,
							onChange: (e) => setForm((f) => ({
								...f,
								date: e.target.value
							})),
							className: "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-12 sm:col-span-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "w-full rounded-full bg-white py-2 text-sm font-semibold text-black",
							children: "Add"
						})
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-6 p-4 sm:p-6",
			spotlight: false,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "h-2 w-2 rounded-full",
						style: { background: milestoneColor }
					}), " Rollout milestone (reference)"]
				}), PLATFORMS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2 w-2 rounded-full",
							style: { background: platformColor[p] }
						}),
						" ",
						p
					]
				}, p))]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { height: 640 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DnDCalendar, {
					className: "rippl-calendar",
					localizer,
					events,
					date,
					onNavigate: setDate,
					view,
					onView: setView,
					views: [
						"month",
						"week",
						"agenda"
					],
					popup: true,
					draggableAccessor: (e) => e.editable,
					resizable: false,
					onEventDrop,
					onSelectEvent: (e) => setSelected(e),
					eventPropGetter: (e) => ({ style: {
						background: e.color,
						color: "#000",
						opacity: e.editable ? 1 : .85
					} })
				})
			})]
		}),
		selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4",
			onClick: () => setSelected(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: (e) => e.stopPropagation(),
				className: "glass-strong w-full max-w-sm rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
						children: selected.editable ? selected.platform : "Rollout milestone"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg font-semibold",
						children: selected.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-sm text-muted-foreground",
						children: format(selected.start, "EEEE, MMM d, yyyy")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-end gap-2",
						children: [selected.editable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								removeEvent(selected.id);
								setSelected(null);
							},
							className: "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-[oklch(0.7_0.2_20)] hover:bg-[oklch(0.7_0.2_20)]/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" }), " Remove"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelected(null),
							className: "rounded-full bg-white px-4 py-2 text-sm font-medium text-black",
							children: "Close"
						})]
					})
				]
			})
		})
	] });
}
//#endregion
export { CalendarPage as component };
