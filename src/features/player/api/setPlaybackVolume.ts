import { authenticatedFetch } from '@/api/common';

export async function setPlaybackVolume(volume: number, deviceId: string | undefined | null) {
  const truncVolume = Math.trunc(volume);
  return authenticatedFetch(
    `https://api.spotify.com/v1/me/player/volume?volume_percent=${truncVolume}&device_id=${deviceId}`,
    {
      method: 'PUT',
    }
  );
}
