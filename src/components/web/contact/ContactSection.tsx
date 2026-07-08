"use client";

import { ContactGlowPanel } from "@/components/web/contact/ContactGlowPanel";
import { ProjectReveal } from "@/components/web/projects/ProjectReveal";
import { EdgeGlowAnchor } from "@/components/ui/EdgeGlow";
import { TextShineLink } from "@/components/ui/TextShineControl";
import { contactChannels, contactSectionContent } from "@/config/contact";
import { siteSections } from "@/config/site";
import { cn } from "@/lib/cn";
import { Clipboard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ContactSection() {
  const { email, linkedin, github } = contactChannels;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setCopied(false);
    }, 1800);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [copied]);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email.address);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [email.address]);

  return (
    <section
      id={siteSections.contact}
      className="contact-section"
      aria-label="Contacto"
    >
      <div className="contact-section__stage">
        <ProjectReveal>
          <header className="contact-section__header">
            <p className="contact-section__eyebrow">
              {contactSectionContent.eyebrow}
            </p>
            <h2 className="contact-section__title">
              {contactSectionContent.title}
            </h2>
            <p className="contact-section__lead">{contactSectionContent.lead}</p>
          </header>
        </ProjectReveal>

        <ProjectReveal>
          <ContactGlowPanel>
            <EdgeGlowAnchor
              href={email.mailto}
              className="hero-cta hero-cta--primary contact-invitation__cta"
            >
              {contactSectionContent.emailCta}
            </EdgeGlowAnchor>

            <button
              type="button"
              className={cn(
                "text-shine-control text-shine-control--plain contact-invitation__copy",
                copied && "contact-invitation__copy--copied",
              )}
              onClick={handleCopyEmail}
              aria-label={
                copied
                  ? contactSectionContent.copiedHint
                  : contactSectionContent.copyHint
              }
            >
              <span className="contact-invitation__copy-inner">
                <span className="text-shine-control__label">
                  {copied ? contactSectionContent.copiedHint : email.address}
                </span>
                <Clipboard
                  className="contact-invitation__copy-icon"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </span>
            </button>

            <div className="contact-invitation__links">
              <TextShineLink
                href={linkedin.href}
                className="contact-invitation__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkedin.label}
              </TextShineLink>
              <span className="contact-invitation__links-sep" aria-hidden>
                ·
              </span>
              <TextShineLink
                href={github.href}
                className="contact-invitation__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {github.label}
              </TextShineLink>
            </div>

            <p className="contact-invitation__note">
              {contactSectionContent.responseTime}
            </p>
          </ContactGlowPanel>
        </ProjectReveal>
      </div>
    </section>
  );
}
