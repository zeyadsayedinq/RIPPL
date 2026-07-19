import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home, Users, Disc3, FolderLock, Palette, Cpu, Settings, Music2, ShieldCheck,
  LayoutDashboard, Megaphone, CalendarDays, Radio, ListChecks, Wallet, FileText, UsersRound, FolderOpen,
  ChevronDown, ChevronLeft, Check, Clapperboard, Instagram, Youtube, Facebook, Twitter,
} from "lucide-react";
import { useRole, type Role } from "@/lib/role-context";
import { useCampaigns } from "@/lib/campaign-store";
import { useIsHQ } from "@/lib/use-auth";
import { motion } from "framer-motion";
import { useState } from "react";

const groups: { label: string; items: { to: string; label: string; icon: any }[] }[] = [
  { label: "Personal OS", items: [
    { to: "/home", label: "Home", icon: Home },
    { to: "/roster", label: "Roster", icon: Users },
    { to: "/releases", label: "Releases", icon: Disc3 },
    { to: "/audio", label: "Audio", icon: Music2 },
    { to: "/vault", label: "The Vault", icon: FolderLock },
    { to: "/studio", label: "Studio", icon: Palette },
    { to: "/techlab", label: "Tech Lab", icon: Cpu },
  ]},
  { label: "Marketing", items: [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { to: "/campaigns", label: "Campaigns", icon: Megaphone },
    { to: "/calendar", label: "Calendar", icon: CalendarDays },
    { to: "/channels", label: "Channels", icon: Radio },
    { to: "/tasks", label: "Tasks", icon: ListChecks },
    { to: "/budget", label: "Budget", icon: Wallet },
    { to: "/templates", label: "Templates", icon: FileText },
    { to: "/creators", label: "Creators", icon: UsersRound },
    { to: "/assets", label: "Assets", icon: FolderOpen },
  ]},
  { label: "Platforms", items: [
    { to: "/dashboard/tiktok", label: "TikTok", icon: Clapperboard },
    { to: "/dashboard/instagram", label: "Instagram", icon: Instagram },
    { to: "/dashboard/youtube", label: "YouTube", icon: Youtube },
    { to: "/dashboard/facebook", label: "Facebook", icon: Facebook },
    { to: "/dashboard/x", label: "X", icon: Twitter },
  ]},
];

const roles: Role[] = ["Marketing Manager", "Team Member", "Client"];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role, setRole } = useRole();
  const { campaigns, active, setActive } = useCampaigns();
  const isHQ = useIsHQ();
  const [roleOpen, setRoleOpen] = useState(false);
  const [campOpen, setCampOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`glass sticky top-4 z-20 flex h-[calc(100vh-2rem)] shrink-0 flex-col gap-4 rounded-2xl p-3 transition-[width] ${collapsed ? "w-20 items-center" : "w-64 p-5"}`}>
      {/* Brand + collapse */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <circle cx="2.5" cy="19.5" r="2" fill="white" />
              <path d="M 2.5 13.5 A 7 7 0 0 1 9.5 19.5" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M 2.5 8 A 12.5 12.5 0 0 1 15 19.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
              <path d="M 2.5 2 A 18.5 18.5 0 0 1 21 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
            </svg>
          </div>
          {!collapsed && <div><div className="font-display text-sm font-bold tracking-widest">RIPPL</div><div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">360° OS</div></div>}
        </div>
        {!collapsed && <button onClick={() => setCollapsed(true)} className="text-muted-foreground hover:text-white"><ChevronLeft className="h-4 w-4" /></button>}
      </div>
      {collapsed && <button onClick={() => setCollapsed(false)} className="text-muted-foreground hover:text-white"><ChevronDown className="h-4 w-4 -rotate-90" /></button>}

      {/* Campaign switcher */}
      {!collapsed && (
        <div className="relative">
          <div className="mb-1.5 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Active campaign</div>
          <button onClick={() => setCampOpen((o) => !o)} className="glass flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left">
            <span className="min-w-0"><span className="block truncate text-sm font-semibold">{active ? active.artist : "No campaign"}</span><span className="block truncate text-[11px] text-muted-foreground">{active ? active.title : "Create one to begin"}</span></span>
            <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${campOpen ? "rotate-180" : ""}`} />
          </button>
          {campOpen && (
            <div className="glass-strong absolute left-0 right-0 z-30 mt-1 flex flex-col gap-0.5 rounded-xl p-1">
              {campaigns.length === 0 && <div className="px-3 py-2 text-[11px] text-muted-foreground">No campaigns yet.</div>}
              {campaigns.map((c) => (
                <button key={c.id} onClick={() => { setActive(c.id); setCampOpen(false); }} className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5">
                  <span className="min-w-0"><span className="block truncate">{c.artist}</span><span className="block truncate text-[10px] text-muted-foreground">{c.status} · {c.title}</span></span>
                  {c.id === active?.id && <Check className="h-4 w-4 shrink-0 text-white" />}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Nav groups */}
      <nav className="flex w-full flex-1 flex-col gap-3 overflow-y-auto pr-1">
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-0.5">
            {!collapsed && <div className="px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/60">{g.label}</div>}
            {g.items.map((n) => {
              const on = pathname === n.to;
              return (
                <Link key={n.to} to={n.to} title={n.label} className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${collapsed ? "justify-center" : ""} ${on ? "text-white" : "text-muted-foreground hover:text-white"}`}>
                  {on && <motion.div layoutId="nav-active" className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                  <n.icon className="relative h-4 w-4 shrink-0" />
                  {!collapsed && <span className="relative">{n.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
        {isHQ && (
          <Link to="/admin" title="Admin" className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${collapsed ? "justify-center" : ""} ${pathname === "/admin" ? "text-white" : "text-muted-foreground hover:text-white"}`}>
            {pathname === "/admin" && <motion.div layoutId="nav-active" className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10" />}
            <ShieldCheck className="relative h-4 w-4 shrink-0" />{!collapsed && <span className="relative">Admin</span>}
          </Link>
        )}
        <Link to="/settings" title="Settings" className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${collapsed ? "justify-center" : ""} ${pathname === "/settings" ? "text-white" : "text-muted-foreground hover:text-white"}`}>
          {pathname === "/settings" && <motion.div layoutId="nav-active" className="absolute inset-0 rounded-xl bg-white/[0.06] border border-white/10" />}
          <Settings className="relative h-4 w-4 shrink-0" />{!collapsed && <span className="relative">Settings</span>}
        </Link>
      </nav>

      {/* Role switcher */}
      {!collapsed && (
        <div className="flex flex-col gap-2">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Signed in as</div>
          <button onClick={() => setRoleOpen(!roleOpen)} className="glass relative flex items-center justify-between rounded-xl px-3 py-2.5 text-sm">
            <span className="truncate">{role}</span><ChevronDown className={`h-4 w-4 transition-transform ${roleOpen ? "rotate-180" : ""}`} />
          </button>
          {roleOpen && (
            <div className="glass-strong flex flex-col rounded-xl p-1">
              {roles.map((r) => <button key={r} onClick={() => { setRole(r); setRoleOpen(false); }} className={`rounded-lg px-3 py-2 text-left text-sm hover:bg-white/5 ${r === role ? "text-white" : "text-foreground"}`}>{r}</button>)}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
