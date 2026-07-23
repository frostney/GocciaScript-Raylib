import { mkdir, writeFile } from "node:fs/promises";
import { fromRoot, readJson, sha256 } from "./lib/project.mjs";

const metadata = await readJson(fromRoot("metadata/raylib.json"));
const rawBase = `${metadata.repository}/raw/${metadata.commit}`;

async function fetchPinned(path, expectedSha256) {
  const response = await fetch(`${rawBase}/${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: HTTP ${response.status}`);
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const actualSha256 = sha256(bytes);
  if (actualSha256 !== expectedSha256) {
    throw new Error(
      `Checksum mismatch for ${path}: expected ${expectedSha256}, got ${actualSha256}`,
    );
  }
  return bytes;
}

const [api, bunny] = await Promise.all([
  fetchPinned(metadata.api.path, metadata.api.sha256),
  fetchPinned(metadata.bunny.path, metadata.bunny.sha256),
]);

await Promise.all([
  mkdir(fromRoot("vendor"), { recursive: true }),
  mkdir(fromRoot("examples/assets"), { recursive: true }),
]);
await Promise.all([
  writeFile(fromRoot("vendor/raylib-6.0-api.raw.json"), api),
  writeFile(fromRoot("examples/assets/raybunny.png"), bunny),
]);

console.log(`Pinned raylib ${metadata.version} inputs verified and written.`);
