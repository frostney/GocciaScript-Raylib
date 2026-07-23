import {
  BLACK,
  CloseWindow,
  ClearBackground,
  DrawFPS,
  DrawText,
  EndDrawing,
  BeginDrawing,
  InitWindow,
  RAYWHITE,
  SetTargetFPS,
  WindowShouldClose,
  closeRaylib,
} from "../bindings/raylib.ts";
import { frameNumbers } from "./lib/frames.ts";

const maximumFrames: number =
  typeof globalThis.RAYLIB_EXAMPLE_MAX_FRAMES === "number"
    ? globalThis.RAYLIB_EXAMPLE_MAX_FRAMES
    : Infinity;
InitWindow(960, 540, "GocciaScript + raylib: basic window");
SetTargetFPS(60);

try {
  for (const _frame of frameNumbers(maximumFrames)) {
    if (WindowShouldClose()) break;
    BeginDrawing();
    ClearBackground(BLACK);
    DrawText("Hello from GocciaScript and raylib 6.0", 180, 245, 28, RAYWHITE);
    DrawFPS(12, 12);
    EndDrawing();
  }
} finally {
  CloseWindow();
  closeRaylib();
}
