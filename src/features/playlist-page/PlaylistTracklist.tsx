import React, { useMemo } from 'react';
import { PlaylistTracklistSkeleton } from './PlaylistTracklistSkeleton';
import { usePlaylistTracksInfiniteQuery } from '@/api/hooks';
import {
  useTracklist,
  StyledTracklistHeader,
  StyledTracklistHeaderContainer,
  getPlaylistColumns,
  Table,
  StyledTableRow,
} from '@/features/tracklist';
import { styled } from '@/lib/stitches.config';

type Props = {
  playlist: SpotifyApi.PlaylistObjectFull;
};

const PlaylistContainer = styled('div', {
  [`${StyledTableRow}, ${StyledTracklistHeader}`]: {
    display: 'grid',
    gridTemplateColumns:
      '[index] 16px [mainTrackInfo] 6fr [album] 4fr [addedAt] 3fr [durationAndControls] minmax(120px,1fr)',
  },

  [`${StyledTracklistHeaderContainer}`]: {
    marginBlockEnd: '$spacing05',
  },
});

type PlaylistTrackObject = SpotifyApi.PlaylistTrackObject & {
  index: number;
};

export const PlaylistTracklist = ({ playlist }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePlaylistTracksInfiniteQuery(playlist.id);

  const { getRowProps } = useTracklist<PlaylistTrackObject>(playlist.uri);

  const [items, filteredCount] = useMemo(() => {
    if (!data?.pages) {
      return [[], 0];
    }
    const tracks = data.pages
      .flatMap((page) => page.items)
      .map((item, index) => {
        return {
          ...item,
          // As there can occur empty tracks, we need to track the index of the playlist items so we can then "play" the correct track by index in the playlist because Spotify API doesn't count with empty tracks I guess?
          index,
        };
      });
    const filteredTracks = tracks.filter((playlistItem) => playlistItem.track);
    const filteredTracksCount = tracks.length - filteredTracks.length;
    return [filteredTracks, filteredTracksCount];
  }, [data]);

  const columns = useMemo(() => {
    const { index, mainTrackInfo, album, addedAt, durationAndControls } = getPlaylistColumns<
      PlaylistTrackObject,
      ReturnType<typeof getRowProps>
    >();
    return [index, mainTrackInfo, album, addedAt, durationAndControls];
  }, []);

  return (
    <PlaylistContainer>
      <Table<PlaylistTrackObject>
        data={items}
        columns={columns}
        getRowProps={getRowProps}
        loadingPlaceholder={<PlaylistTracklistSkeleton />}
        isLoading={isLoading}
        loadMore={{
          enabled: Boolean(hasNextPage),
          totalCount: Number(data?.pages[0].total) - filteredCount,
          isLoading: isFetchingNextPage,
          callback: () => {
            fetchNextPage();
          },
        }}
      />
    </PlaylistContainer>
  );
};
