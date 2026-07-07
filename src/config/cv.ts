/**
 * CV download settings.
 *
 * When your PDF is ready:
 * 1. Place the file at `private/cv/isaac-cv.pdf` (path is gitignored).
 * 2. Set `enabled` to `true`.
 * 3. Redeploy so the file is included in the deployment bundle.
 *
 * Downloads are served only via `/api/cv` (not from `public/`) with rate limiting.
 */
export const cvDownload = {
  enabled: false,
  routePath: "/api/cv",
  storageFilename: "isaac-cv.pdf",
  downloadFilename: "Isaac-CV.pdf",
  maxBytes: 5 * 1024 * 1024,
  rateLimit: {
    maxRequests: 8,
    windowMs: 60 * 60 * 1000,
  },
} as const;
