import React from 'react';
import { shallowEqual } from 'react-redux';
import { HorizontalCard, HorizontalCardMouseActions } from '@/components/card/HorizontalCard';
import { selectContext, selectCurrentTrack, selectIsPlaying } from '@/features/player/playerSlice';
import { useAppSelector } from '@/hooks/redux';
import { styled } from '@/lib/stitches.config';

type RecentlyPlayedTracksProps = {
  recentlyPlayedTracks: SpotifyApi.UsersRecentlyPlayedTracksResponse;
  onCardMouseEnter: HorizontalCardMouseActions['onMouseEnter'];
  onCardMouseLeave: HorizontalCardMouseActions['onMouseLeave'];
};

const RecentlyPlayedTracksContainer = styled('div', {
  display: 'grid',
  gridRowGap: '$spacing05',
  gridColumnGap: '$spacing06',
  gridTemplateColumns: `repeat(auto-fill, minmax(max(270px, 25%), 1fr))`,
});

export const RecentlyPlayedTracks = ({
  recentlyPlayedTracks,
  onCardMouseEnter,
  onCardMouseLeave,
}: RecentlyPlayedTracksProps) => {
  const context = useAppSelector(selectContext, shallowEqual);
  const currentTrack = useAppSelector(selectCurrentTrack);
  const isPlaying = useAppSelector(selectIsPlaying);

  return (
    <RecentlyPlayedTracksContainer>
      {recentlyPlayedTracks.items.map(({ track }, key) => {
        // Even though the type is defined as Simplified, Spotify API returns a full object
        const { id, album, uri, name } = track as SpotifyApi.TrackObjectFull;
        // Smallest image would be preferred but we don't select the optimal image anywhere so let's keep it like this for now
        const image = album.images.length > 0 ? album.images[0].url : undefined;
        const isCurrentTrackPlaying = currentTrack?.uri === uri && isPlaying;
        return (
          <HorizontalCard
            key={`${key}-${id}`}
            uri={uri}
            src={image}
            href={`/album/${album.id}`}
            title={name}
            isPlaying={isCurrentTrackPlaying}
            currentContextUri={context?.uri}
            onMouseEnter={onCardMouseEnter}
            onMouseLeave={onCardMouseLeave}
          />
        );
      })}
    </RecentlyPlayedTracksContainer>
  );
};
