"use client";

import dynamic from "next/dynamic";
import { pinFieldHeroProfile } from "@/config/pin-field";
import { siteSections } from "@/config/site";
import { HeroContent } from "@/components/web/hero/HeroContent";
import { usePinFieldRuntime } from "@/hooks/use-pin-field-runtime";
import { useState } from "react";

const HeroPinBackground = dynamic(
  () =>
    import("@/components/web/hero/HeroPinBackground").then(
      (module) => module.HeroPinBackground,
    ),
  { ssr: false },
);

export function HeroStage() {
  const [trackElement, setTrackElement] = useState<HTMLElement | null>(null);
  const runtime = usePinFieldRuntime(trackElement, pinFieldHeroProfile, {
    globalPointerTracking: true,
  });

  return (
    <section
      id={siteSections.home}
      className="relative min-h-dvh bg-background"
      aria-label="Hero"
    >
      <div ref={setTrackElement} className="relative h-dvh overflow-hidden">
        <HeroPinBackground runtime={runtime} />
        <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none relative z-10 flex h-full items-center justify-start px-12 py-28 sm:px-16 md:px-20 lg:px-28 xl:px-36 2xl:px-44">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
