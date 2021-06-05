import { authenticatedFetch } from '@/api/common';

export async function skipToPrevious() {
  return authenticatedFetch(`https://api.spotify.com/v1/me/player/previous`, {
    method: 'POST',
  });
}
