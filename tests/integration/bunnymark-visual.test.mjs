import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, readFile, unlink } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fromRoot } from "../../scripts/lib/project.mjs";
import { findGocciaLoader } from "./helpers.mjs";

const loader = await findGocciaLoader();
const cacheDirectory = fromRoot(".cache");
const directPath = fromRoot(".cache/bunnymark-direct.png");
const instancedPath = fromRoot(".cache/bunnymark-instanced.png");
await mkdir(cacheDirectory, { recursive: true });

for (const path of [directPath, instancedPath]) {
  try {
    await unlink(path);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

const runFixture = (fixture, expectedPath) => {
  const result = spawnSync(loader, [fromRoot(fixture)], {
    cwd: fromRoot(),
    encoding: "utf8",
    env: process.env,
  });
  assert.equal(
    result.status,
    0,
    `${expectedPath} Bunnymark failed:\n${result.stdout}\n${result.stderr}`,
  );
  assert.match(
    result.stdout,
    new RegExp(`draw_path=${expectedPath}`),
    `${expectedPath} path was not active`,
  );
};

runFixture("tests/fixtures/bunnymark-direct-visual.ts", "direct");
runFixture("tests/fixtures/bunnymark-instanced-visual.ts", "instanced");

const direct = await readFile(directPath);
const instanced = await readFile(instancedPath);
assert.deepEqual(
  instanced,
  direct,
  "Instanced Bunnymark pixels differ from DrawTextureV reference pixels",
);

const sha256 = createHash("sha256").update(instanced).digest("hex");
console.log(
  `Direct and instanced Bunnymark screenshots are byte-identical: ${sha256}`,
);
