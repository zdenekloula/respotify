import Link from 'next/link';
import React from 'react';
import { selectCurrentTrack } from '../playerSlice';
import { Box } from '@/components/box';
import { Flex } from '@/components/flex';
import { Text } from '@/components/text';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const NowPlayingWrapper = styled('div', {
  diplay: 'flex',
  width: '30%',
  minWidth: '180px',
});

const CoverImageContainer = styled('div', {
  width: '56px',
  height: '56px',
});

const TrackMeta = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: '0 $spacing05',
});

const ArtistLink = styled('a', {
  color: '$textSubdued',
  '&:hover': {
    color: '$textBase',
  },
});

const NowPlaying = React.memo(() => {
  const currentTrack = useAppSelector(selectCurrentTrack);
  const isTrack = currentTrack?.type === 'track';
  return (
    <NowPlayingWrapper>
      {currentTrack && (
        <Flex align="center">
          <CoverImageContainer>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={(currentTrack as SpotifyApi.TrackObjectFull).album.images[0].url}
              alt={`album cover`}
              width={56}
            />
          </CoverImageContainer>
          <TrackMeta>
            <Box>
              <Link
                href={`/album/${(currentTrack as SpotifyApi.TrackObjectFull).album.id}`}
                passHref
              >
                <a>
                  <Text size="small" as="span" ellipsis>
                    {currentTrack.name}
                  </Text>
                </a>
              </Link>
            </Box>
            <Box>
              <Text
                css={{
                  lineHeight: 1,
                }}
                ellipsis
              >
                {isTrack
                  ? currentTrack.artists.map((artist, index) => {
                      const isLastItem = index === currentTrack.artists.length - 1;
                      return (
                        <React.Fragment key={artist.id}>
                          <Link href={`/artist/${artist.id}`} passHref>
                            <ArtistLink>
                              <Text
                                as="span"
                                css={{
                                  fontSize: '0.6875rem', // 11px
                                }}
                              >
                                {artist.name}
                              </Text>
                            </ArtistLink>
                          </Link>
                          {!isLastItem ? ', ' : ''}
                        </React.Fragment>
                      );
                    })
                  : ''}
              </Text>
            </Box>
          </TrackMeta>
        </Flex>
      )}
    </NowPlayingWrapper>
  );
});

NowPlaying.displayName = 'NowPlaying';

export { NowPlaying };
