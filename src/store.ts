import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import { playerSlice } from '@/features/player/playerSlice';

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
