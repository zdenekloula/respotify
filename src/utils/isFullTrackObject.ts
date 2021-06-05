export const isFullTrackObject = (
  track: SpotifyApi.TrackObjectSimplified | SpotifyApi.TrackObjectFull
): track is SpotifyApi.TrackObjectFull => {
  return (track as SpotifyApi.TrackObjectFull).album !== undefined;
};
