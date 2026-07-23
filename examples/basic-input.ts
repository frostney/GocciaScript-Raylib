import {
  BLACK,
  BLUE,
  BeginDrawing,
  ClearBackground,
  CloseWindow,
  DrawFPS,
  DrawRectangle,
  DrawText,
  EndDrawing,
  GetFrameTime,
  InitWindow,
  IsKeyDown,
  KEY_A,
  KEY_D,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_S,
  KEY_UP,
  KEY_W,
  RAYWHITE,
  SetTargetFPS,
  WindowShouldClose,
  closeRaylib,
} from "../bindings/raylib.ts";
import { frameNumbers } from "./lib/frames.ts";

const screenWidth: number = 960;
const screenHeight: number = 540;
const size: number = 48;
const speed: number = 260;
let x: number = screenWidth / 2 - size / 2;
let y: number = screenHeight / 2 - size / 2;
const maximumFrames: number =
  typeof globalThis.RAYLIB_EXAMPLE_MAX_FRAMES === "number"
    ? globalThis.RAYLIB_EXAMPLE_MAX_FRAMES
    : Infinity;
InitWindow(screenWidth, screenHeight, "GocciaScript + raylib: keyboard input");
SetTargetFPS(60);

try {
  for (const _frame of frameNumbers(maximumFrames)) {
    if (WindowShouldClose()) break;
    const delta = GetFrameTime();
    if (IsKeyDown(KEY_W) || IsKeyDown(KEY_UP)) y -= speed * delta;
    if (IsKeyDown(KEY_S) || IsKeyDown(KEY_DOWN)) y += speed * delta;
    if (IsKeyDown(KEY_A) || IsKeyDown(KEY_LEFT)) x -= speed * delta;
    if (IsKeyDown(KEY_D) || IsKeyDown(KEY_RIGHT)) x += speed * delta;

    x = Math.max(0, Math.min(screenWidth - size, x));
    y = Math.max(0, Math.min(screenHeight - size, y));

    BeginDrawing();
    ClearBackground(BLACK);
    DrawText("Move with WASD or the arrow keys", 24, 22, 24, RAYWHITE);
    DrawRectangle(Math.floor(x), Math.floor(y), size, size, BLUE);
    DrawFPS(screenWidth - 100, 10);
    EndDrawing();
  }
} finally {
  CloseWindow();
  closeRaylib();
}
