"use client";

import { useEdgeGlow } from "@/hooks/use-edge-glow";
import { cn } from "@/lib/cn";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  Ref,
} from "react";

type EdgeGlowClassName = {
  className?: string;
};

export function EdgeGlowAnchor({
  className,
  ref,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> &
  EdgeGlowClassName & { ref?: Ref<HTMLAnchorElement> }) {
  const glow = useEdgeGlow();

  return (
    <a
      {...props}
      ref={(node) => {
        glow.ref.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={cn("edge-glow", className)}
      onPointerEnter={(event) => {
        glow.onPointerEnter(event);
        onPointerEnter?.(event);
      }}
      onPointerMove={(event) => {
        glow.onPointerMove(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        glow.onPointerLeave();
        onPointerLeave?.(event);
      }}
    />
  );
}

export function EdgeGlowButton({
  className,
  ref,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> &
  EdgeGlowClassName & { ref?: Ref<HTMLButtonElement> }) {
  const glow = useEdgeGlow();

  return (
    <button
      {...props}
      ref={(node) => {
        glow.ref.current = node;

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      className={cn("edge-glow", className)}
      onPointerEnter={(event) => {
        glow.onPointerEnter(event);
        onPointerEnter?.(event);
      }}
      onPointerMove={(event) => {
        glow.onPointerMove(event);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        glow.onPointerLeave();
        onPointerLeave?.(event);
      }}
    />
  );
}
