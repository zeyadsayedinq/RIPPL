import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Dt as Eye, W as MessagesSquare, d as Twitter, ut as Hash } from "../_libs/lucide-react.mjs";
import { n as fmt, t as PlatformDashboard } from "./PlatformDashboard-3JM4PhXj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard_.x-BH3mvhkD.js
var import_jsx_runtime = require_jsx_runtime();
var HASHTAGS = [
	"#NewMusic",
	"#RIPPL",
	"#NowPlaying",
	"#Viral",
	"#FYP"
];
var cfg = {
	name: "X",
	icon: Twitter,
	accent: "oklch(0.85 0.02 260)",
	paidLabel: "Promoted",
	panelTitle: "Impressions & Threads",
	panelIcon: MessagesSquare,
	subtitle: "Impressions, thread performance and hashtag momentum.",
	stats: (r, views) => [
		{
			icon: Eye,
			label: "Impressions",
			value: fmt(Math.round(views * (1.2 + r() * 1.5))),
			hint: "timeline + search + profile"
		},
		{
			icon: MessagesSquare,
			label: "Thread performance",
			value: `${(1 + r() * 5).toFixed(1)}%`,
			hint: "engagement on creator threads"
		},
		{
			icon: Hash,
			label: "Trending hashtag",
			value: HASHTAGS[Math.floor(r() * HASHTAGS.length)],
			hint: `peaked #${Math.ceil(r() * 30)} in Music`
		}
	]
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformDashboard, { cfg });
//#endregion
export { SplitComponent as component };
