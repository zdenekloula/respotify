import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef } from 'react';
import {
  incrementPosition,
  selectIsExternalPlayer,
  setContext,
  setCurrentDeviceId,
  setIsPlaying,
  setPosition,
  setStatus,
  setVolume,
  setShuffle as setShuffleInternal,
  setRepeatMode as setRepeatModeInternal,
  selectIsPlaying,
  selectStatus,
  initialState,
} from '../playerSlice';
import { setTrack } from '../playerThunks';
import { useSpotifyPlaybackSDK } from '../SpotifyPlaybackSDKContext';
import { getOrInitializePlaybackState } from '../utils/getOrInitializePlaybackState';
import { normalizeRepeatMode } from '../utils/normalizeRepeatMode';
import { usePlayerControls } from './usePlayerControls';
import { getAuthToken } from '@/api/common';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { wait } from '@/utils/wait';

const SEEK_UPDATE_INTERVAL = 200; //200 ms
const EXTERNAL_PLAYER_INTERVAL = 3000; //3s

function usePlayer() {
  const { data: session } = useSession();
  const { player, setPlayer } = useSpotifyPlaybackSDK();

  const isPlaying = useAppSelector(selectIsPlaying);
  const status = useAppSelector(selectStatus);
  const isExternalPlayer = useAppSelector(selectIsExternalPlayer);

  const dispatch = useAppDispatch();

  const { syncDevices, setExternalPlaybackState, externalPlayerStateSync } = usePlayerControls();

  const playerStateSyncInterval = useRef<number>();
  const externalPlayerStateSyncInterval = useRef<number>();

  const handlePlayerStatus = useCallback(
    async ({ device_id }: Spotify.WebPlaybackInstance) => {
      // For some reason, without waiting the call to PUT https://api.spotify.com/v1/me/player caused that the API returned 404 Device not found. Having a small delay fixes it
      await wait(1000);

      await syncDevices();

      const playbackState = await getOrInitializePlaybackState(device_id);

      setExternalPlaybackState(playbackState);

      dispatch(setCurrentDeviceId(device_id));
      dispatch(setStatus('ready'));
    },
    [setExternalPlaybackState, syncDevices, dispatch]
  );

  const playerStateSync = useCallback(async () => {
    if (isExternalPlayer) {
      if (isPlaying) {
        dispatch(incrementPosition(SEEK_UPDATE_INTERVAL));
      }
      return;
    }

    const playerState = await player?.getCurrentState();
    const volume = await player?.getVolume();
    if (playerState) {
      dispatch(setPosition(playerState.position));
    }
    // Volume can be 0
    if (volume !== undefined) {
      dispatch(setVolume(volume));
      localStorage.setItem('rs-volume', String(volume));
    }
  }, [isPlaying, player, isExternalPlayer, dispatch]);

  const togglePlayerStateSync = useCallback(() => {
    clearInterval(playerStateSyncInterval.current);
    if (isPlaying) {
      playerStateSyncInterval.current = window.setInterval(playerStateSync, SEEK_UPDATE_INTERVAL);
    }
  }, [isPlaying, playerStateSync]);

  const toggleExternalPlayerStateSync = useCallback(() => {
    clearInterval(externalPlayerStateSyncInterval.current);

    externalPlayerStateSyncInterval.current = window.setInterval(() => {
      externalPlayerStateSync();
    }, EXTERNAL_PLAYER_INTERVAL);
  }, [externalPlayerStateSync]);

  // Player update
  const handlePlayerState = useCallback(
    async (state: Spotify.PlaybackState) => {
      if (!state) {
        return;
      }

      const isPlaying = !state.paused;
      const trackId = state.track_window?.current_track?.id;

      if (trackId) {
        await dispatch(setTrack(trackId));
        dispatch(setPosition(state.position));
      }

      dispatch(
        setContext({
          uri: state.context?.uri || undefined,
        })
      );
      dispatch(setIsPlaying(isPlaying));
      dispatch(setShuffleInternal(state.shuffle));
      dispatch(setRepeatModeInternal(normalizeRepeatMode(state.repeat_mode)));
    },
    [dispatch]
  );

  const handlePlayerStateChange = useCallback(
    async (state: Spotify.PlaybackState) => {
      if (!state) {
        await externalPlayerStateSync();
      }

      handlePlayerState(state);
    },
    [externalPlayerStateSync, handlePlayerState]
  );

  const initializePlayer = () => {
    if (!document.querySelector("script[src='https://sdk.scdn.co/spotify-player.js']")) {
      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;

      document.body.append(script);
    }

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new Spotify.Player({
        name: '[Respotify]',
        getOAuthToken: async (callback) => {
          const token = await getAuthToken();
          callback(token || String(session?.accessToken));
        },
        volume: initialState.volume,
      });

      player.addListener('initialization_error', (state) => {
        setStatus('error');
        console.error('initialization_error', state);
      });
      player.addListener('authentication_error', (state) => {
        setStatus('error');
        console.error('authentication_error', state);
      });
      player.addListener('account_error', (state) => {
        setStatus('error');
        console.error('account_error', state);
      });
      player.addListener('playback_error', (state) => {
        console.error('playback_error', state);
      });
      player.addListener('player_state_changed', handlePlayerStateChange);
      player.addListener('ready', handlePlayerStatus);
      player.addListener('not_ready', handlePlayerStatus);
      player.connect();

      setPlayer(player);
    };
  };

  useEffect(() => {
    if (status === 'ready') {
      togglePlayerStateSync();
    }
    return () => {
      clearInterval(playerStateSyncInterval.current);
      playerStateSyncInterval.current = undefined;
    };
  }, [isPlaying, isExternalPlayer, togglePlayerStateSync, player, status]);

  useEffect(() => {
    if (status === 'ready' && !externalPlayerStateSyncInterval.current) {
      toggleExternalPlayerStateSync();
    }
    return () => {
      clearInterval(externalPlayerStateSyncInterval.current);
      externalPlayerStateSyncInterval.current = undefined;
    };
  }, [toggleExternalPlayerStateSync, isPlaying, isExternalPlayer, player, status]);

  return {
    initializePlayer,
  };
}

export { usePlayer };
