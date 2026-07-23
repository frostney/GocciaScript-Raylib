import { mkdir, writeFile } from "node:fs/promises";
import { renderAbiArtifacts } from "./lib/abi.mjs";
import { fromRoot } from "./lib/project.mjs";

const artifacts = await renderAbiArtifacts();
await mkdir(fromRoot("tests/abi"), { recursive: true });
await Promise.all([
  writeFile(fromRoot("tests/abi/oracle.c"), artifacts.oracleC),
  writeFile(fromRoot("tests/abi/layout-probe.ts"), artifacts.layoutProbeTs),
]);
console.log("Generated the 35-struct native ABI oracle and GocciaScript probe.");
