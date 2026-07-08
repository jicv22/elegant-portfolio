import { siteBrand } from "@/config/site";

export const footerContent = {
  credential: {
    prefix: "Ingeniería en Sistemas",
    connector: "acreditado por",
    institution: {
      name: "Universidad Nacional de Costa Rica",
      shortName: "UNA",
      href: "https://www.una.ac.cr",
      /** Swap for the UNA logo once available (e.g. "/media/brand/una-logo.svg"). */
      logoSrc: null as string | null,
    },
  },
  copyright: `© ${new Date().getFullYear()} ${siteBrand.name}`,
  location: "Costa Rica",
} as const;
