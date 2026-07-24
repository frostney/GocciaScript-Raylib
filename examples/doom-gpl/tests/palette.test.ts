// SPDX-License-Identifier: GPL-2.0-only

import {
  expandIndexedFrame,
  packPaletteBytes,
} from "../src/palette.ts";

const paletteCount = 14;
const colourCount = 256;

describe("DOOM palette conversion", () => {
  test("matches the byte-wise RGBA reference for every palette entry", () => {
    const playpal = new Uint8Array(paletteCount * colourCount * 3);
    for (let index = 0; index < playpal.length; index += 1) {
      playpal[index] = (index * 37 + 11) % 256;
    }

    const indexed = new Uint8Array(colourCount);
    for (let index = 0; index < indexed.length; index += 1) {
      indexed[index] = index;
    }

    const packedPaletteBytes = new Uint8Array(colourCount * 4);
    const packedPalette = new Uint32Array(packedPaletteBytes.buffer);
    const rgba = new Uint8Array(indexed.length * 4);
    const rgba32 = new Uint32Array(rgba.buffer);

    for (
      let paletteIndex = 0;
      paletteIndex < paletteCount;
      paletteIndex += 1
    ) {
      packPaletteBytes(playpal, paletteIndex, packedPaletteBytes);
      expandIndexedFrame(indexed, packedPalette, rgba32);

      const paletteOffset = paletteIndex * colourCount * 3;
      for (let index = 0; index < colourCount; index += 1) {
        const colourOffset = paletteOffset + indexed[index] * 3;
        const pixelOffset = index * 4;
        expect(packedPaletteBytes[pixelOffset]).toBe(
          playpal[colourOffset],
        );
        expect(packedPaletteBytes[pixelOffset + 1]).toBe(
          playpal[colourOffset + 1],
        );
        expect(packedPaletteBytes[pixelOffset + 2]).toBe(
          playpal[colourOffset + 2],
        );
        expect(packedPaletteBytes[pixelOffset + 3]).toBe(255);
        expect(rgba[pixelOffset]).toBe(packedPaletteBytes[pixelOffset]);
        expect(rgba[pixelOffset + 1]).toBe(
          packedPaletteBytes[pixelOffset + 1],
        );
        expect(rgba[pixelOffset + 2]).toBe(
          packedPaletteBytes[pixelOffset + 2],
        );
        expect(rgba[pixelOffset + 3]).toBe(
          packedPaletteBytes[pixelOffset + 3],
        );
      }
    }
  });
});
