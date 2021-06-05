import React from 'react';
import { Box } from '@/components/box';
import { IconButton } from '@/components/button/IconButton';
import { Icon, IconContainer } from '@/components/icon';
import { styled } from '@/lib/stitches.config';

const IconWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: '0',
  paddingInlineStart: '$spacing03',

  [`${IconContainer}`]: {
    width: '12px',
    height: '12px',
  },

  [`[data-pause-icon]`]: {
    display: 'none',
  },

  '&:hover': {
    [`[data-volume-icon]`]: {
      display: 'none',
    },
    [`[data-pause-icon]`]: {
      display: 'block',
      color: '$textBase',
    },
  },
});

type Props = {
  onPlayClick: () => void;
};

export const NavbatPlaylistPlayingIndicator = ({ onPlayClick }: Props) => {
  return (
    <IconWrapper>
      <Box as="span" data-volume-icon>
        <IconButton onClick={() => {}}>
          <Icon name="volume-high" />
        </IconButton>
      </Box>
      <Box as="span" data-pause-icon>
        <IconButton onClick={onPlayClick}>
          <Icon name="pause" />
        </IconButton>
      </Box>
    </IconWrapper>
  );
};
