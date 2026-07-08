export type ProjectsRoute =
  | { view: "featured" }
  | { view: "all" }
  | { view: "detail"; projectId: string };

export type ProjectsTrackView = ProjectsRoute["view"];

const PROJECTS_HASH_PREFIX = "#projects";

export function isProjectsHash(hash: string) {
  if (!hash || hash === "#") {
    return false;
  }

  return hash === PROJECTS_HASH_PREFIX || hash.startsWith(`${PROJECTS_HASH_PREFIX}/`);
}

export function parseProjectsRoute(hash: string): ProjectsRoute | null {
  if (!isProjectsHash(hash)) {
    return null;
  }

  if (hash === PROJECTS_HASH_PREFIX) {
    return { view: "featured" };
  }

  const path = hash.slice(PROJECTS_HASH_PREFIX.length + 1);

  if (path === "all") {
    return { view: "all" };
  }

  if (path.length > 0) {
    return { view: "detail", projectId: path };
  }

  return { view: "featured" };
}

export function projectsRouteHash(route: ProjectsRoute) {
  switch (route.view) {
    case "featured":
      return PROJECTS_HASH_PREFIX;
    case "all":
      return `${PROJECTS_HASH_PREFIX}/all`;
    case "detail":
      return `${PROJECTS_HASH_PREFIX}/${route.projectId}`;
  }
}

export function projectsRouteDepth(route: ProjectsRoute) {
  if (route.view === "featured") {
    return 0;
  }

  if (route.view === "all") {
    return 1;
  }

  return 2;
}

export function projectsSlideDirection(
  from: ProjectsRoute,
  to: ProjectsRoute,
): "forward" | "back" {
  return projectsRouteDepth(to) >= projectsRouteDepth(from) ? "forward" : "back";
}

export function projectsRoutesEqual(a: ProjectsRoute, b: ProjectsRoute) {
  if (a.view !== b.view) {
    return false;
  }

  if (a.view === "detail" && b.view === "detail") {
    return a.projectId === b.projectId;
  }

  return true;
}
