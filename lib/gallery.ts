import fs from "fs";
import path from "path";

const PHOTOS_DIR = path.join(process.cwd(), "public", "photos");

const IMAGE_EXT = /\.(jpe?g|png|gif|webp)$/i;

/**
 * Filenames in public/photos (sorted for stable ordering across builds).
 */
export function getGalleryFilenames(): string[] {
  try {
    if (!fs.existsSync(PHOTOS_DIR)) return [];
    return fs
      .readdirSync(PHOTOS_DIR)
      .filter((f) => IMAGE_EXT.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }));
  } catch {
    return [];
  }
}

/** Public URL paths, e.g. /photos/photo.jpg */
export function getGalleryUrls(): string[] {
  return getGalleryFilenames().map((f) => `/photos/${encodeURIComponent(f)}`);
}

/**
 * Pick a stable subset for decorative use (same order every build for the same folder).
 */
export function pickAccentUrls(urls: string[], count: number, offset = 0): string[] {
  if (urls.length === 0 || count <= 0) return [];
  const out: string[] = [];
  const step = Math.max(1, Math.floor(urls.length / Math.max(count, 1)));
  for (let i = 0; i < count; i++) {
    out.push(urls[(offset + i * step) % urls.length]);
  }
  return out;
}
