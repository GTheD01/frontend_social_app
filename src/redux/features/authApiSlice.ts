import {
  LoginUserProps,
  LoginUserResponseProps,
  RegisterUserProps,
  RegisterUserResponseProps,
} from "../../types/types";

import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponseProps, RegisterUserProps>({
      query: ({ first_name, last_name, email, password, re_password }) => ({
        url: "/users/",
        method: "POST",
        body: { first_name, last_name, email, password, re_password },
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/jwt/verify/",
        method: "POST",
      }),
    }),
    login: builder.mutation<LoginUserResponseProps, LoginUserProps>({
      query: ({ email, password }) => ({
        url: "/jwt/create/",
        method: "POST",
        body: { email, password },
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyMutation, useLoginMutation } =
  authApiSlice;
