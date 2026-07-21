import { a as __toESM } from "../_runtime.mjs";
import { c as createServerFn } from "./createServerFn-CIHAFgYl.mjs";
import { a as require_react } from "../_libs/react+restart__hooks.mjs";
import { a as useIsHQ } from "./use-auth-DSVhBFKn.mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as createSsrRpc, d as useCampaigns, f as useOS, l as uid } from "./campaign-store-Cd9pjPrz.mjs";
import { a as AnimatePresence } from "../_libs/framer-motion.mjs";
import { C as ShieldCheck, E as Settings2, Y as Lock, h as Trash2, l as UserPlus, q as Mail } from "../_libs/lucide-react.mjs";
import { n as MagneticButton, r as ModalShell, t as AppShell } from "./AppShell-DuK_b28K.mjs";
import { t as SpotlightCard } from "./SpotlightCard-BXh2YFk4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-MsnpRORA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inviteMember = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("d58727adc976987b495381b707050a8049015e3f79c6e2f09e66ba0f493ae302"));
var ROLES = [
	"Admin",
	"Manager",
	"A&R",
	"Marketing",
	"Creator",
	"Viewer"
];
var field = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40";
function AdminPage() {
	const isHQ = useIsHQ();
	const { members, update } = useOS();
	const [assigning, setAssigning] = (0, import_react.useState)(null);
	const [f, setF] = (0, import_react.useState)({
		name: "",
		email: "",
		role: "Creator"
	});
	const [inviteMsg, setInviteMsg] = (0, import_react.useState)(null);
	if (!isHQ) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass mt-10 grid place-items-center rounded-2xl p-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-8 w-8 text-white/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-2xl font-bold",
				children: "HQ access only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground",
				children: "This panel is restricted to the workspace owner. Sign in as HQ to manage members and access."
			})
		]
	}) });
	async function addMember(e) {
		e.preventDefault();
		const email = f.email.trim();
		if (!email) return;
		const name = f.name.trim() || email;
		update("members", (m) => [{
			id: uid("m"),
			email,
			name,
			role: f.role,
			campaigns: [],
			releases: [],
			tracks: [],
			contracts: [],
			edit: []
		}, ...m]);
		setF({
			name: "",
			email: "",
			role: "Creator"
		});
		setInviteMsg({
			text: `Sending invite to ${email}…`,
			ok: true
		});
		try {
			const res = await inviteMember({ data: {
				email,
				name
			} });
			if (res.ok && res.warning) setInviteMsg({
				text: `Invite sent to ${email} — but the link may 404: ${res.warning}`,
				ok: false
			});
			else setInviteMsg(res.ok ? {
				text: `Invite email sent to ${email}.`,
				ok: true
			} : {
				text: `Member added, but the invite email failed: ${res.error}`,
				ok: false
			});
		} catch (err) {
			setInviteMsg({
				text: `Member added, but the invite email failed: ${err?.message || err}`,
				ok: false
			});
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "glass rounded-2xl p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " HQ · Admin"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-1 font-display text-3xl font-bold",
					children: ["Team & ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-gradient-neon",
						children: "Access"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Add members, set their role, and assign campaigns, releases, audio and contracts to each person."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SpotlightCard, {
			className: "mt-6 p-5",
			spotlight: false,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-3.5 w-3.5" }), " Add member"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: addMember,
					className: "mt-3 grid grid-cols-12 items-end gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 sm:col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: f.name,
								onChange: (e) => setF({
									...f,
									name: e.target.value
								}),
								placeholder: "Full name"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-12 sm:col-span-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Email"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: field,
								value: f.email,
								onChange: (e) => setF({
									...f,
									email: e.target.value
								}),
								placeholder: "name@email.com"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-8 sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground",
								children: "Role"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: field,
								value: f.role,
								onChange: (e) => setF({
									...f,
									role: e.target.value
								}),
								children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									className: "bg-[#0a0a0c]",
									children: r
								}, r))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-4 sm:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, { children: "Add" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-muted-foreground/70",
					children: "Members sign in with their own email — adding them here also sends a real invite email via Supabase Auth. Assignments below control what each person is responsible for."
				}),
				inviteMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `mt-2 flex items-start gap-1.5 rounded-lg px-3 py-1.5 text-xs ${inviteMsg.ok ? "bg-[oklch(0.82_0.18_150)]/10 text-[oklch(0.82_0.18_150)]" : "bg-[oklch(0.7_0.2_20)]/10 text-[oklch(0.8_0.2_20)]"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: inviteMsg.text })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 grid grid-cols-1 gap-3",
			children: [members.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass rounded-2xl p-8 text-center text-sm text-muted-foreground",
				children: "No members yet. Add your team above."
			}), members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass flex flex-wrap items-center gap-3 rounded-2xl p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 font-bold",
						children: (m.name || m.email).charAt(0).toUpperCase()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate font-medium",
							children: m.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate text-xs text-muted-foreground",
							children: m.email
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: m.role,
						onChange: (e) => update("members", (all) => all.map((x) => x.id === m.id ? {
							...x,
							role: e.target.value
						} : x)),
						className: "rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs outline-none",
						children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							className: "bg-[#0a0a0c]",
							children: r
						}, r))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden text-[11px] text-muted-foreground md:block",
						children: [m.campaigns.length + m.releases.length + m.tracks.length + m.contracts.length, " assignments"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setAssigning(m),
						className: "glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-3.5 w-3.5" }), " Assign"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => update("members", (all) => all.filter((x) => x.id !== m.id)),
						className: "text-muted-foreground hover:text-[oklch(0.7_0.2_20)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			}, m.id))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: assigning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AssignModal, {
			member: assigning,
			onClose: () => setAssigning(null)
		}) })
	] });
}
function AssignModal({ member, onClose }) {
	const { releases, tracks, contracts, update } = useOS();
	const { campaigns } = useCampaigns();
	const [tab, setTab] = (0, import_react.useState)("campaigns");
	function toggle(key, id) {
		update("members", (all) => all.map((m) => m.id === member.id ? m[key].includes(id) ? {
			...m,
			[key]: m[key].filter((x) => x !== id),
			edit: (m.edit ?? []).filter((x) => x !== id)
		} : {
			...m,
			[key]: [...m[key], id]
		} : m));
	}
	/** flip an assigned item between View (default) and Full edit */
	function toggleEdit(id) {
		update("members", (all) => all.map((m) => m.id === member.id ? {
			...m,
			edit: (m.edit ?? []).includes(id) ? (m.edit ?? []).filter((x) => x !== id) : [...m.edit ?? [], id]
		} : m));
	}
	const { members } = useOS();
	const m = members.find((x) => x.id === member.id) ?? member;
	const tabs = [
		{
			key: "campaigns",
			label: "Campaigns",
			items: campaigns.map((c) => ({
				id: c.id,
				label: `${c.artist} — ${c.title}`
			}))
		},
		{
			key: "releases",
			label: "Releases",
			items: releases.map((r) => ({
				id: r.id,
				label: `${r.title} · ${r.artist}`
			}))
		},
		{
			key: "tracks",
			label: "Audio",
			items: tracks.map((t) => ({
				id: t.id,
				label: t.title
			}))
		},
		{
			key: "contracts",
			label: "Contracts",
			items: contracts.map((c) => ({
				id: c.id,
				label: c.name
			}))
		}
	];
	const active = tabs.find((t) => t.key === tab);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ModalShell, {
		eyebrow: `Assign to ${m.name}`,
		title: "Access & assignments",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-1.5",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setTab(t.key),
					className: `rounded-full border px-3 py-1.5 text-xs ${tab === t.key ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`,
					children: [
						t.label,
						" (",
						m[t.key].length,
						")"
					]
				}, t.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-[11px] text-muted-foreground/70",
				children: [
					"Assigned items are ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "view-only" }),
					" by default — click the View pill to grant full edit (their changes sync back to your workspace)."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 max-h-72 space-y-1 overflow-y-auto",
				children: [active.items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Nothing to assign here yet."
				}), active.items.map((it) => {
					const on = m[active.key].includes(it.id);
					const editOn = (m.edit ?? []).includes(it.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => toggle(active.key, it.id),
							className: "flex min-w-0 flex-1 items-center gap-3 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `grid h-5 w-5 shrink-0 place-items-center rounded border ${on ? "border-[oklch(0.82_0.18_150)] bg-[oklch(0.82_0.18_150)]" : "border-white/25"}`,
								children: on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-black",
									children: "✓"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm",
								children: it.label
							})]
						}), on && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => toggleEdit(it.id),
							title: editOn ? "Member can edit this item (changes sync back to your workspace)" : "View-only — click to grant edit access",
							className: `shrink-0 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-wider ${editOn ? "border-[oklch(0.85_0.25_328)] bg-[oklch(0.85_0.25_328)]/15 text-[oklch(0.85_0.25_328)]" : "border-white/15 text-muted-foreground hover:text-white"}`,
							children: editOn ? "Edit" : "View"
						})]
					}, it.id);
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
					onClick: onClose,
					children: "Done"
				})
			})
		]
	});
}
//#endregion
export { AdminPage as component };
