import type { ProjectBentoLayout, ProjectRecord } from "@/lib/projects/types";
import type { CSSProperties } from "react";

/** Default bento presets when a project has no `bentoLayout` override. */
export const BENTO_LAYOUT_PRESETS: ProjectBentoLayout[] = [
  { colSpan: 7 },
  { colSpan: 5, rowSpan: 2, coverRatio: "fill" },
  { colSpan: 4 },
  { colSpan: 4 },
  { colSpan: 4 },
  { colSpan: 8, coverRatio: "21/9" },
];

/** Default 6-column bento presets for the tablet tier. */
export const BENTO_LAYOUT_MD_PRESETS: ProjectBentoLayout[] = [
  { colSpan: 3, rowSpan: 4, coverRatio: "fill" },
  { colSpan: 3, rowSpan: 3, coverRatio: "fill" },
  { colSpan: 2, rowSpan: 4, coverRatio: "fill" },
  { colSpan: 2, rowSpan: 3, coverRatio: "fill" },
  { colSpan: 2, rowSpan: 3, coverRatio: "fill" },
  { colSpan: 2, rowSpan: 2, coverRatio: "fill" },
];

export function getProjectBentoLayout(
  project: ProjectRecord,
  index: number,
): ProjectBentoLayout {
  return project.bentoLayout ?? BENTO_LAYOUT_PRESETS[index % BENTO_LAYOUT_PRESETS.length];
}

export function getProjectBentoLayoutMd(
  project: ProjectRecord,
  index: number,
): ProjectBentoLayout {
  return (
    project.bentoLayoutMd ??
    BENTO_LAYOUT_MD_PRESETS[index % BENTO_LAYOUT_MD_PRESETS.length]
  );
}

export function getBentoLayoutStyle(
  layout: ProjectBentoLayout,
  layoutMd: ProjectBentoLayout,
): CSSProperties {
  return {
    "--bento-col-span": layout.colSpan,
    "--bento-row-span": layout.rowSpan ?? 1,
    "--bento-md-col-span": layoutMd.colSpan,
    "--bento-md-row-span": layoutMd.rowSpan ?? 1,
  } as CSSProperties;
}
