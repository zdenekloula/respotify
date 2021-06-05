import ReactDOM from 'react-dom';
import { TopbarNavigationButton } from './components/NavigationButton';
import { UserMenu } from './components/UserMenu';
import { Icon } from '@/components/icon';
import { useLayout } from '@/components/layout/MainLayoutContext';
import { styled } from '@/lib/stitches.config';

const TopbarWrapper = styled('div', {
  display: ' flex',
  height: '100%',
  paddingBlock: '$spacing05',
  paddingInline: '$spacing05',
  justifyContent: 'space-between',

  '@bp3': {
    paddingInline: '$spacing07',
  },

  '> *': {
    pointerEvents: 'auto',
  },
});

const TopbarNavigationControlsContainer = styled('div', {
  display: 'flex',
  gap: '$spacing05',
});

const TopbarUserMenuContainer = styled('div', {
  position: 'relative',
});

const TopbarPlaylistMetaPortal: React.FC = ({ children }) => {
  const { topbar } = useLayout();
  return topbar ? ReactDOM.createPortal(children, topbar) : null;
};

const Topbar = () => {
  const { setTopbar } = useLayout();

  return (
    <TopbarWrapper aria-label="Top bar and user menu">
      <TopbarNavigationControlsContainer>
        <TopbarNavigationButton type="back">
          <Icon name="chevron-left" />
        </TopbarNavigationButton>
        <TopbarNavigationButton type="forward">
          <Icon name="chevron-right" />
        </TopbarNavigationButton>
      </TopbarNavigationControlsContainer>
      <div ref={setTopbar} />
      <TopbarUserMenuContainer>
        <UserMenu />
      </TopbarUserMenuContainer>
    </TopbarWrapper>
  );
};

export { Topbar, TopbarPlaylistMetaPortal };
