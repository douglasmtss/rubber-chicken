import { ChickenViewer } from "@/components/ChickenViewerClient";
import { InstallButton } from "@/components/InstallButton";

export default function Home() {
  return (
    <>
      <ChickenViewer />

      <header className="flex items-center justify-between border-b border-slate-700/50 bg-slate-900/80 px-4 py-3 backdrop-blur-sm fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-hidden="true">🐔</span>
          <h1 className="text-lg font-bold text-amber-400 sm:text-xl">
            Rubber Chicken 3D Viewer
          </h1>
        </div>
        <InstallButton />
      </header>
    </>
  );
}
