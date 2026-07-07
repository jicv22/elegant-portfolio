"use client";

import type { PinFieldProfileConfig } from "@/lib/pin-field/types";
import { resolvePinFieldGridSize } from "@/lib/pin-field/math";
import { useCallback, useEffect, useRef, useState, type PointerEvent, type RefObject } from "react";

export type PinFieldPointerNdc = {
  x: number;
  y: number;
};

export type PinFieldRuntimeState = {
  gridSize: number;
  frameloop: "always" | "never";
  hoveringRef: RefObject<boolean>;
  isActiveRef: RefObject<boolean>;
  isInteractiveRef: RefObject<boolean>;
  prefersReducedMotionRef: RefObject<boolean>;
  pointerNdcRef: RefObject<PinFieldPointerNdc>;
  pointerHandlers: {
    onPointerMove: (event: PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
  };
};

type UsePinFieldRuntimeOptions = {
  /** Track pointer on document while the observe target is in view (hero + navbar). */
  globalPointerTracking?: boolean;
};

function updatePointerNdc(
  bounds: HTMLElement,
  clientX: number,
  clientY: number,
  pointerNdcRef: RefObject<PinFieldPointerNdc>,
) {
  const rect = bounds.getBoundingClientRect();

  if (rect.width <= 0 || rect.height <= 0) {
    return;
  }

  pointerNdcRef.current.x =
    ((clientX - rect.left) / rect.width) * 2 - 1;
  pointerNdcRef.current.y =
    -((clientY - rect.top) / rect.height) * 2 + 1;
}

export function usePinFieldRuntime(
  observeElement: HTMLElement | null,
  profile: PinFieldProfileConfig,
  options: UsePinFieldRuntimeOptions = {},
) {
  const { globalPointerTracking = false } = options;
  const hoveringRef = useRef(false);
  const isActiveRef = useRef(true);
  const isInteractiveRef = useRef(false);
  const prefersReducedMotionRef = useRef(false);
  const isInViewRef = useRef(true);
  const isDocumentVisibleRef = useRef(true);
  const pointerNdcRef = useRef<PinFieldPointerNdc>({ x: 0, y: 0 });
  const [gridSize, setGridSize] = useState(profile.gridSize);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  const syncActiveState = useCallback(() => {
    const isActive = isInViewRef.current && isDocumentVisibleRef.current;
    isActiveRef.current = isActive;
    setFrameloop(isActive ? "always" : "never");

    if (!isActive) {
      hoveringRef.current = false;
    }
  }, []);

  const canTrackPointer = useCallback(() => {
    return (
      isInteractiveRef.current &&
      isInViewRef.current &&
      isDocumentVisibleRef.current
    );
  }, []);

  useEffect(() => {
    const updateGridSize = () => {
      setGridSize(resolvePinFieldGridSize(profile));
    };

    updateGridSize();
    window.addEventListener("resize", updateGridSize);

    return () => {
      window.removeEventListener("resize", updateGridSize);
    };
  }, [profile]);

  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerMedia = window.matchMedia("(pointer: fine)");
    const desktopMedia = window.matchMedia("(min-width: 1024px)");

    const updateInteraction = () => {
      prefersReducedMotionRef.current = motionMedia.matches;
      isInteractiveRef.current =
        pointerMedia.matches &&
        desktopMedia.matches &&
        !motionMedia.matches;
    };

    updateInteraction();
    motionMedia.addEventListener("change", updateInteraction);
    pointerMedia.addEventListener("change", updateInteraction);
    desktopMedia.addEventListener("change", updateInteraction);

    return () => {
      motionMedia.removeEventListener("change", updateInteraction);
      pointerMedia.removeEventListener("change", updateInteraction);
      desktopMedia.removeEventListener("change", updateInteraction);
    };
  }, []);

  useEffect(() => {
    if (!observeElement) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        syncActiveState();
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(observeElement);

    return () => {
      observer.disconnect();
    };
  }, [observeElement, syncActiveState]);

  useEffect(() => {
    const onVisibilityChange = () => {
      isDocumentVisibleRef.current = document.visibilityState === "visible";
      syncActiveState();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [syncActiveState]);

  useEffect(() => {
    const onPointerOut = (event: globalThis.PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const related = event.relatedTarget as Node | null;

      if (!related || !document.documentElement.contains(related)) {
        hoveringRef.current = false;
      }
    };

    document.addEventListener("pointerout", onPointerOut);

    return () => {
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);

  useEffect(() => {
    if (!globalPointerTracking || !observeElement) {
      return;
    }

    const bounds = observeElement;

    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (!canTrackPointer()) {
        return;
      }

      updatePointerNdc(bounds, event.clientX, event.clientY, pointerNdcRef);
      hoveringRef.current = true;
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [canTrackPointer, globalPointerTracking, observeElement]);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!canTrackPointer()) {
        return;
      }

      updatePointerNdc(
        event.currentTarget,
        event.clientX,
        event.clientY,
        pointerNdcRef,
      );
      hoveringRef.current = true;
    },
    [canTrackPointer],
  );

  const handlePointerLeave = useCallback(() => {
    if (globalPointerTracking) {
      return;
    }

    hoveringRef.current = false;
  }, [globalPointerTracking]);

  return {
    gridSize,
    frameloop,
    hoveringRef,
    isActiveRef,
    isInteractiveRef,
    prefersReducedMotionRef,
    pointerNdcRef,
    pointerHandlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
    },
  };
}
