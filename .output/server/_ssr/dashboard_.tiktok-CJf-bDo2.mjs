import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { B as Music4, Qt as ArrowUpRight, i as Video, j as Radio, p as TrendingUp } from "../_libs/lucide-react.mjs";
import { n as fmt, t as PlatformDashboard } from "./PlatformDashboard-3JM4PhXj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard_.tiktok-CJf-bDo2.js
var import_jsx_runtime = require_jsx_runtime();
var cfg = {
	name: "TikTok",
	icon: Music4,
	accent: "oklch(0.72 0.2 200)",
	paidLabel: "Spark Ads",
	panelTitle: "Sound Performance",
	panelIcon: Radio,
	subtitle: "Sound-first campaign intelligence — creations, velocity and Spark Ads.",
	stats: (r, views) => [
		{
			icon: Video,
			label: "Creations with sound",
			value: fmt(Math.round(800 + r() * 8200)),
			hint: "videos using the campaign audio"
		},
		{
			icon: TrendingUp,
			label: "Sound velocity",
			value: `${Math.round(4 + r() * 90)}/hr`,
			hint: "new creations per hour"
		},
		{
			icon: ArrowUpRight,
			label: "Auditory reach",
			value: fmt(Math.round(views * (1.6 + r() * .9))),
			hint: "unique listeners (est.)"
		}
	]
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformDashboard, { cfg });
//#endregion
export { SplitComponent as component };
