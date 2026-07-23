// SPDX-License-Identifier: GPL-2.0-only

import {
  IsKeyDown,
  IsKeyPressed,
  IsKeyReleased,
  KEY_A,
  KEY_BACKSPACE,
  KEY_D,
  KEY_DOWN,
  KEY_EIGHT,
  KEY_ENTER,
  KEY_ESCAPE,
  KEY_FIVE,
  KEY_FOUR,
  KEY_LEFT,
  KEY_LEFT_ALT,
  KEY_LEFT_CONTROL,
  KEY_LEFT_SHIFT,
  KEY_NINE,
  KEY_ONE,
  KEY_RIGHT,
  KEY_RIGHT_ALT,
  KEY_RIGHT_CONTROL,
  KEY_RIGHT_SHIFT,
  KEY_S,
  KEY_SEVEN,
  KEY_SIX,
  KEY_SPACE,
  KEY_TAB,
  KEY_THREE,
  KEY_TWO,
  KEY_UP,
  KEY_W,
  KEY_ZERO,
} from "../../../bindings/raylib.ts";

let game = null;
let definitions = null;
const eventQueue = [];

// Preserve tsvm-doom's raw-key indices so its tick-exact input builder remains
// unchanged. Each entry is [raylib key, engine raw key, Doom event key].
const keyMappings = [
  [KEY_UP, 19, 0xad],
  [KEY_DOWN, 20, 0xaf],
  [KEY_LEFT, 21, 0xac],
  [KEY_RIGHT, 22, 0xae],
  [KEY_W, 51, 119],
  [KEY_A, 29, 97],
  [KEY_S, 47, 115],
  [KEY_D, 32, 100],
  [KEY_LEFT_CONTROL, 129, 0x80 + 0x1d],
  [KEY_RIGHT_CONTROL, 130, 0x80 + 0x1d],
  [KEY_LEFT_SHIFT, 59, 0x80 + 0x36],
  [KEY_RIGHT_SHIFT, 60, 0x80 + 0x36],
  [KEY_LEFT_ALT, 57, 0x80 + 0x38],
  [KEY_RIGHT_ALT, 58, 0x80 + 0x38],
  [KEY_SPACE, 62, 32],
  [KEY_TAB, 61, 9],
  [KEY_ENTER, 66, 13],
  [KEY_ESCAPE, 111, 27],
  [KEY_BACKSPACE, 67, 127],
  [KEY_ZERO, 7, 48],
  [KEY_ONE, 8, 49],
  [KEY_TWO, 9, 50],
  [KEY_THREE, 10, 51],
  [KEY_FOUR, 11, 52],
  [KEY_FIVE, 12, 53],
  [KEY_SIX, 13, 54],
  [KEY_SEVEN, 14, 55],
  [KEY_EIGHT, 15, 56],
  [KEY_NINE, 16, 57],
];

const I_PollKeys = (): void => {
  const gameKeyDown = game.gamekeydown;
  for (const [raylibKey, rawKey, doomKey] of keyMappings) {
    gameKeyDown[rawKey] = IsKeyDown(raylibKey) ? 1 : 0;
    if (IsKeyPressed(raylibKey)) {
      eventQueue.push({
        type: definitions.Ev.keydown,
        data1: doomKey,
      });
    }
    if (IsKeyReleased(raylibKey)) {
      eventQueue.push({
        type: definitions.Ev.keyup,
        data1: doomKey,
      });
    }
  }
};

const I_NextEvent = () => {
  return eventQueue.length > 0 ? eventQueue.shift() : null;
};

const I_ClearEvents = (): void => {
  eventQueue.length = 0;
  game.gamekeydown.fill(0);
};

const I_AnyKeyDown = (code: number): boolean => {
  return game.gamekeydown[code] !== 0;
};

export default {
  I_PollKeys,
  I_NextEvent,
  I_ClearEvents,
  I_AnyKeyDown,
  init: (modules): void => {
    game = modules.g_game;
    definitions = modules.defs;
  },
};
