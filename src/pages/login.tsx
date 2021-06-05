import { styled } from '@stitches/react';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Button } from '@/components/button';

const LoginPageContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

function Signin() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <div>
      <Head>
        <title>Login - Spotify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginPageContainer>
        <Button onClick={() => signIn('spotify', { callbackUrl: process.env.NEXTAUTH_URL })}>
          Sign in with Spotify
        </Button>
      </LoginPageContainer>
    </div>
  );
}

// eslint-disable-next-line import/no-default-export
export default Signin;
