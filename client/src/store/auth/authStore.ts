import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { initialState } from "./types";
import authApi from "../../api/auth";
import { IRootState } from "../../config/reduxStore";

const registerFormSubmit: AsyncThunk<string, string, any> = createAsyncThunk(
  "auth/registerSubmit",
  async (password: string, thunkApi) => {
    const { getState } = thunkApi;
    const state = getState() as IRootState;

    const resp = await authApi.register({
      email: state.auth.email,
      password,
      name: state.auth.displayName,
    });

    if (resp.status == "success") {
      return resp.msg;
    } else {
      throw resp.err;
    }
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
    dNameChanged: (state, action: PayloadAction<string>) => {
      state.displayName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerFormSubmit.pending, (state) => {
      state.emailnPasswordLoading = true;
    });
    builder.addCase(registerFormSubmit.rejected, (state, action: any) => {
      state.emailnPasswordLoading = false;
      state.error = (action?.error?.message as string) ?? "error";
    });

    builder.addCase(registerFormSubmit.fulfilled, (state, action) => {
      state.emailnPasswordLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const authStore = {
  registerFormSubmit,
  loading: authSlice.actions.authLoading,
  emailChanged: authSlice.actions.emailChanged,
  dNameChanged: authSlice.actions.dNameChanged,
};
