import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { PostProps } from "../../types/types";

interface AuthState {
  actionModal: string | null;
  posts: PostProps[];
}

const initialState = {
  actionModal: null,
  posts: [],
} as AuthState;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    toggleActionModal: (state, { payload }) => {
      state.actionModal = state.actionModal === payload.id ? null : payload.id;
    },
    closeActionModal: (state) => {
      state.actionModal = null;
    },
    openActionModal: (state, { payload }) => {
      state.actionModal = payload.id;
    },

    setPost: (state, action: PayloadAction<PostProps[]>) => {
      state.posts = action.payload;
    },

    appendPosts: (state, action: PayloadAction<PostProps[]>) => {
      state.posts = [...state.posts, ...action.payload];
    },

    updateSavedPost: (state, postId: PayloadAction<string>) => {
      const post = state.posts.find((post) => post.id === postId.payload);

      if (post) {
        post.post_saved = !post.post_saved;
      }
    },

    addPost: (state, post: PayloadAction<PostProps>) => {
      state.posts.unshift(post.payload);
    },

    updateDeletePost: (state, postId: PayloadAction<string>) => {
      state.posts = state.posts.filter((post) => post.id !== postId.payload);
    },

    deletePostComments: (state, postId: PayloadAction<string>) => {
      const postToUpdate = state.posts.findIndex(
        (post) => post.id === postId.payload
      );
      if (postToUpdate !== -1) {
        state.posts[postToUpdate].comments_count = String(
          Number(state.posts[postToUpdate].comments_count) - 1
        );
      }
    },
    addPostComment: (state, postId: PayloadAction<string>) => {
      const postToUpdate = state.posts.findIndex(
        (post) => post.id === postId.payload
      );
      if (postToUpdate !== -1) {
        state.posts[postToUpdate].comments_count = String(
          Number(state.posts[postToUpdate].comments_count) + 1
        );
      }
    },

    updateLikePost: (state, postId: PayloadAction<string>) => {
      const post = state.posts.find((post) => post.id === postId.payload);

      if (post) {
        if (post.user_liked) {
          const calc = Number(post.likes_count) - 1;
          post.likes_count = String(calc);
          post.user_liked = false;
        } else {
          const calc = Number(post.likes_count) + 1;
          post.likes_count = String(calc);
          post.user_liked = true;
        }
      }
    },
  },
});

export const {
  toggleActionModal,
  closeActionModal,
  updateDeletePost,
  openActionModal,
  setPost,
  updateLikePost,
  updateSavedPost,
  addPost,
  addPostComment,
  deletePostComments,
  appendPosts,
} = postSlice.actions;
export default postSlice.reducer;
