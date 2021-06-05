import NextLink from 'next/link';
import React from 'react';
import { Link } from '@/components/link';
import { Text } from '@/components/text';
import { styled } from '@/lib/stitches.config';
import { isFullTrackObject } from '@/utils/isFullTrackObject';

export type MainTrackInfoCellProps = {
  track: SpotifyApi.TrackObjectSimplified | SpotifyApi.TrackObjectFull;
  showTrackNameOnly?: boolean;
};

export const MainTrackInfoRowCellContainer = styled('span', {
  gridColumn: 'mainTrackInfo',
  display: 'flex',
  alignItems: 'center',
});

const TrackImage = styled('img', {
  objectFit: 'cover',
  objectPosition: 'center center',
  flexShrink: '0',
  marginInlineEnd: '$spacing05',
});

export const TrackMeta = styled('span', {
  display: 'grid',
});

export const TrackMetaName = styled(Text, {
  color: '$textBase',
});

export const MainTrackInfoRowCell = ({ track, showTrackNameOnly }: MainTrackInfoCellProps) => {
  return (
    <MainTrackInfoRowCellContainer>
      {isFullTrackObject(track) ? (
        <TrackImage src={track.album.images[0].url} width="40" height="40" />
      ) : null}
      <TrackMeta>
        <TrackMetaName ellipsis>{track.name}</TrackMetaName>
        {!showTrackNameOnly ? (
          <Text ellipsis>
            {track.artists.map((artist, index) => {
              return (
                <React.Fragment key={artist.id}>
                  <NextLink href={`/artist/${artist.id}`} passHref>
                    <Link color="currentColor">
                      <Text as="span" size="small">
                        {artist.name}
                      </Text>
                    </Link>
                  </NextLink>

                  {index !== track.artists.length - 1 ? ', ' : ''}
                </React.Fragment>
              );
            })}
          </Text>
        ) : null}
      </TrackMeta>
    </MainTrackInfoRowCellContainer>
  );
};
