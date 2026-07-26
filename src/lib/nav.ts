import {
  Home, Users, Disc3, FolderLock, Palette, Cpu, Music2, Sparkles,
  LayoutDashboard, Megaphone, CalendarDays, Radio, ListChecks, Wallet, FileText,
  UsersRound, FolderOpen, Clapperboard, Instagram, Youtube, Facebook, Twitter,
  Ticket, Receipt, Share2, CreditCard,
} from "lucide-react";

/* Single source of truth for navigation. The neon Sidebar renders these
   as nav links; the XP Start menu renders the exact same array as
   "All Programs" groups. One list, two chromes. */

export interface NavItem {
  to: string;
  label: string;
  icon: any;
  /** Which XP window title the route shows when framed. */
  window?: string;
  /** XP icon name for the title bar / taskbar button. */
  xpIcon?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const groups: NavGroup[] = [
  {
    label: "Personal OS",
    items: [
      { to: "/home", label: "Home", icon: Home, window: "My Universe", xpIcon: "computer" },
      { to: "/roster", label: "Roster", icon: Users, window: "Roster", xpIcon: "user" },
      { to: "/releases", label: "Releases", icon: Disc3, window: "Releases", xpIcon: "wmp" },
      { to: "/audio", label: "Audio", icon: Music2, window: "Windows Media Player", xpIcon: "wmp" },
      { to: "/vault", label: "The Vault", icon: FolderLock, window: "The Vault", xpIcon: "folder" },
      { to: "/studio", label: "Studio", icon: Palette, window: "Studio - Paint", xpIcon: "folderopen" },
      { to: "/techlab", label: "Tech Lab", icon: Cpu, window: "Device Manager", xpIcon: "controlpanel" },
      { to: "/hitlab", label: "Hit Lab", icon: Sparkles, window: "Hit Lab", xpIcon: "chart" },
    ],
  },
  {
    label: "Revenue",
    items: [
      { to: "/invoices", label: "Invoices", icon: Receipt, window: "Invoices", xpIcon: "doc" },
      { to: "/live", label: "Live & Tickets", icon: Ticket, window: "Live & Tickets", xpIcon: "doc" },
      { to: "/affiliates", label: "Affiliates", icon: Share2, window: "Affiliates", xpIcon: "network" },
      { to: "/billing", label: "Billing", icon: CreditCard, window: "Billing", xpIcon: "chart" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { to: "/dashboard", label: "Overview", icon: LayoutDashboard, window: "Campaign Command", xpIcon: "chart" },
      { to: "/campaigns", label: "Campaigns", icon: Megaphone, window: "Campaigns", xpIcon: "folder" },
      { to: "/calendar", label: "Calendar", icon: CalendarDays, window: "Calendar", xpIcon: "doc" },
      { to: "/channels", label: "Channels", icon: Radio, window: "Channels", xpIcon: "network" },
      { to: "/tasks", label: "Tasks", icon: ListChecks, window: "Tasks", xpIcon: "doc" },
      { to: "/budget", label: "Budget", icon: Wallet, window: "Budget", xpIcon: "chart" },
      { to: "/templates", label: "Templates", icon: FileText, window: "Templates", xpIcon: "doc" },
      { to: "/creators", label: "Creators", icon: UsersRound, window: "Creators", xpIcon: "user" },
      { to: "/assets", label: "Assets", icon: FolderOpen, window: "Assets", xpIcon: "folderopen" },
    ],
  },
  {
    label: "Platforms",
    items: [
      { to: "/dashboard/tiktok", label: "TikTok", icon: Clapperboard, window: "TikTok", xpIcon: "chart" },
      { to: "/dashboard/instagram", label: "Instagram", icon: Instagram, window: "Instagram", xpIcon: "chart" },
      { to: "/dashboard/youtube", label: "YouTube", icon: Youtube, window: "YouTube", xpIcon: "chart" },
      { to: "/dashboard/facebook", label: "Facebook", icon: Facebook, window: "Facebook", xpIcon: "chart" },
      { to: "/dashboard/x", label: "X", icon: Twitter, window: "X", xpIcon: "chart" },
    ],
  },
];

const flat = groups.flatMap((g) => g.items);

export function navFor(pathname: string): NavItem | undefined {
  return flat.find((i) => i.to === pathname);
}

export function windowTitleFor(pathname: string): { title: string; icon: string } {
  const hit = navFor(pathname);
  if (hit) return { title: hit.window ?? hit.label, icon: hit.xpIcon ?? "folder" };
  if (pathname === "/settings") return { title: "Control Panel", icon: "controlpanel" };
  if (pathname === "/admin") return { title: "Administrative Tools", icon: "controlpanel" };
  if (pathname === "/knowledge") return { title: "Help and Support Center", icon: "help" };
  return { title: "RIPPL", icon: "computer" };
}
