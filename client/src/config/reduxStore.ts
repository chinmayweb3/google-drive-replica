import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { authReducer } from "../pages/store/auth/authStore";

const CombineReducers = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: CombineReducers,
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<IAppDispatch>();
