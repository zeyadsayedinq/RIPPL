import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { F as PenLine, Y as Lock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SharedBadge-l4LKisvK.js
var import_jsx_runtime = require_jsx_runtime();
function SharedBadge({ editable, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		title: editable ? "Assigned by HQ — you have full edit access; changes sync back to HQ." : "Assigned by HQ — view-only. Ask HQ for edit access.",
		className: `inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] uppercase tracking-wider ${editable ? "border-[oklch(0.85_0.25_328)]/40 bg-[oklch(0.85_0.25_328)]/10 text-[oklch(0.85_0.25_328)]" : "border-white/15 bg-white/[0.04] text-muted-foreground"} ${className}`,
		children: [editable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "h-2.5 w-2.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-2.5 w-2.5" }), editable ? "HQ · Edit" : "HQ · View"]
	});
}
//#endregion
export { SharedBadge as t };
