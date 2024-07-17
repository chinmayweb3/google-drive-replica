import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="h-screen text-black">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-[600px] rounded-md border border-stone-300 bg-stone-100 px-[100px] py-[80px] shadow-md">
          <h1 className="mb-[50px] text-center text-[46px]">REGISTER</h1>
          <form className="flex flex-col gap-[20px]">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="url"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
            />
            <Button variant="contained">Submit</Button>
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
