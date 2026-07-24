// SPDX-License-Identifier: GPL-2.0-only

import {
  expandIndexedFrame,
  packPaletteBytes,
} from "../src/palette.ts";

describe("DOOM palette conversion", () => {
  test("matches the byte-wise RGBA reference for every palette entry", () => {
    const playpal = new Uint8Array(2 * 768);
    for (let index = 0; index < playpal.length; index += 1) {
      playpal[index] = (index * 37 + 11) % 256;
    }

    const indexed = new Uint8Array(256);
    for (let index = 0; index < indexed.length; index += 1) {
      indexed[index] = index;
    }

    const packedPaletteBytes = new Uint8Array(256 * 4);
    const packedPalette = new Uint32Array(packedPaletteBytes.buffer);
    const rgba = new Uint8Array(indexed.length * 4);
    const rgba32 = new Uint32Array(rgba.buffer);

    packPaletteBytes(playpal, 1, packedPaletteBytes);
    expandIndexedFrame(indexed, packedPalette, rgba32);

    const paletteOffset = 768;
    const pixelCount = indexed.length;
    for (let index = 0; index < pixelCount; index += 1) {
      const colourOffset = paletteOffset + indexed[index] * 3;
      const pixelOffset = index * 4;
      expect(rgba[pixelOffset]).toBe(playpal[colourOffset]);
      expect(rgba[pixelOffset + 1]).toBe(playpal[colourOffset + 1]);
      expect(rgba[pixelOffset + 2]).toBe(playpal[colourOffset + 2]);
      expect(rgba[pixelOffset + 3]).toBe(255);
    }
  });
});
