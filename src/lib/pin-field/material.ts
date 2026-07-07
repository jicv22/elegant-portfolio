import type { PinFieldProfileConfig } from "@/lib/pin-field/types";
import { MeshStandardMaterial } from "three";

export function getSurfaceColor(profile: PinFieldProfileConfig) {
  return profile.surfaceColor ?? profile.pinColor;
}

export function createSurfaceMaterial(profile: PinFieldProfileConfig) {
  return new MeshStandardMaterial({
    color: getSurfaceColor(profile),
    metalness: profile.materialMetalness,
    roughness: profile.materialRoughness,
  });
}
