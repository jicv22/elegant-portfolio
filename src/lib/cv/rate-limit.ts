import { cvDownload } from "@/config/cv";

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitBucket>();

export function checkCvDownloadRateLimit(clientKey: string) {
  const now = Date.now();
  const bucket = buckets.get(clientKey);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(clientKey, {
      count: 1,
      resetAt: now + cvDownload.rateLimit.windowMs,
    });

    return { allowed: true as const };
  }

  if (bucket.count >= cvDownload.rateLimit.maxRequests) {
    return {
      allowed: false as const,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;

  return { allowed: true as const };
}

export function getCvDownloadClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();

    if (first) {
      return first.slice(0, 128);
    }
  }

  const realIp = request.headers.get("x-real-ip");

  if (realIp) {
    return realIp.trim().slice(0, 128);
  }

  return "unknown";
}
