import React from 'react';
import { PlaybackBar } from './PlaybackBar';
import { usePlayerControls } from '@/features/player/hooks/usePlayerControls';
import { selectCurrentTrack, selectPosition } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';

const PlaybackBarContainer = () => {
  const { setPosition } = usePlayerControls();
  const currentTrack = useAppSelector(selectCurrentTrack);
  const position = useAppSelector(selectPosition);

  const handlePositionChange = async (position: number) => {
    setPosition(position);
  };

  return (
    <PlaybackBar
      disabled={!currentTrack}
      position={position}
      durationMs={currentTrack?.duration_ms}
      onChange={handlePositionChange}
    />
  );
};

export { PlaybackBarContainer };
