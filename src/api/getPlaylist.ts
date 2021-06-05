import qs from 'qs';
import { authenticatedFetch } from '@/api/common';

export const getPlaylist = async (
  id: string | Array<string> | undefined
): Promise<SpotifyApi.SinglePlaylistResponse> => {
  const parameters = {};
  return authenticatedFetch(
    `https://api.spotify.com/v1/playlists/${id}?${qs.stringify(parameters)}`
  ).then((r) => r.json());
};
