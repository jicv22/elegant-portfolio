import { sectionHref, siteSections } from "@/config/site";

export const heroContent = {
  name: "Isaac CV",
  headline: "Hablemos de tu negocio",
  description:
    "Desarrollo sitios y productos web a medida para que tu negocio destaque en línea.",
  ctas: [
    {
      label: "Contactar",
      href: sectionHref(siteSections.contact),
      variant: "primary" as const,
    },
    {
      label: "Ver proyectos",
      href: sectionHref(siteSections.projects),
      variant: "secondary" as const,
    },
  ],
} as const;
