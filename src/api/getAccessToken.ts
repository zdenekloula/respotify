type AccessTokenResponse = {
  clientId: string;
  accessToken: string;
  accessTokenExpirationTimestampMs: number;
  isAnonymous: boolean;
};

export const getAccessToken = async (): Promise<AccessTokenResponse> => {
  return fetch(
    `https://open.spotify.com/get_access_token?reason=transport&productType=embed_legacy`
  ).then((r) => r.json());
};
