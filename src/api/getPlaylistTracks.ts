import qs from 'qs';
import type { PagingParameters } from './types';
import { authenticatedFetch } from '@/api/common';

export const getPlaylistTracks = async (
  id: string | Array<string> | undefined,
  parameters: PagingParameters
): Promise<SpotifyApi.PlaylistTrackResponse> => {
  return authenticatedFetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks?${qs.stringify(parameters)}`
  ).then((r) => r.json());
};
