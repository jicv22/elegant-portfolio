"use client";

import { usePinFieldContext } from "@/components/effects/pin-field/PinFieldContext";
import { easeOutCubic, getCameraIntroStart } from "@/lib/pin-field/math";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Vector3 } from "three";

export function PinFieldCameraRig() {
  const { profile, sceneReady, prefersReducedMotionRef } = usePinFieldContext();
  const intro = profile.cameraIntro;

  const { camera } = useThree();

  const lookAtTarget = useMemo(
    () => new Vector3(...profile.camera.lookAt),
    [profile.camera.lookAt],
  );
  const endPosition = useMemo(
    () => new Vector3(...profile.camera.position),
    [profile.camera.position],
  );
  const startPosition = useMemo(() => {
    if (!intro) {
      return endPosition.clone();
    }

    return getCameraIntroStart(
      profile.camera.lookAt,
      profile.camera.position,
      intro.startFactor,
    );
  }, [
    endPosition,
    intro,
    profile.camera.lookAt,
    profile.camera.position,
  ]);

  const progressRef = useRef(0);
  const animatingRef = useRef(false);
  const completedRef = useRef(false);

  useLayoutEffect(() => {
    if (!intro) {
      return;
    }

    camera.position.copy(startPosition);
    camera.lookAt(lookAtTarget);
  }, [camera, intro, lookAtTarget, startPosition]);

  useEffect(() => {
    if (!intro || !sceneReady || completedRef.current) {
      return;
    }

    if (prefersReducedMotionRef.current) {
      camera.position.copy(endPosition);
      camera.lookAt(lookAtTarget);
      completedRef.current = true;
      return;
    }

    progressRef.current = 0;
    animatingRef.current = true;
  }, [
    camera,
    endPosition,
    intro,
    lookAtTarget,
    prefersReducedMotionRef,
    sceneReady,
  ]);

  useFrame((_, delta) => {
    if (!intro || !animatingRef.current) {
      return;
    }

    const duration = intro.durationMs / 1000;
    progressRef.current = Math.min(1, progressRef.current + delta / duration);
    const eased = easeOutCubic(progressRef.current);

    camera.position.lerpVectors(startPosition, endPosition, eased);
    camera.lookAt(lookAtTarget);

    if (progressRef.current >= 1) {
      animatingRef.current = false;
      completedRef.current = true;
    }
  });

  return null;
}
