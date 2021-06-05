import { MainTrackInfoRowCellContainer } from './MainTrackInfoRowCell';
import { Box } from '@/components/box';
import { SkeletonLine } from '@/components/skeleton/SkeletonLine';
import { SkeletonSquare } from '@/components/skeleton/SkeletonSquare';

export const MainTrackInfoRowCellSkeleton = () => {
  return (
    <MainTrackInfoRowCellContainer
      css={{
        display: 'flex',
        gap: '$spacing03',
      }}
    >
      <SkeletonSquare
        css={{
          flexShrink: 0,
        }}
      />
      <Box
        css={{
          display: 'flex',
          flexDirection: 'column',
          gap: '$spacing03',
        }}
      >
        <SkeletonLine
          css={{
            width: '132px',
          }}
        />
        <SkeletonLine
          css={{
            width: '120px',
          }}
        />
      </Box>
    </MainTrackInfoRowCellContainer>
  );
};
