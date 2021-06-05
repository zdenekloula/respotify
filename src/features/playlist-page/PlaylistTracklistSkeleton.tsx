import React from 'react';
import {
  MainTrackInfoRowCellSkeleton,
  IndexRowCellSkeleton,
  DurationAndControlsRowCellSkeleton,
  StyledTableRow,
  AddedAtCellSkeleton,
  AlbumRowCellSkeleton,
} from '@/features/tracklist';
import { styled } from '@/lib/stitches.config';

const PlaylistTracklistSkeletonContainer = styled(StyledTableRow, {
  pointerEvents: 'none',
});

export const PlaylistTracklistSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 })
        .fill(null)
        .map((_, index) => {
          return (
            <PlaylistTracklistSkeletonContainer key={index}>
              <IndexRowCellSkeleton />
              <MainTrackInfoRowCellSkeleton />
              <AlbumRowCellSkeleton />
              <AddedAtCellSkeleton />
              <DurationAndControlsRowCellSkeleton />
            </PlaylistTracklistSkeletonContainer>
          );
        })}
    </>
  );
};
