import React, { useCallback } from 'react';
import { IconButton } from '../button/IconButton';
import { Icon, IconContainer } from '../icon';
import { usePlayerControls } from '@/features/player/hooks/usePlayerControls';
import { styled } from '@/lib/stitches.config';

export const CardPlayButtonContainer = styled('div', {
  position: 'absolute',
  right: '8px',
  bottom: '8px',
  opacity: 0,
  pointerEvents: 'none',
  transform: 'translateY(8px)',
  borderRadius: '500px',
  boxShadow: '0 8px 8px rgba(0, 0, 0, 0.3)',
  transition: 'all .3s ease',
  zIndex: 2,
  variants: {
    isVisible: {
      true: {
        pointerEvents: 'all',
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },
});

type Props = {
  uri: string;
  isPlaying: boolean;
  currentContextUri: string | undefined;
};

export const CardPlayButton = ({ uri, isPlaying, currentContextUri }: Props) => {
  const { handlePlay, handlePlaySong } = usePlayerControls();

  const handlePlayButton = useCallback(async () => {
    const isTrack = uri.includes('track');
    if (isTrack) {
      if (isPlaying) {
        return handlePlay();
      }
      return handlePlaySong({ uris: [uri] });
    }

    if (currentContextUri === uri) {
      return handlePlay();
    }
    return handlePlaySong({ context_uri: uri });
  }, [handlePlay, handlePlaySong, currentContextUri, uri, isPlaying]);

  return (
    <CardPlayButtonContainer isVisible={isPlaying}>
      <IconButton
        variant="primary"
        disableTransform={false}
        onClick={(event) => {
          // Prevent link from opening
          event.preventDefault();
          handlePlayButton();
        }}
        css={{
          width: '48px',
          height: '48px',
          [`${IconContainer}`]: {
            width: '20px',
            height: '20px',
          },
        }}
      >
        {isPlaying ? <Icon name="pause" /> : <Icon name="play" />}
      </IconButton>
    </CardPlayButtonContainer>
  );
};
