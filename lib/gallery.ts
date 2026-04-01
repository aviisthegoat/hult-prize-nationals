import photoManifest from "./photo-manifest.json";

/**
 * Public URL paths for gallery images (from lib/photo-manifest.json).
 * Regenerate with: npm run photos:manifest
 */
export function getGalleryUrls(): string[] {
  return photoManifest as string[];
}

/**
 * Same images as getGalleryUrls(), in a pseudo-random order that is stable across
 * builds and SSR (fixed seed). Use on the full gallery page so similar or sequential
 * files are less likely to appear side by side.
 */
export function getGalleryUrlsShuffled(): string[] {
  const urls = [...(photoManifest as string[])];
  if (urls.length <= 1) return urls;

  // Mulberry32: same manifest always yields the same order (stable for static generation).
  let seed = 0x2a0f2026;
  const rand = () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = urls.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = urls[i];
    urls[i] = urls[j]!;
    urls[j] = tmp!;
  }

  return urls;
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
