import { memo as reactMemo } from 'react';

export const memo: <T>(component: T) => T & {
  displayName?: string;
} = reactMemo;
