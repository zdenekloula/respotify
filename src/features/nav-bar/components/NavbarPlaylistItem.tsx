import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { NavbatPlaylistPlayingIndicator } from './NavbatPlaylistPlaying';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';

const PlaylistListLink = styled('a', {
  display: 'flex',
  gap: '$spacing05',
  height: '32px',
  alignItems: 'center',
  color: '$textSubdued',
  transition: '0.2s color linear',
  cursor: 'default',
  overflow: 'hidden',
  flex: '1',

  '&:hover': {
    color: '$textBase',
    textDecoration: 'none',
  },

  variants: {
    isActive: {
      true: {
        color: '$textBase',
      },
    },
  },
});

const PlaylistListItem = styled('li', {
  display: 'flex',
  paddingInline: '$spacing06',
});

type NavbarPlaylistItemProps = {
  id: string;
  name: string;
  isPlaying: boolean;
  onPlayClick: () => void;
};

export const NavbarPlaylistItem = React.memo(
  ({ id, name, isPlaying, onPlayClick }: NavbarPlaylistItemProps) => {
    const router = useRouter();
    const playlistUrl = `/playlist/${id}`;
    const isCurrentRoute = router.asPath === playlistUrl;

    return (
      <PlaylistListItem>
        <Link href={playlistUrl} passHref>
          <PlaylistListLink isActive={isCurrentRoute}>
            <Text size="small" as="span" ellipsis>
              {name}
            </Text>
          </PlaylistListLink>
        </Link>
        {isPlaying && <NavbatPlaylistPlayingIndicator onPlayClick={onPlayClick} />}
      </PlaylistListItem>
    );
  }
);
NavbarPlaylistItem.displayName = 'NavbarPlaylistItem';
