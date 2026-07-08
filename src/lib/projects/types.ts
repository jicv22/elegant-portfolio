export type ProjectBentoCoverRatio = "16/10" | "21/9" | "fill";

export type ProjectBentoLayout = {
  /** Columns to span in the 12-column bento grid (1–12). */
  colSpan: number;
  /** Optional row span for taller cards. */
  rowSpan?: number;
  /** Cover image proportions inside the card. */
  coverRatio?: ProjectBentoCoverRatio;
};

export type ProjectMediaItem =
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    }
  | {
      type: "youtube";
      videoId: string;
      title: string;
    };

export type ProjectRecord = {
  id: string;
  name: string;
  client: string;
  role: string;
  projectType: string;
  involvement: string;
  featured: boolean;
  featuredLayout?: "left" | "right";
  /** Optional layout override for the desktop (12-col) bento grid. */
  bentoLayout?: ProjectBentoLayout;
  /** Optional layout override for the tablet (6-col) bento grid. */
  bentoLayoutMd?: ProjectBentoLayout;
  summary: string;
  description: string;
  stackPrimary: string[];
  stack: string[];
  highlights: string[];
  contributions: string[];
  cover: {
    src: string;
    alt: string;
  };
  gallery: ProjectMediaItem[];
};

export type ProjectsListView = "featured" | "all";
