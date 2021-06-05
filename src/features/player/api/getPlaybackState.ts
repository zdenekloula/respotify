import { authenticatedFetch } from '@/api/common';

export const getPlaybackState = async (): Promise<SpotifyApi.CurrentPlaybackResponse> => {
  return authenticatedFetch(`https://api.spotify.com/v1/me/player`, {
    method: 'GET',
  }).then((d) => {
    // In cases like 204, we get cannot parse json error
    if (d.status === 200) {
      return d.json();
    }
    return;
  });
};
