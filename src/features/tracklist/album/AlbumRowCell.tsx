import NextLink from 'next/link';
import React from 'react';
import { Box } from '@/components/box';
import { Link } from '@/components/link';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';

export type AlbumRowCellProps = {
  album: SpotifyApi.AlbumObjectSimplified;
};

export const AlbumCellContainer = styled('span', {
  gridColumn: 'album',
  display: 'flex',
  alignItems: 'center',
});

export const AlbumRowCell = ({ album }: AlbumRowCellProps) => {
  return (
    <AlbumCellContainer>
      <Box
        css={{
          display: 'grid',
        }}
      >
        <Text size="small" ellipsis>
          <NextLink href={`/album/${album.id}`} passHref>
            <Link color="currentColor">{album.name}</Link>
          </NextLink>
        </Text>
      </Box>
    </AlbumCellContainer>
  );
};
