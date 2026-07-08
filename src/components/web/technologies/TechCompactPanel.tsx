"use client";

import { TechMarquee } from "@/components/web/technologies/TechMarquee";
import { cn } from "@/lib/cn";
import { ChevronDown } from "lucide-react";

type TechCompactPanelProps = {
  isActive: boolean;
  onExpand: () => void;
  expandDisabled?: boolean;
};

export function TechCompactPanel({
  isActive,
  onExpand,
  expandDisabled = false,
}: TechCompactPanelProps) {
  return (
    <div className="tech-panel tech-panel--compact">
      <TechMarquee enabled={isActive} />

      <button
        type="button"
        className={cn(
          "text-shine-control text-shine-control--plain tech-expand-trigger",
        )}
        onClick={onExpand}
        disabled={expandDisabled}
        aria-disabled={expandDisabled || undefined}
      >
        <span className="tech-expand-trigger__content">
          <span className="text-shine-control__label">
            Ver todas las tecnologías
          </span>
          <ChevronDown
            className="tech-expand-trigger__icon"
            strokeWidth={1.75}
            aria-hidden
          />
        </span>
      </button>
    </div>
  );
}
