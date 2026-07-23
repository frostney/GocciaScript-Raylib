import { readFile } from "node:fs/promises";
import { fromRoot, readJson, sha256 } from "./project.mjs";
import {
  normalizeApiDocument,
  repairOfficialJson,
} from "./api-core.ts";

export {
  normalizeApiDocument,
  repairOfficialJson,
} from "./api-core.ts";

export const rawApiPath = fromRoot("vendor/raylib-6.0-api.raw.json");
export const normalizedApiPath = fromRoot("vendor/raylib-6.0.normalized.json");
export const raylibMetadataPath = fromRoot("metadata/raylib.json");

export async function buildNormalizedApi() {
  const [metadata, raw] = await Promise.all([
    readJson(raylibMetadataPath),
    readFile(rawApiPath, "utf8"),
  ]);
  const actualSha256 = sha256(raw);
  if (actualSha256 !== metadata.api.sha256) {
    throw new Error(
      `Pinned API checksum mismatch: expected ${metadata.api.sha256}, got ${actualSha256}`,
    );
  }
  const parsed = JSON.parse(repairOfficialJson(raw));
  return normalizeApiDocument(parsed, metadata, actualSha256);
}
