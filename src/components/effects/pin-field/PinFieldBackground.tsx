"use client";

import {
  PinFieldProvider,
  type PinFieldRuntime,
} from "@/components/effects/pin-field/PinFieldContext";
import { PinFieldScene } from "@/components/effects/pin-field/PinFieldScene";
import type { PinFieldProfileConfig } from "@/lib/pin-field/types";
import { cn } from "@/lib/cn";
import { Canvas } from "@react-three/fiber";
import type { CSSProperties } from "react";

type PinFieldBackgroundProps = {
  profile: PinFieldProfileConfig;
  runtime: PinFieldRuntime & { frameloop: "always" | "never" };
  className?: string;
  style?: CSSProperties;
};

export function PinFieldBackground({
  profile,
  runtime,
  className,
  style,
}: PinFieldBackgroundProps) {
  const { camera } = profile;
  const {
    frameloop,
    gridSize,
    hoveringRef,
    isActiveRef,
    isInteractiveRef,
    prefersReducedMotionRef,
    pointerNdcRef,
  } = runtime;

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={style}
      aria-hidden
    >
      <PinFieldProvider
        profile={profile}
        runtime={{
          gridSize,
          hoveringRef,
          isActiveRef,
          isInteractiveRef,
          prefersReducedMotionRef,
          pointerNdcRef,
        }}
      >
        <Canvas
          className="h-full w-full touch-none pointer-events-none"
          dpr={profile.dpr}
          frameloop={frameloop}
          camera={{
            position: camera.position,
            fov: camera.fov,
            near: camera.near,
            far: camera.far,
          }}
          onCreated={({ camera: activeCamera }) => {
            activeCamera.lookAt(...camera.lookAt);
          }}
        >
          <PinFieldScene />
        </Canvas>
      </PinFieldProvider>
    </div>
  );
}
