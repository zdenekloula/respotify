/* eslint-disable import/no-default-export */
import chrome from 'chrome-aws-lambda';
import type { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer-core';
// import puppeteer from 'puppeteer';
import qs from 'qs';
import { ARTIST_OVERVIEW_QUERY_ID } from '@/api/constants';
import { isDevelopment } from '@/utils/isDevelopment';

type ArtistOverviewResponse = {
  'https://api-partner.spotify.com/pathfinder/v1/query?operationName': string;
  variables: string;
  extensions: string;
};

export default async function refreshQueryHashHandler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method !== 'POST') {
    response.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  if (!process.env.SUPABASE_API_KEY) {
    response.status(400).send({ message: 'Missing API key' });
    return;
  }

  const browser = await puppeteer.launch({
    args: chrome.args,
    executablePath: isDevelopment() ? '/usr/bin/google-chrome' : await chrome.executablePath,
    headless: isDevelopment() ? true : chrome.headless,
  });

  const page = await browser.newPage();

  await page.goto('https://open.spotify.com/artist/0gxyHStUsqpMadRV0Di1Qt');
  const queryArtistResponse = await page.waitForResponse((request) => {
    return request.url().includes('queryArtistOverview');
  });

  if (queryArtistResponse.ok()) {
    const url = queryArtistResponse.url();
    const queryString = qs.parse(url) as ArtistOverviewResponse;
    const hash = JSON.parse(queryString.extensions).persistedQuery.sha256Hash;

    const updateQuery = await fetch(
      `https://gbibjnflnyzpusuxuwxi.supabase.co/rest/v1/spotify_query_keys?id=eq.${ARTIST_OVERVIEW_QUERY_ID}`,
      {
        method: 'PATCH',
        headers: {
          Apikey: process.env.SUPABASE_API_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          hash,
        }),
      }
    )
      .then((response) => response)
      .then((response) => response.json());

    response.status(200).json({
      hash,
      updateQuery,
    });
  }

  await browser.close();
}
