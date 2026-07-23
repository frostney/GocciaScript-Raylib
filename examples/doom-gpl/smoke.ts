// SPDX-License-Identifier: GPL-2.0-only

globalThis.DOOM_EXAMPLE_MAX_FRAMES = 12;
globalThis.DOOM_EXAMPLE_SCREENSHOT =
  "./examples/doom-gpl/.cache/doom-goccia-smoke.png";
globalThis.DOOM_EXAMPLE_SCREENSHOT_FRAME = 8;

await import("./run.ts");
console.log("DOOM game logic executed in GocciaScript");
