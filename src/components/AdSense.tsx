'use client';

import { useEffect, useRef } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
    __pwaPrompt: Event | null;
  }
}

export function AdSense({ adSlot, adFormat = 'auto', className = '' }: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense script may not be loaded in development
    }
  }, []);

  return (
    <div className={`adsense-container ${className}`} aria-label="Advertisement">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        suppressHydrationWarning
      />
    </div>
  );
}
