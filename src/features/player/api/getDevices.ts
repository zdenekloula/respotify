import { authenticatedFetch } from '@/api/common';

export async function getDevices(): Promise<SpotifyApi.UserDevicesResponse> {
  return authenticatedFetch(`https://api.spotify.com/v1/me/player/devices`, {
    method: 'GET',
  }).then((d) => d.json());
}
