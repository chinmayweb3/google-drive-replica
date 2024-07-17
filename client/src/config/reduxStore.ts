import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "../store/auth/authStore";
import { driveReducer } from "../store/drive/driveStore";

const CombineReducers = combineReducers({
  auth: authReducer,
  drive: driveReducer,
});

export const store = configureStore({
  reducer: CombineReducers,
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<IAppDispatch>();
