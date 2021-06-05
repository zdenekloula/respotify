import 'modern-normalize';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { queryClient } from '@/api/client';
import { ErrorBoundary } from '@/components/error-boundary';
import { LayoutProvider } from '@/components/layout/MainLayoutContext';
import { AuthProvider } from '@/features/auth/AuthProvider';
import { SpotifyPlaybackSDKProvider } from '@/features/player/SpotifyPlaybackSDKContext';

import { globalStyles } from '@/globalStyles';
import { store } from '@/store';
import { colorThemes } from '@/theme/colorThemes';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  globalStyles();
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ThemeProvider
      disableTransitionOnChange
      attribute="class"
      value={{
        dark: colorThemes.dark.className,
        light: colorThemes.light.className,
        appleMusicLight: colorThemes.appleMusicLight.className,
      }}
      defaultTheme="dark"
    >
      <SessionProvider session={pageProps.session}>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
              <AuthProvider>
                <SpotifyPlaybackSDKProvider>
                  <LayoutProvider>{getLayout(<Component {...pageProps} />)}</LayoutProvider>
                </SpotifyPlaybackSDKProvider>
              </AuthProvider>
            </ErrorBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ReduxProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

// eslint-disable-next-line import/no-default-export
export default MyApp;
