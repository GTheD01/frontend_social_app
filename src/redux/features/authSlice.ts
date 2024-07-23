import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

// isLoading must be initially set to true so when we refresh the page
// if there is token we can access the authenticated pages

const initialState = {
  isAuthenticated: false,
  isLoading: true,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    finishedInitialLoad: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setAuth, logout, finishedInitialLoad } = authSlice.actions;
export default authSlice.reducer;
