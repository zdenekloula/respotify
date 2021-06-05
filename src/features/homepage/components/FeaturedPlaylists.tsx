import React from 'react';
import { useFeaturedPlaylistsQuery } from '@/api/hooks';
import { Box } from '@/components/box';
import { Heading } from '@/components/heading';
import { CardList } from '@/features/card-list';

export const FeaturedPlaylists = () => {
  const { data, isIdle, isError, isLoading } = useFeaturedPlaylistsQuery({
    limit: 9,
  });

  if (isLoading || isIdle) {
    return null;
  }

  if (isError) {
    return <>Error playlists</>;
  }

  return (
    <>
      <Box
        css={{
          paddingBlockEnd: '$spacing06',
        }}
      >
        <Heading as="h2" type="heading02" size="5" weight="bold">
          Featured Playlists
        </Heading>
      </Box>
      <CardList items={data.playlists.items} />
    </>
  );
};
