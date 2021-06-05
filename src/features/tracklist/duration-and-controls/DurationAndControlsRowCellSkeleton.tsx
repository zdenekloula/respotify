import { DurationAndControlsContainer } from './DurationAndControlsRowCell';
import { SkeletonLine } from '@/components/skeleton/SkeletonLine';

export const DurationAndControlsRowCellSkeleton = () => {
  return (
    <DurationAndControlsContainer
      css={{
        display: 'grid',
        paddingRight: '$spacing07',
      }}
    >
      <SkeletonLine
        css={{
          width: '42px',
        }}
      />
    </DurationAndControlsContainer>
  );
};
