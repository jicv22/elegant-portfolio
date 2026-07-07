"use client";

import { usePinFieldContext } from "@/components/effects/pin-field/PinFieldContext";
import {
  clampPinHeight,
  createPinGeometry,
  getPinCenterY,
  getPinGridPosition,
  getWaveHeight,
  smoothstep,
} from "@/lib/pin-field/math";
import { getSurfaceColor } from "@/lib/pin-field/material";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import {
  Color,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
  Plane,
  Vector2,
  Vector3,
} from "three";

const dummy = new Object3D();
const mouse = new Vector3();
const pointerNdc = new Vector2();
const targetMouse = new Vector3();
const groundPlane = new Plane(new Vector3(0, 1, 0), 0);
const intersection = new Vector3();
const mixColor = new Color();

function initInstanceColors(mesh: InstancedMesh, count: number, color: Color) {
  for (let index = 0; index < count; index += 1) {
    mesh.setColorAt(index, color);
  }

  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }
}

export function PinGrid() {
  const {
    profile,
    gridSize,
    hoveringRef,
    isActiveRef,
    isInteractiveRef,
    prefersReducedMotionRef,
    pointerNdcRef,
  } = usePinFieldContext();

  const meshRef = useRef<InstancedMesh>(null);
  const heightsRef = useRef<Float32Array | null>(null);
  const elapsedRef = useRef(0);
  const { camera, raycaster } = useThree();

  const count = gridSize * gridSize;
  const surfaceColor = getSurfaceColor(profile);
  const baseColor = useMemo(() => new Color(surfaceColor), [surfaceColor]);
  const pressedColor = useMemo(
    () => new Color(profile.pinColorPressed),
    [profile.pinColorPressed],
  );

  const geometry = useMemo(() => createPinGeometry(profile), [profile]);

  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#ffffff",
        metalness: profile.materialMetalness,
        roughness: profile.materialRoughness,
        vertexColors: true,
        emissive: new Color(surfaceColor),
        emissiveIntensity: 0.18,
      }),
    [profile.materialMetalness, profile.materialRoughness, surfaceColor],
  );

  useLayoutEffect(() => {
    heightsRef.current = new Float32Array(count).fill(profile.maxHeight);
  }, [count, profile.maxHeight]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    initInstanceColors(mesh, count, baseColor);
  }, [count, baseColor]);

  useFrame((_, delta) => {
    if (!isActiveRef.current) {
      return;
    }

    const mesh = meshRef.current;
    const heights = heightsRef.current;

    if (!mesh || !heights) {
      return;
    }

    const prefersReducedMotion = prefersReducedMotionRef.current ?? false;
    const isInteractive = isInteractiveRef.current ?? false;

    if (!prefersReducedMotion) {
      elapsedRef.current += delta;
    }

    const time = elapsedRef.current;
    const isHovering = (hoveringRef.current ?? false) && isInteractive;

    if (isHovering) {
      pointerNdc.set(pointerNdcRef.current.x, pointerNdcRef.current.y);
      raycaster.setFromCamera(pointerNdc, camera);

      if (raycaster.ray.intersectPlane(groundPlane, intersection)) {
        targetMouse.copy(intersection);
      }
    }

    if (isHovering) {
      const mouseStep = 1 - (1 - profile.mouseLerp) ** (delta * 60);
      mouse.lerp(targetMouse, mouseStep);
    }

    const heightStep = 1 - (1 - profile.heightLerp) ** (delta * 60);

    for (let index = 0; index < count; index += 1) {
      const { x, z } = getPinGridPosition(index, gridSize, profile.spacing);
      const dx = x - mouse.x;
      const dz = z - mouse.z;
      const distance = Math.hypot(dx, dz);

      let influence = 0;

      if (isHovering && isInteractive) {
        influence = 1 - smoothstep(0, profile.influenceRadius, distance);
      }

      const waveHeight = prefersReducedMotion
        ? profile.maxHeight
        : getWaveHeight(x, z, time, profile);
      const targetHeight =
        waveHeight + (profile.minHeight - waveHeight) * influence;

      heights[index] += (targetHeight - heights[index]) * heightStep;

      const visibleHeight = clampPinHeight(heights[index], profile);

      dummy.position.set(x, getPinCenterY(visibleHeight, profile), z);
      dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);

      mixColor.copy(baseColor).lerp(pressedColor, influence);
      mesh.setColorAt(index, mixColor);
    }

    mesh.instanceMatrix.needsUpdate = true;

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      key={gridSize}
      ref={meshRef}
      args={[geometry, material, count]}
    />
  );
}
