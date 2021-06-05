/* eslint-disable import/no-default-export */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@/api/getAccessToken';
import { getPlaylistMetadata } from '@/api/getPlaylistMetadata';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const playlistId = String(request.query.id);
    const token = await getAccessToken();
    const metadataResponse = await getPlaylistMetadata(playlistId, token.accessToken);
    if (metadataResponse.status !== 200) {
      // Response with 200 as it doesn't matter if the response is empty and we don't throw error on FE
      response.status(200).json({});
      return;
    }
    const data = await metadataResponse.json();
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
}
