import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { login, selectCurrentToken } from '@/features/auth/authSlice';
import type { RootState } from '@/store/store';
import { Mutex } from 'async-mutex';

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

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

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
          api.dispatch(login(refreshResult.data as any));
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
  tagTypes: ['Product', 'User'],
  endpoints: (builder) => ({}),
});
