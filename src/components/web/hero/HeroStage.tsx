"use client";

import dynamic from "next/dynamic";
import { pinFieldHeroProfile } from "@/config/pin-field";
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
  const [sectionElement, setSectionElement] = useState<HTMLElement | null>(
    null,
  );
  const runtime = usePinFieldRuntime(sectionElement, pinFieldHeroProfile);
  const { pointerHandlers } = runtime;

  return (
    <section
      ref={setSectionElement}
      id="inicio"
      className="relative min-h-dvh bg-background"
      aria-label="Presentación"
    >
      <div
        className="relative h-dvh overflow-hidden"
        {...pointerHandlers}
      >
        <HeroPinBackground runtime={runtime} />
        <div className="hero-scrim pointer-events-none absolute inset-0" aria-hidden />
        <div className="pointer-events-none relative z-10 flex h-full items-center justify-start px-6 py-28 sm:px-10 lg:px-14 xl:px-16">
          <HeroContent />
        </div>
      </div>
    </section>
  );
}
