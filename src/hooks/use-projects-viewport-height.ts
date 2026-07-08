"use client";

import type { ProjectsTrackView } from "@/lib/projects/routes";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type { ProjectsTrackView };

export function useProjectsViewportHeight(activeView: ProjectsTrackView) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Record<ProjectsTrackView, HTMLDivElement | null>>({
    featured: null,
    all: null,
    detail: null,
  });
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);

  const setPanelRef = useCallback(
    (view: ProjectsTrackView) => (node: HTMLDivElement | null) => {
      panelRefs.current[view] = node;
    },
    [],
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const panel = panelRefs.current[activeView];

    if (!viewport || !panel) {
      return;
    }

    const updateHeight = () => {
      setViewportHeight(panel.getBoundingClientRect().height);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(panel);

    return () => {
      observer.disconnect();
    };
  }, [activeView]);

  return {
    viewportRef,
    setPanelRef,
    viewportHeight,
    panelRefs,
  };
}
