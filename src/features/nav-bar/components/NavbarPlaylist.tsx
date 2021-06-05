import React from 'react';
import { NavbarPlaylistContent } from './NavbarPlaylistListContent';
import { useMePlaylistsInfiniteQuery } from '@/api/hooks';
import { styled } from '@/lib/stitches.config';

const PlaylistListContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  flexGrow: 1,
  flexShrink: 0,
  minHeight: 0,
});

const NavbarPlaylist = () => {
  const { data, isLoading, isError, isIdle, fetchNextPage, hasNextPage } =
    useMePlaylistsInfiniteQuery();

  if (isLoading || isIdle) {
    return <>Loading me playlists...</>;
  }

  if (isError) {
    return <>Error playlists</>;
  }

  return (
    <PlaylistListContainer>
      <NavbarPlaylistContent
        data={data}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
      />
    </PlaylistListContainer>
  );
};

export { NavbarPlaylist };
