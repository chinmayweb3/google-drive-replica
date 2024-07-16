import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="fixed left-0 top-0 z-[10] h-[100px] w-full bg-stone-100 px-[80px]">
      <div className="mx-auto flex h-full w-full flex-shrink-0 items-center justify-between">
        <Link to={"/"}>
          <Typography fontWeight={700} fontSize={32}>
            LOGO
          </Typography>
        </Link>
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
      </div>
    </div>
  );
};

export default Navbar;