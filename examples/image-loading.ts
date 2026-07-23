import bunnyBytes from "./assets/raybunny.png" with { type: "bytes" };
import {
  BLACK,
  BeginDrawing,
  ClearBackground,
  CloseWindow,
  DrawFPS,
  DrawText,
  DrawTextureV,
  EndDrawing,
  InitWindow,
  LoadImageFromMemory,
  LoadTextureFromImage,
  RAYWHITE,
  SetTargetFPS,
  UnloadImage,
  UnloadTexture,
  Vector2,
  WindowShouldClose,
  closeRaylib,
} from "../bindings/raylib.ts";
import { frameNumbers } from "./lib/frames.ts";

const image = LoadImageFromMemory(".png", bunnyBytes, bunnyBytes.length);
if (image.width !== 32 || image.height !== 32) {
  throw new Error("The embedded raybunny PNG did not decode as 32x32 RGBA");
}

InitWindow(960, 540, "GocciaScript + raylib: ESM byte image");
const texture = LoadTextureFromImage(image);
UnloadImage(image);
SetTargetFPS(60);
const position = Vector2.create({ x: 464, y: 254 });
const maximumFrames: number =
  typeof globalThis.RAYLIB_EXAMPLE_MAX_FRAMES === "number"
    ? globalThis.RAYLIB_EXAMPLE_MAX_FRAMES
    : Infinity;
try {
  for (const _frame of frameNumbers(maximumFrames)) {
    if (WindowShouldClose()) break;
    BeginDrawing();
    ClearBackground(BLACK);
    DrawText(
      'Loaded with: import image from "./raybunny.png" with { type: "bytes" }',
      90,
      110,
      20,
      RAYWHITE,
    );
    DrawTextureV(texture, position, RAYWHITE);
    DrawFPS(12, 12);
    EndDrawing();
  }
} finally {
  UnloadTexture(texture);
  CloseWindow();
  closeRaylib();
}
