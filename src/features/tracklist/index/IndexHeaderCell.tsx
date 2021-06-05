import React from 'react';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';

const IndexHeaderCellContainer = styled('div', {
  justifySelf: 'flex-end',
});

export const IndexHeaderCell = () => {
  return (
    <IndexHeaderCellContainer>
      <Text size="small">#</Text>
    </IndexHeaderCellContainer>
  );
};
