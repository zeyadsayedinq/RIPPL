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
		"mtime": "2026-07-12T16:10:42.644Z",
		"size": 585,
		"path": "../public/icon-dark-32x32.png"
	},
	"/icon.svg": {
		"type": "image/svg+xml",
		"etag": "\"518-9M+7JU4r6V/KOpL+LPj+dv/tp9E\"",
		"mtime": "2026-07-12T16:10:42.648Z",
		"size": 1304,
		"path": "../public/icon.svg"
	},
	"/placeholder-logo.png": {
		"type": "image/png",
		"etag": "\"238-pS23KseK6wWmMHqaT+IrH57MhUI\"",
		"mtime": "2026-07-12T16:10:42.648Z",
		"size": 568,
		"path": "../public/placeholder-logo.png"
	},
	"/placeholder-logo.svg": {
		"type": "image/svg+xml",
		"etag": "\"c88-Vv8IA2xgjEZAiN2dErxBClzvxAM\"",
		"mtime": "2026-07-12T16:10:42.648Z",
		"size": 3208,
		"path": "../public/placeholder-logo.svg"
	},
	"/placeholder-user.jpg": {
		"type": "image/jpeg",
		"etag": "\"663-C3c0t/BkPcGmoKQMFVHBP6o+6fQ\"",
		"mtime": "2026-07-12T16:10:42.648Z",
		"size": 1635,
		"path": "../public/placeholder-user.jpg"
	},
	"/placeholder.jpg": {
		"type": "image/jpeg",
		"etag": "\"428-IKS5JfbV4RoTBDDc/wuWqgR2Qhw\"",
		"mtime": "2026-07-12T16:10:42.648Z",
		"size": 1064,
		"path": "../public/placeholder.jpg"
	},
	"/placeholder.svg": {
		"type": "image/svg+xml",
		"etag": "\"cb5-3cfZ/x0uNhX4kurZGAkOBE4K/G0\"",
		"mtime": "2026-07-12T16:10:42.648Z",
		"size": 3253,
		"path": "../public/placeholder.svg"
	},
	"/assets/AnimatePresence-DRLuxx8w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104d-OmwoYXSzQ72SgjEgxoTBm87Rzkg\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 4173,
		"path": "../public/assets/AnimatePresence-DRLuxx8w.js"
	},
	"/assets/assets-DB2vJIMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18e6-O7besQKqxsn3pi0e9nA5y6LL/0A\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 6374,
		"path": "../public/assets/assets-DB2vJIMT.js"
	},
	"/assets/clock-CioG3DmQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-TvUicCCCJLjDOBxXeZDgovd1zRI\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 162,
		"path": "../public/assets/clock-CioG3DmQ.js"
	},
	"/assets/creators-CFLm4xYf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282a-gSx6OOyTNnylbSlIiFVm1ozghBY\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 10282,
		"path": "../public/assets/creators-CFLm4xYf.js"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-12T16:10:42.644Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/mock-data-EtkQyNMQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22547-OIoJIpv07weGp22CkaJEEoLvM6w\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 140615,
		"path": "../public/assets/mock-data-EtkQyNMQ.js"
	},
	"/assets/index-DyQeYenr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54752-mkKjep/ipZMX2pd2eQ94B3+SZHA\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 345938,
		"path": "../public/assets/index-DyQeYenr.js"
	},
	"/assets/styles-sNBNkeci.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14a20-Lv+vD84b8jMLByZjy1ryzEae8gw\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 84512,
		"path": "../public/assets/styles-sNBNkeci.css"
	},
	"/assets/trending-up-DArqnbdB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"206-ovlWz5AYhXCTwwTaAwkeYiiMtbI\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 518,
		"path": "../public/assets/trending-up-DArqnbdB.js"
	},
	"/assets/routes-ttFJtTA8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64428-7/1k4ryMtYonjmlSKOVUWpzKMFY\"",
		"mtime": "2026-07-12T16:10:38.692Z",
		"size": 410664,
		"path": "../public/assets/routes-ttFJtTA8.js"
	},
	"/icon-light-32x32.png": {
		"type": "image/png",
		"etag": "\"236-1LCyzDLVe8SSrsZvG9eS1rhTvHw\"",
		"mtime": "2026-07-12T16:10:42.648Z",
		"size": 566,
		"path": "../public/icon-light-32x32.png"
	},
	"/apple-icon.png": {
		"type": "image/png",
		"etag": "\"a42-o953JxvIavDjStfvW8JRF7vWLk4\"",
		"mtime": "2026-07-12T16:10:42.644Z",
		"size": 2626,
		"path": "../public/apple-icon.png"
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
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_dotenv@17.4.2_jiti@2.7.0_vite@8.1.4_@types+node@22.20.1_jiti@2.7.0_/node_modules/nitro/dist/runtime/internal/route-rules.mjs
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
var _lazy_EkDkde = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_EkDkde
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
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_dotenv@17.4.2_jiti@2.7.0_vite@8.1.4_@types+node@22.20.1_jiti@2.7.0_/node_modules/nitro/dist/runtime/internal/error/prod.mjs
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
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_dotenv@17.4.2_jiti@2.7.0_vite@8.1.4_@types+node@22.20.1_jiti@2.7.0_/node_modules/nitro/dist/runtime/internal/app.mjs
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
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_dotenv@17.4.2_jiti@2.7.0_vite@8.1.4_@types+node@22.20.1_jiti@2.7.0_/node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
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
//#region node_modules/.pnpm/nitro@3.0.260603-beta_chokidar@5.0.0_dotenv@17.4.2_jiti@2.7.0_vite@8.1.4_@types+node@22.20.1_jiti@2.7.0_/node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
