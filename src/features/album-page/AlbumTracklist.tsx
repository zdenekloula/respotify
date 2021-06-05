import React, { useMemo } from 'react';
import {
  useTracklist,
  StyledTableRow,
  Table,
  getAlbumColumns,
  StyledTracklistHeader,
  StyledTracklistHeaderContainer,
} from '@/features/tracklist';
import { styled } from '@/lib/stitches.config';

type Props = {
  album: SpotifyApi.AlbumObjectFull;
};

const AlbumContainer = styled('div', {
  [`${StyledTableRow}, ${StyledTracklistHeader}`]: {
    display: 'grid',
    gridTemplateColumns: '[index] 16px [mainTrackInfo] 4fr [durationAndControls] minmax(120px,1fr)',
  },

  [`${StyledTracklistHeaderContainer}`]: {
    marginBlockEnd: '$spacing05',
  },
});

export const AlbumTracklist = ({ album }: Props) => {
  const { getRowProps } = useTracklist<SpotifyApi.TrackObjectSimplified>(album.uri);

  const data = album.tracks.items;
  const columns = useMemo(() => {
    const { index, mainTrackInfo, durationAndControls } = getAlbumColumns<
      SpotifyApi.TrackObjectSimplified,
      ReturnType<typeof getRowProps>
    >();
    return [index, mainTrackInfo, durationAndControls];
  }, []);

  return (
    <AlbumContainer>
      <Table<SpotifyApi.TrackObjectSimplified>
        data={data}
        columns={columns}
        getRowProps={getRowProps}
        loadingPlaceholder={null}
      />
    </AlbumContainer>
  );
};
