"use client";

import { PinFieldCameraRig } from "@/components/effects/pin-field/PinFieldCameraRig";
import { PinGrid } from "@/components/effects/pin-field/PinGrid";
import { usePinFieldContext } from "@/components/effects/pin-field/PinFieldContext";

const DEFAULT_LIGHTING = {
  skyColor: "#fafafa",
  hemisphereGroundColor: "#3f3f46",
  keyLightColor: "#ffffff",
  fillLightColor: "#dbeafe",
  rimLightColor: "#93c5fd",
  accentLightColor: "#f8fafc",
  groundLightColor: "#e2e8f0",
  keyLightPosition: [6, 12, 7] as [number, number, number],
};

export function PinFieldScene() {
  const { profile, gridSize } = usePinFieldContext();
  const { lighting } = profile;
  const skyColor = lighting.skyColor ?? DEFAULT_LIGHTING.skyColor;
  const hemisphereGroundColor =
    lighting.hemisphereGroundColor ?? DEFAULT_LIGHTING.hemisphereGroundColor;
  const keyLightColor = lighting.keyLightColor ?? DEFAULT_LIGHTING.keyLightColor;
  const fillLightColor =
    lighting.fillLightColor ?? DEFAULT_LIGHTING.fillLightColor;
  const rimLightColor = lighting.rimLightColor ?? DEFAULT_LIGHTING.rimLightColor;
  const accentLightColor =
    lighting.accentLightColor ?? DEFAULT_LIGHTING.accentLightColor;
  const groundLightColor =
    lighting.groundLightColor ?? DEFAULT_LIGHTING.groundLightColor;
  const keyLightPosition =
    lighting.keyLightPosition ?? DEFAULT_LIGHTING.keyLightPosition;

  return (
    <>
      <color attach="background" args={[profile.baseColor]} />
      <fog
        attach="fog"
        args={[profile.baseColor, profile.fog.near, profile.fog.far]}
      />
      <ambientLight intensity={lighting.ambientIntensity} />
      <hemisphereLight
        color={skyColor}
        groundColor={hemisphereGroundColor}
        intensity={lighting.hemisphereIntensity}
      />
      <directionalLight
        position={keyLightPosition}
        intensity={lighting.keyLightIntensity}
        color={keyLightColor}
      />
      <directionalLight
        position={[-7, 9, -5]}
        intensity={lighting.fillLightIntensity}
        color={fillLightColor}
      />
      <directionalLight
        position={[0, 5, -9]}
        intensity={lighting.rimLightIntensity}
        color={rimLightColor}
      />
      <pointLight
        position={[3, 6, 6]}
        intensity={lighting.accentLightIntensity}
        color={accentLightColor}
        distance={20}
        decay={2}
      />
      <pointLight
        position={[-2, 3, 4]}
        intensity={lighting.groundLightIntensity}
        color={groundLightColor}
        distance={14}
        decay={2}
      />

      {profile.cameraIntro ? <PinFieldCameraRig /> : null}
      <PinGrid key={gridSize} />
    </>
  );
}
