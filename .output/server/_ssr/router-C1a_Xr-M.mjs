import { a as __toESM } from "../_runtime.mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as OSProvider, r as RoleProvider, t as CampaignProvider } from "./os-store-v2jdVGrV.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C1a_Xr-M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CXT1ztem.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var MASTER = "FUKmusic";
var LS_KEY = "rippl.unlocked.v1";
function PasswordGate({ children }) {
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	const [value, setValue] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			setUnlocked(window.localStorage.getItem(LS_KEY) === "1");
		} catch {}
		setChecked(true);
	}, []);
	function submit(e) {
		e.preventDefault();
		if (value === MASTER) {
			try {
				window.localStorage.setItem(LS_KEY, "1");
			} catch {}
			setUnlocked(true);
		} else {
			setError(true);
			setValue("");
			setTimeout(() => setError(false), 500);
		}
	}
	if (!checked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-black" });
	if (unlocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative grid min-h-screen place-items-center overflow-hidden bg-black px-4 font-mono",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08] blur-3xl",
			style: { background: "radial-gradient(circle, oklch(0.7 0.06 300) 0%, transparent 65%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
			onSubmit: submit,
			initial: {
				opacity: 0,
				y: 12
			},
			animate: {
				opacity: 1,
				y: 0
			},
			transition: { duration: .5 },
			className: `relative w-full max-w-sm rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm ${error ? "animate-shake" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-[0.4em] text-white/40",
					children: "RIPPL // SYSTEM_LOCKED"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-xl font-bold tracking-tight text-white",
					children: "Enter master key"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					autoFocus: true,
					value,
					onChange: (e) => setValue(e.target.value),
					placeholder: "••••••••",
					className: "mt-6 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-center text-lg tracking-[0.3em] text-white outline-none transition-colors placeholder:text-white/20 focus:border-white/70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 h-4 text-center",
					children: error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs tracking-[0.2em] text-[oklch(0.7_0.22_20)] [text-shadow:0_0_12px_oklch(0.7_0.22_20)]",
						children: "ACCESS DENIED"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "mt-4 w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all hover:border-white/60 hover:bg-white hover:text-black",
					children: "Enter"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-[10px] tracking-wider text-white/25",
					children: "Authorized access only"
				})
			]
		})]
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "RIPPL · 360° Campaign Command" },
			{
				name: "description",
				content: "360° marketing command — paid, organic & creator across every platform, with full-funnel attribution and budget."
			},
			{
				property: "og:title",
				content: "RIPPL · 360° Campaign Command"
			},
			{
				property: "og:description",
				content: "Run the whole funnel — paid, organic, and creator — across every social platform."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OSProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }) })
	});
}
var $$splitComponentImporter$16 = () => import("./vault-Cs0Nt8Fx.mjs");
var Route$16 = createFileRoute("/vault")({
	head: () => ({ meta: [{ title: "The Vault · RIPPL OS" }, {
		name: "description",
		content: "Legal & contract management."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./templates-DDzH2Kjs.mjs");
var Route$15 = createFileRoute("/templates")({
	head: () => ({ meta: [{ title: "Templates · RIPPL" }, {
		name: "description",
		content: "Campaign templates from proven marketing plans."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./techlab-CfgMucA5.mjs");
var Route$14 = createFileRoute("/techlab")({
	head: () => ({ meta: [{ title: "Tech Lab · RIPPL OS" }, {
		name: "description",
		content: "AI & SaaS project ops."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./tasks-DPvWyDMa.mjs");
var Route$13 = createFileRoute("/tasks")({
	head: () => ({ meta: [{ title: "Tasks · RIPPL" }, {
		name: "description",
		content: "Release checklist."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./studio-BDTpNROe.mjs");
var Route$12 = createFileRoute("/studio")({
	head: () => ({ meta: [{ title: "Studio · RIPPL OS" }, {
		name: "description",
		content: "Creative studio & marketing."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./settings-CKoNpjts.mjs");
var Route$11 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Settings · RIPPL OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./roster-CHYqqSzk.mjs");
var Route$10 = createFileRoute("/roster")({
	head: () => ({ meta: [{ title: "Roster · RIPPL OS" }, {
		name: "description",
		content: "A&R and artist management."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./releases-CJolm3dj.mjs");
var Route$9 = createFileRoute("/releases")({
	head: () => ({ meta: [{ title: "Releases · RIPPL OS" }, {
		name: "description",
		content: "Distribution & label operations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./home-CiFskJui.mjs");
var Route$8 = createFileRoute("/home")({
	head: () => ({ meta: [{ title: "Home · RIPPL OS" }, {
		name: "description",
		content: "Your 360 command center."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./dashboard-LZPDpk1i.mjs");
var Route$7 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "RIPPL · 360° Campaign Command" }, {
		name: "description",
		content: "Full-funnel, all-platform, paid + organic marketing command center."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./creators-CiY3m0_t.mjs");
var Route$6 = createFileRoute("/creators")({
	head: () => ({ meta: [{ title: "Creators · RIPPL" }, {
		name: "description",
		content: "Creator roster for your active campaign."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./channels-DfZ2h9BN.mjs");
var Route$5 = createFileRoute("/channels")({
	head: () => ({ meta: [{ title: "Channels · RIPPL" }, {
		name: "description",
		content: "360 channel plan — social, paid, playlists, press, radio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./campaigns-nugE_Hrz.mjs");
var Route$4 = createFileRoute("/campaigns")({
	head: () => ({ meta: [{ title: "Campaigns · RIPPL" }, {
		name: "description",
		content: "All marketing campaigns."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./calendar-DbcRdEMz.mjs");
var Route$3 = createFileRoute("/calendar")({
	head: () => ({ meta: [{ title: "Calendar · RIPPL" }, {
		name: "description",
		content: "Release timeline and rollout."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./budget-C9p1Mi5H.mjs");
var Route$2 = createFileRoute("/budget")({
	head: () => ({ meta: [{ title: "Budget · RIPPL" }, {
		name: "description",
		content: "Campaign budget & spend."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./assets-DsdvDKG5.mjs");
var Route$1 = createFileRoute("/assets")({
	head: () => ({ meta: [{ title: "Assets · RIPPL" }, {
		name: "description",
		content: "Upload and approve campaign assets."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./routes-BP8zzZLu.mjs");
var Route = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "RIPPL · 360° Marketing OS" },
		{
			name: "description",
			content: "The command center for every marketing campaign you run — paid, organic, and creator, across every platform."
		},
		{
			property: "og:title",
			content: "RIPPL · 360° Marketing OS"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var VaultRoute = Route$16.update({
	id: "/vault",
	path: "/vault",
	getParentRoute: () => Route$17
});
var TemplatesRoute = Route$15.update({
	id: "/templates",
	path: "/templates",
	getParentRoute: () => Route$17
});
var TechlabRoute = Route$14.update({
	id: "/techlab",
	path: "/techlab",
	getParentRoute: () => Route$17
});
var TasksRoute = Route$13.update({
	id: "/tasks",
	path: "/tasks",
	getParentRoute: () => Route$17
});
var StudioRoute = Route$12.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$17
});
var SettingsRoute = Route$11.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$17
});
var RosterRoute = Route$10.update({
	id: "/roster",
	path: "/roster",
	getParentRoute: () => Route$17
});
var ReleasesRoute = Route$9.update({
	id: "/releases",
	path: "/releases",
	getParentRoute: () => Route$17
});
var HomeRoute = Route$8.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => Route$17
});
var DashboardRoute = Route$7.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$17
});
var CreatorsRoute = Route$6.update({
	id: "/creators",
	path: "/creators",
	getParentRoute: () => Route$17
});
var ChannelsRoute = Route$5.update({
	id: "/channels",
	path: "/channels",
	getParentRoute: () => Route$17
});
var CampaignsRoute = Route$4.update({
	id: "/campaigns",
	path: "/campaigns",
	getParentRoute: () => Route$17
});
var CalendarRoute = Route$3.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => Route$17
});
var BudgetRoute = Route$2.update({
	id: "/budget",
	path: "/budget",
	getParentRoute: () => Route$17
});
var AssetsRoute = Route$1.update({
	id: "/assets",
	path: "/assets",
	getParentRoute: () => Route$17
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$17
	}),
	AssetsRoute,
	BudgetRoute,
	CalendarRoute,
	CampaignsRoute,
	ChannelsRoute,
	CreatorsRoute,
	DashboardRoute,
	HomeRoute,
	ReleasesRoute,
	RosterRoute,
	SettingsRoute,
	StudioRoute,
	TasksRoute,
	TechlabRoute,
	TemplatesRoute,
	VaultRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
