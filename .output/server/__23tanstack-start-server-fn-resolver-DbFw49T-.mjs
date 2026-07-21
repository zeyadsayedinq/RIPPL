//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DbFw49T-.js
var manifest = {
	"48a985e631eb6d005ad650ce9b2d2eff69b6f0a2b0bca04c6095038326ad6252": {
		functionName: "getMarketConfig_createServerFn_handler",
		importer: () => import("./_ssr/market-config-CKPtr0JJ.mjs")
	},
	"69d8a6459159597f67f54d4d75a31d20aa5a2a3a8dd731d59bb2fb28b8cbfee8": {
		functionName: "pushSharedEdit_createServerFn_handler",
		importer: () => import("./_ssr/shared-workspace-DFnYgHII.mjs")
	},
	"d58727adc976987b495381b707050a8049015e3f79c6e2f09e66ba0f493ae302": {
		functionName: "inviteMember_createServerFn_handler",
		importer: () => import("./_ssr/invite-member-C06VnuJg.mjs")
	},
	"df352238fe418ddfe526686cf9806c859301099b6781bc93090f71b60254473c": {
		functionName: "fetchShared_createServerFn_handler",
		importer: () => import("./_ssr/shared-workspace-DFnYgHII.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
