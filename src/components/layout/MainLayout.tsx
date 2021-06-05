import React from 'react';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
  ScrollAreaThumb,
} from '../scrollarea';
import { useLayout } from './MainLayoutContext';
import { Navbar } from '@/features/nav-bar';
import { Player } from '@/features/player';
import { Topbar } from '@/features/top-bar';
import { styled } from '@/lib/stitches.config';

export const MAIN_VIEW_ID = 'main_view';

const Shell = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateAreas: `
      "main-nav main-view friends-sidebar"
      "player-bar player-bar player-bar"
    `,
  gridTemplateColumns: 'auto 1fr',
  gridTemplateRows: '1fr auto',
  height: '100%',
  minHeight: '100%',
  width: '100%',
});

const Main = styled('main', {
  height: '100%',
  width: '100%',
  flex: 1,

  display: 'flex',
  flexDirection: 'column',
});

const MainViewContainer = styled(ScrollAreaRoot, {
  gridArea: 'main-view',
  width: '100%',
  background: '$lightBg',
  color: '$color',
  minHeight: 0,
  overflow: 'hidden',
});

const MainViewSpacer = styled('div', {
  height: '$topbarHeight',
  position: 'sticky',
  top: 0,
});

const NavbarContainer = styled('div', {
  gridArea: 'main-nav',
  zIndex: '3',
  // width: '240px',
  width: '241px', // Spotify uses --navbar-width with default 232 + 9
  minHeight: 0,
});

const TopbarContainer = styled('div', {
  gridArea: 'main-view',
  height: '$topbarHeight',
  zIndex: '2',
  pointerEvents: 'none',
});

const NowPlayingBarContainer = styled('div', {
  gridArea: 'player-bar',
  width: '100%',
  zIndex: '4',
});

const MainLayout: React.FC = ({ children }) => {
  const { setMainView } = useLayout();
  return (
    <Shell id="main">
      <TopbarContainer>
        <Topbar />
      </TopbarContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <NowPlayingBarContainer>
        <Player />
      </NowPlayingBarContainer>
      <MainViewContainer type="auto">
        <ScrollAreaViewport ref={setMainView} forceVerticalOnly>
          <Main>
            <MainViewSpacer />
            {children}
          </Main>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </MainViewContainer>
    </Shell>
  );
};

export { MainLayout };
