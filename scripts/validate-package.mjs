import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fromRoot } from "./lib/project.mjs";

const result = spawnSync("npm", ["pack", "--dry-run", "--json"], {
  cwd: fromRoot(),
  encoding: "utf8",
});
assert.equal(
  result.status,
  0,
  `npm package validation failed:\n${result.stdout}\n${result.stderr}`,
);
const [manifest] = JSON.parse(result.stdout);
const files = new Set(manifest.files.map((file) => file.path));
const expectedFiles = new Set([
  "LICENSE",
  "README.md",
  "package.json",
  "bindings/raylib.ts",
  "bindings/raylib.d.ts",
  "metadata/raylib.json",
  "metadata/gocciascript.json",
  "vendor/raylib-6.0.normalized.json",
  "goccia.json",
  "SKIPPED.md",
  "SKIPPED.json",
  "examples/assets/raybunny.png",
  "examples/basic-window.ts",
  "examples/basic-input.ts",
  "examples/image-loading.ts",
  "examples/bunnymark.ts",
  "examples/doom-clone.ts",
  "examples/lib/frames.ts",
  "examples/lib/run-bunnymark.ts",
  "examples/smoke.ts",
]);
for (const required of expectedFiles) {
  assert.ok(files.has(required), `Package is missing ${required}`);
}
assert.deepEqual(
  [...files].sort(),
  [...expectedFiles].sort(),
  "npm package contents drifted from the exact MIT allowlist",
);
assert.ok(!files.has("vendor/raylib-6.0-api.raw.json"), "Raw malformed API should not ship");
assert.ok(
  ![...files].some((path) => path.startsWith("examples/doom-gpl/")),
  "Separately licensed GPL DOOM sources must not ship in the MIT package",
);
assert.ok(
  ![...files].some((path) => path.toLowerCase().endsWith(".wad")),
  "IWAD data must never ship in the npm package",
);
console.log(`Package contents validated (${manifest.files.length} files).`);
