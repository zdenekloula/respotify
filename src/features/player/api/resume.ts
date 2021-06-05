import { authenticatedFetch } from '@/api/common';

export async function resume() {
  return authenticatedFetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
  });
}
