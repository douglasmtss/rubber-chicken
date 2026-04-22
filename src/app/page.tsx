import { ChickenViewer } from "@/components/ChickenViewerClient";
import { InstallButton } from "@/components/InstallButton";
import { AdSense } from "@/components/AdSense";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-slate-700/50 bg-slate-900/80 px-4 py-3 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-hidden="true">🐔</span>
          <h1 className="text-lg font-bold text-amber-400 sm:text-xl">
            Rubber Chicken 3D Viewer
          </h1>
        </div>
        <InstallButton />
      </header>

      <div className="w-full bg-slate-800/50 px-4 py-1">
        <AdSense adSlot="1234567890" adFormat="horizontal" className="mx-auto max-w-5xl" />
      </div>

      <main className="flex flex-1 flex-col items-center" id="main-content">
        <div className="flex w-full flex-1 flex-col items-center gap-4 px-4 py-4">
          <p className="text-center text-sm text-slate-400">
            Click the chicken to hear it squeak! Use mouse scroll or pinch to zoom.
          </p>
          <div className="relative w-full flex-1" style={{ minHeight: "60vh" }}>
            <ChickenViewer />
          </div>
          <p className="text-xs text-slate-500" aria-live="polite">
            Drag to rotate · Scroll to zoom · Click to squeak
          </p>
        </div>
        <div className="w-full bg-slate-800/50 px-4 py-2">
          <AdSense adSlot="0987654321" adFormat="rectangle" className="mx-auto max-w-md" />
        </div>
      </main>

      <Footer />
    </>
  );
}
