import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { H as MousePointerClick, Jt as Bookmark, Rt as Clapperboard, Xt as BadgeCheck, g as Timer, it as Instagram, w as Share2 } from "../_libs/lucide-react.mjs";
import { n as fmt, t as PlatformDashboard } from "./PlatformDashboard-3JM4PhXj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard_.instagram-t0c4zb_W.js
var import_jsx_runtime = require_jsx_runtime();
var cfg = {
	name: "Instagram",
	icon: Instagram,
	accent: "oklch(0.75 0.2 350)",
	paidLabel: "Boosted",
	panelTitle: "Reels Performance",
	panelIcon: Clapperboard,
	subtitle: "Reels-led growth — watch time, saves, story swipe-ups and #ad compliance.",
	stats: (r, views) => {
		const compliance = Math.round(82 + r() * 18);
		return [
			{
				icon: Timer,
				label: "Avg watch time",
				value: `${(6 + r() * 16).toFixed(1)}s`,
				hint: "per Reel view"
			},
			{
				icon: Bookmark,
				label: "Saves",
				value: fmt(Math.round(views * (.008 + r() * .02))),
				hint: "strongest ranking signal"
			},
			{
				icon: Share2,
				label: "Shares",
				value: fmt(Math.round(views * (.006 + r() * .015))),
				hint: "DM + story reshares"
			},
			{
				icon: MousePointerClick,
				label: "Story swipe-up rate",
				value: `${(.8 + r() * 2.6).toFixed(1)}%`,
				hint: "link taps / story views"
			},
			{
				icon: BadgeCheck,
				label: "#ad compliance",
				value: `${compliance}%`,
				hint: compliance < 100 ? "some posts missing #ad / #sponsored" : "all sponsored posts labeled"
			}
		];
	}
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformDashboard, { cfg });
//#endregion
export { SplitComponent as component };
