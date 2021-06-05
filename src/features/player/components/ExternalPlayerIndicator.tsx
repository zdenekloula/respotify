import React from 'react';
import { selectActiveDevice, selectIsExternalPlayer } from '../playerSlice';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const ExternalPlayerInidiactorWrapper = styled('div', {
  background: '$connectBarBackground',
  paddingBlock: '3px',
  textAlign: 'right',
  paddingInlineEnd: '74px',
  fontSize: '$fontSize02',
  color: '$connectBarColor',
  height: '24px',
});

const ExternalPlayerInidiactor = () => {
  const isExternalPlayer = useAppSelector(selectIsExternalPlayer);
  const activeDevice = useAppSelector(selectActiveDevice);

  if (!isExternalPlayer) {
    return null;
  }

  return (
    <ExternalPlayerInidiactorWrapper>
      Listening on {activeDevice?.name}
    </ExternalPlayerInidiactorWrapper>
  );
};

export { ExternalPlayerInidiactor };
