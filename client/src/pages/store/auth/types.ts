export type IAuthSore = {
  loading: Boolean;
  error: string;
};

export const initialState: IAuthSore = {
  error: "",
  loading: false,
};
