"use client";

import { getProjectById } from "@/config/projects";
import {
  isProjectsHash,
  parseProjectsRoute,
  projectsRouteHash,
  type ProjectsRoute,
} from "@/lib/projects/routes";
import { useCallback, useEffect, useRef, useState } from "react";

const IDLE_ROUTE: ProjectsRoute = { view: "featured" };

export type ProjectsNavigationKind = "init" | "push" | "pop";

function normalizeRoute(route: ProjectsRoute): ProjectsRoute {
  if (route.view !== "detail") {
    return route;
  }

  if (getProjectById(route.projectId)) {
    return route;
  }

  return { view: "all" };
}

export function useProjectsHistory() {
  const [route, setRoute] = useState<ProjectsRoute>(IDLE_ROUTE);
  const [isProjectsFlow, setIsProjectsFlow] = useState(false);
  const [navigationKind, setNavigationKind] =
    useState<ProjectsNavigationKind>("init");
  const navigationKindRef = useRef<ProjectsNavigationKind>("init");

  const syncFromLocation = useCallback(() => {
    const hash = window.location.hash;
    const inFlow = isProjectsHash(hash);

    setIsProjectsFlow(inFlow);
    setNavigationKind(navigationKindRef.current);

    if (!inFlow) {
      setRoute(IDLE_ROUTE);
      return;
    }

    const parsed = parseProjectsRoute(hash);

    if (!parsed) {
      setRoute(IDLE_ROUTE);
      return;
    }

    const normalized = normalizeRoute(parsed);

    if (parsed.view === "detail" && normalized.view === "all") {
      window.history.replaceState(
        { projectsRoute: normalized },
        "",
        projectsRouteHash(normalized),
      );
    }

    setRoute(normalized);
  }, []);

  useEffect(() => {
    const previousRestoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    syncFromLocation();

    const onPopState = () => {
      navigationKindRef.current = "pop";
      syncFromLocation();
    };

    const onHashChange = () => {
      if (navigationKindRef.current !== "pop") {
        navigationKindRef.current = "push";
      }

      syncFromLocation();
    };

    window.addEventListener("popstate", onPopState);
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("hashchange", onHashChange);
      history.scrollRestoration = previousRestoration;
    };
  }, [syncFromLocation]);

  const pushRoute = useCallback((next: ProjectsRoute) => {
    const normalized = normalizeRoute(next);
    const hash = projectsRouteHash(normalized);

    navigationKindRef.current = "push";

    if (window.location.hash !== hash) {
      window.history.pushState({ projectsRoute: normalized }, "", hash);
    }

    setIsProjectsFlow(true);
    setNavigationKind("push");
    setRoute(normalized);
  }, []);

  const goBack = useCallback(() => {
    navigationKindRef.current = "pop";
    window.history.back();
  }, []);

  return {
    route,
    isProjectsFlow,
    navigationKind,
    pushRoute,
    goBack,
  };
}
