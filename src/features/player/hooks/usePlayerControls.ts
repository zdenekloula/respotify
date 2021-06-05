import { debounce } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import {
  getDevices,
  getPlaybackState,
  seekToPosition,
  setPlaybackDevice,
  setPlaybackRepeatMode,
  setPlaybackVolume,
  skipToNext,
  skipToPrevious,
  togglePlaybackShuffle,
} from '../api';
import {
  setVolume,
  setContext,
  selectIsExternalPlayer,
  selectActiveDevice,
  setIsPlaying,
  setPosition as setPositionInternal,
  setShuffle as setShuffleInternal,
  setRepeatMode as setRepeatModeInternal,
  toggleIsPlaying,
  setDevices,
  selectCurrentDeviceId,
  PlayerState,
} from '../playerSlice';
import { handleExternalPlayerPlayToggle, handlePlayerPlaySong, setTrack } from '../playerThunks';
import { useSpotifyPlaybackSDK } from '../SpotifyPlaybackSDKContext';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

function usePlayerControls() {
  const { player } = useSpotifyPlaybackSDK();

  const currentDeviceId = useAppSelector(selectCurrentDeviceId);
  const isExternalPlayer = useAppSelector(selectIsExternalPlayer);
  const activeDevice = useAppSelector(selectActiveDevice, shallowEqual);

  const dispatch = useAppDispatch();

  const activeDeviceId = activeDevice?.id;

  const setExternalPlaybackState = useCallback(
    async (playbackState: SpotifyApi.CurrentPlaybackResponse) => {
      if (!playbackState) {
        dispatch(setIsPlaying(false));
        return;
      }

      const trackId = playbackState.item?.id;
      const deviceVolume = playbackState.device?.volume_percent || 0;

      if (trackId) {
        await dispatch(setTrack(trackId));
      }

      dispatch(
        setContext({
          uri: playbackState.context?.uri,
        })
      );
      dispatch(setVolume(deviceVolume / 100));
      dispatch(setIsPlaying(playbackState.is_playing));
      dispatch(setPositionInternal(Number(playbackState.progress_ms)));
      dispatch(setShuffleInternal(playbackState.shuffle_state));
      dispatch(setRepeatModeInternal(playbackState.repeat_state));
    },
    [dispatch]
  );

  const syncDevices = useCallback(async () => {
    const { devices } = await getDevices();
    dispatch(setDevices(devices));
  }, [dispatch]);

  const externalPlayerStateSync = useCallback(async () => {
    await syncDevices();
    if (isExternalPlayer) {
      const playbackState = await getPlaybackState();
      setExternalPlaybackState(playbackState);
    }
  }, [setExternalPlaybackState, isExternalPlayer, syncDevices]);

  const setRepeatMode = async (newRepeatMode: PlayerState['repeat_mode']) => {
    if (isExternalPlayer) {
      dispatch(setRepeatModeInternal(newRepeatMode));
    }
    setPlaybackRepeatMode(newRepeatMode, activeDeviceId);
  };

  const setShuffle = async (newShuffleState: boolean) => {
    if (isExternalPlayer) {
      dispatch(setShuffleInternal(newShuffleState));
    }
    await togglePlaybackShuffle(newShuffleState, activeDeviceId);
  };

  const setPosition = async (position: number) => {
    if (isExternalPlayer) {
      dispatch(setPositionInternal(position));
      await seekToPosition(position, activeDeviceId);
      return;
    }
    dispatch(setPositionInternal(position));
    await player?.seek(position);
  };

  const handlePrevious = async () => {
    if (isExternalPlayer) {
      await skipToPrevious();
      await externalPlayerStateSync();
      return;
    }
    await player?.previousTrack();
  };

  const handleNext = async () => {
    if (isExternalPlayer) {
      await skipToNext();
      await externalPlayerStateSync();
      return;
    }
    await player?.nextTrack();
  };

  // https://github.com/facebook/react/issues/19240#issuecomment-652945246
  const setExternalPlaybackVolume = useMemo(
    () =>
      debounce(async (volume) => {
        if (isExternalPlayer) {
          return setPlaybackVolume(volume * 100, activeDeviceId);
        }
        return player?.setVolume(volume);
      }, 100),
    [activeDeviceId, isExternalPlayer, player]
  );

  const handlePlayerVolume = useCallback(
    async (volume: number) => {
      dispatch(setVolume(volume));
      await setExternalPlaybackVolume(volume);
    },
    [setExternalPlaybackVolume, dispatch]
  );

  const handlePlaySong = useCallback(
    async (playOptions: SpotifyApi.PlayParameterObject = {}) => {
      return dispatch(handlePlayerPlaySong(playOptions));
    },
    [dispatch]
  );

  const handlePlay = useCallback(
    async (playOptions: SpotifyApi.PlayParameterObject = {}) => {
      if (isExternalPlayer) {
        await dispatch(handleExternalPlayerPlayToggle(playOptions));
        return;
      }

      // In case user closes playing device and the player was in "external mode", an "no list was loaded" error has been thrown
      const currentState = await player?.getCurrentState();
      if (!currentState && currentDeviceId) {
        await setPlaybackDevice(currentDeviceId);
        await externalPlayerStateSync();
      }
      await player?.getCurrentState();
      await player?.togglePlay();

      dispatch(toggleIsPlaying());
    },
    [currentDeviceId, isExternalPlayer, player, dispatch, externalPlayerStateSync]
  );

  return {
    setTrack,

    handleNext,
    handlePrevious,
    handlePlay,
    handlePlaySong,
    setShuffle,
    setRepeatMode,
    setPosition,

    syncDevices,
    externalPlayerStateSync,
    setExternalPlaybackState,
    handlePlayerVolume,
    player,
  };
}

export { usePlayerControls };
