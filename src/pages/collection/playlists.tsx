import type { ReactElement } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

function CollectionPlaylists() {
  return <p>Hello from collection playlists :)</p>;
}

CollectionPlaylists.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// eslint-disable-next-line import/no-default-export
export default CollectionPlaylists;
