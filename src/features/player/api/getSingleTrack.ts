import { authenticatedFetch } from '@/api/common';

export const getSingleTrack = async (
  id: string,
  options: RequestInit = {}
): Promise<SpotifyApi.SingleTrackResponse> => {
  return authenticatedFetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: 'GET',
    ...options,
  }).then((d) => d.json());
};
