import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AppShell } from "@/components/AppShell";
import { SpotlightCard } from "@/components/SpotlightCard";
import { MagneticButton } from "@/components/MagneticButton";
import { ModalShell } from "@/components/NewCampaignModal";
import { useOS, uid, type Member, type MemberRole } from "@/lib/os-store";
import { useCampaigns } from "@/lib/campaign-store";
import { useIsHQ } from "@/lib/use-auth";
import { inviteMember } from "@/lib/invite-member";
import { ShieldCheck, UserPlus, Trash2, Settings2, Lock, Mail } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · RIPPL HQ" }] }),
  component: AdminPage,
});

const ROLES: MemberRole[] = ["Admin", "Manager", "A&R", "Marketing", "Creator", "Viewer"];
const field = "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm outline-none focus:border-white/40";

function AdminPage() {
  const isHQ = useIsHQ();
  const { members, update } = useOS();
  const [assigning, setAssigning] = useState<Member | null>(null);
  const [f, setF] = useState({ name: "", email: "", role: "Creator" as MemberRole });
  const [inviteMsg, setInviteMsg] = useState<{ text: string; ok: boolean } | null>(null);

  if (!isHQ) {
    return (
      <AppShell>
        <div className="glass mt-10 grid place-items-center rounded-2xl p-16 text-center">
          <Lock className="h-8 w-8 text-white/40" />
          <h1 className="mt-4 font-display text-2xl font-bold">HQ access only</h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">This panel is restricted to the workspace owner. Sign in as HQ to manage members and access.</p>
        </div>
      </AppShell>
    );
  }

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    const email = f.email.trim();
    if (!email) return;
    const name = f.name.trim() || email;
    update("members", (m) => [{ id: uid("m"), email, name, role: f.role, campaigns: [], releases: [], tracks: [], contracts: [] }, ...m]);
    setF({ name: "", email: "", role: "Creator" });
    setInviteMsg({ text: `Sending invite to ${email}…`, ok: true });
    try {
      const res = await inviteMember({ data: { email, name } });
      setInviteMsg(res.ok ? { text: `Invite email sent to ${email}.`, ok: true } : { text: `Member added, but the invite email failed: ${res.error}`, ok: false });
    } catch (err: any) {
      setInviteMsg({ text: `Member added, but the invite email failed: ${err?.message || err}`, ok: false });
    }
  }

  return (
    <AppShell>
      <header className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[oklch(0.85_0.25_328)]"><ShieldCheck className="h-3.5 w-3.5" /> HQ · Admin</div>
        <h1 className="mt-1 font-display text-3xl font-bold">Team & <span className="text-gradient-neon">Access</span></h1>
        <p className="mt-1 text-sm text-muted-foreground">Add members, set their role, and assign campaigns, releases, audio and contracts to each person.</p>
      </header>

      <SpotlightCard className="mt-6 p-5" spotlight={false}>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"><UserPlus className="h-3.5 w-3.5" /> Add member</div>
        <form onSubmit={addMember} className="mt-3 grid grid-cols-12 items-end gap-3">
          <div className="col-span-12 sm:col-span-4"><label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Name</label><input className={field} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Full name" /></div>
          <div className="col-span-12 sm:col-span-4"><label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Email</label><input className={field} value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="name@email.com" /></div>
          <div className="col-span-8 sm:col-span-2"><label className="mb-1 block text-[10px] uppercase tracking-wider text-muted-foreground">Role</label><select className={field} value={f.role} onChange={(e) => setF({ ...f, role: e.target.value as MemberRole })}>{ROLES.map((r) => <option key={r} className="bg-[#0a0a0c]">{r}</option>)}</select></div>
          <div className="col-span-4 sm:col-span-2"><MagneticButton>Add</MagneticButton></div>
        </form>
        <p className="mt-2 text-[11px] text-muted-foreground/70">Members sign in with their own email — adding them here also sends a real invite email via Supabase Auth. Assignments below control what each person is responsible for.</p>
        {inviteMsg && (
          <div className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs ${inviteMsg.ok ? "bg-[oklch(0.82_0.18_150)]/10 text-[oklch(0.82_0.18_150)]" : "bg-[oklch(0.7_0.2_20)]/10 text-[oklch(0.8_0.2_20)]"}`}>
            <Mail className="h-3.5 w-3.5 shrink-0" /> {inviteMsg.text}
          </div>
        )}
      </SpotlightCard>

      <section className="mt-4 grid grid-cols-1 gap-3">
        {members.length === 0 && <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">No members yet. Add your team above.</div>}
        {members.map((m) => (
          <div key={m.id} className="glass flex flex-wrap items-center gap-3 rounded-2xl p-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 font-bold">{(m.name || m.email).charAt(0).toUpperCase()}</div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium">{m.name}</div>
              <div className="truncate text-xs text-muted-foreground">{m.email}</div>
            </div>
            <select value={m.role} onChange={(e) => update("members", (all) => all.map((x) => x.id === m.id ? { ...x, role: e.target.value as MemberRole } : x))} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs outline-none">
              {ROLES.map((r) => <option key={r} className="bg-[#0a0a0c]">{r}</option>)}
            </select>
            <div className="hidden text-[11px] text-muted-foreground md:block">{m.campaigns.length + m.releases.length + m.tracks.length + m.contracts.length} assignments</div>
            <button onClick={() => setAssigning(m)} className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs hover:bg-white/5"><Settings2 className="h-3.5 w-3.5" /> Assign</button>
            <button onClick={() => update("members", (all) => all.filter((x) => x.id !== m.id))} className="text-muted-foreground hover:text-[oklch(0.7_0.2_20)]"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </section>

      <AnimatePresence>{assigning && <AssignModal member={assigning} onClose={() => setAssigning(null)} />}</AnimatePresence>
    </AppShell>
  );
}

function AssignModal({ member, onClose }: { member: Member; onClose: () => void }) {
  const { releases, tracks, contracts, update } = useOS();
  const { campaigns } = useCampaigns();
  const [tab, setTab] = useState<"campaigns" | "releases" | "tracks" | "contracts">("campaigns");

  function toggle(key: keyof Pick<Member, "campaigns" | "releases" | "tracks" | "contracts">, id: string) {
    update("members", (all) => all.map((m) => m.id === member.id
      ? { ...m, [key]: m[key].includes(id) ? m[key].filter((x) => x !== id) : [...m[key], id] } : m));
  }
  // read latest from store
  const { members } = useOS();
  const m = members.find((x) => x.id === member.id) ?? member;

  const tabs = [
    { key: "campaigns" as const, label: "Campaigns", items: campaigns.map((c) => ({ id: c.id, label: `${c.artist} — ${c.title}` })) },
    { key: "releases" as const, label: "Releases", items: releases.map((r) => ({ id: r.id, label: `${r.title} · ${r.artist}` })) },
    { key: "tracks" as const, label: "Audio", items: tracks.map((t) => ({ id: t.id, label: t.title })) },
    { key: "contracts" as const, label: "Contracts", items: contracts.map((c) => ({ id: c.id, label: c.name })) },
  ];
  const active = tabs.find((t) => t.key === tab)!;

  return (
    <ModalShell eyebrow={`Assign to ${m.name}`} title="Access & assignments" onClose={onClose}>
      <div className="flex flex-wrap gap-1.5">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)} className={`rounded-full border px-3 py-1.5 text-xs ${tab === t.key ? "border-white bg-white text-black" : "border-white/15 text-muted-foreground hover:text-white"}`}>{t.label} ({(m as any)[t.key].length})</button>
        ))}
      </div>
      <div className="mt-4 max-h-72 space-y-1 overflow-y-auto">
        {active.items.length === 0 && <div className="py-6 text-center text-sm text-muted-foreground">Nothing to assign here yet.</div>}
        {active.items.map((it) => {
          const on = (m[active.key] as string[]).includes(it.id);
          return (
            <button key={it.id} onClick={() => toggle(active.key, it.id)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/5">
              <span className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${on ? "border-[oklch(0.82_0.18_150)] bg-[oklch(0.82_0.18_150)]" : "border-white/25"}`}>{on && <span className="text-[10px] text-black">✓</span>}</span>
              <span className="truncate text-sm">{it.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex justify-end"><MagneticButton onClick={onClose}>Done</MagneticButton></div>
    </ModalShell>
  );
}
