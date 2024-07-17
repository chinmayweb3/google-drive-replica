export type IDriveStore = {
  uploadingFile: boolean;
  createFolderName: string;
};

export const initialState: IDriveStore = {
  uploadingFile: false,
  createFolderName: "",
};
