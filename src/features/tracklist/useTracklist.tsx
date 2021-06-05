import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import type { Row } from 'react-table';
import { usePlayerControls } from '@/features/player/hooks/usePlayerControls';
import { selectContext, selectCurrentTrack, selectIsPlaying } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';

type TracklistItem = SpotifyApi.PlaylistTrackObject | SpotifyApi.TrackObjectSimplified;

const getTracklistTrack = (tracklistItem: TracklistItem) => {
  if ('track' in tracklistItem) {
    return tracklistItem.track;
  }

  return tracklistItem;
};

export function useTracklist<T extends TracklistItem>(uri: string) {
  const { handlePlay, handlePlaySong } = usePlayerControls();
  const isSongPlaying = useAppSelector(selectIsPlaying);
  const currentTrack = useAppSelector(selectCurrentTrack);
  const context = useAppSelector(selectContext, shallowEqual);

  const handleTracklistItemPlay = useCallback(
    async (playOptions: SpotifyApi.PlayParameterObject, isCurrentSong: boolean) => {
      if (!isCurrentSong) {
        await handlePlaySong(playOptions);
        return;
      }

      return handlePlay({});
    },
    [handlePlaySong, handlePlay]
  );

  const getRowProps = useCallback(
    (row: Row<T>) => {
      const track = getTracklistTrack(row.original);
      const isCurrentSong = (context?.uri === uri && currentTrack?.id === track.id) || false;
      return {
        uri: uri,
        isPlaying: isCurrentSong && isSongPlaying,
        handlePlay: handleTracklistItemPlay,
        isCurrentSong,
        track,
      };
    },
    [isSongPlaying, context, currentTrack, uri, handleTracklistItemPlay]
  );

  return {
    getRowProps,
    handleTracklistItemPlay,
  };
}
