"use client";

import { ProjectMediaGallery } from "@/components/web/projects/ProjectMediaGallery";
import { ProjectReveal } from "@/components/web/projects/ProjectReveal";
import { ProjectsPanel } from "@/components/web/projects/ProjectsPanel";
import { ProjectsSubviewFooter } from "@/components/web/projects/ProjectsSubviewFooter";
import { ProjectsSubviewHeader } from "@/components/web/projects/ProjectsSubviewHeader";
import { ProjectTechList } from "@/components/web/projects/ProjectTechList";
import type { ProjectRecord } from "@/lib/projects/types";

type ProjectDetailPanelProps = {
  project: ProjectRecord;
  isActive: boolean;
  onBack: () => void;
};

export function ProjectDetailPanel({
  project,
  isActive,
  onBack,
}: ProjectDetailPanelProps) {
  return (
    <ProjectsPanel className="projects-panel--detail">
      <ProjectReveal enabled={isActive} variant="detail">
        <ProjectsSubviewHeader
          backLabel="← Volver"
          onBack={onBack}
          eyebrow={project.projectType}
          title={project.name}
          meta={
            <p className="projects-panel__meta">
              Cliente: {project.client} · {project.role}
            </p>
          }
        />
      </ProjectReveal>

      <ProjectReveal enabled={isActive} variant="detail">
        <ProjectMediaGallery cover={project.cover} gallery={project.gallery} />
      </ProjectReveal>

      <div className="projects-detail-body">
        <div className="projects-detail-body__main">
          <ProjectReveal enabled={isActive} variant="detail">
            <section className="projects-detail-block">
              <h3 className="projects-detail-block__title">Resumen</h3>
              <p className="projects-detail-block__text">{project.description}</p>
            </section>
          </ProjectReveal>

          <ProjectReveal enabled={isActive} variant="detail">
            <section className="projects-detail-block">
              <h3 className="projects-detail-block__title">Contribuciones</h3>
              <ul className="projects-detail-list">
                {project.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </ProjectReveal>
        </div>

        <aside className="projects-detail-body__aside">
          <ProjectReveal enabled={isActive} variant="detail">
            <section className="projects-detail-block">
              <h3 className="projects-detail-block__title">Stack</h3>
              <ProjectTechList items={project.stack} />
            </section>
          </ProjectReveal>

          <ProjectReveal enabled={isActive} variant="detail">
            <section className="projects-detail-block">
              <h3 className="projects-detail-block__title">Logros</h3>
              <ul className="projects-detail-list projects-detail-list--compact">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </ProjectReveal>

          <ProjectReveal enabled={isActive} variant="detail">
            <section className="projects-detail-block">
              <h3 className="projects-detail-block__title">Involucramiento</h3>
              <p className="projects-detail-block__text">{project.involvement}</p>
            </section>
          </ProjectReveal>
        </aside>
      </div>

      <ProjectReveal enabled={isActive} variant="detail">
        <ProjectsSubviewFooter backLabel="← Volver" onBack={onBack} />
      </ProjectReveal>
    </ProjectsPanel>
  );
}
