// SPDX-License-Identifier: GPL-2.0-only

import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const [, , upstreamDirectory, outputDirectory] = process.argv;

if (!upstreamDirectory || !outputDirectory) {
  throw new Error("Usage: node prepare-port.mjs UPSTREAM_DIR OUTPUT_DIR");
}

const moduleNames = [
  "defs",
  "tables",
  "m_random",
  "info",
  "sounds",
  "w_wad",
  "v_video",
  "i_video",
  "r_data",
  "p_setup",
  "am_map",
  "r_draw",
  "r_main",
  "r_plane",
  "r_bsp",
  "r_segs",
  "r_things",
  "g_game",
  "p_tick",
  "p_mobj",
  "p_maputl",
  "p_map",
  "p_inter",
  "p_movers",
  "p_spec",
  "p_enemy",
  "p_pspr",
  "i_input",
  "st_stuff",
  "hu_stuff",
  "wi_stuff",
  "f_finale",
  "m_menu",
  "m_config",
  "p_saveg",
  "i_sound",
  "s_sound",
];

const platformModules = new Set(["i_input", "i_sound", "i_video"]);
const generatedHeader = `// Generated from the pinned tsvm-doom source.
// The game logic in this file executes inside GocciaScript.
// SPDX-License-Identifier: GPL-2.0-only

const _G = globalThis;
if (_G.DOOM === undefined) {
  _G.DOOM = {
    SCREENWIDTH: 320,
    SCREENHEIGHT: 200,
    SCREENGAMMA: 0.72,
    MOUSE: {
      ENABLE: false,
      CENTREWIDTH: 0.45,
      MAXTURNSPEED: 1800,
      TURNGAMMA: 2.5,
      HANDFOLLOW: 0.707,
    },
  };
}

`;

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const moduleName of moduleNames) {
  if (platformModules.has(moduleName)) continue;

  const sourcePath = path.join(upstreamDirectory, `${moduleName}.mjs`);
  const destinationPath = path.join(outputDirectory, `${moduleName}.ts`);
  const source = await readFile(sourcePath, "utf8");
  const matches = source.match(/^exports = \{/gm) ?? [];
  if (matches.length !== 1) {
    throw new Error(`${moduleName}.mjs has ${matches.length} export assignments`);
  }

  const transformed = source.replace(/^exports = \{/m, "export default {");
  await writeFile(destinationPath, generatedHeader + transformed);
}

const imports = moduleNames
  .map((moduleName) => {
    const source = platformModules.has(moduleName)
      ? `../../src/${moduleName}.ts`
      : `./${moduleName}.ts`;
    return `import ${moduleName} from "${source}";`;
  })
  .join("\n");

const registryEntries = moduleNames
  .map((moduleName) => `  ${moduleName},`)
  .join("\n");

const registry = `// Generated module registry for the GocciaScript DOOM port.
// SPDX-License-Identifier: GPL-2.0-only

${imports}

const modules = {
${registryEntries}
};

for (const moduleName of Object.keys(modules)) {
  modules[moduleName].init(modules);
}

export default modules;
`;

await writeFile(path.join(outputDirectory, "registry.ts"), registry);
console.log(`Prepared ${moduleNames.length} GPL DOOM modules for GocciaScript.`);
