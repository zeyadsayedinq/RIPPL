globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/icon-dark-32x32.png": {
		"type": "image/png",
		"etag": "\"249-Eje7mf5IYnUOzvWahZHzVZgkxwI\"",
		"mtime": "2026-07-15T13:59:06.254Z",
		"size": 585,
		"path": "../public/icon-dark-32x32.png"
	},
	"/icon-light-32x32.png": {
		"type": "image/png",
		"etag": "\"236-1LCyzDLVe8SSrsZvG9eS1rhTvHw\"",
		"mtime": "2026-07-15T13:59:06.254Z",
		"size": 566,
		"path": "../public/icon-light-32x32.png"
	},
	"/apple-icon.png": {
		"type": "image/png",
		"etag": "\"a42-o953JxvIavDjStfvW8JRF7vWLk4\"",
		"mtime": "2026-07-15T13:59:06.254Z",
		"size": 2626,
		"path": "../public/apple-icon.png"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-15T13:59:06.255Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/placeholder-logo.png": {
		"type": "image/png",
		"etag": "\"238-pS23KseK6wWmMHqaT+IrH57MhUI\"",
		"mtime": "2026-07-15T13:59:06.255Z",
		"size": 568,
		"path": "../public/placeholder-logo.png"
	},
	"/placeholder-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"c88-Vv8IA2xgjEZAiN2dErxBClzvxAM\"",
		"mtime": "2026-07-15T13:59:06.255Z",
		"size": 3208,
		"path": "../public/placeholder-logo.svg"
	},
	"/placeholder-user.jpg": {
		"type": "image/jpeg",
		"etag": "\"663-C3c0t/BkPcGmoKQMFVHBP6o+6fQ\"",
		"mtime": "2026-07-15T13:59:06.255Z",
		"size": 1635,
		"path": "../public/placeholder-user.jpg"
	},
	"/placeholder.svg": {
		"type": "image/svg+xml",
		"etag": "\"cb5-3cfZ/x0uNhX4kurZGAkOBE4K/G0\"",
		"mtime": "2026-07-15T13:59:06.256Z",
		"size": 3253,
		"path": "../public/placeholder.svg"
	},
	"/icon.svg": {
		"type": "image/svg+xml",
		"etag": "\"518-9M+7JU4r6V/KOpL+LPj+dv/tp9E\"",
		"mtime": "2026-07-15T13:59:06.255Z",
		"size": 1304,
		"path": "../public/icon.svg"
	},
	"/placeholder.jpg": {
		"type": "image/jpeg",
		"etag": "\"428-IKS5JfbV4RoTBDDc/wuWqgR2Qhw\"",
		"mtime": "2026-07-15T13:59:06.256Z",
		"size": 1064,
		"path": "../public/placeholder.jpg"
	},
	"/assets/SpotlightCard-BmRJ2Z_z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"323-W5tnPVLKU7xJ92hPp+FwE6Y48bI\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 803,
		"path": "../public/assets/SpotlightCard-BmRJ2Z_z.js"
	},
	"/assets/EmptyState-Ccvuy1LM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3cf-+g6d1cPSSa0GaG9D2TDwamkQvo8\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 975,
		"path": "../public/assets/EmptyState-Ccvuy1LM.js"
	},
	"/assets/budget-DUwAlNki.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"129d-+VaREftQ1cnVV1mcb50LaPSoEHI\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 4765,
		"path": "../public/assets/budget-DUwAlNki.js"
	},
	"/assets/calendar-clock-BR-qXPit.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16f-i16OK8nzWYrLiZY3epKN1ICAJ2c\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 367,
		"path": "../public/assets/calendar-clock-BR-qXPit.js"
	},
	"/assets/assets-DMh-NV0p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1851-8KJwECi3xLRJxplw6arhi8SYmt8\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 6225,
		"path": "../public/assets/assets-DMh-NV0p.js"
	},
	"/assets/campaigns-DZKY5Ego.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110f-Q0rR8604IkU2O1ZT7BfL5xV/BS8\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 4367,
		"path": "../public/assets/campaigns-DZKY5Ego.js"
	},
	"/assets/channels-BmrZCxSG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b72-oA2GiIk5MER2py53DGd72UU2H/U\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 7026,
		"path": "../public/assets/channels-BmrZCxSG.js"
	},
	"/assets/AppShell-07kABeWx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b69-NIaQI52W5Q2OSNYvh2xFqpoHvkk\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 39785,
		"path": "../public/assets/AppShell-07kABeWx.js"
	},
	"/assets/calendar-Dba618ar.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c71-rG0lXBpz2VydQhnO8BCcBSaHU3M\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 3185,
		"path": "../public/assets/calendar-Dba618ar.js"
	},
	"/assets/copy-DPnvuB3B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-YiK3M0BzlCTKYPdJ0otPjxfDqaU\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 225,
		"path": "../public/assets/copy-DPnvuB3B.js"
	},
	"/assets/dollar-sign-B-H2QsQQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-xzdS5yHwKOzeOqUa5GGcpOJTfGM\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 208,
		"path": "../public/assets/dollar-sign-B-H2QsQQ.js"
	},
	"/assets/creators-DnUxCxWH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cd8-+rkgs9plfxHxrc5JJRSLXzKcbeI\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 11480,
		"path": "../public/assets/creators-DnUxCxWH.js"
	},
	"/assets/clock--u-WqNtF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9e-S7nuDum//DPytOaDoHlimjOGZwQ\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 158,
		"path": "../public/assets/clock--u-WqNtF.js"
	},
	"/assets/dashboard-Dd8Lp1Yp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e48f-lNtxh9QDU4HAxH0owJCFSkkw3Vs\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 58511,
		"path": "../public/assets/dashboard-Dd8Lp1Yp.js"
	},
	"/assets/BarChart-Bh2mHKXQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59faf-GjanD1iz7Ip0STZHDlQINuAqlTg\"",
		"mtime": "2026-07-15T13:59:05.852Z",
		"size": 368559,
		"path": "../public/assets/BarChart-Bh2mHKXQ.js"
	},
	"/assets/image-De8HydBO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-u823ePljzhlkKQirrm2eAyF38eg\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 258,
		"path": "../public/assets/image-De8HydBO.js"
	},
	"/assets/instagram-CTtsy03B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11d-0N9Fqb6Gea3rscV996rKIWFA324\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 285,
		"path": "../public/assets/instagram-CTtsy03B.js"
	},
	"/assets/layout-grid-CiE4GaA1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f-TRebAOkIiZWDeFYjhQcRLYATDvU\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 335,
		"path": "../public/assets/layout-grid-CiE4GaA1.js"
	},
	"/assets/mock-data-Bi8Dfp4c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1acc-QiQHencxZd7ta7S3h+b1Z3fyqqU\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 6860,
		"path": "../public/assets/mock-data-Bi8Dfp4c.js"
	},
	"/assets/music-B4HIMmUH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d0-O4kw8O+8ZbS12/ENwJ0He/wk3F4\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 208,
		"path": "../public/assets/music-B4HIMmUH.js"
	},
	"/assets/releases-Bd_IbcF4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23c3-80dRRh2QI7wazCFbQeErfYCWiFg\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 9155,
		"path": "../public/assets/releases-Bd_IbcF4.js"
	},
	"/assets/roster-DKsMyQIg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e45-DX8dkpYeddtK5Ea6ItaJ0DKOmQM\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 11845,
		"path": "../public/assets/roster-DKsMyQIg.js"
	},
	"/assets/routes-qg97RTFi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"424e-ub92IiXk6xLxWjQ7wPT/cdZMDWI\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 16974,
		"path": "../public/assets/routes-qg97RTFi.js"
	},
	"/assets/settings-DRfeb3di.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32b78-3BBU97tkylRTFyGNBbzqz0VrQQ8\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 207736,
		"path": "../public/assets/settings-DRfeb3di.js"
	},
	"/assets/sparkles-_l2euST5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e3-zR0QDKJ44LUfqzWHFEs8TatrXmw\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 483,
		"path": "../public/assets/sparkles-_l2euST5.js"
	},
	"/assets/studio-BSzKSjnZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2438-FcibikQHaqqyrbZiP9wWUlcG2Gg\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 9272,
		"path": "../public/assets/studio-BSzKSjnZ.js"
	},
	"/assets/index-BMcnfVsg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"783a4-gj0epTPZRVLDCiWISSUI/XE4cqc\"",
		"mtime": "2026-07-15T13:59:05.851Z",
		"size": 492452,
		"path": "../public/assets/index-BMcnfVsg.js"
	},
	"/assets/tasks-CUjH0UvD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bed-RgIZDKNcEZBvDGfEjWTLvq/eeIM\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 3053,
		"path": "../public/assets/tasks-CUjH0UvD.js"
	},
	"/assets/techlab-3WBVo99r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12b6-LnxFZ9AuM33GbQu3nYtXTxlODE4\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 4790,
		"path": "../public/assets/techlab-3WBVo99r.js"
	},
	"/assets/templates-0EHkM5Vc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f4e-uepLXYypoAPkq96+rQSksktmoto\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 3918,
		"path": "../public/assets/templates-0EHkM5Vc.js"
	},
	"/assets/trash-2-YU4tSJWc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13d-ICrk5a4sbm1lpZL75lyIgvsmzx4\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 317,
		"path": "../public/assets/trash-2-YU4tSJWc.js"
	},
	"/assets/trending-up-BQuvLtR0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a4-MsaeUpbStFY/WA+DTrOKe1QgN0I\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 164,
		"path": "../public/assets/trending-up-BQuvLtR0.js"
	},
	"/assets/upload-0-_oPCm1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-T9u5JwjgFVVZaKAoc+n7KUhRw1A\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 219,
		"path": "../public/assets/upload-0-_oPCm1.js"
	},
	"/assets/styles-CXT1ztem.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"195a2-93bwuYWXd3sR1k01I5A7k/yRZRE\"",
		"mtime": "2026-07-15T13:59:05.855Z",
		"size": 103842,
		"path": "../public/assets/styles-CXT1ztem.css"
	},
	"/assets/vault-BA_YidoA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1176-gY0M6qAbCZ2rZk88oRNyiA0zskc\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 4470,
		"path": "../public/assets/vault-BA_YidoA.js"
	},
	"/assets/x-Cmp3DCkN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-aIRfuyezLeh1t0PT6sLkfTFAnxo\"",
		"mtime": "2026-07-15T13:59:05.855Z",
		"size": 143,
		"path": "../public/assets/x-Cmp3DCkN.js"
	},
	"/assets/users-BJ_hPj5w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7bd-bPdAson9JBRYHfutxc6uXUbiCC8\"",
		"mtime": "2026-07-15T13:59:05.854Z",
		"size": 1981,
		"path": "../public/assets/users-BJ_hPj5w.js"
	},
	"/assets/home-B-zrLxcw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1777-tgFTIIukgMT1tv4mMKKuKNTBU5o\"",
		"mtime": "2026-07-15T13:59:05.853Z",
		"size": 6007,
		"path": "../public/assets/home-B-zrLxcw.js"
	},
	"/assets/youtube-sWjh1MC5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f9-TqlODZbLq+4tV+NBxHdFN70zTSY\"",
		"mtime": "2026-07-15T13:59:05.855Z",
		"size": 1017,
		"path": "../public/assets/youtube-sWjh1MC5.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_wkijEK = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_wkijEK
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
