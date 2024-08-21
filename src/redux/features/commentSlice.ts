import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  commentActionModal: string | null;
}

const initialState = {
  commentActionModal: null,
} as AuthState;

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    toggleCommentActionModal: (state, { payload }) => {
      state.commentActionModal =
        state.commentActionModal === payload.id ? null : payload.id;
    },
    closeCommentActionModal: (state) => {
      state.commentActionModal = null;
    },
    openCommentActionModal: (state, { payload }) => {
      state.commentActionModal = payload.id;
    },
  },
});

export const {
  toggleCommentActionModal,
  closeCommentActionModal,
  openCommentActionModal,
} = commentSlice.actions;
export default commentSlice.reducer;
