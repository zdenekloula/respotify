import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

type User = {
  email?: string | null;
  id?: string;
  image?: string | null;
  name?: string | null;
};

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User | undefined;
    accessTokenExpires: number;
    accessToken: string;
    refreshToken: string;
  }

  interface Account {
    access_token: string;
    expires_in: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User | undefined;
    accessTokenExpires: number;
    accessToken: string;
    refreshToken?: string;
  }
}
