import * as React from 'react';
import { SpotifyLogo } from '@/components/spotify-logo';
import { styled } from '@/lib/stitches.config';

const FullPage = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: '$backgroundBase',
});

const LogoWrapper = styled('div', {
  height: '39px',
  width: '130px',
});

export const FullpageLoading = () => {
  return (
    <FullPage>
      <LogoWrapper>
        <SpotifyLogo />
      </LogoWrapper>
    </FullPage>
  );
};

FullpageLoading.displayName = 'FullpageLoading';
