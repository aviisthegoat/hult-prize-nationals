/**
 * Scans public/photos and writes lib/photo-manifest.json.
 * Run after adding/removing images so the site does not use fs in the Next.js
 * bundle (which would pull all photos into the serverless function on Vercel).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const photosDir = path.join(root, "public", "photos");
const outFile = path.join(root, "lib", "photo-manifest.json");

const IMAGE_EXT = /\.(jpe?g|png|gif|webp)$/i;

function main() {
  if (!fs.existsSync(photosDir)) {
    fs.writeFileSync(outFile, "[]\n");
    console.log("generate-photo-manifest: no public/photos, wrote empty manifest");
    return;
  }

  const files = fs
    .readdirSync(photosDir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    );

  const urls = files.map((f) => `/photos/${encodeURIComponent(f)}`);
  fs.writeFileSync(outFile, JSON.stringify(urls, null, 2) + "\n");
  console.log(
    `generate-photo-manifest: wrote ${urls.length} paths to lib/photo-manifest.json`
  );
}

main();
