import qs from 'qs';
import type { PagingParameters } from './types';
import { authenticatedFetch } from '@/api/common';

export const getNewReleases = async (
  parameters: PagingParameters
): Promise<SpotifyApi.ListOfNewReleasesResponse> => {
  return authenticatedFetch(
    `https://api.spotify.com/v1/browse/new-releases?${qs.stringify(parameters)}`
  ).then((r) => r.json());
};
