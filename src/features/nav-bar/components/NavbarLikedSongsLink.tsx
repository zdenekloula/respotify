import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Icon, IconContainer } from '@/components/icon';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';

const LinkIconBox = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '24px',
  width: '24px',
  background: 'linear-gradient(135deg,#450af5,#c4efd9)',
  color: '#fff',
  opacity: 0.7,
  transition: '0.2s opacity linear',
  [`${IconContainer}`]: {
    width: '12px',
    height: '12px',
  },
});

const StyledLink = styled('a', {
  display: 'flex',
  gap: '$spacing05',
  height: '40px',
  alignItems: 'center',
  paddingInline: '$spacing06',
  color: '$textSubdued',
  transition: '0.2s color linear',
  '&:hover': {
    color: '$textBase',
    [`& ${LinkIconBox}`]: {
      opacity: 1,
    },
  },

  variants: {
    isActive: {
      true: {
        color: '$textBase',
        [`& ${LinkIconBox}`]: {
          opacity: 1,
        },
      },
    },
  },
});

export const NavbarLikedSongsLink = () => {
  const router = useRouter();
  const link = '/collection/tracks';
  return (
    <Link href={link} passHref>
      <StyledLink isActive={router.pathname === link}>
        <LinkIconBox>
          {/* <HeartFilled /> */}
          <Icon name="heart-filled" />
        </LinkIconBox>
        <Text size="small" color="currentColor" weight="bold">
          Liked songs
        </Text>
      </StyledLink>
    </Link>
  );
};
