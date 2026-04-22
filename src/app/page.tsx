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

      <main className="flex flex-1 flex-col" id="main-content">
        <div className="relative w-full flex-1">
          <ChickenViewer />
        </div>
        <div className="w-full bg-slate-800/50 px-4 py-2">
          <AdSense adSlot="0987654321" adFormat="rectangle" className="mx-auto max-w-md" />
        </div>
      </main>

      <Footer />
    </>
  );
}
