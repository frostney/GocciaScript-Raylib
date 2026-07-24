// SPDX-License-Identifier: GPL-2.0-only

import {
  BLACK,
  BeginDrawing,
  BeginMode2D,
  BeginShaderMode,
  Camera2D,
  ClearBackground,
  CloseWindow,
  DrawFPS,
  DrawTexture,
  EndDrawing,
  EndMode2D,
  EndShaderMode,
  GenImageColor,
  GetShaderLocation,
  ImageFormat,
  InitWindow,
  IsShaderValid,
  IsTextureValid,
  LoadShaderFromMemory,
  LoadTextureFromImage,
  PIXELFORMAT_UNCOMPRESSED_GRAYSCALE,
  PIXELFORMAT_UNCOMPRESSED_R8G8B8A8,
  SetShaderValueTexture,
  SetExitKey,
  SetTargetFPS,
  SetTextureFilter,
  SetWindowTitle,
  TEXTURE_FILTER_POINT,
  UnloadImage,
  UnloadShader,
  UnloadTexture,
  UpdateTexture,
  Vector2,
  WHITE,
  closeRaylib,
} from "../../../bindings/raylib.ts";
import {
  expandIndexedFrame,
  packPaletteBytes,
} from "./palette.ts";

const sourceWidth = 320;
const sourceHeight = 200;
const scale = 2;
const rgba = new Uint8Array(sourceWidth * sourceHeight * 4);
const rgba32 = new Uint32Array(rgba.buffer);
const packedPaletteBytes = new Uint8Array(256 * 4);
const packedPalette = new Uint32Array(packedPaletteBytes.buffer);
const forceRgbaFallback =
  globalThis.DOOM_EXAMPLE_DISPLAY_PATH === "rgba";
const showFps = globalThis.DOOM_EXAMPLE_SHOW_FPS !== false;
const vertexShaderSource = `#version 330
in vec3 vertexPosition;
in vec2 vertexTexCoord;
in vec4 vertexColor;
out vec2 fragTexCoord;
out vec4 fragColor;
uniform mat4 mvp;
void main() {
  fragTexCoord = vertexTexCoord;
  fragColor = vertexColor;
  gl_Position = mvp*vec4(vertexPosition, 1.0);
}`;
const fragmentShaderSource = `#version 330
in vec2 fragTexCoord;
in vec4 fragColor;
out vec4 finalColor;
uniform sampler2D texture0;
uniform sampler2D paletteTexture;
uniform vec4 colDiffuse;
void main() {
  float paletteIndex = floor(texture(texture0, fragTexCoord).r*255.0 + 0.5);
  vec2 paletteCoord = vec2((paletteIndex + 0.5)/256.0, 0.5);
  finalColor = texture(paletteTexture, paletteCoord)*colDiffuse*fragColor;
}`;
const camera = Camera2D.create({
  offset: Vector2.create({ x: 0, y: 0 }),
  target: Vector2.create({ x: 0, y: 0 }),
  rotation: 0,
  zoom: scale,
});

let video = null;
let playpal = null;
let paletteIndex = 0;
let packedPaletteIndex = -1;
let uploadedPaletteIndex = -1;
let indexedTexture = null;
let paletteTexture = null;
let rgbaTexture = null;
let shader = null;
let paletteLocation = -1;
let indexedShaderActive = false;
let initialized = false;

const refreshPackedPalette = (): void => {
  if (playpal === null || packedPaletteIndex === paletteIndex) return;
  packPaletteBytes(playpal, paletteIndex, packedPaletteBytes);
  packedPaletteIndex = paletteIndex;
};

const createTexture = (
  width: number,
  height: number,
  format: number,
) => {
  const image = GenImageColor(width, height, BLACK);
  if (format !== PIXELFORMAT_UNCOMPRESSED_R8G8B8A8) {
    ImageFormat(image, format);
  }
  const created = LoadTextureFromImage(image);
  UnloadImage(image);
  SetTextureFilter(created, TEXTURE_FILTER_POINT);
  return created;
};

