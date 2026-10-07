import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "out");
const publicDir = path.join(root, "public");
const assetLimit = 20_000;
const fileSizeLimit = 25 * 1024 * 1024;

function walkFiles(directory, relativeTo) {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walkFiles(absolutePath, relativeTo);
    return [path.relative(relativeTo, absolutePath).split(path.sep).join("/")];
  });
}

if (!fs.existsSync(path.join(outputDir, "index.html"))) {
  throw new Error("Next.js static export is missing out/index.html.");
}

const publicFiles = new Set(walkFiles(publicDir, publicDir));
let removedPayloadCount = 0;
let removedPayloadBytes = 0;

for (const relativePath of walkFiles(outputDir, outputDir)) {
  if (
    !relativePath.endsWith(".txt") ||
    relativePath.startsWith("_next/") ||
    relativePath === "robots.txt" ||
    publicFiles.has(relativePath)
  ) {
    continue;
  }

  const absolutePath = path.join(outputDir, relativePath);
  removedPayloadBytes += fs.statSync(absolutePath).size;
  fs.unlinkSync(absolutePath);
  removedPayloadCount += 1;
}

const nutritionData = JSON.parse(
  fs.readFileSync(path.join(root, "data", "nutrition.json"), "utf8"),
);
if (!Array.isArray(nutritionData)) {
  throw new Error("data/nutrition.json must contain an array of nutrition records.");
}

const slugs = nutritionData.map((item, index) => {
  if (typeof item?.slug !== "string" || item.slug.length === 0) {
    throw new Error(`Nutrition record ${index} has no valid slug.`);
  }
  return item.slug;
});
if (new Set(slugs).size !== slugs.length) {
  throw new Error("data/nutrition.json contains duplicate nutrition page slugs.");
}

const missingPages = slugs
  .map((slug) => path.join(outputDir, "nutrition-facts", `${slug}.html`))
  .filter((pagePath) => !fs.existsSync(pagePath));
if (missingPages.length > 0) {
  throw new Error(
    `Static export is missing ${missingPages.length} nutrition detail page(s), including ${path.relative(root, missingPages[0])}.`,
  );
}

const searchIndexPath = path.join(outputDir, "search-index.json");
if (!fs.existsSync(searchIndexPath)) {
  throw new Error("Static export is missing out/search-index.json.");
}
const searchIndex = JSON.parse(fs.readFileSync(searchIndexPath, "utf8"));
if (!Array.isArray(searchIndex) || searchIndex.length !== slugs.length) {
  throw new Error(
    `Static search index has ${Array.isArray(searchIndex) ? searchIndex.length : 0} records; expected ${slugs.length}.`,
  );
}

const outputFiles = walkFiles(outputDir, outputDir);
if (outputFiles.length > assetLimit) {
  throw new Error(
    `Static export contains ${outputFiles.length} files, exceeding the Cloudflare Workers Free static asset limit of ${assetLimit}.`,
  );
}

const oversizedFiles = outputFiles
  .map((relativePath) => ({
    path: relativePath,
    size: fs.statSync(path.join(outputDir, relativePath)).size,
  }))
  .filter(({ size }) => size > fileSizeLimit);
if (oversizedFiles.length > 0) {
  const largest = oversizedFiles[0];
  throw new Error(
    `Static asset ${largest.path} is ${largest.size} bytes, exceeding Cloudflare Workers' 25 MiB per-file limit.`,
  );
}

console.log(
  `Cloudflare Workers static assets ready: ${outputFiles.length} files; verified ${slugs.length} nutrition pages; removed ${removedPayloadCount} unused RSC payload files (${(removedPayloadBytes / 1024 / 1024).toFixed(1)} MiB).`,
);