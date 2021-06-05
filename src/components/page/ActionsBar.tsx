import React, { useCallback } from 'react';
import { Button } from '@/components/button';
import { IconButton } from '@/components/button/IconButton';
import { Icon, IconContainer } from '@/components/icon';
import { usePlayerControls } from '@/features/player/hooks/usePlayerControls';
import { selectContext, selectIsPlaying } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const PageActionsBarWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  paddingInline: '$spacing05',
  paddingBlock: '$spacing06',

  '@bp3': {
    paddingInline: '$spacing07',
  },
});

type Props = {
  uri: string;
  enableFollowButton?: boolean;
  enableLikeButton?: boolean;
  enablePlayButton?: boolean;
};

export const PageActionsBar = ({
  uri,
  enableFollowButton,
  enableLikeButton,
  enablePlayButton = true,
}: Props) => {
  const { handlePlay, handlePlaySong } = usePlayerControls();
  const context = useAppSelector(selectContext);
  const isPlaying = useAppSelector(selectIsPlaying);
  const isCurrentPlaylistPlaying = context?.uri === uri && isPlaying;

  const handleContextPlay = useCallback(() => {
    if (context?.uri === uri) {
      return handlePlay();
    }
    return handlePlaySong({ context_uri: uri });
  }, [context, handlePlaySong, handlePlay, uri]);
  return (
    <PageActionsBarWrapper>
      {enablePlayButton ? (
        <IconButton
          variant="primary"
          disableTransform={false}
          onClick={handleContextPlay}
          css={{
            width: '56px',
            height: '56px',
            marginInlineEnd: '$spacing07',
            [`${IconContainer}`]: {
              width: '22px',
              height: '22px',
            },
          }}
        >
          {isCurrentPlaylistPlaying ? <Icon name="pause" /> : <Icon name="play" />}
        </IconButton>
      ) : null}
      {enableLikeButton ? (
        <IconButton
          variant="tertiarySubtle"
          size="large"
          css={{
            width: 'inherit',
            height: 'inherit',
            marginInlineEnd: '$spacing06',
            [`${IconContainer}`]: {
              width: '32px',
              height: '32px',
            },
          }}
          disabled
        >
          <Icon name="heart-unknown" />
        </IconButton>
      ) : null}
      {enableFollowButton ? (
        <Button
          size="small"
          variant="tertiary"
          radius="base"
          disableTransform
          css={{
            marginInlineEnd: '$spacing06',
          }}
        >
          Follow
        </Button>
      ) : null}
      <IconButton
        variant="tertiarySubtle"
        size="medium"
        css={{
          width: '32px',
          height: '32px',
          [`${IconContainer}`]: {
            width: '24px',
            height: '24px',
          },
        }}
      >
        <Icon name="kebab-menu" />
      </IconButton>
    </PageActionsBarWrapper>
  );
};
