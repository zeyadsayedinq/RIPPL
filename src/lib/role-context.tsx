import { createContext, useContext, useState, type ReactNode } from "react";

export type Role = "Marketing Manager" | "Team Member" | "Client";
interface RoleCtx {
  role: Role;
  setRole: (r: Role) => void;
  canSeePrice: boolean;
}
const Ctx = createContext<RoleCtx | null>(null);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("Marketing Manager");
  const canSeePrice = role === "Marketing Manager";
  return <Ctx.Provider value={{ role, setRole, canSeePrice }}>{children}</Ctx.Provider>;
}

export function useRole() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRole outside provider");
  return c;
}
