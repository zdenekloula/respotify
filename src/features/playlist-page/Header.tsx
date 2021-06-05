import Link from 'next/link';
import React from 'react';
import { Description } from './Description';
import type { PlaylistPageProps } from './PlaylistPage';
import { Box } from '@/components/box';
import { PageTitle, PageType, PageHeader, DotSeparator, HeaderText } from '@/components/page';
import { Text } from '@/components/text';

export const PlaylistPageHeader = ({ coverImage, playlist }: PlaylistPageProps) => {
  const formattedFollowersTotal = Intl.NumberFormat('en-US').format(playlist.followers.total);
  const imageUrl = playlist.images?.length > 0 ? playlist.images[0].url : undefined;

  return (
    <PageHeader coverImageUrl={coverImage} imageUrl={imageUrl} name={playlist.name}>
      <PageType>{playlist.type}</PageType>
      <PageTitle>{playlist.name}</PageTitle>

      {playlist.description ? <Description text={playlist.description} /> : ''}
      <Box
        css={{
          paddingBlockStart: '$spacing03',
        }}
      >
        <Link href={playlist.owner.href} passHref>
          <a>
            <Text size="small" as="span" weight="bold">
              {playlist.owner.display_name}
            </Text>
          </a>
        </Link>
        <DotSeparator />
        <HeaderText>{formattedFollowersTotal} likes</HeaderText>
        <DotSeparator />
        <HeaderText>{playlist.tracks.total} songs</HeaderText>
      </Box>
    </PageHeader>
  );
};
