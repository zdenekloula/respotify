import React from 'react';
import { styled } from '@/lib/stitches.config';

export const PageContentContainer = styled('div', {
  position: 'relative',
});

const PageContentBackground = styled('div', {
  display: 'block',
  height: '232px',
  position: 'absolute',
  width: '100%',
  background: '$pageColorizedBackground',
  zIndex: '-1',
});

const PageContentBackgroundOverlay = styled(PageContentBackground, {
  background: '$pageContentDefaultBackgroundOverlay',
});

export const PageContent: React.FC = ({ children }) => {
  return (
    <PageContentContainer>
      <PageContentBackground />
      <PageContentBackgroundOverlay />
      {children}
    </PageContentContainer>
  );
};
