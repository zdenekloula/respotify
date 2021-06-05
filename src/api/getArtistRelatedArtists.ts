import { authenticatedFetch } from '@/api/common';

export const getArtistRelatedArtists = async (
  id: string
): Promise<SpotifyApi.ArtistsRelatedArtistsResponse> => {
  return authenticatedFetch(`https://api.spotify.com/v1/artists/${id}/related-artists`).then((r) =>
    r.json()
  );
};
