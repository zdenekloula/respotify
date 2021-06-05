import { Box } from '../box';
import { styled } from '@/lib/stitches.config';

export const SkeletonLine = styled(Box, {
  width: '115px',
  height: '11px',
  background: '$skeletonBackground',
  borderRadius: '4px',
});
