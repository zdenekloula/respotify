import type { devicesTypes } from './deviceTypes';
import { Icon } from '@/components/icon';

export type DeviceTypeValues = typeof devicesTypes[keyof typeof devicesTypes];
export type DeviceTypeIcons = {
  [key in DeviceTypeValues]: React.ReactElement;
};

export const deviceTypeIcons: DeviceTypeIcons = {
  computer: <Icon name="computer" />,
  game_console: <Icon name="game-console" />,
  smartphone: <Icon name="smartphone" />,
  smartwatch: <Icon name="smartwatch" />,
  tablet: <Icon name="tablet" />,
  tv: <Icon name="tv" />,
  unknown: <Icon name="generic-device" />,
};
