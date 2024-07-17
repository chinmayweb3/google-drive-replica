export type IAuthSore = {
  emailnPasswordLoading: boolean;
  error: string;
  email: string;
  isLoggedIn: boolean;
  displayName?: string;

  user?: IUser;
};

export const initialState: IAuthSore = {
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
  uuid?: string;
  sub?: string;
};
