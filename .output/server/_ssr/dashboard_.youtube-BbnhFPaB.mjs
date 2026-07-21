import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Timer, kt as DollarSign, l as UserPlus, t as Youtube, y as SquarePlay } from "../_libs/lucide-react.mjs";
import { n as fmt, t as PlatformDashboard } from "./PlatformDashboard-3JM4PhXj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard_.youtube-BbnhFPaB.js
var import_jsx_runtime = require_jsx_runtime();
var cfg = {
	name: "YouTube",
	icon: Youtube,
	accent: "oklch(0.65 0.24 20)",
	paidLabel: "Paid",
	panelTitle: "Retention & Revenue",
	panelIcon: SquarePlay,
	subtitle: "Watch-through, subscriber conversion and monetization.",
	stats: (r, views) => [
		{
			icon: Timer,
			label: "Avg view duration",
			value: `${Math.floor(1 + r() * 3)}:${String(Math.floor(r() * 60)).padStart(2, "0")}`,
			hint: "biggest drop-off at the first hook"
		},
		{
			icon: SquarePlay,
			label: "Completion rate",
			value: `${Math.round(28 + r() * 40)}%`,
			hint: "viewers reaching the end"
		},
		{
			icon: UserPlus,
			label: "Subscribe conversion",
			value: `${(.3 + r() * 1.4).toFixed(2)}%`,
			hint: "subs gained / campaign views"
		},
		{
			icon: DollarSign,
			label: "Est. revenue",
			value: `$${fmt(Math.round(views * (.9 + r() * 2.4) / 1e3))}`,
			hint: "if monetized (est. RPM)",
			priceGated: true
		}
	]
};
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlatformDashboard, { cfg });
//#endregion
export { SplitComponent as component };
