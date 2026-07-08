"use client";

import { siteSections } from "@/config/site";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function HeroScrollHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.35);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleClick = () => {
    const next = document.getElementById(siteSections.technologies);

    if (!next) {
      return;
    }

    const navbar = document.querySelector<HTMLElement>(".site-nav");
    const navbarOffset = navbar?.offsetHeight ?? 0;
    const top = next.getBoundingClientRect().top + window.scrollY - navbarOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="hero-scroll-hint" data-visible={visible} aria-hidden={!visible}>
      <button
        type="button"
        className="hero-scroll-hint__button"
        onClick={handleClick}
        tabIndex={visible ? undefined : -1}
        aria-label="Desplazarse a la siguiente sección"
      >
        <ChevronDown
          className="hero-scroll-hint__chevron"
          strokeWidth={2.5}
          aria-hidden
        />
      </button>
    </div>
  );
}
