import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
// import { queryClient } from '@/api/client';
// import { getArtistRelatedArtists } from '@/api/getArtistRelatedArtists';
// import { getArtistTopTracks } from '@/api/getArtistTopTracks';
import { useArtistMissingDataQuery, useArtistQuery } from '@/api/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { ArtistPage } from '@/features/artist-page';

function ArtistDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const artistId = String(id);

  const { isLoading, isIdle, isError, data } = useArtistQuery(artistId);
  const {
    data: missingData,
    isLoading: missingDataLoading,
    isIdle: missingDataIdle,
  } = useArtistMissingDataQuery(artistId);

  useEffect(() => {
    // queryClient.prefetchQuery(['artist', artistId, 'top-tracks'], () =>
    //   getArtistTopTracks(artistId)
    // );
    // queryClient.prefetchQuery(['artist', artistId, 'related-artists'], () =>
    //   getArtistRelatedArtists(artistId)
    // );
  }, [artistId]);

  if (isLoading || isIdle || missingDataLoading || missingDataIdle) {
    return null;
  }

  if (isError) {
    return <>Error playlists</>;
  }

  const coverImage = missingData?.visuals.headerImage?.sources[0].url;

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>

      <ArtistPage
        artist={data}
        coverImage={coverImage}
        monthlyListeners={missingData?.stats.monthlyListeners}
      />
    </>
  );
}

ArtistDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// eslint-disable-next-line import/no-default-export
export default ArtistDetailPage;
