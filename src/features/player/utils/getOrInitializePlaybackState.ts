import { getPlaybackState, setPlaybackDevice } from '../api';

// Think about better solution
export const getOrInitializePlaybackState = async (deviceId: string) => {
  const playbackState = await getPlaybackState();
  if (playbackState) {
    return playbackState;
  }

  await setPlaybackDevice(deviceId);
  return await getPlaybackState();
};
