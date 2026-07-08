"use client";

import { useCallback, useEffect, useRef, useState, type AnimationEvent } from "react";

const REVEAL_THRESHOLD = 0.14;
const REVEAL_DELAY_MS = 80;
const CARD_ENTER_ANIMATION_MS = 760;

export function useRevealOnView<T extends HTMLElement = HTMLElement>(
  enabled = true,
) {
  const ref = useRef<T>(null);
  const hasRevealedRef = useRef(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [enterComplete, setEnterComplete] = useState(false);

  useEffect(() => {
    if (!enabled) {
      hasRevealedRef.current = false;
      setIsRevealed(false);
      setEnterComplete(false);
      return;
    }

    if (hasRevealedRef.current) {
      setIsRevealed(true);
      setEnterComplete(true);
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    let revealTimer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (revealTimer) {
          clearTimeout(revealTimer);
        }

        revealTimer = setTimeout(() => {
          hasRevealedRef.current = true;
          setIsRevealed(true);
          observer.disconnect();
        }, REVEAL_DELAY_MS);
      },
      {
        threshold: REVEAL_THRESHOLD,
        rootMargin: "0px 0px 0% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();

      if (revealTimer) {
        clearTimeout(revealTimer);
      }
    };
  }, [enabled]);

  useEffect(() => {
    if (!isRevealed) {
      setEnterComplete(false);
      return;
    }

    const fallbackTimer = setTimeout(
      () => setEnterComplete(true),
      CARD_ENTER_ANIMATION_MS + 60,
    );

    return () => clearTimeout(fallbackTimer);
  }, [isRevealed]);

  const onEnterAnimationEnd = useCallback((event: AnimationEvent<T>) => {
    if (event.currentTarget !== event.target) {
      return;
    }

    if (
      event.animationName === "project-card-enter" ||
      event.animationName === "project-detail-enter"
    ) {
      setEnterComplete(true);
    }
  }, []);

  return {
    ref,
    isRevealed,
    enterComplete,
    onEnterAnimationEnd,
  };
}
