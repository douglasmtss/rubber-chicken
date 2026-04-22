import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rubber Chicken 3D Viewer',
  description:
    'An interactive 3D rubber chicken viewer. Click to hear funny squeak sounds! Works on mobile and desktop.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Rubber Chicken',
  },
  openGraph: {
    title: 'Rubber Chicken 3D Viewer',
    description: 'Interactive 3D rubber chicken with funny sounds!',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#f59e0b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        {/* Plain script tag avoids Next.js injecting data-nscript, which AdSense rejects */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-slate-900 text-white">
        {/* Capture beforeinstallprompt before React hydrates */}
        <Script src="/pwa-prompt.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
