import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Icon, IconContainer } from '@/components/icon';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';

const List = styled('ul', {
  paddingBlockEnd: '$spacing06',
});

const ListItem = styled('li', {
  paddingInline: '$spacing03',
});

const ListLink = styled('a', {
  display: 'flex',
  gap: '$spacing05',
  height: '40px',
  alignItems: 'center',
  // TODO: replace with token
  borderRadius: '4px',
  paddingInline: '$spacing05',
  background: '$navbarLinkBackground',
  color: '$textSubdued',
  transition: '0.2s color linear',

  '&:hover': {
    color: '$textBase',
    textDecoration: 'none',
  },

  [`${IconContainer}`]: {
    width: '24px',
    height: '24px',
  },

  variants: {
    isActive: {
      true: {
        background: '$navbarLinkActiveBackground',
        color: '$navbarLinkActiveColor',
        '&:hover': {
          color: '$navbarLinkActiveColor',
        },
      },
    },
  },
});

const LINKS = [
  {
    name: 'Home',
    href: '/',
    icon: <Icon name="home" />,
    iconActive: <Icon name="home-active" />,
  },
  {
    name: 'Search',
    href: '/search',
    icon: <Icon name="search" />,
    iconActive: <Icon name="search-active" />,
  },
  {
    name: 'Your library',
    href: '/collection/playlists',
    icon: <Icon name="collection" />,
    iconActive: <Icon name="collection-active" />,
  },
];

export const NavbarLinks = () => {
  const router = useRouter();

  return (
    <List>
      {LINKS.map(({ name, href, icon, iconActive }) => {
        const isActive = router.pathname === href;
        return (
          <ListItem key={name}>
            <Link href={href} passHref>
              <ListLink isActive={isActive}>
                {isActive ? iconActive : icon}
                <Text size="small" weight="bold">
                  {name}
                </Text>
              </ListLink>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};
