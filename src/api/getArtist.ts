import { authenticatedFetch } from '@/api/common';

export const getArtist = async (id: string): Promise<SpotifyApi.SingleArtistResponse> => {
  return authenticatedFetch(`https://api.spotify.com/v1/artists/${id}`).then((r) => r.json());
};
