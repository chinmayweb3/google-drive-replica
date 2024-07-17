export type IAuthSore = {
  emailnPasswordLoading: boolean;
  error: string;
  email: string;
  displayName?: string;
};

export const initialState: IAuthSore = {
  emailnPasswordLoading: false,
  error: "",
  email: "",
};
