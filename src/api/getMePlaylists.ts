import qs from 'qs';
import { authenticatedFetch } from '@/api/common';

export type ListOfCurrentUsersPlaylistsParameters = {
  limit?: number;
  offset?: number;
};

export const getMePlaylists = async (
  parameters: ListOfCurrentUsersPlaylistsParameters
): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse> => {
  return authenticatedFetch(
    `https://api.spotify.com/v1/me/playlists?${qs.stringify(parameters)}`
  ).then((r) => r.json());
};
