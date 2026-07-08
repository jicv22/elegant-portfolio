"use client";

import { useEdgeGlow } from "@/hooks/use-edge-glow";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type ContactGlowPanelProps = {
  className?: string;
  children: ReactNode;
};

export function ContactGlowPanel({ className, children }: ContactGlowPanelProps) {
  const glow = useEdgeGlow();

  return (
    <div
      ref={(node) => {
        glow.ref.current = node;
      }}
      className={cn("edge-glow edge-glow--card contact-invitation", className)}
      onPointerEnter={glow.onPointerEnter}
      onPointerMove={glow.onPointerMove}
      onPointerLeave={glow.onPointerLeave}
    >
      {children}
    </div>
  );
}
