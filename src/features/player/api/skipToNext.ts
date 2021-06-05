import { authenticatedFetch } from '@/api/common';

export async function skipToNext() {
  return authenticatedFetch(`https://api.spotify.com/v1/me/player/next`, {
    method: 'POST',
  });
}
