import Head from 'next/head';
import { useRouter } from 'next/router';
import type { ReactElement } from 'react';
import { usePlaylistMetadataQuery, usePlaylistQuery } from '@/api/hooks';
import { MainLayout } from '@/components/layout/MainLayout';
import { PlaylistPage } from '@/features/playlist-page';

function PlaylistDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isIdle, isError, data } = usePlaylistQuery(String(id));
  const {
    isLoading: isLoadingMetadata,
    isIdle: isIdleMetadata,
    data: metadataData,
  } = usePlaylistMetadataQuery(String(id));

  if (isLoading || isIdle || isLoadingMetadata || isIdleMetadata) {
    return null;
  }

  if (isError) {
    return <>Error playlists</>;
  }

  // console.log(metadataData?.attributes);

  const coverImage = metadataData?.attributes?.formatAttributes?.find(
    (attribute) => attribute.key === 'header_image_url_desktop'
  );

  // console.log(coverImage.value);

  return (
    <>
      <Head>
        <title>{data.name}</title>
      </Head>
      <PlaylistPage playlist={data} coverImage={coverImage?.value} />
    </>
  );
}

PlaylistDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// eslint-disable-next-line import/no-default-export
export default PlaylistDetailPage;
