import {
  AsyncThunk,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { initialState, IUser } from "./types";
import authApi from "../../api/auth";
import { IRootState } from "../../config/reduxStore";

const emailAndPassClicked: AsyncThunk<any, string, any> = createAsyncThunk(
  "auth/emailAndPassClicked",
  async (pass: string, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const state = getState() as IRootState;

    let resp = await authApi.emailAndPassword(state.auth.email, pass);
    if (resp.status == "error") {
      throw resp.err;
    }

    resp = await authApi.userCheckByToken(resp.data);
    console.log(":resp");

    if (resp.status == "error") {
      throw resp.err;
    }
    return resp.data;
  },
);

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
    logoutClicked: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.user = undefined;
      state.isLoggedIn = false;
    },
    registerResetState: (state) => {
      state.displayName = "";
      state.email = "";
      state.error = "";
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
      // console.log("registerFormSubmit fulfilled ", action.payload.data);
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

    builder.addCase(emailAndPassClicked.pending, (state, action) => {
      state.isLoggedIn = false;
      state.emailnPasswordLoading = true;
    });
    builder.addCase(emailAndPassClicked.fulfilled, (state, action) => {
      const user: IUser = action.payload.data;
      state.emailnPasswordLoading = false;
      state.isLoggedIn = true;
      state.user = user;
    });
    builder.addCase(emailAndPassClicked.rejected, (state, action: any) => {
      // console.log("message ", action);
      state.error = (action?.error?.message as string) ?? "error";
      state.error = "email/password is invalid";

      state.isLoggedIn = false;
      state.emailnPasswordLoading = false;
    });
  },
});

export const authReducer = authSlice.reducer;
export const authStore = {
  emailAndPassClicked,
  registerFormSubmit,
  initializeState,
  loading: authSlice.actions.authLoading,
  emailChanged: authSlice.actions.emailChanged,
  dNameChanged: authSlice.actions.dNameChanged,
  logoutClicked: authSlice.actions.logoutClicked,
  registerResetState: authSlice.actions.registerResetState,
};
