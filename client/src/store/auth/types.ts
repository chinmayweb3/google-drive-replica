export type IAuthStore = {
  emailnPasswordLoading: boolean;
  error: string;
  email: string;
  isLoggedIn: boolean;
  displayName?: string;

  user?: IUser;
};

export const initialState: IAuthStore = {
  emailnPasswordLoading: false,
  isLoggedIn: false,
  error: "",
  email: "",
};

export type IUser = {
  email?: string;
  name?: string;
  exp?: number;
  iat?: number;
  user_id?: string;
  email_verified?: boolean;
  uid?: string;
  sub?: string;
};
