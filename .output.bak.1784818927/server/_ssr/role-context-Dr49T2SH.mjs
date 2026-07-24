import { a as __toESM } from "../_runtime.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/role-context-Dr49T2SH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
var LS_ROLE = "rippl.viewRole.v1";
var ROLES = [
	"Marketing Manager",
	"Team Member",
	"Client"
];
function RoleProvider({ children }) {
	const [role, setRole] = (0, import_react.useState)("Marketing Manager");
	(0, import_react.useEffect)(() => {
		try {
			const saved = window.localStorage.getItem(LS_ROLE);
			if (saved && ROLES.includes(saved)) setRole(saved);
		} catch {}
	}, []);
	function setAndSave(r) {
		setRole(r);
		try {
			window.localStorage.setItem(LS_ROLE, r);
		} catch {}
	}
	const canSeePrice = role === "Marketing Manager";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			role,
			setRole: setAndSave,
			canSeePrice
		},
		children
	});
}
function useRole() {
	const c = (0, import_react.useContext)(Ctx);
	if (!c) throw new Error("useRole outside provider");
	return c;
}
//#endregion
export { useRole as n, RoleProvider as t };
