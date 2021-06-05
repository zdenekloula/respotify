import React from 'react';
import { VolumeBar } from './VolumeBar';
import { VolumeIcon } from './VolumeIcon';
import { usePlayerControls } from '@/features/player/hooks/usePlayerControls';
import { selectVolume } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const StyledVolumeBarContainer = styled('div', {
  display: 'flex',
  flex: '0 1 125px',
  alignItems: 'center',
});

const VolumeBarContainer = () => {
  const { handlePlayerVolume } = usePlayerControls();

  const volume = useAppSelector(selectVolume);

  return (
    <StyledVolumeBarContainer>
      <VolumeIcon volume={volume} onChange={handlePlayerVolume} />
      <VolumeBar volume={volume} onChange={handlePlayerVolume} />
    </StyledVolumeBarContainer>
  );
};

export { VolumeBarContainer };
