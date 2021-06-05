import React from 'react';
import { DevicePicker } from './DevicePicker/DevicePicker';
import { IconControlButton } from './IconControlButton';
import { VolumeBarContainer } from './VolumeBar/VolumeBarContainer';
import { Icon } from '@/components/icon';
import {} from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const ExtraControlsWrapper = styled('div', {
  display: 'flex',
  minWidth: '180px',
  width: '30%',
  justifyContent: 'flex-end',
});

const ExtraControls = () => {
  return (
    <ExtraControlsWrapper>
      <DevicePicker />
      <VolumeBarContainer />

      <IconControlButton disabled>
        <Icon name="fullscreen" />
      </IconControlButton>
    </ExtraControlsWrapper>
  );
};

export { ExtraControls };
