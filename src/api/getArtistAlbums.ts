import { authenticatedFetch } from '@/api/common';

export const getArtistAlbums = async (id: string): Promise<SpotifyApi.ArtistsAlbumsResponse> => {
  return authenticatedFetch(`https://api.spotify.com/v1/artists/${id}/albums`).then((r) =>
    r.json()
  );
};
