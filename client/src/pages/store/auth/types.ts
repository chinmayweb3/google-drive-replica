export type IAuthSore = {
  emailnPasswordLoading: Boolean;
  error: string;
  email: string;
  displayName?: string;
};

export const initialState: IAuthSore = {
  emailnPasswordLoading: false,
  error: "",
  email: "",
};
