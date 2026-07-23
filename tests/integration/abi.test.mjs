import assert from "node:assert/strict";
import { mkdtemp } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { fromRoot } from "../../scripts/lib/project.mjs";
import {
  findGocciaLoader,
  findRaylibInclude,
  parseLayoutLines,
} from "./helpers.mjs";

const [loader, includeDir] = await Promise.all([
  findGocciaLoader(),
  findRaylibInclude(),
]);
const temporaryDirectory = await mkdtemp(join(tmpdir(), "goccia-raylib-abi-"));
const oracle = join(temporaryDirectory, "raylib-abi-oracle");
const compiler = process.env.CC || "cc";

const compile = spawnSync(
  compiler,
  [
    "-std=c11",
    "-Wall",
    "-Wextra",
    "-Werror",
    `-I${includeDir}`,
    fromRoot("tests/abi/oracle.c"),
    "-o",
    oracle,
  ],
  { encoding: "utf8" },
);
assert.equal(
  compile.status,
  0,
  `ABI oracle compilation failed:\n${compile.stdout}\n${compile.stderr}`,
);

const native = spawnSync(oracle, [], { encoding: "utf8" });
assert.equal(native.status, 0, `Native ABI oracle failed:\n${native.stderr}`);

const goccia = spawnSync(loader, [fromRoot("tests/abi/layout-probe.ts")], {
  cwd: fromRoot(),
  encoding: "utf8",
  env: process.env,
});
assert.equal(
  goccia.status,
  0,
  `GocciaScript ABI probe failed:\n${goccia.stdout}\n${goccia.stderr}`,
);

const expected = parseLayoutLines(native.stdout);
const actual = parseLayoutLines(goccia.stdout);
assert.equal(expected.size, 35, "Native oracle must report all 35 raylib structs");
assert.equal(actual.size, 35, "GocciaScript probe must report all 35 raylib structs");

for (const [name, expectedLayout] of expected) {
  const actualLayout = actual.get(name);
  assert.ok(actualLayout, `Missing GocciaScript layout for ${name}`);
  assert.equal(actualLayout.size, expectedLayout.size, `${name} sizeof`);
  assert.equal(
    actualLayout.alignment,
    expectedLayout.alignment,
    `${name} alignment`,
  );
  assert.equal(
    actualLayout.fields.size,
    expectedLayout.fields.size,
    `${name} field count`,
  );
  for (const [field, offset] of expectedLayout.fields) {
    assert.equal(actualLayout.fields.get(field), offset, `${name}.${field} offset`);
  }
}

console.log("All 35 raylib struct layouts match the native ABI oracle.");
