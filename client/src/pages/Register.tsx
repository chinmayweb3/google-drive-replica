import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import authApi from "../api/auth";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submitIt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submited", form);

    const res = await authApi.register(form);

    if (res.status == "success") {
    } else {
      setErr(res.err);
    }
  };
  return (
    <main className="h-screen text-black">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-[600px] rounded-md border border-stone-300 bg-stone-100 px-[100px] py-[80px] shadow-md">
          <h1 className="mb-[50px] text-center text-[46px]">REGISTER</h1>
          <form onSubmit={submitIt} className="flex flex-col gap-[20px]">
            <TextField
              required
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              required
              error={!!err}
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" variant="contained">
              Submit
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
