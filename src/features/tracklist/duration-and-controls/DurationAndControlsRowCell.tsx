import React from 'react';
import { StyledBaseButton } from '@/components/button/BaseButton';
import { IconButton } from '@/components/button/IconButton';
import { Icon } from '@/components/icon';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';
import { msToTime } from '@/utils/formatMsToTime';

export type DurationAndControlsRowCellProps = {
  duration: SpotifyApi.TrackObjectFull['duration_ms'];
};

export const DurationAndControlsContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gridColumn: 'durationAndControls',
});

export const DurationAndControlsHeartButton = styled('div', {
  opacity: '0',
});

export const DurationAndControlsMenuMore = styled('div', {
  opacity: '0',
  [`${StyledBaseButton}`]: {
    color: '$textBase',
  },
});

export const DurationAndControlsRowCell = ({ duration }: DurationAndControlsRowCellProps) => {
  return (
    <DurationAndControlsContainer>
      <DurationAndControlsHeartButton>
        <IconButton
          size="none"
          css={{
            marginRight: '$spacing05',
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
          disabled
        >
          <Icon name="heart-unknown" />
        </IconButton>
      </DurationAndControlsHeartButton>
      <Text
        color="subdued"
        size="small"
        css={{
          marginRight: '$spacing05',
        }}
      >
        {msToTime(duration)}
      </Text>
      <DurationAndControlsMenuMore>
        <IconButton
          size="none"
          variant="tertiarySubtle"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <Icon name="kebab-menu" />
        </IconButton>
      </DurationAndControlsMenuMore>
    </DurationAndControlsContainer>
  );
};
