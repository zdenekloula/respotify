import { ARTIST_OVERVIEW_QUERY_ID } from './constants';

const key = '';
type QueryHash = {
  id: string;
  hash: string;
};
type QueryHashResponse = Array<QueryHash>;

export const getArtistQueryHash = async (): Promise<QueryHashResponse> => {
  return fetch(
    `https://gbibjnflnyzpusuxuwxi.supabase.co/rest/v1/spotify_query_keys?id=eq.${ARTIST_OVERVIEW_QUERY_ID}`,
    {
      method: 'GET',
      headers: {
        Apikey: key,
        Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => response.json());
};
