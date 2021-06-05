import dayjs from 'dayjs';
import Link from 'next/link';
import React from 'react';
import type { AlbumPageProps } from './AlbumPage';
import { Box } from '@/components/box';
import { PageTitle, PageType, PageHeader, DotSeparator, HeaderText } from '@/components/page';
import { Text } from '@/components/text';

export const AlbumPageHeader = ({ album }: AlbumPageProps) => {
  const totalTracks = album.tracks.total;
  return (
    <PageHeader imageUrl={album.images[0].url} name={album.name}>
      <PageType>{totalTracks === 1 ? 'Single' : album.type}</PageType>
      <PageTitle>{album.name}</PageTitle>
      <Box
        css={{
          paddingBlockStart: '$spacing03',
        }}
      >
        <span>
          {album.artists.map((artist, index) => {
            const isDotShown = index < album.artists.length - 1;
            return (
              <React.Fragment key={artist.id}>
                <Link key={artist.id} href={`/artist/${artist.id}`} passHref>
                  <a>
                    <Text size="small" as="span" weight="bold">
                      {artist.name}
                    </Text>
                  </a>
                </Link>
                {isDotShown ? <DotSeparator /> : null}
              </React.Fragment>
            );
          })}
        </span>
        <DotSeparator color="base" />
        <HeaderText color="base">{dayjs(album.release_date).year()}</HeaderText>
        <DotSeparator color="base" />
        <HeaderText color="base">
          {totalTracks} {Number(totalTracks) > 1 ? 'songs' : 'song'}
        </HeaderText>
      </Box>
    </PageHeader>
  );
};
