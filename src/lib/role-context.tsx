import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "Marketing Manager" | "Team Member" | "Client";
interface RoleCtx {
  role: Role;
  setRole: (r: Role) => void;
  canSeePrice: boolean;
}
const Ctx = createContext<RoleCtx | null>(null);

const LS_ROLE = "rippl.viewRole.v1";
const ROLES: Role[] = ["Marketing Manager", "Team Member", "Client"];

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Marketing Manager");
  // Hydrate after mount (SSR-safe) — fixes "role resets on refresh".
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LS_ROLE) as Role | null;
      if (saved && ROLES.includes(saved)) setRole(saved);
    } catch { /* ignore */ }
  }, []);
  function setAndSave(r: Role) {
    setRole(r);
    try { window.localStorage.setItem(LS_ROLE, r); } catch { /* ignore */ }
  }
  const canSeePrice = role === "Marketing Manager";
  return <Ctx.Provider value={{ role, setRole: setAndSave, canSeePrice }}>{children}</Ctx.Provider>;
}

export function useRole() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRole outside provider");
  return c;
}
