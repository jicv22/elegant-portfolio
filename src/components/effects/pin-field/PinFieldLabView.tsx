"use client";

import { pinFieldLabProfile } from "@/config/pin-field";
import { PinFieldBackground } from "@/components/effects/pin-field/PinFieldBackground";
import { PinFieldLabChrome } from "@/components/effects/pin-field/PinFieldLabChrome";
import { usePinFieldRuntime } from "@/hooks/use-pin-field-runtime";
import { useState } from "react";

export function PinFieldLabView() {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    null,
  );
  const runtime = usePinFieldRuntime(containerElement, pinFieldLabProfile);
  const { pointerHandlers } = runtime;

  return (
    <main
      ref={setContainerElement}
      className="relative h-dvh w-full overflow-hidden bg-zinc-950"
      {...pointerHandlers}
    >
      <PinFieldLabChrome gridSize={runtime.gridSize} />
      <PinFieldBackground profile={pinFieldLabProfile} runtime={runtime} />
    </main>
  );
}
