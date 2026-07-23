// SPDX-License-Identifier: GPL-2.0-only

import {
  BLACK,
  BeginDrawing,
  BeginMode2D,
  Camera2D,
  ClearBackground,
  CloseWindow,
  DrawFPS,
  DrawTexture,
  EndDrawing,
  EndMode2D,
  GenImageColor,
  InitWindow,
  LoadTextureFromImage,
  RAYWHITE,
  SetExitKey,
  SetTargetFPS,
  SetTextureFilter,
  SetWindowTitle,
  TEXTURE_FILTER_POINT,
  UnloadImage,
  UnloadTexture,
  UpdateTexture,
  Vector2,
  closeRaylib,
} from "../../../bindings/raylib.ts";

const sourceWidth = 320;
const sourceHeight = 200;
const scale = 2;
const rgba = new Uint8Array(sourceWidth * sourceHeight * 4);
const camera = Camera2D.create({
  offset: Vector2.create({ x: 0, y: 0 }),
  target: Vector2.create({ x: 0, y: 0 }),
  rotation: 0,
  zoom: scale,
});

let video = null;
let playpal = null;
let paletteIndex = 0;
let image = null;
let texture = null;
let initialized = false;

const I_InitGraphics = (): void => {
  if (initialized) return;
  InitWindow(
    sourceWidth * scale,
    sourceHeight * scale,
    "DOOM executing in GocciaScript",
  );
  SetExitKey(0);
  SetTargetFPS(35);
  image = GenImageColor(sourceWidth, sourceHeight, BLACK);
  texture = LoadTextureFromImage(image);
  UnloadImage(image);
  image = null;
  SetTextureFilter(texture, TEXTURE_FILTER_POINT);
  initialized = true;
};

const I_RegisterPlaypal = (paletteBytes: Uint8Array): void => {
  playpal = paletteBytes;
};

const I_SetPalette = (nextPalette: number): void => {
  paletteIndex = nextPalette;
};

const I_FinishUpdate = (): void => {
  const indexed = video.screens[0];
  const paletteOffset = paletteIndex * 768;

  for (let index = 0; index < indexed.length; index += 1) {
    const colourOffset = paletteOffset + indexed[index] * 3;
    const pixelOffset = index * 4;
    rgba[pixelOffset] = playpal[colourOffset];
    rgba[pixelOffset + 1] = playpal[colourOffset + 1];
    rgba[pixelOffset + 2] = playpal[colourOffset + 2];
    rgba[pixelOffset + 3] = 255;
  }

  UpdateTexture(texture, rgba);
  BeginDrawing();
  ClearBackground(BLACK);
  BeginMode2D(camera);
  DrawTexture(texture, 0, 0, RAYWHITE);
  EndMode2D();
  DrawFPS(8, 8);
  EndDrawing();
};

const I_ShutdownGraphics = (): void => {
  if (!initialized) return;
  UnloadTexture(texture);
  texture = null;
  CloseWindow();
  closeRaylib();
  initialized = false;
};

const I_RestoreDefaultPalette = (): void => {
  paletteIndex = 0;
};

export default {
  I_InitGraphics,
  I_RegisterPlaypal,
  I_SetPalette,
  I_FinishUpdate,
  I_ShutdownGraphics,
  I_RestoreDefaultPalette,
  setTitle: (title: string): void => SetWindowTitle(title),
  init: (modules): void => {
    video = modules.v_video;
  },
};
