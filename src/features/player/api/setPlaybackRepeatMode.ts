import { authenticatedFetch } from '@/api/common';

export async function setPlaybackRepeatMode(
  value: SpotifyApi.PlaybackObject['repeat_state'],
  deviceId: string | null | undefined
) {
  return authenticatedFetch(
    `https://api.spotify.com/v1/me/player/repeat?state=${value}&device_id=${deviceId}`,
    {
      method: 'PUT',
    }
  );
}
