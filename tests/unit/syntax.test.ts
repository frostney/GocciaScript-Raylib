import abiProbe from "../abi/layout-probe.ts" with { type: "text" };
import basicInput from "../../examples/basic-input.ts" with { type: "text" };
import basicWindow from "../../examples/basic-window.ts" with { type: "text" };
import bunnymark from "../../examples/lib/run-bunnymark.ts" with {
  type: "text",
};
import doomClone from "../../examples/doom-clone.ts" with { type: "text" };
import ffiSmoke from "../fixtures/ffi-smoke.ts" with { type: "text" };
import frames from "../../examples/lib/frames.ts" with { type: "text" };
import imageLoading from "../../examples/image-loading.ts" with {
  type: "text",
};
import raylib from "../../bindings/raylib.ts" with { type: "text" };

describe("default GocciaScript syntax", () => {
  test("runtime sources need neither legacy loop compatibility flag", () => {
    const sources = [
      abiProbe,
      basicInput,
      basicWindow,
      bunnymark,
      doomClone,
      ffiSmoke,
      frames,
      imageLoading,
      raylib,
    ];

    for (const source of sources) {
      expect(source).not.toMatch(/\bwhile\s*\(/);
      expect(source).not.toMatch(/\bfor\s*\([^)]*;/);
    }
  });
});
