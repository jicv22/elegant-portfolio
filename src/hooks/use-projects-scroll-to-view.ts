"use client";

import { isProjectsHash } from "@/lib/projects/routes";
import type { ProjectsTrackView } from "@/lib/projects/routes";
import {
  scheduleScrollToProjectsPanel,
  scheduleScrollToProjectsSection,
} from "@/lib/projects/scroll";
import { useLayoutEffect, useRef, type RefObject } from "react";

type PanelRefs = RefObject<Record<ProjectsTrackView, HTMLDivElement | null>>;

export function useProjectsScrollToView(
  activeView: ProjectsTrackView,
  panelRefs: PanelRefs,
  detailProjectId: string | undefined,
  navigationKind: "init" | "push" | "pop",
) {
  const isReadyRef = useRef(false);

  useLayoutEffect(() => {
    const panel = panelRefs.current[activeView];

    if (!panel) {
      return;
    }

    if (!isReadyRef.current) {
      isReadyRef.current = true;

      if (!isProjectsHash(window.location.hash)) {
        return;
      }
    }

    if (navigationKind === "pop") {
      scheduleScrollToProjectsSection();
      return;
    }

    scheduleScrollToProjectsPanel(panel);
  }, [activeView, detailProjectId, navigationKind, panelRefs]);
}
