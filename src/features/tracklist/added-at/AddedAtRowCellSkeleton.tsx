import { AddedAtContainer } from './AddedAtRowCell';
import { SkeletonLine } from '@/components/skeleton/SkeletonLine';

export const AddedAtCellSkeleton = () => {
  return (
    <AddedAtContainer
      as="span"
      css={{
        display: 'grid',
      }}
    >
      <SkeletonLine />
    </AddedAtContainer>
  );
};
