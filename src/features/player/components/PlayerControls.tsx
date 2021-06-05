import React from 'react';
import { useIsPlayerReady } from '../hooks/useIsPlayerReady';
import { usePlayerControls } from '../hooks/usePlayerControls';
import { selectIsPlaying, selectShuffle } from '../playerSlice';
import { IconControlButton } from './IconControlButton';
import { PlaybackBarContainer as PlaybackBar } from './PlaybackBar/PlaybackBarContainer';
import { RepeatModeButton } from './RepeatModeButton';
import { Box } from '@/components/box';
import { IconButton } from '@/components/button/IconButton';
import { Flex } from '@/components/flex';
import { Icon } from '@/components/icon';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const PlayerControlsWrapper = styled('div', {
  diplay: 'flex',
  maxWidth: '722px',
  width: ' 40%',
});

const PlayerControls = () => {
  const isPlaying = useAppSelector(selectIsPlaying);
  const shuffle = useAppSelector(selectShuffle);

  const isPlayerReady = useIsPlayerReady();

  const { handlePrevious, handleNext, handlePlay, setShuffle } = usePlayerControls();

  const handleShuffleToggle = async () => {
    const newShuffleState = !shuffle;
    setShuffle(newShuffleState);
  };

  return (
    <PlayerControlsWrapper>
      <Flex
        css={{
          gap: '$spacing05',
          paddingBottom: '$spacing03',
        }}
        justify="center"
      >
        <Flex
          css={{
            gap: '$spacing03',
          }}
        >
          <IconControlButton
            onClick={handleShuffleToggle}
            disabled={!isPlayerReady}
            isActive={shuffle}
            showActiveDot
          >
            <Icon name="shuffle" />
          </IconControlButton>
          <IconControlButton onClick={handlePrevious} disabled={!isPlayerReady}>
            <Icon name="previous" />
          </IconControlButton>
        </Flex>
        <Box>
          <IconButton
            disableTransform={false}
            variant="secondary"
            onClick={() => handlePlay()}
            disabled={!isPlayerReady}
          >
            {isPlaying ? <Icon name="pause" /> : <Icon name="play" />}
          </IconButton>
        </Box>
        <Flex
          css={{
            gap: '$spacing03',
          }}
        >
          <IconControlButton onClick={handleNext} disabled={!isPlayerReady}>
            <Icon name="next" />
          </IconControlButton>
          <RepeatModeButton />
        </Flex>
      </Flex>
      <PlaybackBar />
    </PlayerControlsWrapper>
  );
};

export { PlayerControls };
