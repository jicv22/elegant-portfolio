"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type TechSectionView = "compact" | "expanded";
export type TechTransitionPhase = "idle" | "collapsing" | "expanding";

export function useTechViewTransition(initialView: TechSectionView = "compact") {
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<TechSectionView, HTMLDivElement | null>>({
    compact: null,
    expanded: null,
  });
  const pendingViewRef = useRef<TechSectionView | null>(null);
  const reducedMotionRef = useRef(false);

  const [displayView, setDisplayView] = useState(initialView);
  const [phase, setPhase] = useState<TechTransitionPhase>("idle");
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const setPanelRef = useCallback(
    (view: TechSectionView) => (node: HTMLDivElement | null) => {
      panelRefs.current[view] = node;
    },
    [],
  );

  const measurePanel = useCallback((view: TechSectionView) => {
    return panelRefs.current[view]?.getBoundingClientRect().height ?? 0;
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useLayoutEffect(() => {
    if (phase !== "idle") {
      return;
    }

    const panel = panelRefs.current[displayView];

    if (!panel) {
      return;
    }

    const updateHeight = () => {
      setViewportHeight(panel.getBoundingClientRect().height);
      setIsInitialized(true);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(panel);

    return () => {
      observer.disconnect();
    };
  }, [displayView, phase]);

  const transitionTo = useCallback(
    (nextView: TechSectionView) => {
      if (phase !== "idle" || nextView === displayView) {
        return;
      }

      if (reducedMotionRef.current) {
        setDisplayView(nextView);
        setViewportHeight(measurePanel(nextView));
        setIsInitialized(true);
        return;
      }

      pendingViewRef.current = nextView;
      setPhase("collapsing");
      setViewportHeight(0);
    },
    [displayView, measurePanel, phase],
  );

  const handleTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (event.propertyName !== "height") {
        return;
      }

      if (phase === "collapsing") {
        const nextView = pendingViewRef.current;

        if (!nextView) {
          setPhase("idle");
          return;
        }

        pendingViewRef.current = null;
        const nextHeight = measurePanel(nextView);
        setDisplayView(nextView);
        setViewportHeight(nextHeight);
        setPhase("expanding");
        return;
      }

      if (phase === "expanding") {
        setPhase("idle");
      }
    },
    [measurePanel, phase],
  );

  const isTransitioning = phase !== "idle";

  return {
    viewportRef,
    setPanelRef,
    displayView,
    phase,
    viewportHeight,
    isInitialized,
    isTransitioning,
    transitionTo,
    handleTransitionEnd,
  };
}
