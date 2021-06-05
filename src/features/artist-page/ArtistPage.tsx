import React from 'react';
import { ArtistAlbums } from './ArtistAlbums';
import { ArtistRelatedArtists } from './ArtistRelatedArtists';
import { ArtistTracklist } from './ArtistTracklist';
import {
  ImageWrapper,
  PageContent,
  PageHeader,
  PageTitle,
  PageContentSection,
  PageContentSectionHeading,
  PageActionsBar,
} from '@/components/page';
import { Text } from '@/components/text';
import { usePageColorizedBackground } from '@/hooks/usePageColorizedBackground';
import { styled } from '@/lib/stitches.config';

export type ArtistPageProps = {
  artist: SpotifyApi.SingleArtistResponse;
  coverImage?: string;
  monthlyListeners?: number;
};

const ArtistPageContainer = styled('div', {
  [`${ImageWrapper}`]: {
    borderRadius: '50%',
  },
});

const ArtistIntroSectionContainer = styled(PageContentSection, {
  padding: '0 $spacing07',
});

export const ArtistPage = ({ artist, coverImage, monthlyListeners }: ArtistPageProps) => {
  const artistAvatar = artist.images[0].url;
  const image = coverImage || artistAvatar;
  usePageColorizedBackground(image);
  const formattedMonthlyListeners = monthlyListeners
    ? Intl.NumberFormat('en-US').format(monthlyListeners)
    : null;
  return (
    <ArtistPageContainer>
      <PageHeader name={artist.name} imageUrl={artistAvatar} coverImageUrl={coverImage}>
        <PageTitle>{artist.name}</PageTitle>
        {formattedMonthlyListeners ? (
          <Text color="base" weight="bold">
            {formattedMonthlyListeners} monthly listeners
          </Text>
        ) : null}
      </PageHeader>
      <PageContent>
        <PageActionsBar uri={artist.uri} enableFollowButton />
        <ArtistIntroSectionContainer>
          <div>
            <PageContentSectionHeading>Popular</PageContentSectionHeading>
            <ArtistTracklist artist={artist} />
          </div>
        </ArtistIntroSectionContainer>

        <ArtistAlbums artistId={artist.id} title="Discography" />
        <ArtistRelatedArtists artist={artist} />
      </PageContent>
    </ArtistPageContainer>
  );
};
