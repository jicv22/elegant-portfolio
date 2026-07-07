import { pinFieldLabProfile } from "@/config/pin-field";

type PinFieldLabChromeProps = {
  gridSize: number;
};

export function PinFieldLabChrome({ gridSize }: PinFieldLabChromeProps) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between gap-4 p-6 sm:p-8">
      <div className="max-w-md text-left">
        <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
          Lab / efecto
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Campo de pines interactivo
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
          Mueve el cursor sobre la malla. Los pines cercanos se hunden; los
          alejados permanecen elevados. Sin modelo 3D: todo es geometría
          procedural.
        </p>
      </div>

      <div className="hidden rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3 text-right text-xs text-zinc-500 backdrop-blur-sm lg:block">
        <p>
          {gridSize}×{gridSize} pines
        </p>
        <p className="mt-1">radio {pinFieldLabProfile.influenceRadius}</p>
      </div>
    </div>
  );
}
