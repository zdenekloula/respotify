import qs from 'qs';
import { authenticatedFetch } from '@/api/common';

export const getRecentlyPlayedTracks = async (
  parameters: SpotifyApi.RecentlyPlayedParameterObject
): Promise<SpotifyApi.UsersRecentlyPlayedTracksResponse> => {
  return authenticatedFetch(
    `https://api.spotify.com/v1/me/player/recently-played?${qs.stringify(parameters)}`
  ).then((r) => r.json());
};
