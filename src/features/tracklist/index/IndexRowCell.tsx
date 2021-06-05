import React from 'react';
import { Equaliser } from './Equaliser';
import { IconButton } from '@/components/button/IconButton';
import { Icon } from '@/components/icon';
import { styled } from '@/lib/stitches.config';

export type IndexRowCellProps = {
  index: number;
  isPlaying: boolean;

  uri: string;
  isCurrentSong: boolean;
  handlePlay?: (playOptions: SpotifyApi.PlayParameterObject, isCurrentSong: boolean) => void;
};

export const IndexRowCellContainer = styled('span', {
  gridColumn: 'index',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const IndexText = styled('span', {
  display: 'block',
});

export const IndexPlaybackControlButtonContainer = styled('span', {
  display: 'none',
});

export const IndexRowCell = ({
  index,
  isPlaying,
  uri,
  isCurrentSong,
  handlePlay,
}: IndexRowCellProps) => {
  return (
    <IndexRowCellContainer>
      <IndexText>{isPlaying ? <Equaliser /> : index + 1}</IndexText>
      <IndexPlaybackControlButtonContainer>
        <IconButton
          onClick={async (event) => {
            // Prevent the row to be "selected" when clicking on the play button
            event.stopPropagation();

            if (handlePlay) {
              handlePlay(
                {
                  context_uri: uri,
                  offset: {
                    position: index,
                  },
                },
                isCurrentSong
              );
            }
          }}
        >
          {isPlaying ? <Icon name="pause" /> : <Icon name="play" />}
        </IconButton>
      </IndexPlaybackControlButtonContainer>
    </IndexRowCellContainer>
  );
};
