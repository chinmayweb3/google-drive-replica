import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types";

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authLoading: (state, action: PayloadAction<Boolean>) => {
      state.emailnPasswordLoading = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authStore = {
  loading: authSlice.actions.authLoading,
};
