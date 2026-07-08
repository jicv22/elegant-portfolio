import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ProjectsPanelProps = {
  className?: string;
  children: ReactNode;
};

export function ProjectsPanel({ className, children }: ProjectsPanelProps) {
  return <div className={cn("projects-panel", className)}>{children}</div>;
}
