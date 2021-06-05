import React, { useEffect } from 'react';
import { ExternalPlayerInidiactor } from './components/ExternalPlayerIndicator';
import { ExtraControls } from './components/ExtraControls';
import { NowPlaying } from './components/NowPlaying';
import { PlayerControls } from './components/PlayerControls';
import { usePlayer } from './hooks/usePlayer';
import { styled } from '@/lib/stitches.config';

const PlayerWrapper = styled('footer', {
  background: '$playerBackground',
  'border-top': '1px solid $gray5',
});

const PlayerInnerWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 $spacing05',
  height: '90px',
});

const PlayerContent = React.memo(() => {
  const { initializePlayer } = usePlayer();

  useEffect(() => {
    initializePlayer();
    return () => {};
    // This is intended as we want to call this only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PlayerWrapper>
      <PlayerInnerWrapper>
        <NowPlaying />
        <PlayerControls />
        <ExtraControls />
      </PlayerInnerWrapper>
      <ExternalPlayerInidiactor />
    </PlayerWrapper>
  );
});
PlayerContent.displayName = 'PlayerContent';

const Player = React.memo(() => {
  return <PlayerContent />;
});
Player.displayName = 'Player';

export { Player };