const unloadTexture = (texture): void => {
  if (texture !== null && IsTextureValid(texture)) UnloadTexture(texture);
};

const initializeRgbaFallback = (): void => {
  rgbaTexture = createTexture(
    sourceWidth,
    sourceHeight,
    PIXELFORMAT_UNCOMPRESSED_R8G8B8A8,
  );
  indexedShaderActive = false;
};

const initializeIndexedShader = (): boolean => {
  if (forceRgbaFallback) return false;

  shader = LoadShaderFromMemory(vertexShaderSource, fragmentShaderSource);
  if (!IsShaderValid(shader)) return false;

  paletteLocation = GetShaderLocation(shader, "paletteTexture");
  if (paletteLocation < 0) return false;

  indexedTexture = createTexture(
    sourceWidth,
    sourceHeight,
    PIXELFORMAT_UNCOMPRESSED_GRAYSCALE,
  );
  paletteTexture = createTexture(
    256,
    1,
    PIXELFORMAT_UNCOMPRESSED_R8G8B8A8,
  );

  if (
    !IsTextureValid(indexedTexture) ||
    !IsTextureValid(paletteTexture)
  ) {
    unloadTexture(indexedTexture);
    unloadTexture(paletteTexture);
    indexedTexture = null;
    paletteTexture = null;
    return false;
  }

  uploadedPaletteIndex = -1;
  indexedShaderActive = true;
  return true;
};

const I_InitGraphics = (): void => {
  if (initialized) return;
  InitWindow(
    sourceWidth * scale,
    sourceHeight * scale,
    "DOOM executing in GocciaScript",
  );
  SetExitKey(0);
  SetTargetFPS(35);
  if (!initializeIndexedShader()) initializeRgbaFallback();
  console.log(
    `DOOM display path: ${
      indexedShaderActive ? "indexed texture shader" : "RGBA fallback"
    }`,
  );
  initialized = true;
};

const I_RegisterPlaypal = (paletteBytes: Uint8Array): void => {
  playpal = paletteBytes;
  packedPaletteIndex = -1;
  uploadedPaletteIndex = -1;
  refreshPackedPalette();
};

const I_SetPalette = (nextPalette: number): void => {
  paletteIndex = nextPalette;
  refreshPackedPalette();
};

const I_FinishUpdate = (): void => {
  const indexed = video.screens[0];

  if (indexedShaderActive) {
    UpdateTexture(indexedTexture, indexed);
    if (uploadedPaletteIndex !== packedPaletteIndex) {
      UpdateTexture(paletteTexture, packedPaletteBytes);
      uploadedPaletteIndex = packedPaletteIndex;
    }
  } else {
    expandIndexedFrame(indexed, packedPalette, rgba32);
    UpdateTexture(rgbaTexture, rgba);
  }

  BeginDrawing();
  ClearBackground(BLACK);
  BeginMode2D(camera);
  if (indexedShaderActive) {
    BeginShaderMode(shader);
    SetShaderValueTexture(shader, paletteLocation, paletteTexture);
    DrawTexture(indexedTexture, 0, 0, WHITE);
    EndShaderMode();
  } else {
    DrawTexture(rgbaTexture, 0, 0, WHITE);
  }
  EndMode2D();
  if (showFps) DrawFPS(8, 8);
  EndDrawing();
};

const I_ShutdownGraphics = (): void => {
  if (!initialized) return;
  unloadTexture(indexedTexture);
  unloadTexture(paletteTexture);
  unloadTexture(rgbaTexture);
  if (shader !== null && IsShaderValid(shader)) UnloadShader(shader);
  indexedTexture = null;
  paletteTexture = null;
  rgbaTexture = null;
  shader = null;
  CloseWindow();
  closeRaylib();
  initialized = false;
};

const I_RestoreDefaultPalette = (): void => {
  I_SetPalette(0);
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
