import { authenticatedFetch } from '@/api/common';

export async function pause() {
  return authenticatedFetch(`https://api.spotify.com/v1/me/player/pause`, {
    method: 'PUT',
  });
}
