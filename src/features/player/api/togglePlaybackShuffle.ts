import { authenticatedFetch } from '@/api/common';

export async function togglePlaybackShuffle(value: boolean, deviceId: string | null | undefined) {
  return authenticatedFetch(
    `https://api.spotify.com/v1/me/player/shuffle?state=${value}&device_id=${deviceId}`,
    {
      method: 'PUT',
    }
  );
}
