/* eslint-disable import/no-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@/api/getAccessToken';
import { getArtistQueryHash } from '@/api/getArtistQueryHash';
import { ArtistOverviewResponse, getArtistOverview } from '@/api/graphql/artistOverviewQuery';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const artistId = request.query.id;
  if (!artistId) {
    return response.status(400).json({
      message: 'Missing artist id',
    });
  }
  try {
    const artistId = String(request.query.id);

    const token = await getAccessToken();
    const artistQueryHash = await getArtistQueryHash();
    const artistOverviewResponse = await getArtistOverview({
      token: token.accessToken,
      hash: artistQueryHash[0].hash,
      uri: `spotify:artist:${artistId}`,
    });

    if (artistOverviewResponse.status !== 200) {
      // Response with 200 as it doesn't matter if the response is empty and we don't throw error on FE
      response.status(200).json({});
      return;
    }
    const artistOverview: ArtistOverviewResponse = await artistOverviewResponse.json();
    const { id, uri, profile, stats, visuals } = artistOverview.data.artist;

    // Let's return only needed fields
    response.status(200).json({
      id,
      uri,
      profile: {
        verified: profile.verified,
      },
      visuals: {
        headerImage: visuals.headerImage,
      },
      stats: {
        monthlyListeners: stats.monthlyListeners,
      },
    });
  } catch (error) {
    response.status(400).json(error);
  }
}
