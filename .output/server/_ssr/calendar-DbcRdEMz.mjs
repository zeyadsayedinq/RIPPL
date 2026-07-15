import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { s as useCampaigns } from "./os-store-v2jdVGrV.mjs";
import { A as Music, N as Megaphone, S as Repeat2, bt as CalendarClock, ct as Disc3, i as Video } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
import { t as EmptyState } from "./EmptyState-DpKuDbDt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-DbcRdEMz.js
var import_jsx_runtime = require_jsx_runtime();
var typeIcon = {
	Single: Music,
	Video,
	Remix: Repeat2,
	Announce: Megaphone,
	Album: Disc3,
	Event: CalendarClock
};
function CalendarPage() {
	const { active, activeTemplate } = useCampaigns();
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: "No campaign yet",
		note: "Create a campaign to plan its release calendar and rollout timeline."
	}) });
	const timeline = activeTemplate?.timeline ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "glass rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
				children: ["Rollout · ", active.artist]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mt-1 font-display text-3xl font-bold",
				children: ["Release ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-gradient-neon",
					children: "Calendar"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					active.title,
					activeTemplate ? ` · ${activeTemplate.name} template` : "",
					" · ",
					active.startDate,
					" → ",
					active.endDate
				]
			})
		]
	}), timeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpotlightCard, {
		className: "mt-6 p-10 text-center",
		spotlight: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "No timeline for this campaign. Create one from a template to seed a rollout schedule."
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: "Release Timeline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-bold",
					children: "Rollout Schedule"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-6 pl-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-2 left-2 top-2 w-px bg-gradient-to-b from-[oklch(0.7_0.28_328)]/60 via-white/15 to-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-5",
						children: timeline.map((t, i) => {
							const Icon = typeIcon[t.type] ?? Music;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-[1.35rem] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-[oklch(0.7_0.28_328)]/60 bg-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-x-3 gap-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-mono text-xs text-[oklch(0.85_0.25_328)]",
												children: t.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold",
												children: t.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground",
												children: t.type
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: t.channel
									})
								]
							}, i);
						})
					})]
				})
			]
		})
	})] });
}
//#endregion
export { CalendarPage as component };
