import { authenticatedFetch } from '@/api/common';

export const setPlaybackDevice = async (deviceId: string, play = false) => {
  return authenticatedFetch(`https://api.spotify.com/v1/me/player`, {
    method: 'PUT',
    body: JSON.stringify({
      device_ids: [deviceId],
      play,
    }),
  });
};
