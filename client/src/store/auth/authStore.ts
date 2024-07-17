import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { initialState } from "./types";
import authApi from "../../api/auth";
import { IRootState } from "../../config/reduxStore";

export const registerFormSubmit: AsyncThunk<void, string, any> =
  createAsyncThunk(
    "auth/registerSubmit",
    async (password: string, thunkApi) => {
      const { getState } = thunkApi;
      const state = getState() as IRootState;

      try {
        await authApi.register({ email: state.auth.email, password });
      } catch (err: any) {}
    },
  );

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    authLoading: (state, action: PayloadAction<boolean>) => {
      state.emailnPasswordLoading = action.payload;
    },
    emailChanged: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerFormSubmit.pending, (state) => {
      state.emailnPasswordLoading = true;
    });
  },
});

export const authReducer = authSlice.reducer;
export const authStore = {
  registerFormSubmit,
  loading: authSlice.actions.authLoading,
  emailChanged: authSlice.actions.emailChanged,
};
