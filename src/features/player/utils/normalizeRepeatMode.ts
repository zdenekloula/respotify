export type NormalizedRepeatMode = SpotifyApi.PlaybackObject['repeat_state'];
export type RepeatModeMap = {
  [key: number]: NormalizedRepeatMode;
};

export const mappedRepeatModes: RepeatModeMap = {
  0: 'off',
  1: 'context',
  2: 'track',
};

export function normalizeRepeatMode(repeatMode: Spotify.PlaybackState['repeat_mode']) {
  if (!mappedRepeatModes[repeatMode]) {
    throw new Error('Repeat mode is not supported or does not exist');
  }
  return mappedRepeatModes[repeatMode];
}
