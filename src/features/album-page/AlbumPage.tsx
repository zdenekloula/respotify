import Link from 'next/link';
import React from 'react';
import { AlbumTracklist } from './AlbumTracklist';
import { AlbumPageHeader } from './Header';
import { PageActionsBar, PageContent, PageContentSection } from '@/components/page';
import { ArtistAlbums } from '@/features/artist-page/ArtistAlbums';
import { usePageColorizedBackground } from '@/hooks/usePageColorizedBackground';

export type AlbumPageProps = {
  album: SpotifyApi.SingleAlbumResponse;
};

export const AlbumPage = ({ album }: AlbumPageProps) => {
  const image = album?.images[0].url;
  usePageColorizedBackground(image);

  const firstArtist = album.artists[0];

  return (
    <>
      <AlbumPageHeader album={album} />
      <PageContent>
        <PageActionsBar uri={album.uri} enableLikeButton />
        <PageContentSection>
          <AlbumTracklist album={album} />
        </PageContentSection>
        <ArtistAlbums
          artistId={firstArtist.id}
          title={
            <Link href={`/artist/${firstArtist.id}`}>
              <a>More by {firstArtist.name}</a>
            </Link>
          }
        />
      </PageContent>
    </>
  );
};
