import React from 'react';
import { useIsPlayerReady } from '../hooks/useIsPlayerReady';
import { usePlayerControls } from '../hooks/usePlayerControls';
import { selectRepeatMode } from '../playerSlice';
import { IconControlButton } from './IconControlButton';
import { Icon } from '@/components/icon';
import { useAppSelector } from '@/hooks/redux';

type RepeatMode = SpotifyApi.PlaybackObject['repeat_state'];

const getNewRepeatMode = (repeatMode: RepeatMode) => {
  switch (repeatMode) {
    case 'off': {
      return 'context';
    }
    case 'context': {
      return 'track';
    }
    case 'track': {
      return 'off';
    }
    default: {
      return 'off';
    }
  }
};

const RepeatModeButton = () => {
  const isPlayerReady = useIsPlayerReady();
  const { setRepeatMode } = usePlayerControls();
  const repeatMode = useAppSelector(selectRepeatMode);

  const handleRepeatModeButton = async () => {
    const newRepeatMode = getNewRepeatMode(repeatMode);
    setRepeatMode(newRepeatMode);
  };

  const isActive = repeatMode !== 'off';
  const isTrackMode = repeatMode === 'track';

  return (
    <div>
      <IconControlButton
        onClick={handleRepeatModeButton}
        disabled={!isPlayerReady}
        isActive={isActive}
        showActiveDot
      >
        {isTrackMode ? <Icon name="repeat-track" /> : <Icon name="repeat" />}
      </IconControlButton>
    </div>
  );
};

export { RepeatModeButton };
