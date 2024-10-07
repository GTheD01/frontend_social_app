import { createSlice } from "@reduxjs/toolkit";

import { UserProps } from "../../types/types";

const initialState: UserProps & {
  isLoading?: boolean;
  unreadMessageUsers: Record<number, number>;
} = {
  email: "",
  followers_count: "",
  following_count: "",
  full_name: "",
  id: "",
  username: "",
  get_avatar: "",
  posts_count: "",
  notifications_count: 0,
  user_follows: false,
  suggested_people: [],
  received_messages_count: 0,
  unreadMessageUsers: {},
  mfa_enabled: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.followers_count = payload.followers_count;
      state.following_count = payload.following_count;
      state.username = payload.username;
      state.get_avatar = payload.get_avatar;
      state.id = payload.id;
      state.posts_count = payload.posts_count;
      state.full_name = payload.full_name;
      state.user_follows = payload.user_follows;
      state.notifications_count = payload.notifications_count;
      state.suggested_people = payload.suggested_people;
      state.received_messages_count = payload.received_messages_count;
      state.mfa_enabled = payload.mfa_enabled;
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setNotificationsCount: (state, { payload }) => {
      state.notifications_count += payload.count;
    },
    setMessagesCount: (state, { payload }) => {
      state.received_messages_count = payload.count;
    },
    updateMessagesCount: (state, { payload }) => {
      if (state.received_messages_count >= 0) {
        state.received_messages_count += payload.count;
      }
    },
  },
});

export const {
  setUser,
  setIsLoading,
  setNotificationsCount,
  setMessagesCount,
  updateMessagesCount,
} = userSlice.actions;
export default userSlice.reducer;
