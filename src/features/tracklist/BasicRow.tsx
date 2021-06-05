/* eslint-disable @typescript-eslint/ban-types */
import React, { useRef } from 'react';
import type { Row as RowType } from 'react-table';
import { useClickAway, useToggle } from 'react-use';
import { AlbumCellContainer } from './album/AlbumRowCell';
import type { RequiredCellProps } from './columnTypes';
import {
  DurationAndControlsHeartButton,
  DurationAndControlsMenuMore,
} from './duration-and-controls/DurationAndControlsRowCell';
import { IndexPlaybackControlButtonContainer, IndexText } from './index/IndexRowCell';
import { TrackMeta, TrackMetaName } from './main-track-info/MainTrackInfoRowCell';
import { StyledButton } from '@/components/button';
import { Link } from '@/components/link';
import { styled } from '@/lib/stitches.config';
import { memo } from '@/utils/memo';

export const StyledTableRow = styled('div', {
  position: 'relative',
  border: '1px solid transparent',
  borderRadius: '$base',
  height: '56px',
  gridGap: '$spacing05',
  display: 'grid',
  padding: '0 $spacing05',
  userSelect: 'none',

  '&:hover': {
    background: '$tracklistRowHoverBackground',
    [`${IndexPlaybackControlButtonContainer}`]: {
      display: 'block',
      [`${StyledButton}`]: {
        color: '$textBase',
      },
    },
    [`${TrackMeta} ${Link},
      ${AlbumCellContainer} ${Link}
    `]: {
      color: '$textBase',
    },

    [`${IndexText}`]: {
      display: 'none',
    },

    [`${DurationAndControlsHeartButton}, ${DurationAndControlsMenuMore}`]: {
      opacity: '1',
    },
  },

  variants: {
    isCurrentSong: {
      true: {
        [`${IndexText}, ${TrackMetaName}`]: {
          color: '$primaryBase',
        },
        [`&:hover`]: {
          [`${IndexText}, ${TrackMetaName}`]: {
            color: '$primaryHighlight',
          },
        },
      },
    },
    isSelected: {
      true: {
        background: '$tracklistRowSelectedBackground',
        [`${IndexPlaybackControlButtonContainer}`]: {
          display: 'block',
          [`${StyledButton}`]: {
            color: '$textBase',
          },
        },
        [`${IndexText}`]: {
          display: 'none',
        },
        [`${TrackMeta} ${Link},
          ${AlbumCellContainer} ${Link}
        `]: {
          color: '$textBase',
        },
        ['&:hover']: {
          background: '$tracklistRowSelectedBackground',
        },
      },
    },
  },
});

type RowProps<T extends object> = {
  row: RowType<T>;
} & RequiredCellProps;

function hasIndexSpecified<T extends object>(item: T): item is T & { index: number } {
  return 'index' in item;
}

function RowInner<T extends object>({ row, ...otherProps }: RowProps<T>) {
  const [isSelected, toggleSelected] = useToggle(false);
  const rowRef = useRef(null);

  useClickAway<MouseEvent>(rowRef, () => {
    toggleSelected(false);
  });

  const { isCurrentSong, handlePlay, uri } = otherProps;

  const index = hasIndexSpecified(row.original) ? row.original.index : row.index;

  return (
    <StyledTableRow
      ref={rowRef}
      isCurrentSong={isCurrentSong}
      isSelected={isSelected}
      onClick={() => {
        toggleSelected();
      }}
      onDoubleClick={async () => {
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
      {row.cells.map((cell) => {
        return (
          // eslint-disable-next-line react/jsx-key
          cell.render('Cell', {
            ...cell.getCellProps(),
            ...otherProps,
          })
        );
      })}
    </StyledTableRow>
  );
}

const TableRow = memo(RowInner);
TableRow.displayName = 'TableRow';

export { TableRow };
