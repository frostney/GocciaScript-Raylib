// SPDX-License-Identifier: GPL-2.0-only

const noOperation = (): void => {};

export default {
  I_InitSound: noOperation,
  I_ShutdownSound: noOperation,
  I_UpdateSound: noOperation,
  I_StartSound: (): number => 0,
  I_StopSound: noOperation,
  I_SoundIsPlaying: (): boolean => false,
  I_UpdateSoundParams: noOperation,
  I_SetSfxVolume: noOperation,
  I_SetMusicVolume: noOperation,
  I_InitMusic: noOperation,
  I_PlaySong: noOperation,
  I_StopSong: noOperation,
  init: (): void => {},
};
