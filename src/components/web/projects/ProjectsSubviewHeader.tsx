import { ProjectsBackButton } from "@/components/web/projects/ProjectsBackButton";
import type { ReactNode } from "react";

type ProjectsSubviewHeaderProps = {
  backLabel: string;
  onBack: () => void;
  eyebrow: string;
  title: string;
  meta?: ReactNode;
};

export function ProjectsSubviewHeader({
  backLabel,
  onBack,
  eyebrow,
  title,
  meta,
}: ProjectsSubviewHeaderProps) {
  return (
    <header className="projects-panel__header projects-panel__header--subview">
      <ProjectsBackButton label={backLabel} onClick={onBack} />
      <div className="projects-panel__heading">
        <p className="projects-panel__eyebrow">{eyebrow}</p>
        <h2 className="projects-panel__title">{title}</h2>
        {meta}
      </div>
    </header>
  );
}
