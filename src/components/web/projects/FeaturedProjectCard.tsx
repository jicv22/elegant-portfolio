"use client";

import { ProjectTechList } from "@/components/web/projects/ProjectTechList";
import { EdgeGlowButton } from "@/components/ui/EdgeGlow";
import { useRevealOnView } from "@/hooks/use-reveal-on-view";
import type { ProjectRecord } from "@/lib/projects/types";
import { cn } from "@/lib/cn";
import { Eye } from "lucide-react";
import Image from "next/image";

type FeaturedProjectCardProps = {
  project: ProjectRecord;
  isActive: boolean;
  onOpen: () => void;
};

export function FeaturedProjectCard({
  project,
  isActive,
  onOpen,
}: FeaturedProjectCardProps) {
  const { ref, isRevealed, enterComplete, onEnterAnimationEnd } =
    useRevealOnView<HTMLButtonElement>(isActive);
  const isReverse = project.featuredLayout === "right";

  return (
    <EdgeGlowButton
      ref={ref}
      type="button"
      className={cn(
        "project-featured edge-glow--card project-card-enter",
        isReverse && "project-featured--reverse",
      )}
      data-revealed={isRevealed || undefined}
      data-enter-complete={enterComplete || undefined}
      onAnimationEnd={onEnterAnimationEnd}
      onClick={onOpen}
    >
      <div className="project-featured__media">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="project-featured__image"
        />
        <div className="project-featured__shade" aria-hidden />
        <div className="project-featured__hover" aria-hidden>
          <Eye className="project-featured__hover-icon" strokeWidth={1.6} />
          <span>Ver más</span>
        </div>
      </div>

      <div className="project-featured__content">
        <p className="project-featured__eyebrow">{project.projectType}</p>
        <h3 className="project-featured__title">{project.name}</h3>
        <p className="project-featured__summary">{project.summary}</p>
        <ProjectTechList items={project.stackPrimary} limit={4} />
      </div>
    </EdgeGlowButton>
  );
}
