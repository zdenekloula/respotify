export const getActiveDevice = (devices: Array<SpotifyApi.UserDevice> | undefined) => {
  return devices?.find((device) => device.is_active === true);
};
