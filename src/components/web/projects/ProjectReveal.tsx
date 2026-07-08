"use client";

import { useRevealOnView } from "@/hooks/use-reveal-on-view";
import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type ProjectRevealProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  enabled?: boolean;
  variant?: "card" | "detail";
};

export function ProjectReveal({
  children,
  className,
  enabled = true,
  variant = "card",
  ...props
}: ProjectRevealProps) {
  const { ref, isRevealed, enterComplete, onEnterAnimationEnd } =
    useRevealOnView<HTMLDivElement>(enabled);

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        variant === "detail" ? "project-detail-enter" : "project-card-enter",
        className,
      )}
      data-revealed={isRevealed || undefined}
      data-enter-complete={enterComplete || undefined}
      onAnimationEnd={onEnterAnimationEnd}
    >
      {children}
    </div>
  );
}
