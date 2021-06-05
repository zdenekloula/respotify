import qs from 'qs';
import type { PagingParameters } from './types';
import { authenticatedFetch } from '@/api/common';

export const getFeaturedPlaylists = async (
  parameters: PagingParameters
): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse> => {
  return authenticatedFetch(
    `https://api.spotify.com/v1/browse/featured-playlists?${qs.stringify(parameters)}`
  ).then((r) => r.json());
};
