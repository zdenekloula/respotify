import { authenticatedFetch } from '@/api/common';

export const getAlbum = async (id: string): Promise<SpotifyApi.SingleAlbumResponse> => {
  return authenticatedFetch(`https://api.spotify.com/v1/albums/${id}`).then((r) => r.json());
};
