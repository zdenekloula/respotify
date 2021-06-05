import { deviceTypeIcons, DeviceTypeValues } from './deviceIcons';

export function getDeviceTypeIcon(activeDevice: SpotifyApi.UserDevice | undefined) {
  return deviceTypeIcons[(activeDevice?.type.toLowerCase() as DeviceTypeValues) || 'unknown'];
}
