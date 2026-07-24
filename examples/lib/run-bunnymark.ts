import {
  BLACK,
  BeginDrawing,
  ClearBackground,
  CloseWindow,
  Color,
  DrawFPS,
  DrawText,
  DrawTextureV,
  EndDrawing,
  GetFrameTime,
  GetRandomValue,
  InitWindow,
  IsMouseButtonDown,
  IsKeyDown,
  KEY_SPACE,
  LoadImageFromMemory,
  LoadTextureFromImage,
  MOUSE_BUTTON_LEFT,
  RAYWHITE,
  SetRandomSeed,
  SetTargetFPS,
  TakeScreenshot,
  UnloadImage,
  UnloadTexture,
  Vector2,
  WindowShouldClose,
  closeRaylib,
} from "../../bindings/raylib.ts";
import {
  addBunnies,
  createBunnyState,
  updateBunnies,
} from "./bunny-state.ts";
import {
  createBunnyInstancing,
  drawBunnyInstances,
  unloadBunnyInstancing,
} from "./bunny-instancing.ts";
import { frameNumbers } from "./frames.ts";

// Generated raylib bindings are immutable const exports. Reading them once
// avoids repeated import resolution while preserving the binding API.
const black = BLACK;
const beginDrawing = BeginDrawing;
const clearBackground = ClearBackground;
const closeWindow = CloseWindow;
const colorType = Color;
const drawFps = DrawFPS;
const drawText = DrawText;
const drawTextureV = DrawTextureV;
const endDrawing = EndDrawing;
const getFrameTime = GetFrameTime;
const getRandomValue = GetRandomValue;
const initWindow = InitWindow;
const isKeyDown = IsKeyDown;
const isMouseButtonDown = IsMouseButtonDown;
const keySpace = KEY_SPACE;
const loadImageFromMemory = LoadImageFromMemory;
const loadTextureFromImage = LoadTextureFromImage;
const mouseButtonLeft = MOUSE_BUTTON_LEFT;
const raywhite = RAYWHITE;
const setRandomSeed = SetRandomSeed;
const setTargetFps = SetTargetFPS;
const takeScreenshot = TakeScreenshot;
const unloadImage = UnloadImage;
const unloadTexture = UnloadTexture;
const vector2Type = Vector2;
const windowShouldClose = WindowShouldClose;
const closeRaylibBinding = closeRaylib;

const screenWidth: number = 1280;
const screenHeight: number = 720;
const maxBunnies: number = 50000;

