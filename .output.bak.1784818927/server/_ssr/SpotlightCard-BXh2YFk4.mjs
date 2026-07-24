import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { i as motion, n as useTransform, r as useMotionValue } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SpotlightCard-BXh2YFk4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SpotlightCard({ children, className = "", spotlight = true }) {
	const ref = (0, import_react.useRef)(null);
	const mx = useMotionValue(-200);
	const my = useMotionValue(-200);
	const bg = useTransform([mx, my], ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.05), transparent 60%)`);
	function onMove(e) {
		if (!ref.current) return;
		const r = ref.current.getBoundingClientRect();
		mx.set(e.clientX - r.left);
		my.set(e.clientY - r.top);
	}
	function onLeave() {
		mx.set(-200);
		my.set(-200);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		onMouseMove: onMove,
		onMouseLeave: onLeave,
		className: `group glass relative overflow-hidden rounded-2xl ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
				style: {
					padding: "1px",
					background: "linear-gradient(135deg, #FF3D77, #7DD3FC, #4361EE)",
					WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
					WebkitMaskComposite: "xor",
					maskComposite: "exclude"
				}
			}),
			spotlight && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				className: "pointer-events-none absolute inset-0 z-0",
				style: { background: bg }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10",
				children
			})
		]
	});
}
//#endregion
export { SpotlightCard as t };
