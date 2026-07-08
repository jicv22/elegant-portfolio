"use client";

import { cn } from "@/lib/cn";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type TextShineClassName = {
  className?: string;
  children: ReactNode;
};

function TextShineLabel({ children }: { children: ReactNode }) {
  return <span className="text-shine-control__label">{children}</span>;
}

export function TextShineLink({
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & TextShineClassName) {
  return (
    <a className={cn("text-shine-control", className)} {...props}>
      <TextShineLabel>{children}</TextShineLabel>
    </a>
  );
}

export function TextShineButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & TextShineClassName) {
  return (
    <button type="button" className={cn("text-shine-control", className)} {...props}>
      <TextShineLabel>{children}</TextShineLabel>
    </button>
  );
}
