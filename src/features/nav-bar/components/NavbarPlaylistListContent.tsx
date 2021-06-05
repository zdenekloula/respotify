import React, { useMemo, memo as reactMemo, useState } from 'react';
import type { UseInfiniteQueryResult } from 'react-query';
import { areEqual, FixedSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { usePlaylistVirtualizedScroll } from '../hooks/usePlaylistVirtualizedScroll';
import { NavbarPlaylistItem } from './NavbarPlaylistItem';
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaViewport,
  ScrollAreaThumb,
} from '@/components/scrollarea';
import { usePlayerControls } from '@/features/player/hooks/usePlayerControls';
import { selectContext, selectIsPlaying } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

const PlaylistList = styled('ul', {
  display: 'block',
  height: '100%',
});

type InfinitePlaylistQuery = UseInfiniteQueryResult<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>;
type NavbarPlaylistContentProps = {
  data: InfinitePlaylistQuery['data'];
  hasNextPage: InfinitePlaylistQuery['hasNextPage'];
  isLoading: InfinitePlaylistQuery['isLoading'];
  fetchNextPage: InfinitePlaylistQuery['fetchNextPage'];
};
type ItemProps = {
  index: number;
  style: React.CSSProperties;
  data: {
    items: Array<SpotifyApi.PlaylistObjectSimplified>;
    context?: {
      uri?: string;
    };
    isPlaying: boolean;
  };
};

const ListItem = reactMemo(({ index, style, data }: ItemProps) => {
  const { handlePlay } = usePlayerControls();
  const { items, isPlaying, context } = data;
  const playlist = items[index];

  if (!playlist) {
    return null;
  }

  const currentPlaylistPlaying = context?.uri === playlist.uri && isPlaying;

  return (
    <div key={playlist.id} style={style}>
      <NavbarPlaylistItem
        key={playlist.id}
        id={playlist.id}
        name={playlist.name}
        isPlaying={currentPlaylistPlaying}
        onPlayClick={handlePlay}
      />
    </div>
  );
}, areEqual);

export const NavbarPlaylistContent = ({
  data,
  hasNextPage,
  isLoading,
  fetchNextPage,
}: NavbarPlaylistContentProps) => {
  const [scrollerElement, setScrollerElement] = useState<HTMLDivElement | null>(null);
  const infiniteLoaderRef = usePlaylistVirtualizedScroll(scrollerElement);
  const context = useAppSelector(selectContext);
  const isPlaying = useAppSelector(selectIsPlaying);

  const items = useMemo(() => {
    if (!data?.pages) {
      return [];
    }
    const tracks = data.pages.flatMap((page) => page.items);
    return tracks;
  }, [data]);

  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const totalCount = data?.pages[0].total || itemCount;
  const loadMoreItems = isLoading
    ? () => {}
    : () => {
        fetchNextPage();
      };
  const isItemLoaded = (index: number) => !hasNextPage || index < items.length;

  return (
    <React.Fragment>
      <ScrollAreaRoot type="auto">
        <ScrollAreaViewport ref={setScrollerElement} forceVerticalOnly>
          <PlaylistList>
            <InfiniteLoader
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              ref={infiniteLoaderRef}
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={loadMoreItems}
              threshold={1}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  ref={ref}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'inline-block',
                  }}
                  height={scrollerElement?.offsetHeight || 0}
                  width={window.innerWidth}
                  itemCount={totalCount}
                  itemData={{
                    items,
                    isPlaying,
                    context,
                  }}
                  itemSize={32}
                  onItemsRendered={onItemsRendered}
                >
                  {ListItem}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          </PlaylistList>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="horizontal">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="vertical">
          <ScrollAreaThumb />
        </ScrollAreaScrollbar>
      </ScrollAreaRoot>
    </React.Fragment>
  );
};
