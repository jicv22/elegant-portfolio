import type { PinFieldProfileConfig } from "@/lib/pin-field/types";
import { CapsuleGeometry, Vector3 } from "three";

export function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function getCameraIntroStart(
  lookAt: [number, number, number],
  position: [number, number, number],
  factor: number,
) {
  const target = new Vector3(...lookAt);
  const end = new Vector3(...position);

  return target.lerp(end, factor);
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const t = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));

  return t * t * (3 - 2 * t);
}

export function getPinFieldPlaneSize(
  gridSize: number,
  spacing: number,
) {
  return gridSize * spacing + spacing * 2;
}

export function getPinGridPosition(
  index: number,
  gridSize: number,
  spacing: number,
) {
  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const center = (gridSize - 1) / 2;

  return {
    x: (col - center) * spacing,
    z: (row - center) * spacing,
  };
}

export function getWaveHeight(
  x: number,
  z: number,
  time: number,
  profile: PinFieldProfileConfig,
) {
  const { maxHeight, wave } = profile;
  const primary = Math.sin(
    x * wave.frequencyX + z * wave.frequencyZ + time * wave.speed,
  );
  const cross = Math.sin(
    x * wave.frequencyX * 0.72 - time * wave.speed * 0.88,
  ) * Math.cos(z * wave.frequencyZ * 0.94 + time * wave.speed * 0.62);
  const combined = primary * (1 - wave.crossMix) + cross * wave.crossMix;

  return maxHeight + combined * wave.amplitude;
}

/** Full capsule height — geometry never scales, only translates on Y. */
export function getPinGeometryHeight(profile: PinFieldProfileConfig) {
  return profile.maxHeight;
}

export function createPinGeometry(profile: PinFieldProfileConfig) {
  const { pinRadius, pinCapSegments, pinRadialSegments, maxHeight } = profile;
  const cylinderLength = Math.max(maxHeight - pinRadius * 2, 0.01);

  return new CapsuleGeometry(
    pinRadius,
    cylinderLength,
    pinCapSegments,
    pinRadialSegments,
  );
}

export function clampPinHeight(height: number, profile: PinFieldProfileConfig) {
  return Math.max(height, profile.minHeight);
}

/** Y center so `visibleHeight` protrudes above ground (y = 0); excess is buried. */
export function getPinCenterY(
  visibleHeight: number,
  profile: PinFieldProfileConfig,
) {
  return visibleHeight - getPinGeometryHeight(profile) / 2;
}

export function resolvePinFieldGridSize(profile: PinFieldProfileConfig) {
  if (typeof window === "undefined") {
    return profile.gridSize;
  }

  const width = window.innerWidth;

  if (width < 768 && profile.gridSizeSm) {
    return profile.gridSizeSm;
  }

  if (width < 1280 && profile.gridSizeMd) {
    return profile.gridSizeMd;
  }

  return profile.gridSize;
}
