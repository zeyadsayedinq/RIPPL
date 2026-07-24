import { Heart, MessageCircle, Bookmark, Share2, Music2, Loader2, Repeat2 } from "lucide-react";
import type { Platform } from "@/lib/mock-data";

/* A real TikTok/Instagram chrome mockup around an uploaded deliverable —
   replaces the plain "phone-shaped box" that used to sit in the Creators
   deliverable preview (creators.tsx). No new data source: everything here
   is either the actual uploaded video (previewUrl) or the creator's own
   name/handle, laid out to look like the actual app it's about to be
   posted to, so HQ is approving something that looks like what's actually
   about to go live rather than a generic video-player rectangle.

   Engagement numbers (likes/comments/shares) are deliberately shown as "—"
   placeholders, not fabricated counts — this is a pre-post approval
   preview, the content has no real stats yet. That's consistent with the
   rest of the app's rule: no source, no number (see PlatformDashboard.tsx). */

const CHROME_PLATFORMS = new Set(["TikTok", "Instagram"]);

export function supportsDeviceFrame(platform: Platform): boolean {
  return CHROME_PLATFORMS.has(platform);
}

function initials(name: string) {
  return name.charAt(0).toUpperCase() || "?";
}

export function DeviceFramePreview({
  platform,
  previewUrl,
  name,
  handle,
  caption,
  loading,
}: {
  platform: Platform;
  previewUrl: string | null;
  name: string;
  handle: string;
  /** Shown as the post caption — falls back to a generic placeholder line. */
  caption?: string;
  loading?: boolean;
}) {
  const isInstagram = platform === "Instagram";
  const avatar = (
    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.7_0.28_328)] to-[oklch(0.5_0.3_300)] text-xs font-bold text-white ring-2 ring-white/70">
      {initials(name)}
    </div>
  );
  const captionText = caption || `${handle} — approved for posting`;

  return (
    <div className="relative mx-auto aspect-[9/16] w-40 overflow-hidden rounded-[1.4rem] border-[3px] border-black bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
      {/* Media layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.15_0.05_320)] to-black">
        {previewUrl ? (
          <video key={previewUrl} src={previewUrl} controls playsInline className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            {loading ? (
              <Loader2 className="h-6 w-6 animate-spin text-white/40" />
            ) : (
              <Music2 className="h-6 w-6 text-white/25" />
            )}
          </div>
        )}
      </div>

      {/* Notch */}
      <div className="pointer-events-none absolute left-1/2 top-1 h-3 w-14 -translate-x-1/2 rounded-full bg-black/90" />

      {/* Top chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-5 flex items-center justify-center gap-3 text-[9px] font-semibold text-white/50">
        {isInstagram ? (
          <span className="text-white">Reels</span>
        ) : (
          <>
            <span>Following</span>
            <span className="text-white">For You</span>
          </>
        )}
      </div>

      {/* Right action rail */}
      <div className="pointer-events-none absolute bottom-14 right-1.5 flex flex-col items-center gap-3 text-white">
        <div className="flex flex-col items-center gap-0.5">
          <Heart className="h-4 w-4" />
          <span className="text-[8px] text-white/70">—</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <MessageCircle className="h-4 w-4" />
          <span className="text-[8px] text-white/70">—</span>
        </div>
        {isInstagram ? (
          <div className="flex flex-col items-center gap-0.5">
            <Share2 className="h-4 w-4" />
            <span className="text-[8px] text-white/70">—</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <Repeat2 className="h-4 w-4" />
            <span className="text-[8px] text-white/70">—</span>
          </div>
        )}
        <Bookmark className="h-3.5 w-3.5 opacity-80" />
      </div>

      {/* Bottom caption bar */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-2.5 pb-2.5 pt-6">
        <div className="flex items-center gap-1.5">
          {avatar}
          <span className="truncate text-[10px] font-semibold text-white">{handle}</span>
        </div>
        <div className="mt-1 line-clamp-2 text-[9px] leading-tight text-white/85">{captionText}</div>
        {!isInstagram && (
          <div className="mt-1 flex items-center gap-1 text-[8px] text-white/70">
            <Music2 className="h-2.5 w-2.5" /> original sound — {name}
          </div>
        )}
      </div>
    </div>
  );
}
