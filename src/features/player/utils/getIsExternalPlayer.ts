export const getIsExternalPlayer = (
  activeDevice: SpotifyApi.UserDevice | undefined,
  currentDeviceId: string | undefined | null
) => {
  const isCurrentDevice = activeDevice?.id === currentDeviceId;
  if (!activeDevice || isCurrentDevice) {
    return false;
  }

  return true;
};
