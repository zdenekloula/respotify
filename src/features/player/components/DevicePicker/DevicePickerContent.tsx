import { sortBy } from 'lodash-es';
import { DevicePickerListItem } from './DevicePickerListItem';
import { Heading } from '@/components/heading';
import { selectCurrentDeviceId } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

type DevicePickerContentProps = {
  devices: Array<SpotifyApi.UserDevice>;
  closeDevicePicker: () => void;
};

const DevicePickerList = styled('ul', {});
const DevicePickerImageContainer = styled('div', {
  textAlign: 'center',
  paddingBlock: '$spacing05',
  img: {
    width: 180,
  },
});
const DevicePickerTitleContainer = styled('div', {
  padding: '$spacing05',
  textAlign: 'center',
});

export const DevicePickerContent = ({ devices, closeDevicePicker }: DevicePickerContentProps) => {
  const currentDeviceId = useAppSelector(selectCurrentDeviceId);
  const currentDeviceFirstDevices = sortBy(devices, (device) => device.id !== currentDeviceId);
  return (
    <>
      <DevicePickerTitleContainer>
        <Heading type="heading04" weight="bold">
          Connect to a device
        </Heading>
      </DevicePickerTitleContainer>
      <DevicePickerImageContainer>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/connect_header.png" alt="Existing audio devices" />
      </DevicePickerImageContainer>
      <DevicePickerList>
        {currentDeviceFirstDevices.map((device) => {
          const isCurrentDevice = device.id === currentDeviceId;
          return (
            <DevicePickerListItem
              key={device.id}
              device={device}
              isActive={device.is_active}
              isCurrentDevice={isCurrentDevice}
              onDeviceSet={() => {
                closeDevicePicker();
              }}
            />
          );
        })}
      </DevicePickerList>
    </>
  );
};
