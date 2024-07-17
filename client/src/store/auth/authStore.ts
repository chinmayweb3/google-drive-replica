import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { initialState, IUser } from "./types";
import authApi from "../../api/auth";
import { IRootState } from "../../config/reduxStore";

const initializeState: AsyncThunk<any, void, any> = createAsyncThunk(
  "auth/initialize",
  async (_, __) => {
    // const { getState } = thunkApi;
    // const state = getState() as IRootState;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw "token is not found";
    }
    const resp = await authApi.userCheckByToken(token);

    if (resp.status == "error") {
      throw resp.err;
    }
    return resp.data;
  },
);

const registerFormSubmit: AsyncThunk<any, string, any> = createAsyncThunk(
  "auth/registerSubmit",
  async (password: string, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const state = getState() as IRootState;

    let resp = await authApi.register({
      email: state.auth.email,
      password,
      name: state.auth.displayName,
    });
    if (resp.status == "error") {
      throw resp.err;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw "token is not found";
    }
    resp = await authApi.userCheckByToken(token);

    if (resp.status == "error") {
      throw resp.err;
    }

    return resp.data;
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
      state.isLoggedIn = false;
    });

    builder.addCase(registerFormSubmit.fulfilled, (state, action) => {
      console.log("registerFormSubmit fulfilled ", action.payload.data);
      const user: IUser = action.payload.data;

      state.emailnPasswordLoading = false;
      state.isLoggedIn = true;
      state.user = user;
    });

    builder.addCase(initializeState.fulfilled, (state, action) => {
      const user: IUser = action.payload.data;
      state.isLoggedIn = true;
      state.user = user;
    });
  },
});

export const authReducer = authSlice.reducer;
export const authStore = {
  registerFormSubmit,
  initializeState,
  loading: authSlice.actions.authLoading,
  emailChanged: authSlice.actions.emailChanged,
  dNameChanged: authSlice.actions.dNameChanged,
};
