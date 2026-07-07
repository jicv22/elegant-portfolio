import type { Metadata } from "next";
import { Hero } from "@/components/web/hero/Hero";

export const metadata: Metadata = {
  title: "Desarrollo Web",
  description:
    "Desarrollo web a medida. Sitios y productos digitales para tu negocio.",
};

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <section
        id="proyectos"
        className="flex min-h-[50dvh] items-center justify-center border-t border-border px-6 py-24"
      >
        <p className="text-center text-muted">Proyectos — próximamente</p>
      </section>
      <section
        id="contacto"
        className="flex min-h-[50dvh] items-center justify-center border-t border-border px-6 py-24"
      >
        <p className="text-center text-muted">Contacto — próximamente</p>
      </section>
    </main>
  );
}
