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
  SetTargetFPS,
  UnloadImage,
  UnloadTexture,
  Vector2,
  WindowShouldClose,
  closeRaylib,
} from "../../bindings/raylib.ts";
import { frameNumbers } from "./frames.ts";

type Bunny = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  drawPosition: { x: number; y: number };
  color: unknown;
};

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
const setTargetFps = SetTargetFPS;
const unloadImage = UnloadImage;
const unloadTexture = UnloadTexture;
const vector2Type = Vector2;
const windowShouldClose = WindowShouldClose;
const closeRaylibBinding = closeRaylib;

const screenWidth: number = 1280;
const screenHeight: number = 720;
const maxBunnies: number = 50000;

const randomColor = () => {
  return colorType.create({
    r: getRandomValue(50, 240),
    g: getRandomValue(50, 240),
    b: getRandomValue(50, 240),
    a: 255,
  });
};

const addBunnies = (bunnies: Bunny[], count: number): void => {
  for (const _index of frameNumbers(count)) {
    if (bunnies.length >= maxBunnies) break;
    const x = screenWidth / 2;
    const y = screenHeight / 2;
    bunnies.push({
      x,
      y,
      velocityX: getRandomValue(-250, 250) / 60,
      velocityY: getRandomValue(-250, 250) / 60,
      drawPosition: vector2Type.create({
        x,
        y,
      }),
      color: randomColor(),
    });
  }
};

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
  setTargetFps(60);

  const bunnies: Bunny[] = [];
  addBunnies(bunnies, 1000);
  const startupMilliseconds = Date.now() - startedAt;
  console.log(
    "Bunnymark startup_ms=" +
      startupMilliseconds +
      " initial_sprites=" +
      bunnies.length,
  );

  let framesSinceReport = 0;
  let reportStartedAt = Date.now();

  try {
    for (const _frame of frameNumbers(maxFrames)) {
      if (windowShouldClose()) break;
      const deltaScale = getFrameTime() * 60;
      if (
        isMouseButtonDown(mouseButtonLeft) ||
        isKeyDown(keySpace)
      ) {
        addBunnies(bunnies, 100);
      }

      for (const bunny of bunnies) {
        bunny.x += bunny.velocityX * deltaScale;
        bunny.y += bunny.velocityY * deltaScale;

        if (
          bunny.x + texture.width / 2 > screenWidth ||
          bunny.x + texture.width / 2 < 0
        ) {
          bunny.velocityX *= -1;
        }
        if (
          bunny.y + texture.height / 2 > screenHeight ||
          bunny.y + texture.height / 2 - 40 < 0
        ) {
          bunny.velocityY *= -1;
        }
      }

      beginDrawing();
      clearBackground(black);
      for (const bunny of bunnies) {
        bunny.drawPosition.x = bunny.x;
        bunny.drawPosition.y = bunny.y;
        drawTextureV(texture, bunny.drawPosition, bunny.color);
      }
      drawText("bunnies: " + bunnies.length, 12, 10, 20, raywhite);
      drawText("hold mouse-left or Space to add 100", 12, 34, 20, raywhite);
      drawFps(screenWidth - 100, 10);
      endDrawing();

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
            " observed_fps=" +
            measuredFps.toFixed(1),
        );
        framesSinceReport = 0;
        reportStartedAt = now;
      }
    }
  } finally {
    unloadTexture(texture);
    closeWindow();
    closeRaylibBinding();
  }
};
