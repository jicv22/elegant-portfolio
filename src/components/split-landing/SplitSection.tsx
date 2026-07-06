"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { SplitLandingSection } from "@/lib/split-landing/types";
import { MediaCarousel } from "./MediaCarousel";

type SplitSectionProps = {
  section: SplitLandingSection;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  isExpanded: boolean;
  isCompacted: boolean;
  isPeerHovered: boolean;
  diagonalOffset: string;
  compactFlex: number;
  compactFlexMobile: number;
  expandedFlex: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onActivate: () => void;
};

export function SplitSection({
  section,
  index,
  isFirst,
  isLast,
  isExpanded,
  isCompacted,
  isPeerHovered,
  diagonalOffset,
  compactFlex,
  compactFlexMobile,
  expandedFlex,
  onHoverStart,
  onHoverEnd,
  onFocus,
  onBlur,
  onActivate,
}: SplitSectionProps) {
  const defaultImageDuration = section.defaultImageDuration ?? 6000;
  const defaultVideoDuration = section.defaultVideoDuration ?? 12000;

  return (
    <Link
      href={section.href}
      aria-label={`Ir a ${section.title}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={(event) => {
        if (isCompacted) {
          event.preventDefault();
          onActivate();
          return;
        }

        const isTouch = window.matchMedia("(hover: none)").matches;

        if (isTouch && !isExpanded) {
          event.preventDefault();
          onActivate();
        }
      }}
      className={cn(
        "group/split relative isolate min-h-0 min-w-0 overflow-hidden outline-none",
        "transition-[flex-grow,flex-basis] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        isFirst &&
          "max-lg:clip-split-top lg:clip-split-left max-lg:z-[2] lg:z-[1]",
        isLast &&
          "max-lg:clip-split-bottom lg:clip-split-right max-lg:z-[1] lg:z-[2]",
        !isFirst && !isLast && "z-[1]",
        isCompacted && "split-section--compacted",
      )}
      style={{
        flexGrow: isExpanded ? expandedFlex : isCompacted ? undefined : 1,
        flexBasis: isExpanded ? "0%" : isCompacted ? "0%" : "50%",
        ["--split-diagonal" as string]: diagonalOffset,
        ["--split-compact-flex-desktop" as string]: String(compactFlex),
        ["--split-compact-flex-mobile" as string]: String(compactFlexMobile),
      }}
    >
      <MediaCarousel
        media={section.media}
        isActive={!isCompacted}
        defaultImageDuration={defaultImageDuration}
        defaultVideoDuration={defaultVideoDuration}
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-colors duration-700",
          isExpanded ? "bg-black/10" : "bg-black/25",
          isPeerHovered && "bg-black/40",
        )}
      />

      <div className="relative z-10 h-full w-full">
        <h2
          className={cn(
            "absolute inset-0 flex items-center justify-center px-6 text-center text-2xl font-semibold tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] transition-opacity ease-[cubic-bezier(0.4,0,0.2,1)] sm:px-10 sm:text-3xl md:text-4xl lg:text-5xl",
            isCompacted
              ? "pointer-events-none opacity-0"
              : "opacity-100 delay-[var(--split-collapse-duration)]",
          )}
          style={{
            transitionDuration: "var(--split-title-fade-duration)",
          }}
        >
          <span className="max-w-[18ch]">{section.title}</span>
        </h2>

        {isCompacted ? (
          <span
            aria-hidden
            className={cn(
              "absolute flex max-h-[calc(100%-1.5rem)] max-w-[calc(100%-1.5rem)] items-center justify-center px-2 text-center text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/95 opacity-0 sm:text-xs lg:text-sm lg:tracking-[0.35em] lg:[writing-mode:vertical-rl]",
              "split-label-anchor-center",
              isFirst &&
                "split-label-enter-left max-lg:split-label-enter-top",
              isLast &&
                "split-label-enter-right max-lg:split-label-enter-bottom",
            )}
          >
            {section.title}
          </span>
        ) : null}
      </div>

      <span className="sr-only">{`Sección ${index + 1}: ${section.title}`}</span>
    </Link>
  );
}
