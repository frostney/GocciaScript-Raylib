import bunnyBytes from "../../examples/assets/raybunny.png" with {
  type: "bytes",
};
import { runBunnymark } from "../../examples/lib/run-bunnymark.ts";

globalThis.BUNNYMARK_INITIAL_SPRITES = 10000;
globalThis.BUNNYMARK_RANDOM_SEED = 1234;
globalThis.BUNNYMARK_TARGET_FPS = 0;
globalThis.BUNNYMARK_REPORT_FINAL = true;
runBunnymark(bunnyBytes, 25);
