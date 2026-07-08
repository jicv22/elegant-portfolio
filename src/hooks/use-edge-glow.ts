import { useCallback, useEffect, useRef, type PointerEvent } from "react";

const GLOW_LERP = 0.05;
const GLOW_SETTLE_THRESHOLD = 0.06;

type GlowPoint = {
  x: number;
  y: number;
};

function getEdgeGlowPosition(clientX: number, clientY: number, rect: DOMRect) {
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  const angle = Math.atan2(y - 0.5, x - 0.5);
  const edgeX = 50 + Math.cos(angle) * 50;
  const edgeY = 50 + Math.sin(angle) * 50;

  return { edgeX, edgeY };
}

export function useEdgeGlow() {
  const ref = useRef<HTMLElement>(null);
  const targetRef = useRef<GlowPoint>({ x: 50, y: 0 });
  const currentRef = useRef<GlowPoint>({ x: 50, y: 0 });
  const activeRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const applyStyles = useCallback((opacity: number, x: number, y: number) => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.style.setProperty("--glow-x", `${x}%`);
    element.style.setProperty("--glow-y", `${y}%`);
    element.style.setProperty("--glow-opacity", String(opacity));
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const step = useCallback(() => {
    const current = currentRef.current;
    const target = targetRef.current;

    current.x += (target.x - current.x) * GLOW_LERP;
    current.y += (target.y - current.y) * GLOW_LERP;

    applyStyles(activeRef.current ? 1 : 0, current.x, current.y);

    const settled =
      Math.hypot(target.x - current.x, target.y - current.y) <
      GLOW_SETTLE_THRESHOLD;

    if (activeRef.current || !settled) {
      rafRef.current = requestAnimationFrame(step);
      return;
    }

    rafRef.current = null;
  }, [applyStyles]);

  const startLoop = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(step);
    }
  }, [step]);

  const setTargetFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const element = ref.current;
      if (!element) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const { edgeX, edgeY } = getEdgeGlowPosition(clientX, clientY, rect);

      targetRef.current = { x: edgeX, y: edgeY };
      startLoop();
    },
    [startLoop],
  );

  const onPointerEnter = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      activeRef.current = true;
      setTargetFromPointer(event.clientX, event.clientY);
    },
    [setTargetFromPointer],
  );

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") {
        return;
      }

      activeRef.current = true;
      setTargetFromPointer(event.clientX, event.clientY);
    },
    [setTargetFromPointer],
  );

  const onPointerLeave = useCallback(() => {
    activeRef.current = false;
    applyStyles(0, currentRef.current.x, currentRef.current.y);
    stopLoop();
  }, [applyStyles, stopLoop]);

  useEffect(() => stopLoop, [stopLoop]);

  return { ref, onPointerEnter, onPointerMove, onPointerLeave };
}
