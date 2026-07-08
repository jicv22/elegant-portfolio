import type { SimpleIcon } from "simple-icons";
import {
  siApollographql,
  siCss,
  siFigma,
  siFirebase,
  siFramer,
  siGit,
  siGithub,
  siGraphql,
  siHtml5,
  siJavascript,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPrisma,
  siReact,
  siRemix,
  siTailwindcss,
  siTypescript,
  siVercel,
  siVite,
} from "simple-icons";

export type TechnologyBrand = {
  id: string;
  name: string;
  icon: Pick<SimpleIcon, "path" | "title">;
};

function tech(
  id: string,
  name: string,
  icon: SimpleIcon,
): TechnologyBrand {
  return {
    id,
    name,
    icon: {
      path: icon.path,
      title: icon.title,
    },
  };
}

/** Official full-stack web technologies — see docs/my-technologies.md */
export const technologies: TechnologyBrand[] = [
  tech("html5", "HTML5", siHtml5),
  tech("css", "CSS", siCss),
  tech("javascript", "JavaScript", siJavascript),
  tech("typescript", "TypeScript", siTypescript),
  tech("react", "React", siReact),
  tech("nextjs", "Next.js", siNextdotjs),
  tech("remix", "Remix", siRemix),
  tech("vite", "Vite", siVite),
  tech("tailwindcss", "Tailwind CSS", siTailwindcss),
  tech("mui", "Material UI", siMui),
  tech("framer-motion", "Framer Motion", siFramer),
  tech("nodejs", "Node.js", siNodedotjs),
  tech("mysql", "MySQL", siMysql),
  tech("prisma", "Prisma", siPrisma),
  tech("graphql", "GraphQL", siGraphql),
  tech("apollo", "Apollo", siApollographql),
  tech("firebase", "Firebase", siFirebase),
  tech("git", "Git", siGit),
  tech("github", "GitHub", siGithub),
  tech("vercel", "Vercel", siVercel),
  tech("figma", "Figma", siFigma),
];
