import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/reduxStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authStore } from "../store/auth/authStore";
const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 z-[10] h-[100px] w-full bg-stone-100 px-[80px]">
      <div className="mx-auto flex h-full w-full flex-shrink-0 items-center justify-between">
        <Link to={"/"}>
          <Typography fontWeight={700} fontSize={32}>
            LOGO
          </Typography>
        </Link>

        <LoginProfile />
      </div>
    </div>
  );
};

const LoginProfile = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const logoutClicked = () => {
    dispatch(authStore.logoutClicked());
  };

  if (isLoggedIn) {
    return (
      <div className="flex gap-[30px]">
        <Button onClick={logoutClicked} variant="contained">
          Logout
        </Button>
        <div className="h-[50px] w-[50px]">
          <AccountCircleIcon sx={{ width: "100%", height: "100%" }} />
        </div>
      </div>
    );
  }

  return (
    <Link to={"/auth/login"}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className="bg-slate-100 text-[22px]"
      >
        Login
      </Button>
    </Link>
  );
};

export default Navbar;
