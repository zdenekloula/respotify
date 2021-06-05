import qs from 'qs';
import type { GraphQLQueryParameters } from '../types';

// There are much more fields in the response, but only those that are going to be used and needed are there
export type ArtistOverviewResponse = {
  data: {
    artist: {
      id: string;
      uri: string;
      profile: {
        verified: boolean;
      };
      visuals: {
        headerImage: {
          sources: {
            url: string;
            width: number;
            height: number;
          }[];
        } | null;
      };
      stats: {
        monthlyListeners: number;
      };
    };
  };
};

export const getArtistOverview = async ({
  hash,
  token,
  uri,
}: GraphQLQueryParameters): Promise<Response> => {
  const parameters = {
    operationName: 'queryArtistOverview',
    variables: JSON.stringify({
      uri: uri,
    }),
    extensions: JSON.stringify({
      persistedQuery: {
        version: 1,
        sha256Hash: hash,
      },
    }),
  };
  return fetch(`https://api-partner.spotify.com/pathfinder/v1/query?${qs.stringify(parameters)}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.28.0',
    },
  }).then((response) => response);
};
