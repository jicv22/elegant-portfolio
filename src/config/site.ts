export const siteSections = {
  home: "home",
  projects: "projects",
  contact: "contact",
} as const;

export type SiteSectionId = (typeof siteSections)[keyof typeof siteSections];

export function sectionHref(sectionId: SiteSectionId) {
  return `#${sectionId}`;
}

export const siteBrand = {
  name: "Isaac",
  href: sectionHref(siteSections.home),
} as const;

export const siteNav = {
  links: [
    { label: "Proyectos", href: sectionHref(siteSections.projects) },
    { label: "Contacto", href: sectionHref(siteSections.contact) },
  ],
} as const;
