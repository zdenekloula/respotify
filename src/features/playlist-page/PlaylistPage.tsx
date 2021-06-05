import React from 'react';
import { PlaylistPageHeader } from './Header';
import { PlaylistTracklist } from './PlaylistTracklist';
import { PageActionsBar, PageContent, PageContentSection } from '@/components/page';
import { usePageColorizedBackground } from '@/hooks/usePageColorizedBackground';

export type PlaylistPageProps = {
  playlist: SpotifyApi.SinglePlaylistResponse;
  coverImage?: string;
};

const getPlaylistImage = (
  playlist: SpotifyApi.SinglePlaylistResponse,
  coverImage: string | undefined
): string | undefined => {
  if (coverImage) {
    return coverImage;
  }
  return playlist?.images?.length ? playlist.images[0].url : undefined;
};

export const PlaylistPage = ({ playlist, coverImage }: PlaylistPageProps) => {
  const image = getPlaylistImage(playlist, coverImage);
  usePageColorizedBackground(image);

  const isTracklistShown = playlist.tracks.items.length > 0;

  return (
    <>
      <PlaylistPageHeader playlist={playlist} coverImage={coverImage} />
      <PageContent>
        <PageActionsBar
          uri={playlist.uri}
          enableLikeButton={isTracklistShown}
          enablePlayButton={isTracklistShown}
        />
        <PageContentSection>
          {isTracklistShown ? <PlaylistTracklist playlist={playlist} /> : null}
        </PageContentSection>
      </PageContent>
    </>
  );
};
