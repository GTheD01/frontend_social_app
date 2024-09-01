import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { setAuth, logout } from "../features/authSlice";
import { Mutex } from "async-mutex";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `http://127.0.0.1:8000/api`,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // If we want to retrieve the access token(when it expires) with the refresh token
  // then we need to check for error.status 400 as well
  // with 401 we just make sure if we have the access token
  // we are authorized even after refershing the page
  if (
    (result.error && result.error.status === 401) ||
    result.error?.status === 400
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          {
            url: "/jwt/refresh/",
            method: "POST",
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(setAuth());
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (_builder) => ({}),
  tagTypes: ["Post", "User", "Messages", "Notifications"],
});
