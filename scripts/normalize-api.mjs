import { writeFile } from "node:fs/promises";
import { buildNormalizedApi, normalizedApiPath } from "./lib/api.mjs";
import { stableJson } from "./lib/project.mjs";

const normalized = await buildNormalizedApi();
await writeFile(normalizedApiPath, stableJson(normalized));
console.log(
  `Normalized raylib ${normalized.source.version}: ` +
    `${normalized.inventory.functions} functions, ` +
    `${normalized.inventory.structs} structs, ` +
    `${normalized.inventory.aliases} aliases, ` +
    `${normalized.inventory.callbacks} callbacks.`,
);
