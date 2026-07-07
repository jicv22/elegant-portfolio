export type PinFieldWaveConfig = {
  amplitude: number;
  speed: number;
  frequencyX: number;
  frequencyZ: number;
  crossMix: number;
};

export type PinFieldLightingConfig = {
  ambientIntensity: number;
  hemisphereIntensity: number;
  keyLightIntensity: number;
  fillLightIntensity: number;
  rimLightIntensity: number;
  accentLightIntensity: number;
  groundLightIntensity: number;
  skyColor?: string;
  hemisphereGroundColor?: string;
  keyLightColor?: string;
  fillLightColor?: string;
  rimLightColor?: string;
  accentLightColor?: string;
  groundLightColor?: string;
  keyLightPosition?: [number, number, number];
};

export type PinFieldCameraConfig = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  near: number;
  far: number;
};

export type PinFieldProfileConfig = {
  id: "lab" | "hero";
  gridSize: number;
  gridSizeMd?: number;
  gridSizeSm?: number;
  spacing: number;
  pinRadius: number;
  pinCapSegments: number;
  pinRadialSegments: number;
  maxHeight: number;
  minHeight: number;
  influenceRadius: number;
  heightLerp: number;
  mouseLerp: number;
  pinColor: string;
  pinColorPressed: string;
  /** When set, pins and ground share this color. */
  surfaceColor?: string;
  baseColor: string;
  groundColor: string;
  materialMetalness: number;
  materialRoughness: number;
  wave: PinFieldWaveConfig;
  lighting: PinFieldLightingConfig;
  camera: PinFieldCameraConfig;
  fog: { near: number; far: number };
  dpr: [number, number];
};
