export type MediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      duration?: number;
      zoom?: "in" | "out";
    }
  | {
      type: "video";
      src: string;
      alt: string;
      duration?: number;
      poster?: string;
    };

export type SplitLandingSection = {
  id: string;
  title: string;
  href: string;
  media: MediaItem[];
  defaultImageDuration?: number;
  defaultVideoDuration?: number;
};

export type SplitLandingProps = {
  sections: SplitLandingSection[];
  diagonalOffset?: string;
  compactFlex?: number;
  compactFlexMobile?: number;
  expandedFlex?: number;
  showIntro?: boolean;
};
