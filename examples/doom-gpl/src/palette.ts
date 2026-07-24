// SPDX-License-Identifier: GPL-2.0-only

export const packPaletteBytes = (
  playpal: Uint8Array,
  paletteIndex: number,
  packedPaletteBytes: Uint8Array,
): void => {
  const paletteOffset = paletteIndex * 768;
  for (let colourIndex = 0; colourIndex < 256; colourIndex += 1) {
    const sourceOffset = paletteOffset + colourIndex * 3;
    const targetOffset = colourIndex * 4;
    packedPaletteBytes[targetOffset] = playpal[sourceOffset];
    packedPaletteBytes[targetOffset + 1] = playpal[sourceOffset + 1];
    packedPaletteBytes[targetOffset + 2] = playpal[sourceOffset + 2];
    packedPaletteBytes[targetOffset + 3] = 255;
  }
};

export const expandIndexedFrame = (
  indexed: Uint8Array,
  packedPalette: Uint32Array,
  rgba32: Uint32Array,
): void => {
  const pixelCount = indexed.length;
  for (let index = 0; index < pixelCount; index += 1) {
    rgba32[index] = packedPalette[indexed[index]];
  }
};
