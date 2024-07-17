export type IAuthSore = {
  emailnPasswordLoading: boolean;
  error: string;
  email: string;
  isLoggedIn: boolean;
  displayName?: string;
};

export const initialState: IAuthSore = {
  emailnPasswordLoading: false,
  isLoggedIn: false,
  error: "",
  email: "",
};
