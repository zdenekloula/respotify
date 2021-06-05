import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getActiveDevice, getIsExternalPlayer } from './utils';
import type { RootState } from '@/store';

export type Status = 'loading' | 'ready' | 'error';
export type PlayerState = {
  status: Status;
  player: Spotify.Player | undefined;
  currentDeviceId: string | undefined;
  devices: Array<SpotifyApi.UserDevice>;
  position: number;
  volume: number;
  shuffle: boolean;
  repeat_mode: SpotifyApi.PlaybackObject['repeat_state'];
  currentTrack: SpotifyApi.TrackObjectFull | SpotifyApi.EpisodeObject | undefined | null;
  context:
    | {
        uri: string | undefined;
      }
    | undefined;
  isPlaying: boolean;
};

const DEFAULT_VOLUME = 0.1;

export const initialState: PlayerState = {
  status: 'loading',
  player: undefined,
  currentDeviceId: undefined,
  devices: [],
  position: 0,
  shuffle: false,
  repeat_mode: 'off',
  volume:
    typeof window !== 'undefined'
      ? Number(localStorage.getItem('rs-volume')) || DEFAULT_VOLUME
      : DEFAULT_VOLUME,
  currentTrack: undefined,
  context: undefined,
  isPlaying: false,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<PlayerState['currentTrack']>) => {
      state.currentTrack = action.payload;
    },
    setVolume: (state, action: PayloadAction<PlayerState['volume']>) => {
      state.volume = action.payload;
    },
    setShuffle: (state, action: PayloadAction<PlayerState['shuffle']>) => {
      state.shuffle = action.payload;
    },
    setRepeatMode: (state, action: PayloadAction<PlayerState['repeat_mode']>) => {
      state.repeat_mode = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<PlayerState['isPlaying']>) => {
      state.isPlaying = action.payload;
    },
    toggleIsPlaying: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setStatus: (state, action: PayloadAction<PlayerState['status']>) => {
      state.status = action.payload;
    },
    setPlayer: (state, action: PayloadAction<PlayerState['player']>) => {
      state.player = action.payload;
    },
    setContext: (state, action: PayloadAction<PlayerState['context']>) => {
      state.context = action.payload;
    },
    setPosition: (state, action: PayloadAction<PlayerState['position']>) => {
      const newPosition = action.payload;
      const currentTrack = state.currentTrack;
      const maxTrackLength = currentTrack?.duration_ms || 0;

      if (newPosition > maxTrackLength) {
        state.position = maxTrackLength;
        return;
      }

      state.position = newPosition;
    },
    incrementPosition: (state, action: PayloadAction<number>) => {
      const newPosition = state.position + action.payload;
      const maxTrackLength = state.currentTrack?.duration_ms || 0;

      if (newPosition > maxTrackLength) {
        state.position = maxTrackLength;
        return;
      }

      state.position = newPosition;
    },
    setCurrentDeviceId: (state, action: PayloadAction<PlayerState['currentDeviceId']>) => {
      state.currentDeviceId = action.payload;
    },
    setDevices: (state, action: PayloadAction<PlayerState['devices']>) => {
      state.devices = action.payload;
    },
  },
});

export const selectStatus = (state: RootState) => state.player.status;
export const selectPlayer = (state: RootState) => state.player.player;
export const selectCurrentDeviceId = (state: RootState) => state.player.currentDeviceId;
export const selectDevices = (state: RootState) => state.player.devices;
export const selectPosition = (state: RootState) => state.player.position;
export const selectShuffle = (state: RootState) => state.player.shuffle;
export const selectRepeatMode = (state: RootState) => state.player.repeat_mode;
export const selectVolume = (state: RootState) => state.player.volume;
export const selectCurrentTrack = (state: RootState) => state.player.currentTrack;
export const selectContext = (state: RootState) => state.player.context;
export const selectIsPlaying = (state: RootState) => state.player.isPlaying;
export const selectActiveDevice = (state: RootState) => getActiveDevice(state.player.devices);
export const selectIsExternalPlayer = (state: RootState) => {
  const activeDevice = getActiveDevice(state.player.devices);
  return getIsExternalPlayer(activeDevice, state.player.currentDeviceId);
};

export const {
  setContext,
  setCurrentDeviceId,
  setCurrentTrack,
  setDevices,
  setIsPlaying,
  setPlayer,
  setPosition,
  setRepeatMode,
  setShuffle,
  setStatus,
  setVolume,

  incrementPosition,
  toggleIsPlaying,
} = playerSlice.actions;
