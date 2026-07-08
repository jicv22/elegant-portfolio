"use client";

import { ProjectsAllPanel } from "@/components/web/projects/ProjectsAllPanel";
import { ProjectDetailPanel } from "@/components/web/projects/ProjectDetailPanel";
import { ProjectsFeaturedPanel } from "@/components/web/projects/ProjectsFeaturedPanel";
import { getProjectById } from "@/config/projects";
import { useProjectsHistory } from "@/hooks/use-projects-history";
import { useProjectsScrollToView } from "@/hooks/use-projects-scroll-to-view";
import { useProjectsTrackOffset } from "@/hooks/use-projects-track-offset";
import { useProjectsViewportHeight } from "@/hooks/use-projects-viewport-height";
import { siteSections } from "@/config/site";
import {
  projectsRoutesEqual,
  projectsSlideDirection,
  type ProjectsRoute,
} from "@/lib/projects/routes";
import { useCallback, useEffect, useRef, useState, type TransitionEvent } from "react";

export function ProjectsSection() {
  const { route, pushRoute, goBack, navigationKind } = useProjectsHistory();
  const [trackDirection, setTrackDirection] = useState<"forward" | "back">(
    "forward",
  );
  const [retainedDetailId, setRetainedDetailId] = useState<string | null>(null);
  const previousRouteRef = useRef<ProjectsRoute>(route);

  const trackView = route.view;
  const activeDetailId =
    route.view === "detail" ? route.projectId : retainedDetailId;
  const selectedProject = activeDetailId
    ? getProjectById(activeDetailId)
    : undefined;

  const { viewportRef, setPanelRef, viewportHeight, panelRefs } =
    useProjectsViewportHeight(trackView);
  const trackRef = useProjectsTrackOffset(trackView, viewportRef);

  useProjectsScrollToView(
    trackView,
    panelRefs,
    route.view === "detail" ? route.projectId : undefined,
    navigationKind,
  );

  useEffect(() => {
    const previousRoute = previousRouteRef.current;

    if (!projectsRoutesEqual(route, previousRoute)) {
      setTrackDirection(projectsSlideDirection(previousRoute, route));
    }

    if (route.view === "detail") {
      setRetainedDetailId(route.projectId);
    }

    previousRouteRef.current = route;
  }, [route]);

  const handleTrackTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (event.propertyName !== "transform" || route.view === "detail") {
        return;
      }

      setRetainedDetailId(null);
    },
    [route.view],
  );

  const goToAll = useCallback(() => {
    pushRoute({ view: "all" });
  }, [pushRoute]);

  const openDetail = useCallback(
    (projectId: string) => {
      pushRoute({ view: "detail", projectId });
    },
    [pushRoute],
  );

  return (
    <section
      id={siteSections.projects}
      className="projects-section"
      aria-label="Projects"
    >
      <div className="projects-stage">
        <div
          ref={viewportRef}
          className="projects-list-viewport"
          style={
            viewportHeight === null
              ? undefined
              : { height: `${viewportHeight}px` }
          }
        >
          <div
            ref={trackRef}
            className="projects-list-track"
            data-view={trackView}
            data-direction={trackDirection}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            <div
              ref={setPanelRef("featured")}
              className="projects-list-panel"
              data-active={trackView === "featured" || undefined}
              aria-hidden={trackView !== "featured"}
            >
              <ProjectsFeaturedPanel
                isActive={trackView === "featured"}
                onOpenProject={openDetail}
                onViewAll={goToAll}
              />
            </div>

            <div
              ref={setPanelRef("all")}
              className="projects-list-panel"
              data-active={trackView === "all" || undefined}
              aria-hidden={trackView !== "all"}
            >
              <ProjectsAllPanel
                isActive={trackView === "all"}
                onBack={goBack}
                onOpenProject={openDetail}
              />
            </div>

            <div
              ref={setPanelRef("detail")}
              className="projects-list-panel"
              data-active={trackView === "detail" || undefined}
              aria-hidden={trackView !== "detail"}
            >
              {selectedProject ? (
                <ProjectDetailPanel
                  project={selectedProject}
                  isActive={trackView === "detail"}
                  onBack={goBack}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
