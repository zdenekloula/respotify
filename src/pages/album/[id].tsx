import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { useAlbumsQuery } from '@/api/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { AlbumPage } from '@/features/album-page/AlbumPage';

function AlbumDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isIdle, isError, data } = useAlbumsQuery(String(id));

  if (isLoading || isIdle) {
    return null;
  }

  if (isError) {
    return <>Error playlists</>;
  }

  // const playlist = playlistQuery.data;

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <AlbumPage album={data} />
    </>
  );
}

AlbumDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// eslint-disable-next-line import/no-default-export
export default AlbumDetailPage;
