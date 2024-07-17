import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/reduxStore";
import { authStore } from "../store/auth/authStore";

const Register = () => {
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, error, emailnPasswordLoading, displayName, isLoggedIn } =
    useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    return () => {
      dispatch(authStore.registerResetState());
    };
  }, []);

  const submitIt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { meta } = await dispatch(authStore.registerFormSubmit(pass));
    if (meta.requestStatus == "fulfilled") {
      navigate("/");
    }
  };

  return (
    <main className="h-screen text-black">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-[600px] rounded-md border border-stone-300 bg-stone-100 px-[100px] py-[80px] shadow-md">
          <h1 className="mb-[50px] text-center text-[46px]">REGISTER</h1>
          <form onSubmit={submitIt} className="flex flex-col gap-[20px]">
            <TextField
              disabled={emailnPasswordLoading}
              label="Name"
              variant="outlined"
              type="text"
              value={displayName}
              onChange={(e) => dispatch(authStore.dNameChanged(e.target.value))}
            />
            <TextField
              disabled={emailnPasswordLoading}
              required
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => dispatch(authStore.emailChanged(e.target.value))}
            />
            <TextField
              disabled={emailnPasswordLoading}
              required
              label="Password"
              type="password"
              variant="outlined"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <p className="py-[5px] text-[16px]">{error}</p>
            <Button type="submit" variant="contained">
              {emailnPasswordLoading ? "Loading..." : "Login"}
            </Button>
          </form>
          <div className="flex w-full justify-center pt-[40px]">
            <Link className="text-red-600" to={"/auth/login"}>
              login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
