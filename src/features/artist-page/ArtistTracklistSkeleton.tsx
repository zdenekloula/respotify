import React from 'react';
import {
  MainTrackInfoRowCellSkeleton,
  IndexRowCellSkeleton,
  DurationAndControlsRowCellSkeleton,
  StyledTableRow,
} from '@/features/tracklist';
import { styled } from '@/lib/stitches.config';

const ArtistTRacklistSkeletonContainer = styled(StyledTableRow, {
  pointerEvents: 'none',
});

export const ArtistTracklistSkeleton = () => {
  return (
    <>
      {Array.from({ length: 5 })
        .fill(null)
        .map((_, index) => {
          return (
            <ArtistTRacklistSkeletonContainer key={index}>
              <IndexRowCellSkeleton />
              <MainTrackInfoRowCellSkeleton />
              <DurationAndControlsRowCellSkeleton />
            </ArtistTRacklistSkeletonContainer>
          );
        })}
    </>
  );
};
