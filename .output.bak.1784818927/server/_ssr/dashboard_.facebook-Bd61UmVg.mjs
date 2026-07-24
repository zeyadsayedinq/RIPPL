import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Bt as CirclePlay, Et as Facebook, K as Megaphone, a as Users, r as Wallet } from "../_libs/lucide-react.mjs";
import { n as fmt, t as PlatformDashboard } from "./PlatformDashboard-3JM4PhXj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard_.facebook-Bd61UmVg.js
var import_jsx_runtime = require_jsx_runtime();
var cfg = {
	name: "Facebook",
	icon: Facebook,
	accent: "oklch(0.65 0.18 255)",
	paidLabel: "Boosted",
	panelTitle: "Reach & Completion",
	panelIcon: Megaphone,
	subtitle: "Reach vs engagement, boost spend and video completion.",
	stats: (r, views, spent) => [
		{
			icon: Users,
			label: "Organic reach",
			value: `${(2 + r() * 6).toFixed(1)}%`,
			hint: "of page audience — FB organic runs low"
		},
		{
			icon: Megaphone,
			label: "Engagement rate",
			value: `${(1.5 + r() * 4).toFixed(1)}%`,
			hint: "reactions + comments + shares / reach"
		},
		{
			icon: CirclePlay,
			label: "Video completion",
			value: `${Math.round(8 + r() * 22)}%`,
			hint: "FB watches skew short — hook early"
		},
		{
			icon: Wallet,
			label: "Boost spend",
			value: `$${fmt(Math.round(spent * (.2 + r() * .5)))}`,
			hint: "of campaign spend on boosts",
			priceGated: true
		}
	]
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformDashboard, { cfg });
//#endregion
export { SplitComponent as component };
