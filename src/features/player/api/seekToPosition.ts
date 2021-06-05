import { authenticatedFetch } from '@/api/common';

export async function seekToPosition(position: number, deviceId: string | undefined | null) {
  return authenticatedFetch(
    `https://api.spotify.com/v1/me/player/seek?position_ms=${position}&device_id=${deviceId}`,
    {
      method: 'PUT',
    }
  );
}
