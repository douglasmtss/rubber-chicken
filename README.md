# Rubber Chicken 3D Viewer

An interactive **Progressive Web App (PWA)** that renders a 3D rubber chicken model. Click it to hear funny squeak sounds! Built with Next.js, Three.js, and Tailwind CSS.

## Features

- **Interactive 3D Model** — Zoom, rotate, and click the rubber chicken
- **Funny Sounds** — 3 random squeak sounds via Howler.js
- **PWA Support** — Install on mobile and desktop devices
- **Responsive Design** — Works seamlessly on all screen sizes
- **Google AdSense** — Strategic ad placement
- **Accessible** — WCAG-compliant markup
- **TypeScript** — Fully typed codebase
- **Unit Tests** — Jest + Testing Library

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone https://github.com/yourusername/rubber-chicken.git
cd rubber-chicken
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## Code Quality

```bash
# Lint
npm run lint

# Format with Prettier
npm run format

# Check formatting
npm run format:check
```

## Project Structure

```
src/
├── app/            # Next.js App Router
├── components/     # React components
├── hooks/          # Custom hooks
└── __tests__/      # Unit tests
public/
├── sounds/         # MP3 audio files
├── icons/          # PWA icons
└── manifest.json   # Web App Manifest
docs/               # Project documentation
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full details.

## Installing as a PWA

On mobile Chrome/Edge: tap the browser menu → **Add to Home Screen**.
On desktop Chrome/Edge: click the install icon in the address bar.
The **Install App** button also appears in the header when installation is available.

## Deployment

The app is optimized for deployment on **Vercel** (recommended) or **Netlify**.
See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## AdSense Configuration

Replace `ca-pub-XXXXXXXXXXXXXXXX` in `src/app/layout.tsx` and `src/components/AdSense.tsx` with your actual Google AdSense publisher ID. Update ad slot IDs in `src/app/page.tsx`.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "feat: add amazing feature"`
4. Push: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) format.

## FAQ

**Q: The 3D model does not load.**
A: Make sure `funny_rubber_chicken.glb` is in the `public/` folder.

**Q: No sound when clicking the chicken.**
A: Browsers require a user interaction before playing audio. Click anywhere on the page first, then click the chicken.

**Q: The PWA install button does not appear.**
A: The button only appears when the browser determines the app is installable (HTTPS required, manifest present, service worker registered). In development mode PWA is disabled.

**Q: How do I add my own sounds?**
A: Add MP3 files to `public/sounds/` and update the `SOUND_PATHS` array in `src/hooks/useChickenSound.ts`.

**Q: How do I change the 3D model?**
A: Replace `public/funny_rubber_chicken.glb` with your GLB/GLTF file and update the path in `src/components/ChickenViewer.tsx`.

**Q: Can I use this commercially?**
A: Check the LICENSE file. The code is MIT licensed; the 3D model and audio assets have their own licenses.

## Accessibility

- All interactive elements have ARIA labels
- Keyboard navigation supported
- Screen reader friendly markup
- Color contrast meets WCAG AA standards
- Touch gestures via Three.js OrbitControls

## License

MIT License — see [LICENSE](LICENSE) for details.

