import bunnyBytes from "../../examples/assets/raybunny.png" with {
  type: "bytes",
};
import { runBunnymark } from "../../examples/lib/run-bunnymark.ts";

export const runBunnymarkVisual = (
  drawPath: string,
  capturePath: string,
): void => {
  globalThis.BUNNYMARK_DRAW_PATH = drawPath;
  globalThis.BUNNYMARK_INITIAL_SPRITES = 1000;
  globalThis.BUNNYMARK_RANDOM_SEED = 1234;
  globalThis.BUNNYMARK_TARGET_FPS = 0;
  globalThis.BUNNYMARK_FIXED_DELTA_SCALE = 1;
  globalThis.BUNNYMARK_SHOW_OVERLAY = false;
  globalThis.BUNNYMARK_CAPTURE_PATH = capturePath;
  globalThis.BUNNYMARK_CAPTURE_FRAME = 7;
  runBunnymark(bunnyBytes, 8);
};
