/* eslint-disable @typescript-eslint/ban-types */
import { AddedAt } from './added-at/AddedAtRowCell';
import { AlbumRowCell } from './album/AlbumRowCell';
import { DurationAndControlsHeaderCell } from './duration-and-controls/DurationAndControlsHeaderCell';
import { DurationAndControlsRowCell } from './duration-and-controls/DurationAndControlsRowCell';
import type { CustomColumn } from './Header';
import { IndexHeaderCell } from './index/IndexHeaderCell';
import { IndexRowCell } from './index/IndexRowCell';
import { MainTrackInfoRowCell } from './main-track-info/MainTrackInfoRowCell';
import { Text } from '@/components/text';
import { isFullTrackObject } from '@/utils/isFullTrackObject';

export const enum PlaylistsColumns {
  Index = 'index',
  TrackInfo = 'mainTrackInfo',
  Album = 'album',
  AddedAt = 'addedAt',
  DurationAndControls = 'durationAndControls',
}

type GeneralColumns<T extends object, V = unknown> = Omit<PlaylistColumnsSimple<T, V>, 'addedAt'>;
type PlaylistColumnsSimple<T extends object, V = unknown> = {
  [key in PlaylistsColumns]: CustomColumn<T, V>;
};
type AlbumColumns<T extends object, V = unknown> = GeneralColumns<T, V>;

export type RequiredCellProps = {
  isPlaying: boolean;
  uri: string;
  isCurrentSong: boolean;
  handlePlay: (
    playOptions: SpotifyApi.PlayParameterObject,
    isCurrentSong: boolean
  ) => Promise<void>;
  track: SpotifyApi.TrackObjectSimplified | SpotifyApi.TrackObjectFull;
};

export function getTableColumns<T extends object, V extends RequiredCellProps>(): GeneralColumns<
  T,
  V
> {
  return {
    [PlaylistsColumns.Index]: {
      id: PlaylistsColumns.Index,
      Header: () => <IndexHeaderCell />,
      Cell: ({ row, uri, isPlaying, isCurrentSong, handlePlay }) => {
        return (
          <IndexRowCell
            index={row.index}
            uri={uri}
            isPlaying={isPlaying}
            isCurrentSong={isCurrentSong}
            handlePlay={handlePlay}
          />
        );
      },
    },
    [PlaylistsColumns.TrackInfo]: {
      id: PlaylistsColumns.TrackInfo,
      Header: () => (
        <Text size="extraSmall" uppercase>
          Name
        </Text>
      ),
      Cell: ({ track }) => {
        return <MainTrackInfoRowCell track={track} />;
      },
    },
    [PlaylistsColumns.Album]: {
      id: PlaylistsColumns.Album,
      Header: () => (
        <Text size="extraSmall" uppercase>
          Album
        </Text>
      ),
      Cell: ({ track }) => {
        if (!isFullTrackObject(track)) {
          return null;
        }
        return <AlbumRowCell album={track.album} />;
      },
    },
    [PlaylistsColumns.DurationAndControls]: {
      id: PlaylistsColumns.DurationAndControls,
      Header: () => <DurationAndControlsHeaderCell />,
      Cell: ({ track }) => {
        return <DurationAndControlsRowCell duration={track.duration_ms} />;
      },
    },
  };
}

export function getPlaylistColumns<
  T extends SpotifyApi.PlaylistTrackObject & {
    index: number;
  },
  V extends RequiredCellProps
>(): PlaylistColumnsSimple<T, V> {
  return {
    ...getTableColumns(),
    [PlaylistsColumns.Index]: {
      id: PlaylistsColumns.Index,
      Header: () => <IndexHeaderCell />,
      Cell: ({ row, uri, isPlaying, isCurrentSong, handlePlay }) => {
        return (
          <IndexRowCell
            index={row.original.index}
            uri={uri}
            isPlaying={isPlaying}
            isCurrentSong={isCurrentSong}
            handlePlay={handlePlay}
          />
        );
      },
    },
    [PlaylistsColumns.AddedAt]: {
      id: PlaylistsColumns.AddedAt,
      Header: () => (
        <Text size="extraSmall" uppercase>
          Added at
        </Text>
      ),
      Cell: (cellProps) => {
        return <AddedAt addedAt={cellProps.row.original.added_at} />;
      },
    },
  };
}

export function getAlbumColumns<
  T extends SpotifyApi.TrackObjectSimplified,
  V extends RequiredCellProps
>(): AlbumColumns<T, V> {
  return {
    ...getTableColumns(),
  };
}

export function getArtistColumns<
  T extends SpotifyApi.TrackObjectSimplified,
  V extends RequiredCellProps
>(): AlbumColumns<T, V> {
  return {
    ...getTableColumns(),
    [PlaylistsColumns.TrackInfo]: {
      id: PlaylistsColumns.TrackInfo,
      Header: () => (
        <Text size="extraSmall" uppercase>
          Name
        </Text>
      ),
      Cell: ({ track }) => {
        return <MainTrackInfoRowCell track={track} showTrackNameOnly />;
      },
    },
  };
}
