import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gamedev",
};

export default function GamedevPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-6 text-center text-foreground">
      <p className="text-sm uppercase tracking-[0.3em] text-muted">MVP</p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground">
        Desarrollo de Videojuegos
      </h1>
      <p className="max-w-xl text-lg text-secondary">
        Esta sección se completará en una próxima iteración del portafolio.
      </p>
      <Link
        href="/"
        className="rounded-full border border-border px-5 py-2 text-sm transition-colors hover:border-border-strong hover:bg-surface-overlay"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
