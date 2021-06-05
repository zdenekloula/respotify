import type { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { getUser } from './api/getUser';
import { FullpageLoading } from '@/components/loaders';

type Props = {
  children: React.ReactNode;
};

type AuthState = {
  session: Session | null;
  user: SpotifyApi.CurrentUsersProfileResponse | null;
};

type AuthorizedAuthState = AuthState;

// eslint-disable-next-line unicorn/no-useless-undefined
const AuthContext = React.createContext<AuthorizedAuthState | undefined>(undefined);

function isLoginPage(router: NextRouter) {
  return router.pathname === '/login';
}

function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      if (router.pathname !== '/login') {
        router.push('/login');
      }
    },
  });

  const contextValue = useMemo(
    () => ({
      session,
      user,
    }),
    [session, user]
  );

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUser();
        setUser(response);
      } catch {
        throw new Error('Unable to fetch /me');
      }
    }
    if (status === 'authenticated' && !user) {
      fetchUser();
    }
  }, [status, user]);

  if (!isLoginPage(router) && !user && !session) {
    return <FullpageLoading />;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
