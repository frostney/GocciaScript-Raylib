import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { execFileSync } from "node:child_process";

async function executable(path) {
  if (!path) return null;
  try {
    await access(path, constants.X_OK);
    return path;
  } catch {
    return null;
  }
}

export async function findGocciaLoader() {
  const configured = await executable(process.env.GOCCIA_LOADER);
  if (configured) return configured;
  try {
    const discovered = execFileSync("sh", ["-c", "command -v GocciaScriptLoader"], {
      encoding: "utf8",
    }).trim();
    if (await executable(discovered)) return discovered;
  } catch {
    // Report one actionable error below.
  }
  throw new Error(
    "GocciaScriptLoader 0.10.0 was not found; set GOCCIA_LOADER to the release binary",
  );
}

export async function findRaylibInclude() {
  if (process.env.RAYLIB_INCLUDE_DIR) return process.env.RAYLIB_INCLUDE_DIR;
  if (process.platform === "darwin") {
    try {
      return `${execFileSync("brew", ["--prefix", "raylib"], { encoding: "utf8" }).trim()}/include`;
    } catch {
      // Fall through to standard paths.
    }
  }
  for (const candidate of ["/usr/local/include", "/usr/include"]) {
    try {
      await access(`${candidate}/raylib.h`, constants.R_OK);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }
  throw new Error(
    "raylib.h 6.0 was not found; set RAYLIB_INCLUDE_DIR to its include directory",
  );
}

export function parseLayoutLines(output) {
  const layouts = new Map();
  for (const line of output.split(/\r?\n/)) {
    if (!line) continue;
    const parts = line.split("\t");
    if (parts[0] === "STRUCT") {
      layouts.set(parts[1], {
        size: Number(parts[2]),
        alignment: Number(parts[3]),
        fields: new Map(),
      });
    } else if (parts[0] === "FIELD") {
      const layout = layouts.get(parts[1]);
      if (!layout) throw new Error(`Field appeared before struct: ${line}`);
      layout.fields.set(parts[2], Number(parts[3]));
    }
  }
  return layouts;
}
