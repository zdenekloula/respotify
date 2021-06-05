import React from 'react';
import { Icon, IconContainer } from '@/components/icon';
import { styled } from '@/lib/stitches.config';

const CellIconContainer = styled('div', {
  marginInlineEnd: '$spacing07',
  justifySelf: 'flex-end',
  [`${IconContainer}`]: {
    width: 16,
    height: 16,
  },
});

export const DurationAndControlsHeaderCell = () => {
  return (
    <CellIconContainer>
      <Icon name="clock" />
    </CellIconContainer>
  );
};
