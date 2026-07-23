import { mkdir, writeFile } from "node:fs/promises";
import { renderBindingArtifacts } from "./lib/bindings.mjs";
import { fromRoot } from "./lib/project.mjs";

const artifacts = await renderBindingArtifacts();
await mkdir(fromRoot("bindings"), { recursive: true });
await Promise.all([
  writeFile(fromRoot("bindings/raylib.ts"), artifacts.raylibTs),
  writeFile(fromRoot("bindings/raylib.d.ts"), artifacts.raylibDts),
  writeFile(fromRoot("SKIPPED.json"), artifacts.skippedJson),
  writeFile(fromRoot("SKIPPED.md"), artifacts.skippedMarkdown),
]);

console.log(
  `Generated ${artifacts.stats.generated} raylib functions; ` +
    `skipped ${artifacts.stats.skipped}; post-upstream target ${artifacts.stats.target}.`,
);
