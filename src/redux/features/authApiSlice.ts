import {
  ActivateUserProps,
  LoginUserProps,
  LoginUserResponseProps,
  RegisterUserProps,
  RegisterUserResponseProps,
  ResetPasswordConfirmProps,
  ResetPasswordProps,
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
    activateUser: builder.mutation<void, ActivateUserProps>({
      query: ({ uid, token }) => ({
        url: "/users/activation/",
        method: "POST",
        body: { uid, token },
      }),
    }),
    resetPassword: builder.mutation<void, ResetPasswordProps>({
      query: ({ email }) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),
    resetPasswordConfirm: builder.mutation<void, ResetPasswordConfirmProps>({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useVerifyMutation,
  useLoginMutation,

  useActivateUserMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useLogoutMutation,
} = authApiSlice;
