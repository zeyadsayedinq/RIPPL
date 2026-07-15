import { a as __toESM } from "../_runtime.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Sparkles } from "../_libs/lucide-react.mjs";
import { i as NewCampaignModal, n as MagneticButton } from "./AppShell-4w594Yhh.mjs";
import { t as SpotlightCard } from "./SpotlightCard-MNBHk4uP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/EmptyState-DpKuDbDt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EmptyState({ title, note, showCreate = true }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
		className: "mt-6 p-12 text-center",
		spotlight: false,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[oklch(0.7_0.28_328)]/15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-6 w-6 text-[oklch(0.8_0.25_328)]" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 font-display text-2xl font-bold",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: note
				}),
				showCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
						onClick: () => setOpen(true),
						children: "+ New campaign"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewCampaignModal, { onClose: () => setOpen(false) }) })]
	});
}
//#endregion
export { EmptyState as t };
