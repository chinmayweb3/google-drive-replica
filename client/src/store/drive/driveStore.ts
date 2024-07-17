import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./type";
import driveApi from "../../api/drive";

const uploadFile: AsyncThunk<void, File, any> = createAsyncThunk(
  "drive/uploadSingleFile",
  async (file: File, _) => {
    const response = await driveApi.uploadFile(file);
  },
);

const driveSlice = createSlice({
  name: "drive",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state) => {
      state.uploadingFile = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, _) => {
      state.uploadingFile = false;
    });
    builder.addCase(uploadFile.rejected, (state, _) => {
      state.uploadingFile = false;
    });
  },
});

export const driveReducer = driveSlice.reducer;

export const driveStore = { uploadFile };
