"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

const BASE_SPEED_PX = 52;
const STOP_LERP = 14;
const RESUME_LERP = 3.2;
const DRAG_FOLLOW_LERP = 11;
const MOMENTUM_FRICTION = 5.8;
const MOMENTUM_TRANSFER = 0.9;
const MIN_MOMENTUM_PX_S = 18;
const MAX_MOMENTUM_PX_S = 1400;
const VELOCITY_SMOOTHING = 0.38;
const DRAG_START_THRESHOLD_PX = 6;

type UseTechMarqueeOptions = {
  enabled?: boolean;
};

/** Keeps offset in (-2×loop, 0]; returns delta to apply to both target and display. */
function reconcileMarqueeLoop(
  offset: number,
  loopWidth: number,
): { offset: number; delta: number } {
  if (loopWidth <= 0) {
    return { offset, delta: 0 };
  }

  let next = offset;
  let delta = 0;

  while (next <= -2 * loopWidth) {
    next += loopWidth;
    delta += loopWidth;
  }

  while (next > 0) {
    next -= loopWidth;
    delta -= loopWidth;
  }

  return { offset: next, delta };
}

function applyMarqueeLoop(
  loopWidth: number,
  targetOffsetRef: { current: number },
  displayOffsetRef: { current: number },
) {
  const { offset, delta } = reconcileMarqueeLoop(
    targetOffsetRef.current,
    loopWidth,
  );

  targetOffsetRef.current = offset;

  if (delta !== 0) {
    displayOffsetRef.current += delta;
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function hasActiveTextSelection() {
  const selection = window.getSelection();

  return Boolean(selection && !selection.isCollapsed);
}

export function useTechMarquee({ enabled = true }: UseTechMarqueeOptions = {}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const targetOffsetRef = useRef(0);
  const displayOffsetRef = useRef(0);
  const speedRef = useRef(BASE_SPEED_PX);
  const setWidthRef = useRef(0);
  const hasInitializedOffsetRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const isCoastingRef = useRef(false);
  const momentumVelocityRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const pointerStartXRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const docListenersRef = useRef<{
    move: (event: PointerEvent) => void;
    up: (event: PointerEvent) => void;
  } | null>(null);

  const setDraggingUi = useCallback((dragging: boolean) => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    if (dragging) {
      root.setAttribute("data-dragging", "");
      return;
    }

    root.removeAttribute("data-dragging");
  }, []);

  const removeDocumentListeners = useCallback(() => {
    const listeners = docListenersRef.current;

    if (!listeners) {
      return;
    }

    document.removeEventListener("pointermove", listeners.move);
    document.removeEventListener("pointerup", listeners.up);
    document.removeEventListener("pointercancel", listeners.up);
    docListenersRef.current = null;
  }, []);

  const finishDrag = useCallback(() => {
    if (!isDraggingRef.current) {
      return;
    }

    isDraggingRef.current = false;
    setDraggingUi(false);
    targetOffsetRef.current = displayOffsetRef.current;

    const releaseVelocity = dragVelocityRef.current;

    if (
      !reducedMotionRef.current &&
      Math.abs(releaseVelocity) > MIN_MOMENTUM_PX_S
    ) {
      isCoastingRef.current = true;
      momentumVelocityRef.current = clamp(
        releaseVelocity * MOMENTUM_TRANSFER,
        -MAX_MOMENTUM_PX_S,
        MAX_MOMENTUM_PX_S,
      );
    } else {
      isCoastingRef.current = false;
      momentumVelocityRef.current = 0;
    }

    dragVelocityRef.current = 0;
  }, [setDraggingUi]);

  const endPointerSession = useCallback(() => {
    isPointerDownRef.current = false;
    pointerIdRef.current = null;
    removeDocumentListeners();
    finishDrag();
  }, [finishDrag, removeDocumentListeners]);

  useLayoutEffect(() => {
    const measure = measureRef.current;

    if (!measure) {
      return;
    }

    const updateWidth = () => {
      const nextWidth = measure.getBoundingClientRect().width;
      setWidthRef.current = nextWidth;

      if (nextWidth <= 0) {
        return;
      }

      if (!hasInitializedOffsetRef.current) {
        targetOffsetRef.current = -nextWidth;
        displayOffsetRef.current = -nextWidth;
        hasInitializedOffsetRef.current = true;
        return;
      }

      applyMarqueeLoop(nextWidth, targetOffsetRef, displayOffsetRef);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(measure);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const deltaSeconds = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const loopWidth = setWidthRef.current;

      if (isDraggingRef.current) {
        speedRef.current +=
          (0 - speedRef.current) * Math.min(1, deltaSeconds * STOP_LERP);
      } else if (isCoastingRef.current) {
        speedRef.current +=
          (0 - speedRef.current) * Math.min(1, deltaSeconds * STOP_LERP);

        targetOffsetRef.current +=
          momentumVelocityRef.current * deltaSeconds;

        momentumVelocityRef.current *= Math.exp(
          -MOMENTUM_FRICTION * deltaSeconds,
        );

        if (Math.abs(momentumVelocityRef.current) < MIN_MOMENTUM_PX_S) {
          isCoastingRef.current = false;
          momentumVelocityRef.current = 0;
        }
      } else if (!reducedMotionRef.current) {
        const targetSpeed = BASE_SPEED_PX;
        const lerpRate = speedRef.current === 0 ? STOP_LERP : RESUME_LERP;

        speedRef.current +=
          (targetSpeed - speedRef.current) *
          Math.min(1, deltaSeconds * lerpRate);

        targetOffsetRef.current -= speedRef.current * deltaSeconds;
      }

      applyMarqueeLoop(loopWidth, targetOffsetRef, displayOffsetRef);

      if (isDraggingRef.current) {
        displayOffsetRef.current +=
          (targetOffsetRef.current - displayOffsetRef.current) *
          Math.min(1, deltaSeconds * DRAG_FOLLOW_LERP);
      } else {
        displayOffsetRef.current = targetOffsetRef.current;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${displayOffsetRef.current}px, 0, 0)`;
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [enabled]);

  useEffect(() => {
    const onBlur = () => {
      endPointerSession();
    };

    const onSelectionChange = () => {
      if (hasActiveTextSelection()) {
        endPointerSession();
      }
    };

    window.addEventListener("blur", onBlur);
    document.addEventListener("selectionchange", onSelectionChange);

    return () => {
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("selectionchange", onSelectionChange);
      endPointerSession();
    };
  }, [endPointerSession]);

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      if (hasActiveTextSelection()) {
        return;
      }

      endPointerSession();

      isPointerDownRef.current = true;
      isDraggingRef.current = false;
      isCoastingRef.current = false;
      momentumVelocityRef.current = 0;
      dragVelocityRef.current = 0;
      pointerIdRef.current = event.pointerId;
      pointerStartXRef.current = event.clientX;
      lastPointerXRef.current = event.clientX;
      lastMoveTimeRef.current = performance.now();
      speedRef.current = 0;
      targetOffsetRef.current = displayOffsetRef.current;
      setDraggingUi(false);

      const onDocumentPointerMove = (moveEvent: PointerEvent) => {
        if (
          !isPointerDownRef.current ||
          moveEvent.pointerId !== pointerIdRef.current
        ) {
          return;
        }

        if (hasActiveTextSelection()) {
          endPointerSession();
          return;
        }

        const deltaFromStart = moveEvent.clientX - pointerStartXRef.current;

        if (
          !isDraggingRef.current &&
          Math.abs(deltaFromStart) < DRAG_START_THRESHOLD_PX
        ) {
          return;
        }

        if (!isDraggingRef.current) {
          isDraggingRef.current = true;
          setDraggingUi(true);
          lastPointerXRef.current = moveEvent.clientX;
          lastMoveTimeRef.current = performance.now();
        }

        const now = performance.now();
        const deltaX = moveEvent.clientX - lastPointerXRef.current;
        const deltaSeconds = (now - lastMoveTimeRef.current) / 1000;

        if (deltaSeconds > 0 && deltaSeconds < 0.12) {
          const instantVelocity = deltaX / deltaSeconds;
          dragVelocityRef.current +=
            (instantVelocity - dragVelocityRef.current) * VELOCITY_SMOOTHING;
        }

        lastPointerXRef.current = moveEvent.clientX;
        lastMoveTimeRef.current = now;

        targetOffsetRef.current += deltaX;
        applyMarqueeLoop(setWidthRef.current, targetOffsetRef, displayOffsetRef);
      };

      const onDocumentPointerUp = (upEvent: PointerEvent) => {
        if (upEvent.pointerId !== pointerIdRef.current) {
          return;
        }

        endPointerSession();
      };

      docListenersRef.current = {
        move: onDocumentPointerMove,
        up: onDocumentPointerUp,
      };

      document.addEventListener("pointermove", onDocumentPointerMove);
      document.addEventListener("pointerup", onDocumentPointerUp);
      document.addEventListener("pointercancel", onDocumentPointerUp);
    },
    [endPointerSession, setDraggingUi],
  );

  return {
    rootRef,
    trackRef,
    measureRef,
    marqueeProps: {
      onPointerDown,
    },
  };
};
