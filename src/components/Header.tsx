'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { InstallButton } from '@/components/InstallButton';

const GitHubIcon = () => (
  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const ShareIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

export function Header() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: 'Rubber Chicken 3D Viewer',
      text: 'Aperte o frango de borracha e ouça o barulho! 🐔',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setOpen(false);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled or share failed
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
      {/* Copy toast */}
      {copied && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-900 text-sm font-semibold px-4 py-2 rounded-full shadow-lg pointer-events-none">
          Link copiado!
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-hidden="true">🐔</span>
          <h1 className="text-lg font-bold text-amber-400 sm:text-xl">
            Rubber Chicken 3D Viewer
          </h1>
        </div>

        {/* Desktop actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={handleShare}
            className="text-slate-400 transition hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
            aria-label={copied ? 'Link copiado!' : 'Compartilhar app'}
            title={copied ? 'Link copiado!' : 'Compartilhar'}
          >
            <ShareIcon />
          </button>
          <Link
            href="https://github.com/douglasmtss/rubber-chicken"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 transition hover:text-amber-400"
            aria-label="GitHub repository (opens in new tab)"
          >
            <GitHubIcon />
          </Link>
          <InstallButton />
        </div>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded focus:outline-none focus:ring-2 focus:ring-amber-400"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          <span className={`block h-0.5 w-6 bg-slate-300 transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-6 bg-slate-300 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-slate-300 transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-slate-700/50 bg-slate-900/95 px-4 py-4 flex flex-col gap-4">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 text-slate-300 transition hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded"
            aria-label={copied ? 'Link copiado!' : 'Compartilhar app'}
          >
            <ShareIcon />
            <span className="text-sm font-medium">{copied ? 'Link copiado!' : 'Compartilhar'}</span>
          </button>
          <Link
            href="https://github.com/douglasmtss/rubber-chicken"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-300 transition hover:text-amber-400"
            aria-label="GitHub repository (opens in new tab)"
            onClick={() => setOpen(false)}
          >
            <GitHubIcon />
            <span className="text-sm font-medium">GitHub</span>
          </Link>
          <InstallButton />
        </div>
      )}
    </header>
  );
}
