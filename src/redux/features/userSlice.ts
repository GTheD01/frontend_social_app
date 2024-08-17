import { createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../../types/types";

const initialState = {
  email: "",
  followers_count: "",
  following_count: "",
  full_name: "",
  id: "",
  username: "",
  get_avatar: "",
  posts_count: "",
} as UserProps & { isLoading: boolean };

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
    },
    setIsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
});

export const { setUser, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
