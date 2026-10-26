import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from '../services/postsApi';
import requestLogReducer from '../features/requestLogSlice';

export const store = configureStore({
  reducer: {
    // RTK Query cache lives here, under state.postsApi
    [postsApi.reducerPath]: postsApi.reducer,
    // Small helper slice that records every real network request
    requestLog: requestLogReducer,
  },
  // The API middleware manages cache lifetimes, refetching and subscriptions
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware),
});
