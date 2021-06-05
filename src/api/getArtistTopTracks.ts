import { authenticatedFetch } from '@/api/common';

export const getArtistTopTracks = async (
  id: string
): Promise<SpotifyApi.ArtistsTopTracksResponse> => {
  return authenticatedFetch(
    `https://api.spotify.com/v1/artists/${id}/top-tracks?market=from_token`
  ).then((r) => r.json());
};
