import {
  ActivateUserProps,
  LoginResponse,
  LoginUserProps,
  NotificationProps,
  RegisterUserProps,
  RegisterUserResponseProps,
  ResetPasswordConfirmProps,
  ResetPasswordProps,
  UserProps,
} from "../../types/types";
import { apiSlice } from "../services/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
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
    login: builder.mutation<LoginResponse, LoginUserProps>({
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

    toggleMfa: builder.mutation({
      query: () => ({
        url: "toggle-mfa/",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    verifyMfa: builder.mutation({
      query: ({ otp, email }) => ({
        url: "verify-otp/",
        body: {
          otp: otp,
          email: email,
        },
        method: "POST",
      }),
    }),

    retrieveUsers: builder.query<UserProps[], void>({
      query: () => "/users/",
      providesTags: ["User"],
    }),
    retrieveSearchedUsers: builder.query<UserProps[], string>({
      query: (search) => `/users/search?search=${search}`,
      providesTags: ["User"],
    }),
    // TODO: Change POST to PATCH
    editProfile: builder.mutation({
      query: (formData) => ({
        url: "profile/edit/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    retrieveUserDetails: builder.query({
      query: (username) => ({
        url: `profile/details/${username}`,
      }),
      providesTags: ["User"],
    }),
    followUser: builder.mutation({
      query: (username) => ({
        url: `user/follow/${username}/`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    retrieveNotifications: builder.query<NotificationProps[], void>({
      query: () => "notifications/",
      providesTags: ["Notifications"],
    }),
    readNotification: builder.mutation({
      query: (notificationId) => ({
        url: `notifications/read/${notificationId}/`,
        method: "POST",
      }),
      invalidatesTags: ["Notifications", "User"],
    }),
  }),
});

export const {
  useRetrieveUserQuery,

  useRetrieveUsersQuery,

  useRetrieveUserDetailsQuery,
  useRetrieveSearchedUsersQuery,
  useRetrieveNotificationsQuery,

  useReadNotificationMutation,

  useFollowUserMutation,
  useRegisterMutation,

  useVerifyMfaMutation,
  useToggleMfaMutation,
  useVerifyMutation,
  useLoginMutation,
  useActivateUserMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useLogoutMutation,

  useEditProfileMutation,
} = authApiSlice;
