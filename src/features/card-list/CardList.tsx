import dayjs from 'dayjs';
import { capitalize } from 'lodash-es';
import React, { useState } from 'react';
import { shallowEqual } from 'react-redux';
import useResizeObserver from 'use-resize-observer';
import { Card } from '@/components/card';
import { selectContext, selectIsPlaying } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

export const CardListContainer = styled('div', {
  display: 'grid',
  gridGap: '0 $spacing06',
  gridTemplateColumns: 'repeat(var(--card-list-column-count), minmax(0, 1fr))',
  overflowY: 'hidden',
  gridAutoRows: 0,
  gridTemplateRows: 'repeat(1, 1fr)',
  marginBottom: '$spacing06',
});

type Props = {
  items: Array<
    | (SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified)
    | (SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified)
    | (SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified)
    | SpotifyApi.ArtistObjectFull
  >;
};

const renderCard = (
  item:
    | (SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified)
    | (SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified)
    | (SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified)
    | SpotifyApi.ArtistObjectFull,
  currentContextUri: string | undefined,
  isPlaying: boolean
) => {
  switch (item.type) {
    case 'album': {
      const descriptionType = item.album_group === 'album' ? 'album' : 'single';
      return (
        <Card
          key={item.id}
          uri={item.uri}
          type="album"
          src={item.images.length > 0 ? item.images[0].url : undefined}
          title={item.name}
          href={`/album/${item.id}`}
          description={`${dayjs(item.release_date).year()} • ${capitalize(descriptionType)}`}
          isPlaying={isPlaying}
          currentContextUri={currentContextUri}
        />
      );
    }
    case 'artist': {
      return (
        <Card
          key={item.id}
          uri={item.uri}
          type="artist"
          src={item.images.length > 0 ? item.images[0].url : undefined}
          title={item.name}
          href={`/artist/${item.id}`}
          description="Artist"
          isPlaying={isPlaying}
          currentContextUri={currentContextUri}
        />
      );
    }
    case 'playlist': {
      return (
        <Card
          key={item.id}
          uri={item.uri}
          type="playlist"
          src={item.images.length > 0 ? item.images[0].url : undefined}
          title={item.name}
          href={`/playlist/${item.id}`}
          description={item.description}
          isPlaying={isPlaying}
          currentContextUri={currentContextUri}
        />
      );
    }
  }
};

const getInitialColumnCount = (listElement: HTMLDivElement | null, listGap: number) => {
  if (!listElement) {
    return 4;
  }

  const listWidth = listElement.getBoundingClientRect().width;

  if (listWidth < 500) {
    return 2;
  }
  if (listWidth < 750) {
    return 3;
  }
  if (listWidth < 850) {
    return 4;
  }

  const columnCount = (listWidth + listGap) / (180 + listGap);
  return Math.floor(columnCount);
};

export const CardList = ({ items }: Props) => {
  const context = useAppSelector(selectContext, shallowEqual);
  const isPlaying = useAppSelector(selectIsPlaying);

  const [listElement, setListElement] = useState<HTMLDivElement | null>(null);
  useResizeObserver<HTMLDivElement>({
    ref: listElement,
  });

  const columnCount = getInitialColumnCount(listElement, 16);

  return (
    <CardListContainer
      ref={setListElement}
      style={
        {
          '--card-list-column-count': `${columnCount}`,
        } as React.CSSProperties
      }
    >
      {items.length > 0
        ? items.map((item) => {
            if (!item) {
              return;
            }
            const isContextPlaying = context?.uri === item.uri && isPlaying;
            return renderCard(item, context?.uri, isContextPlaying);
          })
        : null}
    </CardListContainer>
  );
};
