import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Desarrollo Web",
};

export default function Home() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-zinc-950 px-6 text-center text-white">
      <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">MVP</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight">
        Desarrollo Web
      </h1>
      <p className="max-w-xl text-lg text-zinc-400">
        Esta sección se completará en una próxima iteración del portafolio.
      </p>
    </main>
  );
}
