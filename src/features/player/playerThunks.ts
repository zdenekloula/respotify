import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSingleTrack, pause, play } from './api';
import { setCurrentTrack, setIsPlaying } from './playerSlice';
import type { RootState } from '@/store';

// TODO: Handle those properly in the redux state
let requestedSongFetching: string | null = null;
export const setTrack = createAsyncThunk<
  void,
  string | null,
  {
    state: RootState;
  }
>('player/handlePlaySong', async (trackId, { getState, dispatch }) => {
  const { currentTrack } = getState().player;

  if (!trackId) {
    throw new Error('Missing trackId');
  }

  // If the current track is the same as the requested one, do nothing
  if (currentTrack?.id === trackId) {
    return;
  }

  // If the requested track is already being fetched, do nothing
  if (requestedSongFetching === trackId) {
    return;
  }

  try {
    requestedSongFetching = trackId;
    const track = await getSingleTrack(trackId);
    dispatch(setCurrentTrack(track));
    requestedSongFetching = null;
  } catch (error) {
    // Throw toast
    console.error(error);
  }
});

export const handlePlayerPlaySong = createAsyncThunk<
  void,
  SpotifyApi.PlayParameterObject,
  {
    state: RootState;
  }
>('player/handlePlaySong', async (playOptions, thunkAPI) => {
  const playerState = thunkAPI.getState().player;
  const devices = playerState.devices;
  const currentDeviceId = playerState.currentDeviceId;

  await play({
    playOptions,
    devices,
    currentDeviceId,
  });
});

export const handleExternalPlayerPlayToggle = createAsyncThunk<
  boolean,
  SpotifyApi.PlayParameterObject,
  {
    state: RootState;
  }
>('player/handleExternalPlayerPlayToggle', async (playOptions, thunkAPI) => {
  const dispatch = thunkAPI.dispatch;
  const playerState = thunkAPI.getState().player;
  const devices = playerState.devices;
  const isPlaying = playerState.isPlaying;
  const currentDeviceId = playerState.currentDeviceId;

  if (isPlaying) {
    pause();
    dispatch(setIsPlaying(false));
    return isPlaying;
  }

  try {
    await play({
      playOptions,
      devices,
      currentDeviceId,
    });

    dispatch(setIsPlaying(true));
  } catch {
    dispatch(setIsPlaying(false));
  }
  return isPlaying;
});
