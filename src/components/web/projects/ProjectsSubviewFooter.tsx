import { ProjectsBackButton } from "@/components/web/projects/ProjectsBackButton";

type ProjectsSubviewFooterProps = {
  backLabel: string;
  onBack: () => void;
};

export function ProjectsSubviewFooter({
  backLabel,
  onBack,
}: ProjectsSubviewFooterProps) {
  return (
    <footer className="projects-panel__footer projects-panel__footer--subview">
      <ProjectsBackButton label={backLabel} onClick={onBack} />
    </footer>
  );
}
