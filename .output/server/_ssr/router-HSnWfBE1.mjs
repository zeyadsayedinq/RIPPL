import { a as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as isSupabaseConfigured, r as supabase } from "./use-auth-DSVhBFKn.mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as OSProvider, t as CampaignProvider } from "./campaign-store-Cd9pjPrz.mjs";
import { t as RoleProvider } from "./role-context-Dr49T2SH.mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-HSnWfBE1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Du1NJlOQ.css";
function reportError(error, context = {}) {
	if (typeof console !== "undefined") console.error("[RIPPL]", context, error);
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
function SupabaseAuthGate({ children }) {
	const [session, setSession] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		if (!supabase) return;
		supabase.auth.getSession().then(({ data }) => setSession(data.session));
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
		return () => sub.subscription.unsubscribe();
	}, []);
	if (session === void 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-black" });
	if (!session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthScreen, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function AuthScreen() {
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [info, setInfo] = (0, import_react.useState)("");
	async function submit(e) {
		e.preventDefault();
		if (!supabase) return;
		setBusy(true);
		setError("");
		setInfo("");
		try {
			if (mode === "in") {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			} else {
				const { data, error } = await supabase.auth.signUp({
					email,
					password
				});
				if (error) throw error;
				if (!data.session) setInfo("Account created. Check your email to confirm, then sign in.");
			}
		} catch (err) {
			setError((err?.message || "Something went wrong").toString());
			setTimeout(() => setError(""), 2500);
		} finally {
			setBusy(false);
		}
	}
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[11px] uppercase tracking-[0.4em] text-white/40",
					children: ["RIPPL // ", mode === "in" ? "ACCESS" : "REGISTER"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 text-xl font-bold tracking-tight text-white",
					children: mode === "in" ? "Sign in" : "Create account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					autoFocus: true,
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value),
					placeholder: "email",
					className: "mt-6 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					required: true,
					value: password,
					onChange: (e) => setPassword(e.target.value),
					placeholder: "password (min 6)",
					className: "mt-4 w-full border-0 border-b border-white/20 bg-transparent px-1 py-2 text-sm tracking-[0.15em] text-white outline-none transition-colors placeholder:text-white/25 focus:border-white/70"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 min-h-4 text-center text-xs",
					children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tracking-[0.15em] text-[oklch(0.7_0.22_20)] [text-shadow:0_0_12px_oklch(0.7_0.22_20)]",
						children: ["ACCESS DENIED — ", error]
					}), info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[oklch(0.82_0.18_150)]",
						children: info
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy,
					className: "mt-4 w-full rounded-lg border border-white/20 bg-white/5 py-2.5 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all hover:border-white/60 hover:bg-white hover:text-black disabled:opacity-50",
					children: busy ? "…" : mode === "in" ? "Enter" : "Register"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setMode(mode === "in" ? "up" : "in");
						setError("");
						setInfo("");
					},
					className: "mt-4 w-full text-center text-[11px] tracking-wider text-white/40 hover:text-white/70",
					children: mode === "in" ? "Need an account? Register" : "Have an account? Sign in"
				})
			]
		})]
	});
}
function AppGate({ children }) {
	if (isSupabaseConfigured) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupabaseAuthGate, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordGate, { children });
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
		reportError(error, { boundary: "root_error_component" });
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
var Route$25 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "RIPPL · My Universe" },
			{
				name: "description",
				content: "Zeyad's universe — every artist, release, deal, contract, campaign and build, in one operating system."
			},
			{
				property: "og:title",
				content: "RIPPL · My Universe"
			},
			{
				property: "og:description",
				content: "More than a dashboard — the operating system for everything Zeyad builds."
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
				href: "/icon.svg",
				type: "image/svg+xml"
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
	const { queryClient } = Route$25.useRouteContext();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: pathname === "/s" || pathname.startsWith("/s/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OSProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampaignProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }) })
	});
}
var $$splitComponentImporter$24 = () => import("./vault-gK1GuOQa.mjs");
var Route$24 = createFileRoute("/vault")({
	head: () => ({ meta: [{ title: "The Vault · RIPPL OS" }, {
		name: "description",
		content: "Legal & contract management."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./templates-Du4AQ4HY.mjs");
var Route$23 = createFileRoute("/templates")({
	head: () => ({ meta: [{ title: "Templates · RIPPL" }, {
		name: "description",
		content: "Customizable campaign templates."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./techlab-B0tOf0F9.mjs");
var Route$22 = createFileRoute("/techlab")({
	head: () => ({ meta: [{ title: "Tech Lab · RIPPL OS" }, {
		name: "description",
		content: "AI & SaaS project ops."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./tasks-CNYMy_w3.mjs");
var Route$21 = createFileRoute("/tasks")({
	head: () => ({ meta: [{ title: "Tasks · RIPPL" }, {
		name: "description",
		content: "Release checklist."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./studio-DHh_FwV9.mjs");
var Route$20 = createFileRoute("/studio")({
	head: () => ({ meta: [{ title: "Studio · RIPPL OS" }, {
		name: "description",
		content: "Creative studio & marketing."
	}] }),
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./settings-BJyc0lQm.mjs");
var Route$19 = createFileRoute("/settings")({
	head: () => ({ meta: [{ title: "Settings · RIPPL OS" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./s-DRx9YdB5.mjs");
var Route$18 = createFileRoute("/s")({
	head: () => ({ meta: [{ title: "Shared track · RIPPL" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./roster-DJIp5eKX.mjs");
var Route$17 = createFileRoute("/roster")({
	head: () => ({ meta: [{ title: "Roster · RIPPL OS" }, {
		name: "description",
		content: "A&R and artist management."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./releases-9UKzzL6R.mjs");
var Route$16 = createFileRoute("/releases")({
	head: () => ({ meta: [{ title: "Releases · RIPPL OS" }, {
		name: "description",
		content: "Distribution & label operations."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./home-DwoSz0dJ.mjs");
var Route$15 = createFileRoute("/home")({
	head: () => ({ meta: [{ title: "Home · RIPPL OS" }, {
		name: "description",
		content: "Your 360 command center."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./dashboard-CPJf624L.mjs");
var Route$14 = createFileRoute("/dashboard")({
	head: () => ({ meta: [{ title: "RIPPL · 360° Campaign Command" }, {
		name: "description",
		content: "Full-funnel, all-platform, paid + organic marketing command center."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./creators-BMQlN91d.mjs");
var Route$13 = createFileRoute("/creators")({
	head: () => ({ meta: [{ title: "Creators · RIPPL" }, {
		name: "description",
		content: "Creator roster for your active campaign."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./channels-Uo3qDtlA.mjs");
var Route$12 = createFileRoute("/channels")({
	head: () => ({ meta: [{ title: "Channels · RIPPL" }, {
		name: "description",
		content: "360 channel plan — social, paid, playlists, press, radio."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./campaigns-CnRm1mlb.mjs");
var Route$11 = createFileRoute("/campaigns")({
	head: () => ({ meta: [{ title: "Campaigns · RIPPL" }, {
		name: "description",
		content: "All marketing campaigns."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./calendar-CBcfw5jl.mjs");
var Route$10 = createFileRoute("/calendar")({
	head: () => ({ meta: [{ title: "Calendar · RIPPL" }, {
		name: "description",
		content: "Release timeline and rollout."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./budget-CI7bJ-W2.mjs");
var Route$9 = createFileRoute("/budget")({
	head: () => ({ meta: [{ title: "Budget · RIPPL" }, {
		name: "description",
		content: "Campaign budget, expenses & payments."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./audio-DUqFUFf7.mjs");
var Route$8 = createFileRoute("/audio")({
	head: () => ({ meta: [{ title: "Audio · RIPPL OS" }, {
		name: "description",
		content: "Masters, demos & mixing."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./assets-brc4mEUb.mjs");
var Route$7 = createFileRoute("/assets")({
	head: () => ({ meta: [{ title: "Assets · RIPPL" }, {
		name: "description",
		content: "Upload and approve campaign assets."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin-MsnpRORA.mjs");
var Route$6 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin · RIPPL HQ" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./routes-SKRG7hEA.mjs");
var Route$5 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "RIPPL · My Universe" }, {
		name: "description",
		content: "Zeyad's universe — more than a dashboard."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./dashboard_.youtube-BbnhFPaB.mjs");
var Route$4 = createFileRoute("/dashboard_/youtube")({
	head: () => ({ meta: [{ title: "YouTube · RIPPL 360" }, {
		name: "description",
		content: "YouTube campaign command."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./dashboard_.x-BH3mvhkD.mjs");
var Route$3 = createFileRoute("/dashboard_/x")({
	head: () => ({ meta: [{ title: "X · RIPPL 360" }, {
		name: "description",
		content: "X campaign command."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./dashboard_.tiktok-CJf-bDo2.mjs");
var Route$2 = createFileRoute("/dashboard_/tiktok")({
	head: () => ({ meta: [{ title: "TikTok · RIPPL 360" }, {
		name: "description",
		content: "TikTok campaign command."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./dashboard_.instagram-t0c4zb_W.mjs");
var Route$1 = createFileRoute("/dashboard_/instagram")({
	head: () => ({ meta: [{ title: "Instagram · RIPPL 360" }, {
		name: "description",
		content: "Instagram campaign command."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./dashboard_.facebook-Bd61UmVg.mjs");
var Route = createFileRoute("/dashboard_/facebook")({
	head: () => ({ meta: [{ title: "Facebook · RIPPL 360" }, {
		name: "description",
		content: "Facebook campaign command."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var VaultRoute = Route$24.update({
	id: "/vault",
	path: "/vault",
	getParentRoute: () => Route$25
});
var TemplatesRoute = Route$23.update({
	id: "/templates",
	path: "/templates",
	getParentRoute: () => Route$25
});
var TechlabRoute = Route$22.update({
	id: "/techlab",
	path: "/techlab",
	getParentRoute: () => Route$25
});
var TasksRoute = Route$21.update({
	id: "/tasks",
	path: "/tasks",
	getParentRoute: () => Route$25
});
var StudioRoute = Route$20.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$25
});
var SettingsRoute = Route$19.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$25
});
var SRoute = Route$18.update({
	id: "/s",
	path: "/s",
	getParentRoute: () => Route$25
});
var RosterRoute = Route$17.update({
	id: "/roster",
	path: "/roster",
	getParentRoute: () => Route$25
});
var ReleasesRoute = Route$16.update({
	id: "/releases",
	path: "/releases",
	getParentRoute: () => Route$25
});
var HomeRoute = Route$15.update({
	id: "/home",
	path: "/home",
	getParentRoute: () => Route$25
});
var DashboardRoute = Route$14.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$25
});
var CreatorsRoute = Route$13.update({
	id: "/creators",
	path: "/creators",
	getParentRoute: () => Route$25
});
var ChannelsRoute = Route$12.update({
	id: "/channels",
	path: "/channels",
	getParentRoute: () => Route$25
});
var CampaignsRoute = Route$11.update({
	id: "/campaigns",
	path: "/campaigns",
	getParentRoute: () => Route$25
});
var CalendarRoute = Route$10.update({
	id: "/calendar",
	path: "/calendar",
	getParentRoute: () => Route$25
});
var BudgetRoute = Route$9.update({
	id: "/budget",
	path: "/budget",
	getParentRoute: () => Route$25
});
var AudioRoute = Route$8.update({
	id: "/audio",
	path: "/audio",
	getParentRoute: () => Route$25
});
var AssetsRoute = Route$7.update({
	id: "/assets",
	path: "/assets",
	getParentRoute: () => Route$25
});
var AdminRoute = Route$6.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$25
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$25
});
var DashboardYoutubeRoute = Route$4.update({
	id: "/dashboard_/youtube",
	path: "/dashboard/youtube",
	getParentRoute: () => Route$25
});
var DashboardXRoute = Route$3.update({
	id: "/dashboard_/x",
	path: "/dashboard/x",
	getParentRoute: () => Route$25
});
var DashboardTiktokRoute = Route$2.update({
	id: "/dashboard_/tiktok",
	path: "/dashboard/tiktok",
	getParentRoute: () => Route$25
});
var DashboardInstagramRoute = Route$1.update({
	id: "/dashboard_/instagram",
	path: "/dashboard/instagram",
	getParentRoute: () => Route$25
});
var rootRouteChildren = {
	IndexRoute,
	AdminRoute,
	AssetsRoute,
	AudioRoute,
	BudgetRoute,
	CalendarRoute,
	CampaignsRoute,
	ChannelsRoute,
	CreatorsRoute,
	DashboardRoute,
	HomeRoute,
	ReleasesRoute,
	RosterRoute,
	SRoute,
	SettingsRoute,
	StudioRoute,
	TasksRoute,
	TechlabRoute,
	TemplatesRoute,
	VaultRoute,
	DashboardFacebookRoute: Route.update({
		id: "/dashboard_/facebook",
		path: "/dashboard/facebook",
		getParentRoute: () => Route$25
	}),
	DashboardInstagramRoute,
	DashboardTiktokRoute,
	DashboardXRoute,
	DashboardYoutubeRoute
};
var routeTree = Route$25._addFileChildren(rootRouteChildren)._addFileTypes();
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
