import React, { useRef } from 'react';
import { IconControlButton } from '../IconControlButton';
import { Icon } from '@/components/icon';

type Props = {
  volume: number;
  onChange: (value: number) => void;
};

const getVolumeIcon = (volume: number) => {
  const percentageVolume = Math.round(volume * 100);
  if (percentageVolume > 66) {
    return <Icon name="volume-high" />;
  }
  if (percentageVolume > 33) {
    return <Icon name="volume-medium" />;
  }
  if (percentageVolume > 0) {
    return <Icon name="volume-low" />;
  }
  if (percentageVolume === 0) {
    return <Icon name="volume-off" />;
  }
};

export const VolumeIcon = ({ volume = 0, onChange }: Props) => {
  const lastVolume = useRef<number>(0);

  const toggleMute = async () => {
    if (volume > 0) {
      lastVolume.current = volume;
      onChange(0);
      return;
    }
    onChange(lastVolume.current);
  };

  return <IconControlButton onClick={toggleMute}>{getVolumeIcon(volume)}</IconControlButton>;
};
