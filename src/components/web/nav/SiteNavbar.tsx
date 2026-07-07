"use client";

import { siteBrand, siteNav } from "@/config/site";
import { CvNavCta } from "@/components/web/nav/CvNavCta";
import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
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
                <a href={link.href} className="site-nav__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={siteBrand.href}
          className="site-nav__brand"
          aria-label={`${siteBrand.name} — home`}
          onClick={closeMenu}
        >
          <span className="site-nav__brand-mark" aria-hidden>
            I
          </span>
          <span className="site-nav__brand-name">{siteBrand.name}</span>
        </a>

        <div className="site-nav__end">
          <CvNavCta />
        </div>
      </div>

      <div
        id="site-nav-mobile"
        className={cn("site-nav__mobile", menuOpen && "site-nav__mobile--open")}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className="site-nav__mobile-links">
            {siteNav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="site-nav__mobile-link" onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
