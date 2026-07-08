"use client";

import { BrandIcon } from "@/components/icons/BrandIcon";
import { githubBrand, linkedInBrand } from "@/components/icons/brand-icons";
import { EdgeGlowAnchor, EdgeGlowButton } from "@/components/ui/EdgeGlow";
import { contactChannels } from "@/config/contact";
import { useClipboard } from "@/hooks/use-clipboard";
import { cn } from "@/lib/cn";
import { Mail } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

function ExternalContactLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <li>
      <EdgeGlowAnchor
        href={href}
        className="contact-rail__button edge-glow--rail"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
      >
        {icon}
      </EdgeGlowAnchor>
    </li>
  );
}

function EmailContactItem() {
  const menuId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const [open, setOpen] = useState(false);
  const { address, mailto, label } = contactChannels.email;
  const { copied, copy: handleCopy } = useClipboard(address);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleMouseEnter = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setOpen(false);
    }
  };

  return (
    <li
      ref={rootRef}
      className={cn("contact-rail__email", open && "contact-rail__email--open")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="sr-only" aria-live="polite">
        {copied ? "Correo copiado al portapapeles" : ""}
      </span>
      <EdgeGlowButton
        type="button"
        className="contact-rail__button edge-glow--rail"
        aria-label={label}
        aria-expanded={open}
        aria-controls={menuId}
        title={label}
        onClick={() => setOpen((value) => !value)}
      >
        <Mail className="contact-rail__icon" strokeWidth={1.75} aria-hidden />
      </EdgeGlowButton>

      <div
        id={menuId}
        className="contact-rail__menu"
        role="menu"
        hidden={!open}
      >
        <a
          href={mailto}
          className="contact-rail__menu-item"
          role="menuitem"
          onClick={() => setOpen(false)}
        >
          Enviar correo
        </a>
        <button
          type="button"
          className="contact-rail__menu-item"
          role="menuitem"
          onClick={handleCopy}
        >
          {copied ? "Copiado" : "Copiar correo"}
        </button>
      </div>
    </li>
  );
}

export function ContactRail() {
  return (
    <aside className="contact-rail" aria-label="Contact">
      <ul className="contact-rail__list">
        <EmailContactItem />
        <ExternalContactLink
          href={contactChannels.linkedin.href}
          label={contactChannels.linkedin.label}
          icon={<BrandIcon icon={linkedInBrand} className="contact-rail__icon" />}
        />
        <ExternalContactLink
          href={contactChannels.github.href}
          label={contactChannels.github.label}
          icon={<BrandIcon icon={githubBrand} className="contact-rail__icon" />}
        />
      </ul>
    </aside>
  );
}
