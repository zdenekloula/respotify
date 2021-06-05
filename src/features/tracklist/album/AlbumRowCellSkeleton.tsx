import React from 'react';
import { AlbumCellContainer } from './AlbumRowCell';
import { SkeletonLine } from '@/components/skeleton/SkeletonLine';

export const AlbumRowCellSkeleton = () => {
  return (
    <AlbumCellContainer
      css={{
        display: 'grid',
      }}
    >
      <SkeletonLine />
    </AlbumCellContainer>
  );
};
