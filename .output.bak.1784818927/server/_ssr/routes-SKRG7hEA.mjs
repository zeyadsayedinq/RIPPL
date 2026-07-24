import { a as __toESM } from "../_runtime.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { d as useCampaigns, f as useOS } from "./campaign-store-Cd9pjPrz.mjs";
import { i as motion } from "../_libs/framer-motion.mjs";
import { $t as ArrowRight, At as Disc3, K as Megaphone, L as Palette, Mt as Cpu, a as Users, gt as FolderLock } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-SKRG7hEA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FeatureCard({ title, description, icon, gradient, to, count, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 30
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: .8,
			ease: "easeOut",
			delay
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			className: "relative mx-auto flex w-full max-w-[300px] flex-col items-start justify-start group",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute h-[260px] w-full rounded-[40px] opacity-50 transition-opacity duration-500 group-hover:opacity-90 md:h-[280px]",
				style: {
					background: gradient,
					filter: "blur(45px)"
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 h-[260px] w-full self-stretch overflow-hidden rounded-[40px] transition-transform duration-300 group-hover:-translate-y-1 md:h-[280px]",
				style: {
					border: "8px solid transparent",
					background: `linear-gradient(#1A1A1C, #1A1A1C) padding-box, ${gradient} border-box`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-full w-full flex-col justify-between p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-white/90",
							children: icon
						}), count != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-sm text-white/50",
							children: count
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-xl font-medium tracking-tight text-white",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[14px] font-normal leading-[1.6] text-gray-400 selection:bg-white/20",
						children: description
					})] })]
				})
			})]
		})
	});
}
var SCENES = [
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4",
		label: "Command"
	},
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4",
		label: "Network"
	},
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4",
		label: "Studio"
	},
	{
		url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4",
		label: "Night Ops"
	}
];
function Universe() {
	const os = useOS();
	const { campaigns } = useCampaigns();
	const [scene, setScene] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setScene((s) => (s + 1) % SCENES.length), 8e3);
		return () => clearInterval(id);
	}, []);
	const switchScene = (0, import_react.useCallback)((i) => setScene(i), []);
	const activeDeals = os.deals.filter((d) => d.status !== "Paid").length;
	const stats = [
		{
			label: "Artists",
			value: os.artists.length
		},
		{
			label: "Releases",
			value: os.releases.length
		},
		{
			label: "Deals",
			value: activeDeals
		},
		{
			label: "Campaigns",
			value: campaigns.length
		},
		{
			label: "Contracts",
			value: os.contracts.length
		},
		{
			label: "Builds",
			value: os.projects.length
		}
	];
	const modules = [
		{
			to: "/roster",
			label: "Roster",
			desc: "A&R, scouting & artist management.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
				size: 32,
				strokeWidth: 2.5
			}),
			count: os.artists.length,
			gradient: "linear-gradient(137deg, #FF3D77 0%, #FFB1CE 45%, #FF9D3C 100%)",
			delay: .1
		},
		{
			to: "/releases",
			label: "Releases",
			desc: "Distribution & label operations.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disc3, {
				size: 32,
				strokeWidth: 2.5
			}),
			count: os.releases.length,
			gradient: "linear-gradient(137deg, #FFFFFF 0%, #7DD3FC 45%, #06B6D4 100%)",
			delay: .15
		},
		{
			to: "/vault",
			label: "The Vault",
			desc: "Contracts, splits & legal.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderLock, {
				size: 32,
				strokeWidth: 2.5
			}),
			count: os.contracts.length,
			gradient: "linear-gradient(137deg, #4361EE 0%, #E0AEFF 45%, #F72585 100%)",
			delay: .2
		},
		{
			to: "/studio",
			label: "Studio",
			desc: "Creative, moodboards & copy.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
				size: 32,
				strokeWidth: 2.5
			}),
			count: os.notes.length,
			gradient: "linear-gradient(137deg, #06B6D4 0%, #A5F3FC 45%, #FFFFFF 100%)",
			delay: .25
		},
		{
			to: "/techlab",
			label: "Tech Lab",
			desc: "SaaS builds & AI prompts.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, {
				size: 32,
				strokeWidth: 2.5
			}),
			count: os.projects.length + os.prompts.length,
			gradient: "linear-gradient(137deg, #F72585 0%, #E0AEFF 45%, #4361EE 100%)",
			delay: .3
		},
		{
			to: "/dashboard",
			label: "Marketing",
			desc: "360 campaigns, every platform.",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {
				size: 32,
				strokeWidth: 2.5
			}),
			count: campaigns.length,
			gradient: "linear-gradient(137deg, #FF9D3C 0%, #FFB1CE 45%, #FF3D77 100%)",
			delay: .35
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative w-full bg-black font-display",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-[100] overflow-hidden bg-black text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "footer-dots",
					"aria-hidden": "true",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "footer-dots__line" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-[min(100%-48px,1820px)] pb-8 pt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 gap-10 md:grid-cols-[1.25fr_repeat(3,0.42fr)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "max-w-[680px] text-4xl font-light leading-[1.06] tracking-tight md:col-auto",
									style: {
										fontSize: "clamp(28px,3.2vw,54px)",
										fontWeight: 300
									},
									children: "Everything I build, in one universe."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterNav, { links: [
									["Home", "/home"],
									["Roster", "/roster"],
									["Releases", "/releases"],
									["The Vault", "/vault"],
									["Studio", "/studio"]
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterNav, { links: [
									["Tech Lab", "/techlab"],
									["Audio", "/audio"],
									["Marketing", "/dashboard"],
									["Campaigns", "/campaigns"]
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterNav, { links: [["Settings", "/settings"]] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/home",
								className: "flex w-full items-center gap-4 text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "footer-wordmark block flex-1",
									children: "RIPPL"
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] text-white/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 RIPPL. All rights reserved. Built by Zeyad Sayedin." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "This is my universe." })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-[#0A0A0B] px-6 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-[936px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-[0.35em] text-white/40",
							children: "The whole universe"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-3xl font-bold text-white",
							children: "Everything, in one place"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-3",
							children: modules.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureCard, {
								to: m.to,
								title: m.label,
								description: m.desc,
								icon: m.icon,
								gradient: m.gradient,
								count: m.count,
								delay: m.delay
							}, m.to))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative h-screen overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 z-0",
						children: SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: s.url,
							autoPlay: true,
							muted: true,
							loop: true,
							playsInline: true,
							className: "absolute inset-0 h-full w-full object-cover",
							style: {
								opacity: i === scene ? 1 : 0,
								filter: "brightness(0.4) saturate(1.05) contrast(1.05)",
								transition: "opacity 1000ms ease-in-out"
							}
						}, s.url))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-0 bg-black/45" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/95" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 z-20 mx-auto flex max-w-6xl flex-col px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "flex items-center justify-between py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
										width: "20",
										height: "20",
										viewBox: "0 0 22 22",
										fill: "none",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "2.5",
												cy: "19.5",
												r: "2",
												fill: "white"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 2.5 13.5 A 7 7 0 0 1 9.5 19.5",
												stroke: "white",
												strokeWidth: "2",
												strokeLinecap: "round"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 2.5 8 A 12.5 12.5 0 0 1 15 19.5",
												stroke: "white",
												strokeWidth: "1.8",
												strokeLinecap: "round",
												opacity: "0.65"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M 2.5 2 A 18.5 18.5 0 0 1 21 19.5",
												stroke: "white",
												strokeWidth: "1.5",
												strokeLinecap: "round",
												opacity: "0.35"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold tracking-[0.2em] text-white",
									children: "RIPPL"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/home",
								className: "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03]",
								children: ["Enter ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col justify-center pb-16",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 8
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										delay: .1,
										duration: .5
									},
									className: "liquid-glass w-fit rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-white/70",
									children: "RIPPL // MY UNIVERSE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
									initial: {
										opacity: 0,
										y: 12
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										delay: .2,
										duration: .6
									},
									className: "mt-5 font-bold leading-[1.02] text-white",
									style: { fontSize: "clamp(2.6rem, 7vw, 5.5rem)" },
									children: ["Zeyad's ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gradient-neon",
										children: "Universe"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: {
										opacity: 0,
										y: 10
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										delay: .3,
										duration: .55
									},
									className: "mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg",
									children: "Not a dashboard — a command center for everything I build. A&R and artist management, music distribution, 360° marketing, and the AI tools I ship. Every artist I scout, every record I drop, every deal I close, every contract I sign — it all lives here. One brain for the whole operation."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: 10
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										delay: .4,
										duration: .5
									},
									className: "mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6",
									children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "liquid-glass rounded-2xl px-4 py-3 text-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-bold text-white",
											children: s.value
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-0.5 text-[10px] uppercase tracking-wider text-white/45",
											children: s.label
										})]
									}, s.label))
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute bottom-5 right-6 z-30 flex items-center gap-2",
						children: SCENES.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => switchScene(i),
							title: s.label,
							className: "rounded-full transition-all duration-300",
							style: {
								height: "3px",
								width: i === scene ? "28px" : "14px",
								background: i === scene ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.28)"
							}
						}, i))
					})
				]
			})
		]
	});
}
function FooterNav({ links }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col items-start gap-4",
		children: links.map(([label, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to,
			className: "text-[15px] font-semibold text-white/85 transition-all hover:translate-x-1 hover:text-white",
			children: label
		}, to))
	});
}
//#endregion
export { Universe as component };