export const runBunnymark = (
  bunnyBytes: Uint8Array,
  maxFrames: number,
): void => {
  const startedAt = Date.now();
  const image = loadImageFromMemory(".png", bunnyBytes, bunnyBytes.length);
  if (image.width !== 32 || image.height !== 32) {
    throw new Error("raybunny PNG failed to decode");
  }

  initWindow(screenWidth, screenHeight, "GocciaScript + raylib: Bunnymark");
  const texture = loadTextureFromImage(image);
  unloadImage(image);

  const configuredSeed = globalThis.BUNNYMARK_RANDOM_SEED;
  const configuredInitialSprites =
    globalThis.BUNNYMARK_INITIAL_SPRITES;
  const configuredTargetFps = globalThis.BUNNYMARK_TARGET_FPS;
  const configuredDeltaScale = globalThis.BUNNYMARK_FIXED_DELTA_SCALE;
  const requestedDrawPath = globalThis.BUNNYMARK_DRAW_PATH === "direct"
    ? "direct"
    : "instanced";
  const initialSprites = typeof configuredInitialSprites === "number"
    ? configuredInitialSprites
    : 1000;
  const targetFps = typeof configuredTargetFps === "number"
    ? configuredTargetFps
    : 60;
  const fixedDeltaScale = typeof configuredDeltaScale === "number"
    ? configuredDeltaScale
    : null;
  const showOverlay = globalThis.BUNNYMARK_SHOW_OVERLAY !== false;
  const capturePath = globalThis.BUNNYMARK_CAPTURE_PATH;
  const captureFrame = typeof globalThis.BUNNYMARK_CAPTURE_FRAME === "number"
    ? globalThis.BUNNYMARK_CAPTURE_FRAME
    : 0;
  const reportFinal = globalThis.BUNNYMARK_REPORT_FINAL === true;

  if (typeof configuredSeed === "number") setRandomSeed(configuredSeed);
  setTargetFps(targetFps);

  const bunnies = createBunnyState(maxBunnies);
  addBunnies(
    bunnies,
    initialSprites,
    screenWidth / 2,
    screenHeight / 2,
    getRandomValue,
  );
  const instancing = requestedDrawPath === "instanced"
    ? createBunnyInstancing(texture)
    : null;
  const drawPath = instancing === null ? "direct" : "instanced";
  const drawPosition = vector2Type.create({ x: 0, y: 0 });
  const drawColor = colorType.create({ r: 0, g: 0, b: 0, a: 255 });
  const startupMilliseconds = Date.now() - startedAt;
  console.log(
    "Bunnymark startup_ms=" +
      startupMilliseconds +
      " initial_sprites=" +
      bunnies.length +
      " draw_path=" +
      drawPath,
  );

  const framesStartedAt = Date.now();
  let framesRendered = 0;
  let framesSinceReport = 0;
  let reportStartedAt = Date.now();

  try {
    for (const frame of frameNumbers(maxFrames)) {
      if (windowShouldClose()) break;
      const deltaScale = fixedDeltaScale === null
        ? getFrameTime() * 60
        : fixedDeltaScale;
      if (
        isMouseButtonDown(mouseButtonLeft) ||
        isKeyDown(keySpace)
      ) {
        addBunnies(
          bunnies,
          100,
          screenWidth / 2,
          screenHeight / 2,
          getRandomValue,
        );
      }

      updateBunnies(
        bunnies,
        deltaScale,
        texture.width,
        texture.height,
        screenWidth,
        screenHeight,
      );

      beginDrawing();
      clearBackground(black);
      if (instancing !== null) {
        drawBunnyInstances(instancing, bunnies);
      } else {
        for (const index of bunnies.indices) {
          const colorOffset = index * 4;
          drawPosition.x = bunnies.x[index];
          drawPosition.y = bunnies.y[index];
          drawColor.r = bunnies.colors[colorOffset];
          drawColor.g = bunnies.colors[colorOffset + 1];
          drawColor.b = bunnies.colors[colorOffset + 2];
          drawColor.a = bunnies.colors[colorOffset + 3];
          drawTextureV(texture, drawPosition, drawColor);
        }
      }
      if (showOverlay) {
        drawText("bunnies: " + bunnies.length, 12, 10, 20, raywhite);
        drawText(
          "hold mouse-left or Space to add 100",
          12,
          34,
          20,
          raywhite,
        );
        drawFps(screenWidth - 100, 10);
      }
      endDrawing();
      if (typeof capturePath === "string" && frame === captureFrame) {
        takeScreenshot(capturePath);
      }

      framesRendered += 1;
      framesSinceReport += 1;
      const now = Date.now();
      if (now - reportStartedAt >= 5000) {
        const measuredFps =
          (framesSinceReport * 1000) / (now - reportStartedAt);
        console.log(
          "Bunnymark frames=" +
            framesSinceReport +
            " sprites=" +
            bunnies.length +
            " draw_path=" +
            drawPath +
            " observed_fps=" +
            measuredFps.toFixed(1),
        );
        framesSinceReport = 0;
        reportStartedAt = now;
      }
    }
  } finally {
    if (reportFinal) {
      const frameMilliseconds = Date.now() - framesStartedAt;
      const observedFps = frameMilliseconds === 0
        ? 0
        : (framesRendered * 1000) / frameMilliseconds;
      console.log(
        "Bunnymark summary frames=" +
          framesRendered +
          " sprites=" +
          bunnies.length +
          " draw_path=" +
          drawPath +
          " frame_ms=" +
          frameMilliseconds +
          " observed_fps=" +
          observedFps.toFixed(2),
      );
    }
    if (instancing === null) unloadTexture(texture);
    else unloadBunnyInstancing(instancing);
    closeWindow();
    closeRaylibBinding();
  }
};
