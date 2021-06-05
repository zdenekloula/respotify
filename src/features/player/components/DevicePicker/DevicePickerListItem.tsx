import { setPlaybackDevice } from '../../api';
import { usePlayerControls } from '../../hooks/usePlayerControls';
import { selectIsPlaying } from '../../playerSlice';
import { getDeviceTypeIcon } from './getDeviceTypeIcon';
import { Box } from '@/components/box';
import { StyledBaseButton } from '@/components/button/BaseButton';
import { IconContainer } from '@/components/icon';
import { Text } from '@/components/text';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const StyledDevicePickerListItem = styled(StyledBaseButton, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  padding: '$spacing04 $spacing05',
  width: '100%',
  justifyContent: 'start',
  color: '$textBase',
  '&:hover': {
    background: '$gray6',
  },
  variants: {
    isActive: {
      true: {
        color: '$primaryBase',
      },
    },
  },
});

const DeviceIcon = styled('div', {
  paddingInlineEnd: '$spacing05',
  [`${IconContainer}`]: {
    width: 32,
    height: 32,
  },
});

const DeviceMeta = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  textAlign: 'left',
});

type Props = {
  device: SpotifyApi.UserDevice;
  isActive: boolean;
  isCurrentDevice: boolean;
  onDeviceSet: () => void;
};

const getDeviceTitle = (
  device: SpotifyApi.UserDevice,
  isCurrentDevice: boolean,
  isActive: boolean
) => {
  if (isActive) {
    return 'Listening On';
  }
  if (isCurrentDevice) {
    return 'This Computer';
  }

  return device.name;
};

const getDeviceSubTitle = (
  device: SpotifyApi.UserDevice,
  isCurrentDevice: boolean,
  isActive: boolean
) => {
  if (isActive && isCurrentDevice) {
    return 'This computer';
  }
  if (isActive) {
    return device.name;
  }

  return 'Spotify connect';
};

export const DevicePickerListItem = ({ device, isActive, isCurrentDevice, onDeviceSet }: Props) => {
  const deviceIcon = getDeviceTypeIcon(device);
  const isPlaying = useAppSelector(selectIsPlaying);
  const { syncDevices } = usePlayerControls();
  return (
    <StyledDevicePickerListItem
      isActive={isActive}
      onClick={async () => {
        if (device.id) {
          await setPlaybackDevice(device.id, isPlaying);
          await syncDevices();
          onDeviceSet();
        }
      }}
    >
      <DeviceIcon>{deviceIcon}</DeviceIcon>
      <DeviceMeta>
        <Box
          css={{
            paddingBlockEnd: '$spacing02',
          }}
        >
          <Text size="small" weight="bold">
            {getDeviceTitle(device, isCurrentDevice, isActive)}
          </Text>
        </Box>
        <Text size="extraSmall" color={isActive ? 'currentColor' : 'subdued'}>
          {getDeviceSubTitle(device, isCurrentDevice, isActive)}
        </Text>
      </DeviceMeta>
    </StyledDevicePickerListItem>
  );
};
