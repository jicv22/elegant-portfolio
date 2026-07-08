"use client";

import { BrandLogo } from "@/components/web/nav/BrandLogo";
import { siteBrand, siteNav } from "@/config/site";
import { CvNavCta } from "@/components/web/nav/CvNavCta";
import { TextShineLink } from "@/components/ui/TextShineControl";
import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 767px)");

    const onViewportChange = () => {
      if (!mobileMedia.matches) {
        setMenuOpen(false);
      }
    };

    onViewportChange();
    mobileMedia.addEventListener("change", onViewportChange);

    return () => {
      mobileMedia.removeEventListener("change", onViewportChange);
    };
  }, []);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 767px)");
    const shouldLockScroll = menuOpen && mobileMedia.matches;

    document.body.style.overflow = shouldLockScroll ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      const header = headerRef.current;
      if (header && !header.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={cn("site-nav", scrolled && "site-nav--scrolled")}
      data-scrolled={scrolled || undefined}
    >
      <div className="site-nav__inner">
        <nav className="site-nav__start" aria-label="Main">
          <button
            type="button"
            className="site-nav__menu-btn"
            aria-expanded={menuOpen}
            aria-controls="site-nav-mobile"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {menuOpen ? "Close menu" : "Open menu"}
            </span>
            <span className={cn("site-nav__menu-icon", menuOpen && "is-open")} />
          </button>

          <ul className="site-nav__links">
            {siteNav.links.map((link) => (
              <li key={link.href}>
                <TextShineLink href={link.href} className="site-nav__link">
                  {link.label}
                </TextShineLink>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={siteBrand.href}
          className="site-nav__brand"
          aria-label={`${siteBrand.name} — inicio`}
          onClick={closeMenu}
        >
          <BrandLogo
            className="site-nav__brand-logo"
            aria-label={siteBrand.logoAlt}
          />
        </a>

        <div className="site-nav__end">
          <CvNavCta />
        </div>
      </div>

      <div
        id="site-nav-mobile"
        className={cn("site-nav__mobile", menuOpen && "site-nav__mobile--open")}
        aria-hidden={!menuOpen}
      >
        <div className="site-nav__mobile-inner">
          <nav aria-label="Mobile">
            <ul className="site-nav__mobile-links">
              {siteNav.links.map((link, index) => (
                <li
                  key={link.href}
                  className="site-nav__mobile-item"
                  style={
                    menuOpen
                      ? { animationDelay: `${0.14 + index * 0.09}s` }
                      : undefined
                  }
                >
                  <a
                    href={link.href}
                    className="site-nav__mobile-link"
                    onClick={closeMenu}
                    tabIndex={menuOpen ? undefined : -1}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
