import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { IconButton } from '@/components/button/IconButton';
import { IconContainer } from '@/components/icon';

type Props = {
  type: 'back' | 'forward';
};

export const TopbarNavigationButton = ({ type, children }: PropsWithChildren<Props>) => {
  const router = useRouter();
  /**
   * Spotify routing buttons works differently than this
   * - Spotify detects if user actually performed a navigation within the app and based on that it disables the buttons (e.g. if there were no "back" navigation, there is no way navigate forward) and performs navigation
   * - The solution would be to store the navigation history in the app and perform the navigation event based on that but we don't currently support history of navigation so this is kinda workaround so it works at least somehow
   */
  const handleNavigation = () => {
    switch (type) {
      case 'back': {
        router.back();
        break;
      }
      case 'forward': {
        window.history.forward();
        break;
      }
    }
  };
  return (
    <IconButton
      css={{
        background: '$topbarButtonBackground',
        [`${IconContainer}`]: {
          width: '22px',
          height: '22px',
        },
        '&:disabled': {
          opacity: 0.6,
        },
      }}
      onClick={handleNavigation}
    >
      {children}
    </IconButton>
  );
};
