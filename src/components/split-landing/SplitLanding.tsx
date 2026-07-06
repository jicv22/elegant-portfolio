"use client";

import { useCallback, useState } from "react";
import { useSplitIntro } from "@/hooks/use-split-intro";
import { cn } from "@/lib/cn";
import type { SplitLandingProps } from "@/lib/split-landing/types";
import { SplitSection } from "./SplitSection";

const DEFAULT_DIAGONAL = "3.5rem";
const DEFAULT_COMPACT_FLEX = 2.75;
const DEFAULT_COMPACT_FLEX_MOBILE = 5.5;
const DEFAULT_EXPANDED_FLEX = 18;

export function SplitLanding({
  sections,
  diagonalOffset = DEFAULT_DIAGONAL,
  compactFlex = DEFAULT_COMPACT_FLEX,
  compactFlexMobile = DEFAULT_COMPACT_FLEX_MOBILE,
  expandedFlex = DEFAULT_EXPANDED_FLEX,
  showIntro = true,
}: SplitLandingProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isIntroActive, introRevealed } = useSplitIntro();

  const clearHover = useCallback(() => setHoveredId(null), []);
  const clearActive = useCallback(() => setActiveId(null), []);

  const focusedId = hoveredId ?? activeId;
  const introEnabled = showIntro && isIntroActive;
  const showDiagonal = !introEnabled;
  const isInteractive = !introEnabled;

  return (
    <section
      className={cn(
        "relative flex h-dvh w-full overflow-hidden bg-black",
        "flex-col lg:flex-row",
        showDiagonal && "split-landing--diagonal-ready",
      )}
      onMouseLeave={clearHover}
    >
      {sections.map((section, index) => {
        const isExpanded = focusedId === section.id;
        const isCompacted = Boolean(focusedId && focusedId !== section.id);
        const isPeerHovered = Boolean(hoveredId && hoveredId !== section.id);
        const isRevealTarget = index === sections.length - 1;

        return (
          <SplitSection
            key={section.id}
            section={section}
            index={index}
            isFirst={index === 0}
            isLast={index === sections.length - 1}
            isExpanded={isExpanded}
            isCompacted={isCompacted}
            isPeerHovered={isPeerHovered}
            isRevealTarget={isRevealTarget}
            introEnabled={introEnabled}
            introRevealed={introRevealed}
            showDiagonal={showDiagonal}
            isInteractive={isInteractive}
            showTitle={!introEnabled || !isRevealTarget || introRevealed}
            diagonalOffset={diagonalOffset}
            compactFlex={compactFlex}
            compactFlexMobile={compactFlexMobile}
            expandedFlex={expandedFlex}
            onHoverStart={() => setHoveredId(section.id)}
            onHoverEnd={clearHover}
            onFocus={() => setActiveId(section.id)}
            onBlur={clearActive}
            onActivate={() => setActiveId(section.id)}
          />
        );
      })}
    </section>
  );
}
