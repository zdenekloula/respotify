import { selectStatus } from '../playerSlice';
import { useSpotifyPlaybackSDK } from '../SpotifyPlaybackSDKContext';
import { useAppSelector } from '@/hooks/redux';

export function useIsPlayerReady() {
  const { player } = useSpotifyPlaybackSDK();

  const status = useAppSelector(selectStatus);

  if (!player || status === 'loading' || status === 'error') {
    return false;
  }

  return true;
}
