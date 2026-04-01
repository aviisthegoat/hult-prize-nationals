import photoManifest from "./photo-manifest.json";

/**
 * Public URL paths for gallery images (from lib/photo-manifest.json).
 * Regenerate with: npm run photos:manifest
 */
export function getGalleryUrls(): string[] {
  return photoManifest as string[];
}

/**
 * Pick a stable subset for decorative use (same order every build for the same manifest).
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
