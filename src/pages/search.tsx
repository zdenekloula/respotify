import { useTheme } from 'next-themes';
import type { ReactElement } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';

function SearchPage() {
  const { setTheme } = useTheme();

  return (
    <div>
      <button
        onClick={() => {
          setTheme('dark');
        }}
      >
        Change theme to dark
      </button>
      <button
        onClick={() => {
          setTheme('light');
        }}
      >
        Change theme to light
      </button>
      <button
        onClick={() => {
          setTheme('appleMusicLight');
        }}
      >
        Change theme to apple music theme
      </button>
    </div>
  );
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

// eslint-disable-next-line import/no-default-export
export default SearchPage;
