"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { MediaItem } from "@/lib/split-landing/types";

type MediaCarouselProps = {
  media: MediaItem[];
  isActive: boolean;
  defaultImageDuration: number;
  defaultVideoDuration: number;
};

function getItemDuration(
  item: MediaItem,
  defaultImageDuration: number,
  defaultVideoDuration: number,
) {
  if (item.duration) {
    return item.duration;
  }

  return item.type === "video" ? defaultVideoDuration : defaultImageDuration;
}

export function MediaCarousel({
  media,
  isActive,
  defaultImageDuration,
  defaultVideoDuration,
}: MediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeItem = media[activeIndex];

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % media.length);
  }, [media.length]);

  useEffect(() => {
    if (!isActive || media.length <= 1) {
      return;
    }

    const currentItem = media[activeIndex];

    if (currentItem.type === "video") {
      return;
    }

    const timeout = window.setTimeout(
      goToNext,
      getItemDuration(currentItem, defaultImageDuration, defaultVideoDuration),
    );

    return () => window.clearTimeout(timeout);
  }, [
    activeIndex,
    defaultImageDuration,
    defaultVideoDuration,
    goToNext,
    isActive,
    media,
  ]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || activeItem.type !== "video") {
      return;
    }

    if (!isActive) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    const playPromise = video.play();

    if (playPromise) {
      playPromise.catch(() => undefined);
    }
  }, [activeItem, isActive]);

  if (!activeItem) {
    return null;
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {media.map((item, index) => {
        const isVisible = index === activeIndex;
        const zoomDirection = item.type === "image" ? (item.zoom ?? "in") : "in";

        return (
          <div
            key={`${item.src}-${index}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              isVisible ? "opacity-100" : "opacity-0",
            )}
          >
            {item.type === "image" ? (
              <div
                className={cn(
                  "relative h-full w-full",
                  isVisible && isActive && "animate-ken-burns",
                  isVisible && isActive && zoomDirection === "out" && "animate-ken-burns-out",
                )}
                style={
                  isVisible && isActive
                    ? {
                        animationDuration: `${getItemDuration(item, defaultImageDuration, defaultVideoDuration)}ms`,
                      }
                    : undefined
                }
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <video
                ref={isVisible ? videoRef : undefined}
                src={item.src}
                poster={item.poster}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover"
                onEnded={goToNext}
              />
            )}
          </div>
        );
      })}

      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
