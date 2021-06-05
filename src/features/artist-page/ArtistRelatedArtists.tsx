import React from 'react';
import { CardList } from '../card-list';
import { useArtistRelatedArtistsQuery } from '@/api/hooks';
import { PageContentSection, PageContentSectionHeading } from '@/components/page';

type Props = {
  artist: SpotifyApi.ArtistObjectFull;
};

export const ArtistRelatedArtists = ({ artist }: Props) => {
  const { data } = useArtistRelatedArtistsQuery(artist.id);

  if (!data) {
    return null;
  }

  return (
    <PageContentSection>
      <PageContentSectionHeading>Fans also like</PageContentSectionHeading>
      <CardList items={data.artists} />
    </PageContentSection>
  );
};
