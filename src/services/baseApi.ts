import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import { login, selectCurrentToken } from '@/store/slices/authSlice';
import type { RootState } from '@/store/store';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = selectCurrentToken(getState() as RootState);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const customFetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          '/auth/refresh',
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(login(refreshResult.data as unknown));
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch({ type: 'auth/logout' });
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: customFetchBase,
  tagTypes: ['Product', 'User', 'Permission'],
  endpoints: (_builder) => ({}),
});
