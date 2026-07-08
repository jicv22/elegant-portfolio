import { cn } from "@/lib/cn";

type ProjectTechListProps = {
  items: string[];
  className?: string;
  limit?: number;
};

export function ProjectTechList({
  items,
  className,
  limit,
}: ProjectTechListProps) {
  const visible = limit ? items.slice(0, limit) : items;

  return (
    <ul className={cn("project-tech-list", className)}>
      {visible.map((item) => (
        <li key={item} className="project-tech-list__item">
          {item}
        </li>
      ))}
    </ul>
  );
}
