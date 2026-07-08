"use client";

import type { ProjectsTrackView } from "@/lib/projects/routes";
import { useLayoutEffect, useRef, type RefObject } from "react";

const TRACK_INDEX: Record<ProjectsTrackView, number> = {
  featured: 0,
  all: 1,
  detail: 2,
};

export function useProjectsTrackOffset(
  activeView: ProjectsTrackView,
  viewportRef: RefObject<HTMLDivElement | null>,
) {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    const syncOffset = () => {
      const offset = viewport.clientWidth * TRACK_INDEX[activeView];
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    };

    syncOffset();

    const observer = new ResizeObserver(syncOffset);
    observer.observe(viewport);

    return () => {
      observer.disconnect();
    };
  }, [activeView, viewportRef]);

  return trackRef;
}
