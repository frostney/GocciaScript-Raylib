// Times the Bunnymark update loop on its own: no window, no raylib, no
// capability. Run from the repository root:
//
//   GocciaRunner --ignore-config-permissions benchmarks/bunnymark-update-loop.ts
//
// Add --global BUNNYMARK_UPDATE_VARIANT=current (or =hoisted) to run one
// variant only, and --profile=all --profile-output=profile.json for its opcode
// profile.
import {
  addBunnies,
  bunnyInstanceStride,
  bunnyXOffset,
  bunnyYOffset,
  createBunnyState,
  updateBunnies,
} from "../examples/lib/bunny-state.ts";
import type { BunnyState } from "../examples/lib/bunny-state.ts";

const sprites = 10000;
const frames = 100;
const rounds = 3;

// Candidate: the module constants become locals and the edge tests compare
// against precomputed bounds. It must produce the same positions.
const updateHoisted = (
  state: BunnyState,
  deltaScale: number,
  textureWidth: number,
  textureHeight: number,
  screenWidth: number,
  screenHeight: number,
): void => {
  const maximumX = screenWidth - textureWidth / 2;
  const minimumX = -textureWidth / 2;
  const maximumY = screenHeight - textureHeight / 2;
  const minimumY = 40 - textureHeight / 2;
  const xValues = state.x;
  const yValues = state.y;
  const velocityXValues = state.velocityX;
  const velocityYValues = state.velocityY;
  const transforms = state.transforms;
  const stride = bunnyInstanceStride;
  const xOffset = bunnyXOffset;
  const yOffset = bunnyYOffset;

  for (const index of state.indices) {
    const x = xValues[index] + velocityXValues[index] * deltaScale;
    const y = yValues[index] + velocityYValues[index] * deltaScale;

    xValues[index] = x;
    yValues[index] = y;
    if (x > maximumX || x < minimumX) velocityXValues[index] *= -1;
    if (y > maximumY || y < minimumY) velocityYValues[index] *= -1;

    const transformOffset = index * stride;
    transforms[transformOffset + xOffset] = x;
    transforms[transformOffset + yOffset] = y;
  }
};

const createState = (): BunnyState => {
  const state = createBunnyState(sprites);
  let seed = 1234;
  addBunnies(state, sprites, 640, 360, (minimum, maximum) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return minimum + (seed % (maximum - minimum + 1));
  });
  return state;
};

const run = (update: typeof updateBunnies): { ms: number; state: BunnyState } => {
  const state = createState();
  const started = performance.now();
  for (const _frame of Array.from({ length: frames })) {
    update(state, 1, 32, 32, 1280, 720);
  }
  return { ms: (performance.now() - started) / frames, state };
};

// --global defines a global binding, not a globalThis property.
const selected =
  typeof BUNNYMARK_UPDATE_VARIANT === "undefined"
    ? "both"
    : BUNNYMARK_UPDATE_VARIANT;
for (const round of Array.from({ length: rounds }, (_unused, index) => index + 1)) {
  if (selected !== "hoisted") {
    console.log("round " + round + " current " + run(updateBunnies).ms.toFixed(2) + " ms/frame");
  }
  if (selected !== "current") {
    console.log("round " + round + " hoisted " + run(updateHoisted).ms.toFixed(2) + " ms/frame");
  }
}

if (selected === "both") {
  const reference = run(updateBunnies).state;
  const candidate = run(updateHoisted).state;
  const identical =
    reference.transforms.every((value, index) => value === candidate.transforms[index]) &&
    reference.x.every((value, index) => value === candidate.x[index]) &&
    reference.velocityY.every((value, index) => value === candidate.velocityY[index]);
  console.log("hoisted positions identical to current: " + identical);
}
