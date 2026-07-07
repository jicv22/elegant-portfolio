"use client";

import type { PinFieldProfileConfig } from "@/lib/pin-field/types";
import type { PinFieldRuntimeState } from "@/hooks/use-pin-field-runtime";
import { createContext, useContext } from "react";

export type PinFieldRuntime = Omit<
  PinFieldRuntimeState,
  "frameloop" | "pointerHandlers"
>;

type PinFieldContextValue = PinFieldRuntime & {
  profile: PinFieldProfileConfig;
  sceneReady: boolean;
  onSceneReady: () => void;
};

const PinFieldContext = createContext<PinFieldContextValue | null>(null);

export function PinFieldProvider({
  profile,
  runtime,
  sceneReady,
  onSceneReady,
  children,
}: {
  profile: PinFieldProfileConfig;
  runtime: PinFieldRuntime;
  sceneReady: boolean;
  onSceneReady: () => void;
  children: React.ReactNode;
}) {
  return (
    <PinFieldContext.Provider
      value={{ profile, ...runtime, sceneReady, onSceneReady }}
    >
      {children}
    </PinFieldContext.Provider>
  );
}

export function usePinFieldContext() {
  const context = useContext(PinFieldContext);

  if (!context) {
    throw new Error("usePinFieldContext must be used within PinFieldProvider");
  }

  return context;
}
