"use client";

import { ProjectBentoCard } from "@/components/web/projects/ProjectBentoCard";
import { ProjectReveal } from "@/components/web/projects/ProjectReveal";
import { ProjectsPanel } from "@/components/web/projects/ProjectsPanel";
import { ProjectsSubviewFooter } from "@/components/web/projects/ProjectsSubviewFooter";
import { ProjectsSubviewHeader } from "@/components/web/projects/ProjectsSubviewHeader";
import { projects } from "@/config/projects";

type ProjectsAllPanelProps = {
  isActive: boolean;
  onBack: () => void;
  onOpenProject: (projectId: string) => void;
};

export function ProjectsAllPanel({
  isActive,
  onBack,
  onOpenProject,
}: ProjectsAllPanelProps) {
  return (
    <ProjectsPanel className="projects-panel--all">
      <ProjectReveal enabled={isActive}>
        <ProjectsSubviewHeader
          backLabel="← Destacados"
          onBack={onBack}
          eyebrow="Catálogo completo"
          title="Todos los proyectos"
        />
      </ProjectReveal>

      <div className="projects-bento">
        {projects.map((project, index) => (
          <ProjectBentoCard
            key={project.id}
            project={project}
            index={index}
            isActive={isActive}
            onOpen={() => onOpenProject(project.id)}
          />
        ))}
      </div>

      <ProjectReveal enabled={isActive}>
        <ProjectsSubviewFooter backLabel="← Destacados" onBack={onBack} />
      </ProjectReveal>
    </ProjectsPanel>
  );
}
