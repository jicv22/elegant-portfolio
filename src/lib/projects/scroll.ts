import { siteSections } from "@/config/site";

function getSiteNavOffset() {
  const nav = document.querySelector(".site-nav");
  return nav?.getBoundingClientRect().height ?? 0;
}

function getScrollBehavior() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export function scrollToProjectsPanel(panel: HTMLElement | null) {
  if (!panel) {
    return;
  }

  const header = panel.querySelector(".projects-panel__header");
  const target = header ?? panel;
  const offset = getSiteNavOffset() + 12;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: getScrollBehavior(),
  });
}

export function scrollToProjectsSection() {
  const section = document.getElementById(siteSections.projects);
  if (!section) {
    return;
  }

  const offset = getSiteNavOffset() + 12;
  const top = section.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: getScrollBehavior(),
  });
}

/** Re-apply scroll after the browser may restore history scroll position. */
export function scheduleScrollToProjectsPanel(panel: HTMLElement | null) {
  const run = () => scrollToProjectsPanel(panel);

  run();
  requestAnimationFrame(() => {
    run();
    requestAnimationFrame(run);
  });
}

export function scheduleScrollToProjectsSection() {
  const run = () => scrollToProjectsSection();

  run();
  requestAnimationFrame(() => {
    run();
    requestAnimationFrame(run);
  });
}
