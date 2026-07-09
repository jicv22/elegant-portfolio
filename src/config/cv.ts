/**
 * CV download settings.
 *
 * 1. Place the PDF at `public/cv/<storageFilename>`.
 * 2. Set `enabled` to `true`.
 */
export const cvDownload = {
  enabled: true,
  routePath: "/cv/cv_jose_cambronero-fullstack_developer-es.pdf",
  storageFilename: "cv_jose_cambronero-fullstack_developer-es.pdf",
  downloadFilename: "Jose-Cambronero-CV.pdf",
} as const;
