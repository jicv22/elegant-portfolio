import type { Metadata } from "next";
import { ContactRail } from "@/components/web/contact/ContactRail";
import { Hero } from "@/components/web/hero/Hero";
import { ProjectsSection } from "@/components/web/projects/ProjectsSection";
import { TechnologiesSection } from "@/components/web/technologies/TechnologiesSection";
import { SiteNavbar } from "@/components/web/nav/SiteNavbar";
import { siteSections } from "@/config/site";

export const metadata: Metadata = {
  title: "Desarrollo Web",
  description:
    "Desarrollo web a medida. Sitios y productos digitales para tu negocio.",
};

export default function Home() {
  return (
    <main className="bg-background pb-24 text-foreground md:pb-0">
      <SiteNavbar />
      <ContactRail />
      <Hero />
      <TechnologiesSection />
      <ProjectsSection />
      <section
        id={siteSections.contact}
        className="flex min-h-[50dvh] items-center justify-center border-t border-border px-6 py-24"
      >
        <p className="text-center text-muted">Contacto — próximamente</p>
      </section>
    </main>
  );
}
