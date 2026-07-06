import type { SplitLandingSection } from "@/lib/split-landing/types";

export const splitLandingSections: SplitLandingSection[] = [
  {
    id: "web",
    title: "Desarrollo Web",
    href: "/web-development",
    defaultImageDuration: 6000,
    defaultVideoDuration: 12000,
    media: [
      {
        type: "image",
        src: "/media/web/01.svg",
        alt: "Proyecto web 1",
        zoom: "in",
      },
      {
        type: "image",
        src: "/media/web/02.svg",
        alt: "Proyecto web 2",
        zoom: "out",
      },
      {
        type: "image",
        src: "/media/web/03.svg",
        alt: "Proyecto web 3",
        zoom: "in",
      },
    ],
  },
  {
    id: "games",
    title: "Desarrollo de Videojuegos",
    href: "/game-development",
    defaultImageDuration: 6000,
    defaultVideoDuration: 12000,
    media: [
      {
        type: "image",
        src: "/media/games/01.svg",
        alt: "Proyecto de videojuegos 1",
        zoom: "out",
      },
      {
        type: "image",
        src: "/media/games/02.svg",
        alt: "Proyecto de videojuegos 2",
        zoom: "in",
      },
      {
        type: "image",
        src: "/media/games/03.svg",
        alt: "Proyecto de videojuegos 3",
        zoom: "out",
      },
    ],
  },
];
