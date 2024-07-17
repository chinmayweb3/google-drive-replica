import React, { useEffect } from "react";
import { useAppDispatch } from "./reduxStore";
import { authStore } from "../store/auth/authStore";

const Initialize = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authStore.initializeState());
  }, []);
  return <>{children}</>;
};

export default Initialize;
