import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fromRoot } from "../../scripts/lib/project.mjs";
import { acceptConfigPermissions, findGocciaRunner } from "./helpers.mjs";

const runner = await findGocciaRunner();
const result = spawnSync(
  runner,
  [acceptConfigPermissions, fromRoot("tests/fixtures/ffi-smoke.ts")],
  {
    cwd: fromRoot(),
    encoding: "utf8",
    env: process.env,
  },
);
assert.equal(
  result.status,
  0,
  `Representative raylib FFI calls failed:\n${result.stdout}\n${result.stderr}`,
);
assert.match(result.stdout, /raylib ffi smoke ok/);
assert.match(
  result.stdout,
  /AUTOMATION: New empty events list loaded successfully/,
  "LoadAutomationEventList(null) did not pass a native NULL",
);
console.log(
  "Representative scalar, bool, pointer, aggregate, mixed-float, UTF-8, owned-text, nullable, and variadic calls passed.",
);
