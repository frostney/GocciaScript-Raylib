import bunnyBytes from "./assets/raybunny.png" with { type: "bytes" };
import { runBunnymark } from "./lib/run-bunnymark.ts";

runBunnymark(bunnyBytes, Infinity);
