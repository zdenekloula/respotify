import { proxy } from 'valtio';

export type AuthState = {
  accessToken: string | null;
  user: SpotifyApi.CurrentUsersProfileResponse | null;
};

export const defaultAuthState = {
  accessToken: null,
  user: null,
};

export const state = proxy<AuthState>(defaultAuthState);

export const setUser = (user: SpotifyApi.CurrentUsersProfileResponse) => {
  state.user = user;
};

export const setAccessToken = (accessToken: string) => {
  state.accessToken = accessToken;
};
