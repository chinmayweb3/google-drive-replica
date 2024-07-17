import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./type";
import driveApi from "../../api/drive";

const uploadFile: AsyncThunk<void, File, any> = createAsyncThunk(
  "drive/uploadSingleFile",
  async (file: File, thunkApi) => {
    // const response = await fetch("/api/drive/upload", {
    //   method: "POST",
    //   body: formData,
    //   });

    const response = await driveApi.uploadFile(file);
  },
);

const driveSlice = createSlice({
  name: "drive",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadFile.pending, (state, action) => {
      state.uploadingFile = true;
    });
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.uploadingFile = false;
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.uploadingFile = false;
    });
  },
});

export const driveReducer = driveSlice.reducer;

export const driveStore = { uploadFile };
