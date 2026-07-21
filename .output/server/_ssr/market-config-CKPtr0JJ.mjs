import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { t as createServerRpc } from "./createServerRpc-B90ckaqP.mjs";
import processModule from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/market-config-CKPtr0JJ.js
var getMarketConfig_createServerFn_handler = createServerRpc({
	id: "48a985e631eb6d005ad650ce9b2d2eff69b6f0a2b0bca04c6095038326ad6252",
	name: "getMarketConfig",
	filename: "src/lib/market-config.ts"
}, (opts) => getMarketConfig.__executeServer(opts));
var getMarketConfig = createServerFn({ method: "GET" }).handler(getMarketConfig_createServerFn_handler, async () => {
	return {
		chartmetric: Boolean(processModule.env.CHARTMETRIC_API_KEY),
		soundcharts: Boolean(processModule.env.SOUNDCHARTS_API_KEY),
		spotify: Boolean(processModule.env.SPOTIFY_CLIENT_ID && processModule.env.SPOTIFY_CLIENT_SECRET),
		apple: Boolean(processModule.env.APPLE_MUSIC_TOKEN)
	};
});
//#endregion
export { getMarketConfig_createServerFn_handler };
