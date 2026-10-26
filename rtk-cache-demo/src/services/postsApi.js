import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { requestLogged } from '../features/requestLogSlice';

// How long (seconds) an entry stays in the cache after its last component unmounts.
export const CACHE_SECONDS = 60;

const baseQuery = fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' });

// Wrap the base query so every real HTTP call is recorded in the request log.
// RTK Query only calls this when it actually needs the network (not for cache hits).
const loggingBaseQuery = async (args, api, extraOptions) => {
  const url = typeof args === 'string' ? args : args.url;
  const result = await baseQuery(args, api, extraOptions);
  api.dispatch(
    requestLogged({
      url,
      time: Date.now(),
      ok: !result.error,
      status: result.error ? result.error.status : 200,
    })
  );
  return result;
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: loggingBaseQuery,
  keepUnusedDataFor: CACHE_SECONDS,
  endpoints: (builder) => ({
    // GET /posts?_limit=10  (cache key: "getPosts(undefined)")
    getPosts: builder.query({
      query: () => '/posts?_limit=10',
    }),
    // GET /posts/:id  (cache key per id: "getPost(1)", "getPost(2)", ...)
    getPost: builder.query({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

// Hooks are generated automatically from the endpoint names.
export const { useGetPostsQuery, useGetPostQuery } = postsApi;
