import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  actionModal: string | null;
}

const initialState = {
  actionModal: null,
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
  },
});

export const { toggleActionModal, closeActionModal, openActionModal } =
  postSlice.actions;
export default postSlice.reducer;
