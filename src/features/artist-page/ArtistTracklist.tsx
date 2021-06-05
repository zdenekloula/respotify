import React, { useMemo } from 'react';
import { ArtistTracklistSkeleton } from './ArtistTracklistSkeleton';
import { useArtistTopTracksQuery } from '@/api/hooks';
import {
  useTracklist,
  StyledTableRow,
  Table,
  getArtistColumns,
  StyledTracklistHeader,
  StyledTracklistHeaderContainer,
} from '@/features/tracklist';
import { styled } from '@/lib/stitches.config';

type Props = {
  artist: SpotifyApi.ArtistObjectFull;
};

export const ArtistTracklistContainer = styled('div', {
  [`${StyledTableRow}, ${StyledTracklistHeader}`]: {
    display: 'grid',
    gridTemplateColumns: '[index] 16px [mainTrackInfo] 2fr [durationAndControls] minmax(120px,1fr)',
  },

  [`${StyledTracklistHeaderContainer}`]: {
    marginBlockEnd: '$spacing05',
  },
});

export const ArtistTracklist = ({ artist }: Props) => {
  const { data, isLoading } = useArtistTopTracksQuery(artist.id);
  const { getRowProps } = useTracklist<SpotifyApi.TrackObjectFull>(artist.uri);

  const items = useMemo(() => {
    if (!data?.tracks) {
      return [];
    }
    return data.tracks.slice(0, 5);
  }, [data]);

  const columns = useMemo(() => {
    const { index, mainTrackInfo, durationAndControls } = getArtistColumns<
      SpotifyApi.TrackObjectFull,
      ReturnType<typeof getRowProps>
    >();
    return [index, mainTrackInfo, durationAndControls];
  }, []);

  return (
    <ArtistTracklistContainer>
      <Table<SpotifyApi.TrackObjectFull>
        data={items}
        columns={columns}
        getRowProps={getRowProps}
        loadingPlaceholder={<ArtistTracklistSkeleton />}
        isLoading={isLoading}
        loadMore={{
          enabled: false,
        }}
        noHeader
      />
    </ArtistTracklistContainer>
  );
};
