// SPDX-License-Identifier: GPL-2.0-only

import engine from "./.cache/goccia-engine/registry.ts";
import iwad from "./.cache/iwad.wad" with { type: "bytes" };
import {
  TakeScreenshot,
  WindowShouldClose,
} from "../../bindings/raylib.ts";

const maximumFrames =
  typeof globalThis.DOOM_EXAMPLE_MAX_FRAMES === "number"
    ? globalThis.DOOM_EXAMPLE_MAX_FRAMES
    : Infinity;
const screenshotPath =
  typeof globalThis.DOOM_EXAMPLE_SCREENSHOT === "string"
    ? globalThis.DOOM_EXAMPLE_SCREENSHOT
    : "";
const screenshotFrame =
  typeof globalThis.DOOM_EXAMPLE_SCREENSHOT_FRAME === "number"
    ? globalThis.DOOM_EXAMPLE_SCREENSHOT_FRAME
    : 30;

const definitions = engine.defs;
const game = engine.g_game;
const renderer = engine.r_main;
const video = engine.v_video;
const platformVideo = engine.i_video;
const platformInput = engine.i_input;
const statusBar = engine.st_stuff;
const headsUp = engine.hu_stuff;

engine.w_wad.W_AddFile(iwad);

const gameMode = (() => {
  if (engine.w_wad.W_CheckNumForName("MAP01") >= 0) {
    return definitions.GameMode.commercial;
  }
  if (engine.w_wad.W_CheckNumForName("E4M1") >= 0) {
    return definitions.GameMode.retail;
  }
  if (engine.w_wad.W_CheckNumForName("E2M1") >= 0) {
    return definitions.GameMode.registered;
  }
  return definitions.GameMode.shareware;
})();

game.state.gamemode = gameMode;
engine.p_setup.P_SetGameMode(gameMode);
engine.r_data.R_InitData();
engine.r_draw.bindColormaps();
engine.r_things.R_InitSpriteDefs();
renderer.R_InitLightTables();
renderer.R_InitSkyMap();
engine.p_spec.P_InitPicAnims();
engine.p_spec.P_InitSwitchList();
headsUp.HU_LoadFont();
renderer.R_ExecuteSetViewSize(10);

const player = () => game.state.players[game.state.consoleplayer];
game.setShellHooks({
  amStop: engine.am_map.AM_Stop,
  stTicker: statusBar.ST_Ticker,
  huTicker: headsUp.HU_Ticker,
  sStart: (): void => {},
});
engine.p_mobj.setStStart((): void => statusBar.ST_Start(player()));
engine.p_mobj.setHuStart((): void => headsUp.HU_Start(player()));

platformVideo.I_InitGraphics();
platformVideo.I_RegisterPlaypal(
  engine.w_wad.W_CacheLumpName("PLAYPAL"),
);
platformVideo.I_SetPalette(0);
platformVideo.setTitle("DOOM executing in GocciaScript + dynamic raylib");

game.G_InitNew(definitions.Skill.medium, 1, 1);

let frame = 0;
try {
  while (!WindowShouldClose() && frame < maximumFrames) {
    platformInput.I_PollKeys();
    let event = platformInput.I_NextEvent();
    while (event !== null) {
      if (game.state.gamestate === definitions.GS.LEVEL) {
        statusBar.ST_Responder(event);
        engine.am_map.AM_Responder(event);
      }
      event = platformInput.I_NextEvent();
    }

    game.G_Ticker((): void => game.G_BuildTiccmd(player().cmd));

    if (game.state.automapactive) {
      engine.am_map.AM_Drawer();
    } else {
      renderer.R_RenderPlayerView(player());
    }
    statusBar.ST_Drawer();
    headsUp.HU_Drawer();
    statusBar.ST_doPaletteStuff();
    platformVideo.I_FinishUpdate();

    if (screenshotPath.length > 0 && frame === screenshotFrame) {
      TakeScreenshot(screenshotPath);
    }
    frame += 1;
    if (frame % 10 === 0) Goccia.gc();
  }
} finally {
  platformVideo.I_ShutdownGraphics();
}
