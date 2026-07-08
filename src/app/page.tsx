import type { Metadata } from "next";
import { ContactRail } from "@/components/web/contact/ContactRail";
import { ContactSection } from "@/components/web/contact/ContactSection";
import { HeroStage } from "@/components/web/hero/HeroStage";
import { ProjectsSection } from "@/components/web/projects/ProjectsSection";
import { TechnologiesSection } from "@/components/web/technologies/TechnologiesSection";
import { SiteNavbar } from "@/components/web/nav/SiteNavbar";
import { SiteFooter } from "@/components/web/footer/SiteFooter";

export default function Home() {
  return (
    <main className="bg-background pb-24 text-foreground md:pb-0">
      <SiteNavbar />
      <ContactRail />
      <HeroStage />
      <TechnologiesSection />
      <ProjectsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
