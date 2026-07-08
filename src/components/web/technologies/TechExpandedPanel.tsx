"use client";

import { TechBrandMark } from "@/components/web/technologies/TechBrandMark";
import { ProjectsBackButton } from "@/components/web/projects/ProjectsBackButton";
import { technologies } from "@/config/technologies";

type TechExpandedPanelProps = {
  onCollapse: () => void;
  collapseDisabled?: boolean;
};

export function TechExpandedPanel({
  onCollapse,
  collapseDisabled = false,
}: TechExpandedPanelProps) {
  return (
    <div className="tech-panel tech-panel--expanded">
      <div className="tech-panel__inner">
        <header className="tech-panel__header tech-panel__header--expanded">
          <h2 className="tech-panel__title tech-panel__title--expanded">
            Tecnologías trabajadas
          </h2>
          <p className="tech-panel__lead">
            Stack y herramientas con las que construyo productos en producción.
          </p>
        </header>

        <ul className="tech-grid">
          {technologies.map((technology) => (
            <li key={technology.id}>
              <TechBrandMark
                technology={technology}
                className="tech-grid__card"
              />
            </li>
          ))}
        </ul>

        <footer className="tech-panel__footer">
          <ProjectsBackButton
            label="← Vista compacta"
            onClick={onCollapse}
            disabled={collapseDisabled}
          />
        </footer>
      </div>
    </div>
  );
}
