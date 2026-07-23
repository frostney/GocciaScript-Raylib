import { buildNormalizedApi } from "./lib/api.mjs";
import {
  readGeneratedArtifacts,
  renderBindingArtifacts,
} from "./lib/bindings.mjs";
import { readFile } from "node:fs/promises";
import { fromRoot, stableJson } from "./lib/project.mjs";
import { renderAbiArtifacts } from "./lib/abi.mjs";

const expectedNormalized = stableJson(await buildNormalizedApi());
const actualNormalized = await readFile(
  fromRoot("vendor/raylib-6.0.normalized.json"),
  "utf8",
);
if (actualNormalized !== expectedNormalized) {
  throw new Error("Normalized IR is stale; run npm run generate");
}

const expected = await renderBindingArtifacts();
const actual = await readGeneratedArtifacts();
for (const key of Object.keys(actual)) {
  if (actual[key] !== expected[key]) {
    throw new Error(`${key} is stale; run npm run generate`);
  }
}

const expectedAbi = await renderAbiArtifacts();
const actualAbi = {
  oracleC: await readFile(fromRoot("tests/abi/oracle.c"), "utf8"),
  layoutProbeTs: await readFile(
    fromRoot("tests/abi/layout-probe.ts"),
    "utf8",
  ),
};
for (const key of Object.keys(actualAbi)) {
  if (actualAbi[key] !== expectedAbi[key]) {
    throw new Error(`${key} is stale; run npm run generate`);
  }
}

console.log("Normalized IR and generated artifacts are deterministic and current.");
