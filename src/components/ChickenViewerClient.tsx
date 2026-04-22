'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

const ChickenViewer = dynamic(
  () => import('./ChickenViewer').then((mod) => ({ default: mod.ChickenViewer })),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-full w-full items-center justify-center"
        role="status"
        aria-label="Loading 3D model"
      >
        <div className="flex flex-col items-center gap-3 text-amber-400">
          <Loader2 className="h-10 w-10 animate-spin" aria-hidden="true" />
          <p className="text-sm text-slate-400">Loading 3D model...</p>
        </div>
      </div>
    ),
  }
);

export { ChickenViewer };
