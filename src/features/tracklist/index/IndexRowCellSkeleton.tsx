import { IndexRowCellContainer } from './IndexRowCell';
import { SkeletonSquare } from '@/components/skeleton/SkeletonSquare';

export const IndexRowCellSkeleton = () => {
  return (
    <IndexRowCellContainer>
      <SkeletonSquare
        css={{
          width: '16px',
          height: '16px',
        }}
      />
    </IndexRowCellContainer>
  );
};
