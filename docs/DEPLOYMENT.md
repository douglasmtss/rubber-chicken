# Deployment Guide

## Vercel (Recommended)

1. Push the repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Vercel will auto-detect Next.js — no additional configuration needed.
4. Set environment variables in the Vercel dashboard if needed.
5. Click **Deploy**.

### Environment Variables

| Variable | Description |
|---|---|
| `NODE_ENV` | Set to `production` automatically by Vercel |

## Netlify

1. Push to GitHub.
2. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git".
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Install the **Next.js Runtime** plugin from the Netlify plugin directory.

## Google AdSense Setup

1. Sign up at [Google AdSense](https://www.google.com/adsense/).
2. Get your publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`).
3. Replace `ca-pub-XXXXXXXXXXXXXXXX` in:
   - `src/app/layout.tsx` (Script src)
   - `src/components/AdSense.tsx` (data-ad-client)
4. Replace the ad slot IDs (`1234567890`, `0987654321`) in `src/app/page.tsx` with your actual ad unit slot IDs.

## PWA Icons

Icons are pre-generated at `public/icons/`. To regenerate:
```bash
node -e "require('./scripts/generate-icons')"
```

## Performance Checklist

- [ ] 3D model is loaded from `/public` (static, CDN-cached)
- [ ] Audio files are loaded on first user interaction (lazy)
- [ ] AdSense script uses `strategy="lazyOnload"`
- [ ] `next-pwa` enabled in production (disabled in dev)
- [ ] Images use `next/image` for optimization
