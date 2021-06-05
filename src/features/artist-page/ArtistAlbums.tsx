import React from 'react';
import { CardList } from '../card-list';
import { useArtistAlbumsQuery } from '@/api/hooks';
import { PageContentSection, PageContentSectionHeading } from '@/components/page';

type Props = {
  artistId: string;
  title: React.ReactNode;
};

export const ArtistAlbums = ({ title, artistId }: Props) => {
  const { data } = useArtistAlbumsQuery(artistId);

  if (!data) {
    return null;
  }

  return (
    <PageContentSection>
      <PageContentSectionHeading>{title}</PageContentSectionHeading>
      <CardList items={data.items} />
    </PageContentSection>
  );
};
