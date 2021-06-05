import { authenticatedFetch } from '@/api/common';

export async function getUser(): Promise<SpotifyApi.CurrentUsersProfileResponse> {
  return authenticatedFetch(`https://api.spotify.com/v1/me`, {
    method: 'GET',
  }).then((d) => d.json());
}
