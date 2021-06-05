import React from 'react';
import { styled } from '@/lib/stitches.config';

const StyledEqualiser = styled('div', {
  display: 'block',
  width: '14px',
  height: '14px',
  img: {
    width: '100%',
    height: '100%',
  },
});

export const Equaliser = () => {
  return (
    <StyledEqualiser>
      {/* NO */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/equaliser-animated-green.gif" alt="equaliser" />
    </StyledEqualiser>
  );
};
