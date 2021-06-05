import { getActiveDevice } from '../utils';
import { setPlaybackDevice } from '.';
import { authenticatedFetch } from '@/api/common';

const getPlayBody = ({
  context_uri,
  offset,
  uris,
  position_ms,
  device_id,
}: SpotifyApi.PlayParameterObject) => {
  if (context_uri) {
    return {
      context_uri,
      offset,
      position_ms,
      device_id,
    };
  }
  return {
    uris,
    offset,
    position_ms,
    device_id,
  };
};

/*
  If we want to play a track from playlist, we need to pass the context_uri and offset.
  Context_uri is the uri of the playlist and the offset is the index of the song in the playlist
*/
type PlayParameters = {
  playOptions: SpotifyApi.PlayParameterObject;
  devices: Array<SpotifyApi.UserDevice> | undefined;
  currentDeviceId: string | undefined;
};

export async function play({ playOptions, devices, currentDeviceId }: PlayParameters) {
  const { context_uri, device_id, offset, position_ms, uris } = playOptions;
  const activeDevice = getActiveDevice(devices);
  if (!activeDevice && currentDeviceId) {
    await setPlaybackDevice(currentDeviceId);
  }
  return authenticatedFetch(`https://api.spotify.com/v1/me/player/play`, {
    method: 'PUT',
    body: JSON.stringify(
      getPlayBody({
        context_uri,
        device_id,
        offset,
        position_ms,
        uris,
      })
    ),
  });
}
