# Architecture Overview

## Project Structure

```
rubber-chicken/
├── src/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout (metadata, fonts, AdSense script)
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles (Tailwind v4)
│   ├── components/
│   │   ├── ChickenViewer.tsx       # Three.js 3D model viewer (@react-three/fiber)
│   │   ├── ChickenViewerClient.tsx # Dynamic (no-SSR) wrapper for the viewer
│   │   ├── InstallButton.tsx       # PWA install prompt button
│   │   ├── AdSense.tsx             # Google AdSense unit component
│   │   └── Footer.tsx              # Footer with social links
│   ├── hooks/
│   │   └── useChickenSound.ts  # Howler.js sound management hook
│   └── __tests__/             # Unit tests (Jest + Testing Library)
├── public/
│   ├── funny_rubber_chicken.glb   # 3D model asset
│   ├── sounds/                    # Audio files (MP3)
│   ├── icons/                     # PWA icon set (72px–512px)
│   └── manifest.json              # Web App Manifest
├── docs/                      # Project documentation
├── next.config.ts             # Next.js + next-pwa configuration
├── jest.config.ts             # Jest configuration
├── .prettierrc                # Prettier formatting rules
└── eslint.config.mjs          # ESLint configuration
```

## Key Libraries

| Library | Purpose |
|---|---|
| `next` v15+ | React framework with App Router |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | Three.js helpers (OrbitControls, GLTFLoader, etc.) |
| `three` | 3D rendering engine |
| `howler` | Cross-browser audio playback |
| `next-pwa` | Service worker + PWA support |
| `tailwindcss` v4 | Utility-first CSS framework |
| `lucide-react` | Icon library |

## Data Flow

1. Page loads → `ChickenViewerClient` dynamically imports `ChickenViewer` (client-only)
2. `ChickenViewer` renders a Three.js Canvas with `OrbitControls` (zoom/rotate)
3. Click on model → `onSqueak()` → `useChickenSound.playSound()` → random Howl plays
4. `InstallButton` listens for `beforeinstallprompt` event (browser fires when PWA installable)
5. AdSense script loads lazily via `next/script` with `strategy="lazyOnload"`
