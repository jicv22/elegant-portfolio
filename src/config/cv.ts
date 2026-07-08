/**
 * CV download settings.
 *
 * 1. Place the PDF at `private/cv/<storageFilename>` (gitignored).
 * 2. Set `enabled` to `true`.
 * 3. On deploy (Vercel, etc.), upload the PDF to the same path in the build
 *    environment — it is not committed to git.
 *
 * Served only via `/api/cv` with rate limiting (not from `public/`).
 */
export const cvDownload = {
  enabled: true,
  routePath: "/api/cv",
  storageFilename: "cv_jose_Cambronero-fullstack_developer-es.pdf",
  downloadFilename: "Jose-Cambronero-CV.pdf",
  maxBytes: 5 * 1024 * 1024,
  rateLimit: {
    maxRequests: 8,
    windowMs: 60 * 60 * 1000,
  },
} as const;
