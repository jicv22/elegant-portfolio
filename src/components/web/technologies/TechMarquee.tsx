"use client";

import type { RefObject } from "react";
import { TechBrandMark } from "@/components/web/technologies/TechBrandMark";
import { technologies } from "@/config/technologies";
import { useTechMarquee } from "@/hooks/use-tech-marquee";
import { cn } from "@/lib/cn";

type TechMarqueeProps = {
  enabled?: boolean;
  className?: string;
};

function TechMarqueeSet({
  ariaHidden = false,
  cloneId,
  measureRef,
}: {
  ariaHidden?: boolean;
  cloneId?: number;
  measureRef?: RefObject<HTMLDivElement | null>;
}) {
  const keyPrefix =
    cloneId === undefined ? "" : `clone-${cloneId}-`;

  return (
    <div
      ref={measureRef}
      className="tech-marquee__set"
      aria-hidden={ariaHidden || undefined}
    >
      {technologies.map((technology) => (
        <TechBrandMark
          key={`${keyPrefix}${technology.id}`}
          technology={technology}
          className="tech-marquee__item"
        />
      ))}
    </div>
  );
}

export function TechMarquee({ enabled = true, className }: TechMarqueeProps) {
  const { rootRef, trackRef, measureRef, marqueeProps } = useTechMarquee({
    enabled,
  });

  return (
    <div
      ref={rootRef}
      className={cn("tech-marquee", className)}
      {...marqueeProps}
    >
      <span className="sr-only">
        Arrastra horizontalmente para mover la cinta; al soltar con movimiento,
        conserva inercia antes de retomar el desplazamiento automático
      </span>
      <div ref={trackRef} className="tech-marquee__track">
        <TechMarqueeSet measureRef={measureRef} />
        <TechMarqueeSet ariaHidden cloneId={1} />
        <TechMarqueeSet ariaHidden cloneId={2} />
      </div>
    </div>
  );
}
