"use client";

import { useEffect, useState } from "react";
import {
  SPLIT_INTRO_HOLD_MS,
  SPLIT_INTRO_REVEAL_DURATION_MS,
  SPLIT_INTRO_STORAGE_KEY,
} from "@/lib/split-landing/intro";

export function useSplitIntro() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [introRevealed, setIntroRevealed] = useState(false);

  useEffect(() => {
    let revealTimer: number | undefined;
    let completeTimer: number | undefined;

    const startTimer = window.setTimeout(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const hasSeenIntro =
        sessionStorage.getItem(SPLIT_INTRO_STORAGE_KEY) === "1";

      if (prefersReducedMotion || hasSeenIntro) {
        setIntroRevealed(true);
        setIsIntroActive(false);
        return;
      }

      revealTimer = window.setTimeout(() => {
        setIntroRevealed(true);
      }, SPLIT_INTRO_HOLD_MS);

      completeTimer = window.setTimeout(() => {
        sessionStorage.setItem(SPLIT_INTRO_STORAGE_KEY, "1");
        setIsIntroActive(false);
      }, SPLIT_INTRO_HOLD_MS + SPLIT_INTRO_REVEAL_DURATION_MS + 50);
    }, 0);

    return () => {
      window.clearTimeout(startTimer);
      if (revealTimer) {
        window.clearTimeout(revealTimer);
      }
      if (completeTimer) {
        window.clearTimeout(completeTimer);
      }
    };
  }, []);

  return {
    isIntroActive,
    introRevealed,
  };
}
