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
  position: { x: number; y: number };
  speed: { x: number; y: number };
  color: unknown;
};

const screenWidth: number = 1280;
const screenHeight: number = 720;
const maxBunnies: number = 50000;

const randomColor = () => {
  return Color.create({
    r: GetRandomValue(50, 240),
    g: GetRandomValue(50, 240),
    b: GetRandomValue(50, 240),
    a: 255,
  });
};

const addBunnies = (bunnies: Bunny[], count: number): void => {
  for (const _index of frameNumbers(count)) {
    if (bunnies.length >= maxBunnies) break;
    bunnies.push({
      position: Vector2.create({
        x: screenWidth / 2,
        y: screenHeight / 2,
      }),
      speed: Vector2.create({
        x: GetRandomValue(-250, 250) / 60,
        y: GetRandomValue(-250, 250) / 60,
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
  const image = LoadImageFromMemory(".png", bunnyBytes, bunnyBytes.length);
  if (image.width !== 32 || image.height !== 32) {
    throw new Error("raybunny PNG failed to decode");
  }

  InitWindow(screenWidth, screenHeight, "GocciaScript + raylib: Bunnymark");
  const texture = LoadTextureFromImage(image);
  UnloadImage(image);
  SetTargetFPS(60);

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
      if (WindowShouldClose()) break;
      const deltaScale = GetFrameTime() * 60;
      if (
        IsMouseButtonDown(MOUSE_BUTTON_LEFT) ||
        IsKeyDown(KEY_SPACE)
      ) {
        addBunnies(bunnies, 100);
      }

      for (const bunny of bunnies) {
        bunny.position.x += bunny.speed.x * deltaScale;
        bunny.position.y += bunny.speed.y * deltaScale;

        if (
          bunny.position.x + texture.width / 2 > screenWidth ||
          bunny.position.x + texture.width / 2 < 0
        ) {
          bunny.speed.x *= -1;
        }
        if (
          bunny.position.y + texture.height / 2 > screenHeight ||
          bunny.position.y + texture.height / 2 - 40 < 0
        ) {
          bunny.speed.y *= -1;
        }
      }

      BeginDrawing();
      ClearBackground(BLACK);
      for (const bunny of bunnies) {
        DrawTextureV(texture, bunny.position, bunny.color);
      }
      DrawText("bunnies: " + bunnies.length, 12, 10, 20, RAYWHITE);
      DrawText("hold mouse-left or Space to add 100", 12, 34, 20, RAYWHITE);
      DrawFPS(screenWidth - 100, 10);
      EndDrawing();

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
    UnloadTexture(texture);
    CloseWindow();
    closeRaylib();
  }
};
