"use client";

import { TechCompactPanel } from "@/components/web/technologies/TechCompactPanel";
import { TechExpandedPanel } from "@/components/web/technologies/TechExpandedPanel";
import { siteSections } from "@/config/site";
import { useTechViewTransition } from "@/hooks/use-tech-viewport-height";

export function TechnologiesSection() {
  const {
    viewportRef,
    setPanelRef,
    displayView,
    phase,
    viewportHeight,
    isInitialized,
    isTransitioning,
    transitionTo,
    handleTransitionEnd,
  } = useTechViewTransition("compact");

  return (
    <section
      id={siteSections.technologies}
      className="tech-section"
      aria-label="Tecnologías trabajadas"
    >
      <div
        ref={viewportRef}
        className="tech-section__viewport"
        data-phase={phase}
        data-init={!isInitialized || undefined}
        style={
          viewportHeight === null
            ? undefined
            : { height: `${viewportHeight}px` }
        }
        onTransitionEnd={handleTransitionEnd}
      >
        <div
          ref={setPanelRef("compact")}
          className="tech-section__panel"
          data-active={displayView === "compact" || undefined}
          aria-hidden={displayView !== "compact"}
        >
          <TechCompactPanel
            isActive={displayView === "compact" && !isTransitioning}
            onExpand={() => transitionTo("expanded")}
            expandDisabled={isTransitioning}
          />
        </div>

        <div
          ref={setPanelRef("expanded")}
          className="tech-section__panel"
          data-active={displayView === "expanded" || undefined}
          aria-hidden={displayView !== "expanded"}
        >
          <TechExpandedPanel
            onCollapse={() => transitionTo("compact")}
            collapseDisabled={isTransitioning}
          />
        </div>
      </div>
    </section>
  );
}
