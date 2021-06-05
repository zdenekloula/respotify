import React from 'react';
import { FeaturedPlaylists } from './components/FeaturedPlaylists';
import { HomepageIntroSection } from './components/IntroSection';
import { NewReleases } from './components/NewReleases';
import { PageContentSection } from '@/components/page';

export type HomepageProps = {
  recentlyPlayedTracks: SpotifyApi.UsersRecentlyPlayedTracksResponse;
};

export const Homepage = ({ recentlyPlayedTracks }: HomepageProps) => {
  return (
    <section>
      <PageContentSection
        css={{
          paddingTop: '$spacing06',
        }}
      >
        <HomepageIntroSection recentlyPlayedTracks={recentlyPlayedTracks} />
      </PageContentSection>
      <PageContentSection>
        <FeaturedPlaylists />
      </PageContentSection>
      <PageContentSection>
        <NewReleases />
      </PageContentSection>
    </section>
  );
};
