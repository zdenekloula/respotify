import { Box } from '../box';
import { styled } from '@/lib/stitches.config';

export const SkeletonSquare = styled(Box, {
  width: '40px',
  height: '40px',
  background: '$skeletonBackground',
});
