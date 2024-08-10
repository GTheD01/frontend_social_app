import {
  ActivateUserProps,
  LoginUserProps,
  LoginUserResponseProps,
  PostProps,
  RegisterUserProps,
  RegisterUserResponseProps,
  ResetPasswordConfirmProps,
  ResetPasswordProps,
  UserProps,
} from "../../types/types";

import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponseProps, RegisterUserProps>({
      query: ({ full_name, username, email, password, re_password }) => ({
        url: "/users/",
        method: "POST",
        body: { full_name, username, email, password, re_password },
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
    retrieveUser: builder.query<UserProps, void>({
      query: () => "/users/me/",
      providesTags: ["User"],
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: "/posts/create/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Post"],
    }),
    retrievePosts: builder.query<PostProps[], void>({
      query: () => "/posts/",
      providesTags: ["Post"],
    }),
    retrievePostDetails: builder.query({
      query: (id) => `posts/${id}/`,
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    editProfile: builder.mutation({
      query: (formData) => ({
        url: "profile/edit/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRetrieveUserQuery,
  useRetrievePostsQuery,
  useRetrievePostDetailsQuery,

  useRegisterMutation,
  useDeletePostMutation,
  useVerifyMutation,
  useLoginMutation,
  useActivateUserMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useLogoutMutation,
  useCreatePostMutation,
  useEditProfileMutation,
} = authApiSlice;
