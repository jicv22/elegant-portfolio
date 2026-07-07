import { cvDownload } from "@/config/cv";
import {
  checkCvDownloadRateLimit,
  getCvDownloadClientKey,
} from "@/lib/cv/rate-limit";
import { resolveCvFile } from "@/lib/cv/resolve-cv-file";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!cvDownload.enabled) {
    return new Response(null, { status: 404 });
  }

  const clientKey = getCvDownloadClientKey(request);
  const rateLimit = checkCvDownloadRateLimit(clientKey);

  if (!rateLimit.allowed) {
    return new Response(null, {
      status: 429,
      headers: {
        "Retry-After": String(rateLimit.retryAfterSec),
        "Cache-Control": "no-store",
      },
    });
  }

  const file = await resolveCvFile();

  if (!file) {
    return new Response(null, {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const safeFilename = cvDownload.downloadFilename.replace(/["\r\n]/g, "");

  return new Response(new Uint8Array(file.buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "Content-Length": String(file.size),
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
