"use client";

import { FeaturedProjectCard } from "@/components/web/projects/FeaturedProjectCard";
import { ProjectReveal } from "@/components/web/projects/ProjectReveal";
import { ProjectsPanel } from "@/components/web/projects/ProjectsPanel";
import { EdgeGlowButton } from "@/components/ui/EdgeGlow";
import { featuredProjects } from "@/config/projects";

type ProjectsFeaturedPanelProps = {
  isActive: boolean;
  onOpenProject: (projectId: string) => void;
  onViewAll: () => void;
};

export function ProjectsFeaturedPanel({
  isActive,
  onOpenProject,
  onViewAll,
}: ProjectsFeaturedPanelProps) {
  return (
    <ProjectsPanel className="projects-panel--featured">
      <ProjectReveal enabled={isActive}>
        <header className="projects-panel__header">
          <p className="projects-panel__eyebrow">Portafolio</p>
          <h2 className="projects-panel__title">Proyectos destacados</h2>
          <p className="projects-panel__lead">
            Tres productos donde lideré o transformé sistemas críticos en producción.
          </p>
        </header>
      </ProjectReveal>

      <div className="projects-featured-list">
        {featuredProjects.map((project) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            isActive={isActive}
            onOpen={() => onOpenProject(project.id)}
          />
        ))}
      </div>

      <ProjectReveal enabled={isActive}>
        <div className="projects-panel__footer">
          <EdgeGlowButton
            type="button"
            className="hero-cta hero-cta--secondary"
            onClick={onViewAll}
          >
            Ver todos los proyectos
          </EdgeGlowButton>
        </div>
      </ProjectReveal>
    </ProjectsPanel>
  );
}
