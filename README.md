# Latifa 2026 Album Rollout Marketing Dashboard

A tech-noir inspired marketing command center for managing Latifa's 2026 album rollout campaign, featuring 36+ influencer creators, real-time collaboration, and advanced analytics.

## Features

### Dashboard Pages
- **Overview Dashboard** - Key metrics, campaign HUD, platform analytics, influencer pipeline, and 2026 rollout timeline
- **Creators Directory** - Searchable, filterable list of 36 influencers with platform, tier, followers, engagement, pricing, and status
- **Asset Library** - Gallery view with briefs, audio files, artwork, videos, and real-time collaboration threads

### Design System
- Tech-noir glassmorphism with animated mesh gradient background
- Magnetic buttons with physics-based cursor tracking
- Spotlight hover effects on interactive cards
- Viral triggers marquee (infinite scroll)
- Role-based access control (Marketing Manager, Team Member, Client)

### Data
- **36 Confirmed Creators** across all tiers:
  - **Mega**: Sherif Khalid (11.2M), Ozooo19 (10.6M)
  - **Featured**: Zyad Elshazly, Pasmala, Bassant, Haneen Hena, and 2 more
  - **Macro**: Abdullah El Tourky, Shehab Eldin, Gehad Hassan, and 9 more
  - **Mid**: 12 creators with 5.8M–1.3M followers
  - **Micro**: 5 creators with 163K–10.7K followers
- Accurate follower counts, engagement rates, platform assignments
- Total campaign pricing: ~$600K+

### Technology Stack
- **Framework**: TanStack Start (React 19 + Vite)
- **Styling**: Tailwind CSS v4 with OKLCH color system
- **Animation**: Framer Motion (physics + magnetic effects)
- **Charts**: Recharts (area, radial bar, line charts)
- **Icons**: Lucide React
- **Routing**: TanStack Router (file-based)
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites
- Node.js 18+
- npm, pnpm, or yarn

### Installation

```bash
# Extract the ZIP file, then:
cd latifa-dashboard

# Install dependencies
pnpm install
# or: npm install / yarn install

# Start development server
pnpm dev
# or: npm run dev / yarn dev
```

The app will start at `http://localhost:5173`

### Build for Production

```bash
pnpm build
# or: npm run build / yarn build
```

The production build will be optimized and ready for deployment.

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── AppShell.tsx      # Layout wrapper with sidebar
│   ├── MeshGradient.tsx  # Animated background gradient
│   ├── SpotlightCard.tsx # Spotlight hover effect card
│   ├── MagneticButton.tsx# Physics-based button
│   ├── Marquee.tsx       # Viral triggers text marquee
│   └── ...               # Other components
├── routes/               # File-based route definitions
│   ├── __root.tsx        # Root layout with error boundary
│   ├── index.tsx         # Dashboard overview
│   ├── creators.tsx      # Influencer directory
│   └── assets.tsx        # Asset library
├── lib/
│   ├── mock-data.ts      # 36 creator data + metrics
│   ├── role-context.tsx  # Role-based access control
│   └── ...               # Utilities
├── styles.css            # Global animations & utilities
├── router.tsx            # Router configuration
└── start.ts              # TanStack Start initialization
```

## Usage

### Accessing Different Sections
- **Dashboard**: Navigate to `/` (home)
- **Creators**: Navigate to `/creators` or click "Influencer Directory" link
- **Assets**: Navigate to `/assets` or click "Asset Library" link

### Role Switching
Toggle between three roles in the sidebar:
- **Marketing Manager**: Full access including pricing
- **Team Member**: Limited pricing visibility
- **Client**: View-only access, pricing hidden

### Customizing Creator Data
Edit `/src/lib/mock-data.ts` to update:
- Creator list (`creators` array)
- Campaign phases (`rolloutPhases`)
- Platform statistics (`platformStats`)
- Metrics and pipeline data

## Deployment

### Deploy to Vercel
```bash
# Push to GitHub, then:
# 1. Connect repo to Vercel
# 2. Vercel auto-detects TanStack Start
# 3. Deploy automatically

# Or use Vercel CLI:
vercel deploy
```

### Deploy to Other Platforms
The build output in `dist/` can be deployed to any static host or server supporting Node.js.

## Troubleshooting

### Dev Server Issues
- Clear `.vite` cache: `rm -rf .vite`
- Restart dev server: `pnpm dev`
- Check port 5173 isn't in use

### Build Errors
- Delete `node_modules` and reinstall: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Ensure Node.js version is 18+: `node --version`

### Styling Issues
- Tailwind CSS v4 is configured in `tailwind.config.ts`
- OKLCH colors defined in `src/styles.css`
- Ensure CSS is properly compiled before viewing

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

## License
This project is proprietary and confidential.

## Contact
For questions or support, contact the development team.
