import type { ReactElement } from 'react';
import { useRecentlyPlayedTracksQuery } from '@/api/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { Homepage as Home } from '@/features/homepage';

function Homepage() {
  const { isLoading, isIdle, isError, data } = useRecentlyPlayedTracksQuery({
    limit: 6,
  });

  if (isLoading || isIdle) {
    return null;
  }

  if (isError) {
    return <>Error playlists</>;
  }

  return <Home recentlyPlayedTracks={data} />;
}

Homepage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// eslint-disable-next-line import/no-default-export
export default Homepage;
