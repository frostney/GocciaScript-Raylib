import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fromRoot } from "../../scripts/lib/project.mjs";
import { findGocciaLoader } from "./helpers.mjs";

const loader = await findGocciaLoader();
const result = spawnSync(loader, [fromRoot("tests/fixtures/ffi-smoke.ts")], {
  cwd: fromRoot(),
  encoding: "utf8",
  env: process.env,
});
assert.equal(
  result.status,
  0,
  `Representative raylib FFI calls failed:\n${result.stdout}\n${result.stderr}`,
);
assert.match(result.stdout, /raylib ffi smoke ok/);
console.log(
  "Representative scalar, bool, pointer, aggregate, UTF-8, owned-text, and nullable calls passed.",
);
