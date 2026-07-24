import {
  addBunnies,
  bunnyAlphaOffset,
  bunnyBlueOffset,
  bunnyGreenOffset,
  bunnyInstanceStride,
  bunnyRedOffset,
  bunnyXOffset,
  bunnyYOffset,
  createBunnyState,
  updateBunnies,
} from "../../examples/lib/bunny-state.ts";

describe("Bunnymark compact sprite state", () => {
  test("preserves random order and C Matrix instance layout", () => {
    const state = createBunnyState(1);
    const values = [-120, 180, 50, 100, 150];
    const ranges: number[][] = [];
    let nextValue = 0;

    addBunnies(state, 2, 640, 360, (minimum, maximum) => {
      ranges.push([minimum, maximum]);
      const value = values[nextValue];
      nextValue += 1;
      return value;
    });

    expect(state.length).toBe(1);
    expect(ranges).toEqual([
      [-250, 250],
      [-250, 250],
      [50, 240],
      [50, 240],
      [50, 240],
    ]);
    expect(state.x[0]).toBe(640);
    expect(state.y[0]).toBe(360);
    expect(state.velocityX[0]).toBe(-2);
    expect(state.velocityY[0]).toBe(3);
    expect(Array.from(state.colors)).toEqual([50, 100, 150, 255]);

    expect(
      Math.round(
        state.transforms[bunnyRedOffset] * 255,
      ),
    ).toBe(50);
    expect(
      Math.round(
        state.transforms[bunnyGreenOffset] * 255,
      ),
    ).toBe(100);
    expect(
      Math.round(
        state.transforms[bunnyBlueOffset] * 255,
      ),
    ).toBe(150);
    expect(state.transforms[bunnyAlphaOffset]).toBe(1);
    expect(state.transforms[bunnyXOffset]).toBe(640);
    expect(state.transforms[bunnyYOffset]).toBe(360);
    expect(state.transforms[bunnyInstanceStride - 1]).toBe(0);
  });

  test("matches Bunnymark motion and edge reversal semantics", () => {
    const state = createBunnyState(1);
    addBunnies(state, 1, 0, 0, () => 50);
    state.x[0] = -15;
    state.y[0] = 20;
    state.velocityX[0] = -2;
    state.velocityY[0] = -1;

    updateBunnies(state, 1, 32, 32, 1280, 720);

    expect(state.x[0]).toBe(-17);
    expect(state.y[0]).toBe(19);
    expect(state.velocityX[0]).toBe(2);
    expect(state.velocityY[0]).toBe(1);
    expect(state.transforms[bunnyXOffset]).toBe(-17);
    expect(state.transforms[bunnyYOffset]).toBe(19);
  });
});
