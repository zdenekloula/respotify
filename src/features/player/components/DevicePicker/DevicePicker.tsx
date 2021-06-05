import { dequal } from 'dequal';
import { useState } from 'react';
import { IconControlButton } from '../IconControlButton';
import { DevicePickerContent } from './DevicePickerContent';
import { getDeviceTypeIcon } from './getDeviceTypeIcon';
import { Icon } from '@/components/icon';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@/components/popover';
import { ScrollArea } from '@/components/scrollarea';
import { selectDevices, selectIsExternalPlayer } from '@/features/player/playerSlice';
import { getActiveDevice } from '@/features/player/utils';
import { useAppSelector } from '@/hooks/redux';

export const DevicePicker = () => {
  const [isDevicePickerOpened, setIsDevicePickerOpened] = useState(false);
  const isExternalPlayer = useAppSelector(selectIsExternalPlayer);
  const devices = useAppSelector(selectDevices, dequal);
  const activeDevice = getActiveDevice(devices);
  const deviceTypeIcon = getDeviceTypeIcon(activeDevice);
  const deviceIcon = isExternalPlayer ? deviceTypeIcon : <Icon name="generic-device" />;

  return (
    <Popover
      open={isDevicePickerOpened}
      onOpenChange={(open) => {
        setIsDevicePickerOpened(open);
      }}
    >
      <PopoverTrigger asChild>
        <IconControlButton isActive={isExternalPlayer}>{deviceIcon}</IconControlButton>
      </PopoverTrigger>
      <PopoverContent>
        <ScrollArea forceVerticalOnly>
          <DevicePickerContent
            devices={devices}
            closeDevicePicker={() => setIsDevicePickerOpened(false)}
          />
        </ScrollArea>

        <PopoverArrow width={20} height={10} />
      </PopoverContent>
    </Popover>
  );
};
