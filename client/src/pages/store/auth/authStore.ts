import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./types";

createSlice({
  initialState,
  name: "auth",
  reducers: {
    authLoading: (state, action: PayloadAction<Boolean>) => {
      state.loading = action.payload;
    },
  },
});
