# RIPPL — What Still Needs Work
*Last updated: July 14, 2026 · Zeyad Sayedin*

This is a running list of everything that's missing, broken, or only half-done across the landing page, dashboard, and system. Organized by priority — top of each section = do it first.

---

## 1. Landing Page (`/`)

### Broken / needs fixing now

- [ ] **h-screen overflow** — on short laptop screens (13") the portals get cut off. Need to test at 768px height and either compress spacing or switch to `min-h-screen` with scroll.
- [ ] **Video loading state** — there's no placeholder while the first video loads. A black flash happens before the first frame. Add a skeleton or a static fallback image that fades out once the video is ready.
- [ ] **Videos might not autoplay** — browsers block autoplay in some contexts (especially when not muted in Safari). Already using `muted` but worth testing cross-browser. Add a fallback that shows the PNG overlay on a static gradient if all videos fail.
- [ ] **Mobile layout is unstyled** — the metric cards stack awkwardly, the nav pill disappears, and the portals go single-column but the font sizes are too big. Need a proper mobile breakpoint pass.
- [ ] **Mobile nav is missing** — spec calls for a hamburger menu (Menu/X icon crossfade) that opens a fullscreen overlay with staggered link entrance. Currently desktop nav just disappears on mobile with nothing replacing it.
- [ ] **Filter tabs do nothing** — clicking "Last 24 Hours" / "Active Campaigns" / "Projected Q3" visually toggles the button but the metric cards don't change. Need to wire up at least three sets of mock data for each filter state.

### Needs building

- [ ] **Platform hub click behavior** — right now all 5 icons navigate to `/dashboard`. They should each navigate to a platform-specific dashboard (`/dashboard/tiktok`, `/dashboard/instagram`, etc.) which doesn't exist yet. For now, could show a toast/modal saying "TikTok dashboard coming soon" so the interaction isn't dead.
- [ ] **Ambient glow transition is abrupt** — the per-platform radial gradient overlay fades in fine but when you move between platforms fast the glow jumps. Use a single overlay that interpolates color, or stagger the out-transition slightly.
- [ ] **Scene labels** — the scene switcher dots at bottom-right should show the scene name (Campaign Launch / Creator Network / Sound Strategy / Night Ops) on hover via a tooltip or a small fade-in label.
- [ ] **"Enter" button in nav** — should navigate to `/dashboard` (it does via `Link`) but also needs a subtle hover animation. The current plain `hover:bg-white/90` is fine but could use a slight scale.
- [ ] **Nav link behavior** — "Campaigns", "Creators", "Analytics", "Assets" in the top nav pill don't navigate anywhere. They should link to `/dashboard`, `/creators`, `/dashboard` (analytics tab), and `/assets` respectively.
- [ ] **Portal role wiring** — clicking a portal card navigates to `/dashboard` but doesn't set the user's role. The dashboard just shows the default Marketing Manager view regardless of which portal was clicked. Need to either pass role as a search param or store it in context before navigating.

---

## 2. Dashboard — Overview (`/dashboard`)

### Needs fixing

- [ ] **"+ New campaign" button does nothing** — should open a slide-over panel or modal to create a campaign. At minimum a placeholder modal with a "coming soon" message.
- [ ] **"Export brief" button does nothing** — should generate/download a PDF brief for the active campaign.
- [ ] **"Full report" button does nothing** — opens nothing. Should either expand the chart to fullscreen or navigate to a dedicated analytics page.
- [ ] **Phase Tracker dates are hardcoded** — the rollout phases still reference Jan–Jun 2026 (the old Latifa campaign). Need to either make these dynamic per-campaign or update the mock to reflect a generic Q3 2026 campaign.
- [ ] **Marquee viral triggers** — still feels a bit generic. Should feel more like live activity logs. Consider formatting them as `[2m ago] @handle did X` so they read more like a real feed.

### Needs building

- [ ] **Artist selector** — the whole point of RIPPL is that it works for any artist Zeyad runs. There's no way to switch the active artist/campaign. Need a dropdown or switcher in the header area showing which artist/campaign is active. Mock data should have at least 2-3 artists to switch between.
- [ ] **Role-based action menu** — per the spec, each view should show different quick actions based on who's logged in. Currently the sidebar role switcher changes `canSeePrice` and nothing else. The dashboard should surface different CTAs per role:
  - *Marketer:* "Push to Spark Ads", "Request Revision", "Approve Content"
  - *Creator:* "Submit New Draft", "View My Earnings", "Download Brief"  
  - *Manager:* "Approve Contract Amendment", "Verify Payout"
- [ ] **Budget burndown** — the campaign value card shows total value but no spend tracking. Should show a mini progress bar: total budget vs. spent so far.
- [ ] **Notification bell** — nothing alerts you when a creator submits, approves, or misses a deadline. Even a mock notification badge would help the UI feel alive.

---

## 3. Platform-Specific Dashboards

These don't exist yet. The spec calls for each platform to have its own dedicated view. Priority order based on what's most useful:

### TikTok Dashboard (`/dashboard/tiktok`) — build first

This is the most important platform for most campaigns. Needs:

- [ ] **Campaign Status card** — active campaign name, goal (e.g. "10M Views"), current progress bar, CPM and CPE live numbers.
- [ ] **Sound Performance section** — this is a TikTok-specific feature and the only place in the spec it's called out explicitly. Track the campaign's audio clip: Video Creations with Sound, Sound Velocity (creations/hr), Auditory Reach. This is genuinely useful and different from generic analytics.
- [ ] **Creatives & Assets panel** — masonry grid of drafted TikTok content. Each card shows a video thumbnail, resolution, creator handle, and approval status badge (Pending / Approved / Needs Revision). Inline playback is ideal but even a static preview with a play icon is a start.
- [ ] **Analytics chart** — daily views + engagement rate comparison (organic vs. paid/Spark Ads). Line chart, 14-day window.
- [ ] **Role-based action buttons** — "Push to Spark Ads" for Marketers, "Submit New Draft" for Creators, "Approve Contract" for Managers.

### Instagram Dashboard (`/dashboard/instagram`)

- [ ] Reels performance breakdown (Watch time, Saves, Shares)
- [ ] Story swipe-up rate (unique to Instagram)
- [ ] Creator grid showing which accounts posted and engagement per post
- [ ] Sponsored label compliance check (flag any posts missing #ad or #sponsored)

### Facebook Dashboard (`/dashboard/facebook`)

- [ ] Reach vs. engagement (Facebook's organic reach is usually much lower, worth calling out)
- [ ] Boost/ad spend tracker
- [ ] Video completion rate (Facebook watches are often low completion — important metric)

### YouTube Dashboard (`/dashboard/youtube`)

- [ ] View duration curve (where do viewers drop off?)
- [ ] Subscribe conversion from campaign content
- [ ] Revenue estimate if monetized

### X Dashboard (`/dashboard/x`)

- [ ] Impressions vs. engagement
- [ ] Thread performance if any creator posted threads
- [ ] Trending hashtag tracking

---

## 4. Creator Portal (Role: Creator)

When role = Creator, the dashboard should be completely different. Right now it's just the same dashboard with the price hidden. The creator needs their own tailored view:

- [ ] **My Deliverables** — what they owe: content type, due date, platform, brief link
- [ ] **My Performance** — their own stats only (not the full ecosystem). Views, comments, shares on their specific posts
- [ ] **My Earnings** — their confirmed fee, payment status (unpaid / processing / paid), payout date
- [ ] **Upload Draft** — a simple file upload area where they can submit a draft video/image with a note. Goes into the asset approval workflow
- [ ] **Brief Access** — download the campaign brief PDF

---

## 5. Manager Portal (Role: Manager/Talent Rep)

When role = Manager, the dashboard should show their client roster, not just one artist:

- [ ] **Roster overview** — all creators they manage, each with: current campaign status, deliverable count, earnings owed
- [ ] **Cross-platform summary** — consolidated reach for their entire client roster in one number
- [ ] **Payout verification** — a list of pending payments with Approve/Flag actions
- [ ] **Sub-user permissions** — ability to grant/revoke access for creators under their management

---

## 6. Asset Approval Workflow

The spec calls this out as a full feature (Option C in the "Next Steps"). Currently the `/assets` page is a static list with a comment thread. It needs:

- [ ] **Status pipeline** — assets should move through: Draft → Under Review → Approved / Needs Revision. Right now they just have a static `approval_status` field.
- [ ] **Inline feedback on video timeline** — the spec specifically mentions "leaves feedback directly on a TikTok draft video timeline." This means timecoded comments (click on a video, scrub to 0:12, leave a note: "remove this clip"). This is a significant build.
- [ ] **One-click approve / reject** — Marketer clicks Approve, status changes, creator gets notified
- [ ] **Revision request with note** — Marketer clicks "Request Revision", types a note, creator sees it in their portal

---

## 7. Campaign Creation Flow

There's no way to actually create a new campaign. The "+ New campaign" button is dead. A minimal version:

- [ ] **Campaign creation modal/sheet** — fields: Artist name, campaign name, start date, end date, total budget, target platforms (multi-select), goal type (Views / Followers / Sales), and KPI target
- [ ] **Creator assignment** — after creating a campaign, ability to add creators from the existing roster with their rate and deliverable type
- [ ] **Brief generator** — once a campaign has creators + deliverables, generate a brief PDF that can be sent to each creator

---

## 8. System / Technical debt

- [ ] **All data is hardcoded** — everything in `mock-data.ts` is static. Won't hurt for demos but any real usage needs either a JSON file that can be edited, or a Supabase connection.
- [ ] **Role state resets on refresh** — the role is stored in React state (in-memory). Switching to Creator and refreshing puts you back to Marketing Manager. Store in `localStorage` or a URL param.
- [ ] **No error boundaries** — if a chart crashes the whole page goes blank. Wrap each `SpotlightCard` section in an ErrorBoundary.
- [ ] **Sidebar active state for `/dashboard`** — the sidebar highlights `/` as active, not `/dashboard`. The `pathname === n.to` check needs to account for `/dashboard` being the Overview.
- [ ] **routeTree.gen.ts** — this was manually edited and will be overwritten the next time TanStack Router auto-regenerates. That's fine — the `/dashboard` route file exists so the router will pick it up correctly. Just don't be surprised when it rewrites it.
- [ ] **`Twitter` icon from lucide-react** — used for X/Twitter on the landing page. In newer versions of lucide this was renamed. If the icon renders blank, swap it for a simple SVG `<path>` of the X logo.

---

## 9. Nice to have (later)

These aren't blocking anything but would make RIPPL genuinely useful as a real product:

- [ ] **Creator outreach tracker** — who's been DM'd, who responded, who ghosted. Quick status tags.
- [ ] **WhatsApp link generator** — pre-written brief message ready to copy/send to each creator
- [ ] **Campaign comparison** — side-by-side view of two campaigns to see which performed better
- [ ] **Dark/light mode toggle** — the app is locked dark. Some clients prefer light mode for presentations.
- [ ] **PDF brief export** — generate a clean one-pager per campaign that can be shared with creators or clients
- [ ] **Activity log** — a simple audit trail of who did what and when (Marwan approved asset, Zeyad changed budget, etc.)
- [ ] **Bulk creator import** — paste a list of TikTok/Instagram handles and get back follower counts, engagement rates, and a suggested tier and price

---

## Priority order for next session

1. Fix landing page mobile + h-screen overflow
2. Wire platform hub icons to `/dashboard/tiktok` etc. (even if just a "coming soon" page)
3. Wire portal cards to set role before navigating
4. Build TikTok dashboard (the most complete spec item we have)
5. Build the asset approval status pipeline
6. Add artist switcher to sidebar/header
7. Add role-based action menu to dashboard

---

*RIPPL · Built by Zeyad Sayedin · © 2026 All rights reserved*
