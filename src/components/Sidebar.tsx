import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Megaphone, CalendarDays, Radio, ListChecks, Wallet, Users, FolderOpen, ChevronDown, Check } from "lucide-react";
import { useRole, type Role } from "@/lib/role-context";
import { useCampaigns } from "@/lib/campaign-store";
import { motion } from "framer-motion";
import { useState } from "react";

const nav = [
  { to: "/dashboard", label: "Overview",  icon: LayoutDashboard },
  { to: "/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/calendar",  label: "Calendar",  icon: CalendarDays },
  { to: "/channels",  label: "Channels",  icon: Radio },
  { to: "/tasks",     label: "Tasks",     icon: ListChecks },
  { to: "/budget",    label: "Budget",    icon: Wallet },
  { to: "/creators",  label: "Creators",  icon: Users },
  { to: "/assets",    label: "Assets",    icon: FolderOpen },
] as const;

const roles: Role[] = ["Marketing Manager", "Team Member", "Client"];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role, setRole } = useRole();
  const { campaigns, active, setActive } = useCampaigns();
  const [open, setOpen] = useState(false);
  const [campOpen, setCampOpen] = useState(false);

  return (
    <aside className="glass sticky top-4 z-20 flex h-[calc(100vh-2rem)] w-64 shrink-0 flex-col gap-5 rounded-2xl p-5">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)]">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="2.5" cy="19.5" r="2" fill="white" />
            <path d="M 2.5 13.5 A 7 7 0 0 1 9.5 19.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M 2.5 8 A 12.5 12.5 0 0 1 15 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
            <path d="M 2.5 2 A 18.5 18.5 0 0 1 21 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          </svg>
          <div className="absolute inset-0 rounded-xl bg-[oklch(0.7_0.28_328)] blur-xl opacity-40 -z-10" />
        </div>
        <div className="min-w-0">
          <div className="font-display text-sm font-bold tracking-widest">RIPPL</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">360° Marketing OS</div>
        </div>
      </div>

      {/* Active campaign switcher */}
      <div className="relative">
        <div className="mb-1.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Active campaign</div>
        <button onClick={() => setCampOpen((o) => !o)} className="glass flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left">
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">{active ? active.artist : "No campaign"}</span>
            <span className="block truncate text-[11px] text-muted-foreground">{active ? active.title : "Create one to begin"}</span>
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${campOpen ? "rotate-180" : ""}`} />
        </button>
        {campOpen && (
          <div className="glass-strong absolute left-0 right-0 z-30 mt-1 flex flex-col gap-0.5 rounded-xl p-1">
            {campaigns.length === 0 && (
              <div className="px-3 py-2 text-[11px] text-muted-foreground">No campaigns yet.</div>
            )}
            {campaigns.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActive(c.id); setCampOpen(false); }}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5"
              >
                <span className="min-w-0">
                  <span className="block truncate">{c.artist}</span>
                  <span className="block truncate text-[10px] text-muted-foreground">{c.status} · {c.title}</span>
                </span>
                {c.id === active?.id && <Check className="h-4 w-4 shrink-0 text-[oklch(0.8_0.25_328)]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5 overflow-y-auto">
        {nav.map((n) => {
          const active2 = pathname === n.to;
          return (
            <Link
              key={n.to}
              to={n.to}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${active2 ? "text-white" : "text-muted-foreground hover:text-white"}`}
            >
              {active2 && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[oklch(0.7_0.28_328)]/25 to-[oklch(0.5_0.3_300)]/10 border border-[oklch(0.7_0.28_328)]/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <n.icon className="relative h-4 w-4" />
              <span className="relative">{n.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Role switcher + copyright */}
      <div className="mt-auto flex flex-col gap-2">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Signed in as</div>
        <button onClick={() => setOpen(!open)} className="glass relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm">
          <span className="truncate">{role}</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="glass-strong flex flex-col rounded-xl p-1">
            {roles.map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); setOpen(false); }}
                className={`rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5 ${r === role ? "text-[oklch(0.8_0.25_328)]" : "text-foreground"}`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        <div className="mt-2 border-t border-white/[0.06] pt-3">
          <p className="text-[10px] leading-relaxed text-muted-foreground/60">
            © 2026 RIPPL<br />
            Built by Zeyad Sayedin.<br />
            All rights reserved.
          </p>
        </div>
      </div>
    </aside>
  );
}
