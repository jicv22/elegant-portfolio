"use client";

import { pinFieldHeroProfile } from "@/config/pin-field";
import { PinFieldBackground } from "@/components/effects/pin-field/PinFieldBackground";
import type { PinFieldRuntimeState } from "@/hooks/use-pin-field-runtime";

type HeroPinBackgroundProps = {
  runtime: PinFieldRuntimeState;
};

export function HeroPinBackground({ runtime }: HeroPinBackgroundProps) {
  return (
    <PinFieldBackground
      profile={pinFieldHeroProfile}
      runtime={runtime}
      className="hero-pin-background"
    />
  );
}
