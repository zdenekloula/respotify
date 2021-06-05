import React from 'react';
import { styled } from '@/lib/stitches.config';

const TopbarWrapper = styled('div', {
  display: ' flex',
  height: '100%',
});

export const TopbarInner = () => {
  return (
    <TopbarWrapper>
      <div>
        <button>Back button</button>
        <button>Forward button</button>
      </div>
      <div>
        <button>user profile</button>
      </div>
    </TopbarWrapper>
  );
};
