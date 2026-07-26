/* Hand-drawn flat approximations of the XP icon set. Lucide is line-art
   and reads as 2020s; XP icons are small, colourful and chunky. Only the
   ones that carry the illusion are drawn here — everything inside page
   content still uses lucide. */

export type IconName =
  | "computer" | "bin" | "binfull" | "folder" | "folderopen" | "notepad" | "taskmgr"
  | "controlpanel" | "mine" | "run" | "info" | "ie" | "wmp" | "flag" | "shutdown"
  | "logoff" | "search" | "help" | "doc" | "chart" | "user" | "network" | "error";

const S = ({ children, size = 16 }: { children: React.ReactNode; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
    {children}
  </svg>
);

export function XPIcon({ name, size = 16 }: { name: IconName | string; size?: number }) {
  switch (name) {
    case "computer":
      return (
        <S size={size}>
          <rect x="4" y="6" width="22" height="15" fill="#D8D5C8" stroke="#5A5850" />
          <rect x="6" y="8" width="18" height="11" fill="#3B7DD8" />
          <path d="M6 8h18v5H6z" fill="#5B9BE8" />
          <rect x="11" y="21" width="8" height="3" fill="#A9A692" />
          <rect x="7" y="24" width="16" height="3" fill="#D8D5C8" stroke="#5A5850" />
        </S>
      );
    case "bin":
      return (
        <S size={size}>
          <path d="M9 10h14l-2 17H11z" fill="#B8C6D8" stroke="#5A6878" />
          <rect x="7" y="7" width="18" height="3" fill="#98A8BC" stroke="#5A6878" />
          <path d="M13 13v11M19 13v11" stroke="#7A8898" />
        </S>
      );
    case "binfull":
      return (
        <S size={size}>
          <path d="M9 10h14l-2 17H11z" fill="#B8C6D8" stroke="#5A6878" />
          <rect x="7" y="7" width="18" height="3" fill="#98A8BC" stroke="#5A6878" />
          <rect x="11" y="3" width="6" height="5" fill="#EDE9D8" stroke="#8A8878" />
          <rect x="16" y="4" width="6" height="4" fill="#FFF" stroke="#8A8878" />
        </S>
      );
    case "folder":
      return (
        <S size={size}>
          <path d="M3 8h10l3 3h13v16H3z" fill="#F5C551" stroke="#B08A20" />
          <path d="M3 13h26v14H3z" fill="#FBD97A" stroke="#B08A20" />
        </S>
      );
    case "folderopen":
      return (
        <S size={size}>
          <path d="M3 8h10l3 3h13v4H3z" fill="#E0B03A" stroke="#B08A20" />
          <path d="M3 13h26l-4 14H3z" fill="#FBD97A" stroke="#B08A20" />
        </S>
      );
    case "notepad":
    case "doc":
      return (
        <S size={size}>
          <path d="M7 3h13l6 6v20H7z" fill="#FFF" stroke="#7A7868" />
          <path d="M20 3v6h6" fill="#DCD8C8" stroke="#7A7868" />
          <path d="M11 14h12M11 18h12M11 22h8" stroke="#4A6A9A" />
        </S>
      );
    case "taskmgr":
      return (
        <S size={size}>
          <rect x="4" y="5" width="24" height="22" fill="#0A0A0A" stroke="#5A5850" />
          <path d="M6 22l4-6 4 4 4-9 4 6 4-3" stroke="#22DD22" fill="none" strokeWidth="1.5" />
          <rect x="4" y="5" width="24" height="4" fill="#3B7DD8" />
        </S>
      );
    case "controlpanel":
      return (
        <S size={size}>
          <rect x="4" y="7" width="24" height="19" fill="#EDE9D8" stroke="#5A5850" />
          <circle cx="11" cy="14" r="3.5" fill="#3B7DD8" stroke="#1A4A98" />
          <rect x="17" y="11" width="8" height="3" fill="#C4402A" stroke="#8A2A18" />
          <rect x="17" y="18" width="8" height="3" fill="#4A9B2A" stroke="#2A6B18" />
          <circle cx="11" cy="21" r="2" fill="#F0A30A" stroke="#A87008" />
        </S>
      );
    case "mine":
      return (
        <S size={size}>
          <circle cx="16" cy="17" r="9" fill="#1A1A1A" />
          <path d="M16 4v6M6 17h5M21 17h5M8 9l4 4M24 9l-4 4" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="13" cy="14" r="2" fill="#FFF" />
        </S>
      );
    case "run":
      return (
        <S size={size}>
          <rect x="3" y="8" width="26" height="17" fill="#EDE9D8" stroke="#5A5850" />
          <rect x="6" y="14" width="20" height="8" fill="#FFF" stroke="#7F9DB9" />
          <path d="M8 16l3 2-3 2" stroke="#1A1A1A" fill="none" />
        </S>
      );
    case "info":
    case "help":
      return (
        <S size={size}>
          <circle cx="16" cy="16" r="12" fill="#3B7DD8" stroke="#1A4A98" />
          <rect x="14" y="13" width="4" height="10" fill="#FFF" />
          <rect x="14" y="8" width="4" height="4" fill="#FFF" />
        </S>
      );
    case "error":
      return (
        <S size={size}>
          <circle cx="16" cy="16" r="12" fill="#C4402A" stroke="#8A2A18" />
          <path d="M11 11l10 10M21 11L11 21" stroke="#FFF" strokeWidth="3" />
        </S>
      );
    case "ie":
      return (
        <S size={size}>
          <circle cx="16" cy="16" r="11" fill="#2E7BD6" stroke="#1A4A98" />
          <ellipse cx="16" cy="16" rx="11" ry="4.5" fill="none" stroke="#FFF" strokeWidth="1.5" />
          <path d="M16 5v22" stroke="#FFF" strokeWidth="1.5" />
        </S>
      );
    case "wmp":
      return (
        <S size={size}>
          <circle cx="16" cy="16" r="12" fill="#E85A20" stroke="#A03A10" />
          <path d="M13 10l10 6-10 6z" fill="#FFF" />
        </S>
      );
    case "chart":
      return (
        <S size={size}>
          <rect x="4" y="5" width="24" height="22" fill="#FFF" stroke="#5A5850" />
          <rect x="8" y="16" width="4" height="8" fill="#3B7DD8" />
          <rect x="14" y="11" width="4" height="13" fill="#4A9B2A" />
          <rect x="20" y="8" width="4" height="16" fill="#F0A30A" />
        </S>
      );
    case "user":
      return (
        <S size={size}>
          <circle cx="16" cy="11" r="6" fill="#F0C89A" stroke="#A07840" />
          <path d="M5 29c0-7 5-11 11-11s11 4 11 11z" fill="#3B7DD8" stroke="#1A4A98" />
        </S>
      );
    case "network":
      return (
        <S size={size}>
          <rect x="3" y="18" width="11" height="8" fill="#D8D5C8" stroke="#5A5850" />
          <rect x="18" y="6" width="11" height="8" fill="#D8D5C8" stroke="#5A5850" />
          <path d="M14 22h5v-8" stroke="#4A9B2A" strokeWidth="2" fill="none" />
        </S>
      );
    case "shutdown":
      return (
        <S size={size}>
          <circle cx="16" cy="16" r="11" fill="#C4402A" stroke="#8A2A18" />
          <rect x="14" y="8" width="4" height="10" fill="#FFF" />
          <path d="M10 14a8 8 0 1 0 12 0" stroke="#FFF" strokeWidth="3" fill="none" />
        </S>
      );
    case "logoff":
      return (
        <S size={size}>
          <circle cx="16" cy="16" r="11" fill="#F0A30A" stroke="#A87008" />
          <path d="M11 16h11M18 12l4 4-4 4" stroke="#FFF" strokeWidth="2.5" fill="none" />
        </S>
      );
    case "search":
      return (
        <S size={size}>
          <circle cx="14" cy="14" r="8" fill="#CFE4F7" stroke="#2E6BB8" strokeWidth="2" />
          <path d="M20 20l7 7" stroke="#5A5850" strokeWidth="3" />
        </S>
      );
    case "flag":
      return (
        <S size={size}>
          <path d="M4 8c6-3 10 3 16 0l-2 9c-6 3-10-3-16 0z" fill="#E85A20" />
          <path d="M4 8c6-3 10 3 16 0" stroke="#fff" fill="none" opacity=".4" />
        </S>
      );
    default:
      return (
        <S size={size}>
          <rect x="6" y="4" width="20" height="24" fill="#FFF" stroke="#7A7868" />
        </S>
      );
  }
}
