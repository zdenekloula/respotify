import Link from 'next/link';
import React from 'react';
import { NavbarLikedSongsLink } from './components/NavbarLikedSongsLink';
import { NavbarLinks } from './components/NavbarLinks';
import { NavbarPlaylist } from './components/NavbarPlaylist';
import { NavbarSeparator } from './components/Separator';
import { SpotifyLogo } from '@/components/spotify-logo';
import { styled } from '@/lib/stitches.config';

const NavbarWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  background: '$navbarBackground',
  borderRight: '1px solid $navbarBorder',
  paddingBlockStart: '$spacing06',
  width: '100%',
  height: '100%',
});

const NavbarHeaderLogo = styled('a', {
  display: 'block',
  paddingInline: '$spacing06',
  paddingBlockEnd: '$spacing06',
  color: '$spotifyLogo',
  svg: {
    height: '40px',
    'max-width': '131px',
    width: '100%',
  },
});

const Navbar = () => {
  return (
    <NavbarWrapper>
      <div role="banner">
        <Link href="/" passHref>
          <NavbarHeaderLogo>
            <SpotifyLogo />
          </NavbarHeaderLogo>
        </Link>
      </div>
      <NavbarLinks />
      <NavbarLikedSongsLink />
      <NavbarSeparator />
      <NavbarPlaylist />
    </NavbarWrapper>
  );
};

export { Navbar };
