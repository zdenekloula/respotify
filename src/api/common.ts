import Cookies from 'js-cookie';
import { decode } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

/**
 * Usually, you would save the access token to memory and reuse it and refresh it from there but since we cannot detect "when" the access token is actually refreshed (the state inside useSession hook does not trigger rerender), we have to access the cookie directly like this. This is not good from the security perspective but it's currently the only way to avoid unnecessary calls to /session with every API request
 */
export const getAuthToken = async (): Promise<string | undefined> => {
  const jwtToken = Cookies.get(
    process.env.NODE_ENV === 'production'
      ? `__Secure-next-auth.session-token`
      : `next-auth.session-token`
  );
  const token = await decode({
    secret: String(process.env.NEXT_PUBLIC_JWT_SECRET),
    token: jwtToken,
  });

  if (token && Date.now() < token.accessTokenExpires) {
    return token.accessToken;
  }

  const session = await getSession();
  return session?.accessToken;
};

export async function authenticatedFetch(
  input: RequestInfo,
  init: RequestInit = {},
  authToken: string | null = null
): Promise<Response> {
  const token = await getAuthToken();
  const response = await fetch(input, {
    headers: {
      Authorization: `Bearer ${authToken ? authToken : token}`,
      'Content-Type': 'application/json',
    },
    ...init,
  });

  if (!response.ok) {
    // Token bad or expired
    if (response.status === 401) {
      window.location.reload();
      // const data = await response.json().then((data) => data);
      // throw new Error(data.error.message);
    }
    throw new Error(response.statusText);
  }

  return response;
}
