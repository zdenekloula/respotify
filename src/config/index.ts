export const API_URL = 'https://api.spotify.com/v1';

// Spotify auth settings
export const SPOTIFY_AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
export const CLIENT_ID = '534093feac60465ebbf2ea88960383fc';
export const AUTH_SCOPES = [
  //Listening History
  'user-read-recently-played',
  'user-top-read',
  'user-read-playback-position',
  //Spotify Connect
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  //Playback - For SDK Playback //https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
  'streaming',
  //Playlists
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  //Library
  'user-library-modify',
  'user-library-read',
  //Users - For SDK Playback //https://developer.spotify.com/documentation/web-playback-sdk/quick-start/
  'user-read-email',
  'user-read-private',
];
export const SPOTIFY_ACCESS_PARAMS_KEY = 'rs-spotify-access-params';
export const SPOTIFY_ACCESS_TOKEN_KEY = 'rs-access-token';
