import { frameNumbers } from "./frames.ts";

export const bunnyInstanceStride = 16;
export const bunnyRedOffset = 0;
export const bunnyGreenOffset = 4;
export const bunnyBlueOffset = 8;
export const bunnyAlphaOffset = 12;
export const bunnyXOffset = 3;
export const bunnyYOffset = 7;

export type BunnyState = {
  capacity: number;
  length: number;
  x: Float64Array;
  y: Float64Array;
  velocityX: Float64Array;
  velocityY: Float64Array;
  colors: Uint8Array;
  transforms: Float32Array;
  indices: number[];
};

export const createBunnyState = (capacity: number): BunnyState => {
  return {
    capacity,
    length: 0,
    x: new Float64Array(capacity),
    y: new Float64Array(capacity),
    velocityX: new Float64Array(capacity),
    velocityY: new Float64Array(capacity),
    colors: new Uint8Array(capacity * 4),
    transforms: new Float32Array(capacity * bunnyInstanceStride),
    indices: [],
  };
};

export const addBunnies = (
  state: BunnyState,
  count: number,
  startX: number,
  startY: number,
  getRandomValue: (minimum: number, maximum: number) => number,
): void => {
  const available = Math.min(count, state.capacity - state.length);
  let length = state.length;

  for (const _index of frameNumbers(available)) {
    const colorOffset = length * 4;
    const transformOffset = length * bunnyInstanceStride;
    const velocityX = getRandomValue(-250, 250) / 60;
    const velocityY = getRandomValue(-250, 250) / 60;
    const red = getRandomValue(50, 240);
    const green = getRandomValue(50, 240);
    const blue = getRandomValue(50, 240);

    state.x[length] = startX;
    state.y[length] = startY;
    state.velocityX[length] = velocityX;
    state.velocityY[length] = velocityY;
    state.colors[colorOffset] = red;
    state.colors[colorOffset + 1] = green;
    state.colors[colorOffset + 2] = blue;
    state.colors[colorOffset + 3] = 255;
    state.transforms[transformOffset + bunnyRedOffset] = red / 255;
    state.transforms[transformOffset + bunnyGreenOffset] = green / 255;
    state.transforms[transformOffset + bunnyBlueOffset] = blue / 255;
    state.transforms[transformOffset + bunnyAlphaOffset] = 1;
    state.transforms[transformOffset + bunnyXOffset] = startX;
    state.transforms[transformOffset + bunnyYOffset] = startY;
    state.indices.push(length);
    length += 1;
  }

  state.length = length;
};

export const updateBunnies = (
  state: BunnyState,
  deltaScale: number,
  textureWidth: number,
  textureHeight: number,
  screenWidth: number,
  screenHeight: number,
): void => {
  const halfWidth = textureWidth / 2;
  const halfHeight = textureHeight / 2;
  const xValues = state.x;
  const yValues = state.y;
  const velocityXValues = state.velocityX;
  const velocityYValues = state.velocityY;
  const transforms = state.transforms;

  for (const index of state.indices) {
    const x = xValues[index] + velocityXValues[index] * deltaScale;
    const y = yValues[index] + velocityYValues[index] * deltaScale;

    xValues[index] = x;
    yValues[index] = y;
    if (x + halfWidth > screenWidth || x + halfWidth < 0) {
      velocityXValues[index] *= -1;
    }
    if (
      y + halfHeight > screenHeight ||
      y + halfHeight - 40 < 0
    ) {
      velocityYValues[index] *= -1;
    }

    const transformOffset = index * bunnyInstanceStride;
    transforms[transformOffset + bunnyXOffset] = x;
    transforms[transformOffset + bunnyYOffset] = y;
  }
};
