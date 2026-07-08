"use client";

import { ProjectTechList } from "@/components/web/projects/ProjectTechList";
import { EdgeGlowButton } from "@/components/ui/EdgeGlow";
import { useRevealOnView } from "@/hooks/use-reveal-on-view";
import {
  getBentoLayoutStyle,
  getProjectBentoLayout,
  getProjectBentoLayoutMd,
} from "@/lib/projects/presentation";
import type { ProjectRecord } from "@/lib/projects/types";
import { cn } from "@/lib/cn";
import Image from "next/image";

type ProjectBentoCardProps = {
  project: ProjectRecord;
  index: number;
  isActive: boolean;
  onOpen: () => void;
};

export function ProjectBentoCard({
  project,
  index,
  isActive,
  onOpen,
}: ProjectBentoCardProps) {
  const { ref, isRevealed, enterComplete, onEnterAnimationEnd } =
    useRevealOnView<HTMLButtonElement>(isActive);
  const layout = getProjectBentoLayout(project, index);
  const layoutMd = getProjectBentoLayoutMd(project, index);

  return (
    <EdgeGlowButton
      ref={ref}
      type="button"
      className={cn("project-bento-card edge-glow--card project-card-enter")}
      style={getBentoLayoutStyle(layout, layoutMd)}
      data-revealed={isRevealed || undefined}
      data-enter-complete={enterComplete || undefined}
      onAnimationEnd={onEnterAnimationEnd}
      onClick={onOpen}
    >
      <div
        className="project-bento-card__cover"
        data-cover-ratio={layout.coverRatio ?? "16/10"}
        data-cover-fit={project.cover.fit ?? "cover"}
      >
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 40vw"
          className="project-bento-card__image"
        />
      </div>

      <div className="project-bento-card__body">
        <p className="project-bento-card__type">{project.projectType}</p>
        <h3 className="project-bento-card__title">{project.name}</h3>
        <p className="project-bento-card__summary">{project.summary}</p>
        <ProjectTechList items={project.stackPrimary} limit={3} />
        <span className="project-bento-card__cta">Ver detalles</span>
      </div>
    </EdgeGlowButton>
  );
}
