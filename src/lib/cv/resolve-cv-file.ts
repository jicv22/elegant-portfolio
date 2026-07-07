import { cvDownload } from "@/config/cv";
import fs from "node:fs/promises";
import path from "node:path";

const CV_STORAGE_DIR = path.join(process.cwd(), "private", "cv");

export type ResolvedCvFile = {
  buffer: Buffer;
  size: number;
};

function getCvStoragePath() {
  const filename = path.basename(cvDownload.storageFilename);

  if (filename !== cvDownload.storageFilename) {
    return null;
  }

  const absolutePath = path.resolve(CV_STORAGE_DIR, filename);
  const relative = path.relative(CV_STORAGE_DIR, absolutePath);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return null;
  }

  return absolutePath;
}

export async function resolveCvFile(): Promise<ResolvedCvFile | null> {
  if (!cvDownload.enabled) {
    return null;
  }

  const absolutePath = getCvStoragePath();

  if (!absolutePath) {
    return null;
  }

  let stat;

  try {
    stat = await fs.stat(absolutePath);
  } catch {
    return null;
  }

  if (!stat.isFile() || stat.size <= 0 || stat.size > cvDownload.maxBytes) {
    return null;
  }

  const buffer = await fs.readFile(absolutePath);

  return {
    buffer,
    size: stat.size,
  };
}

export function isCvDownloadReady() {
  return cvDownload.enabled;
}
