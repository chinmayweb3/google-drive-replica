import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { fireAuth } from "../config/firebase";
import { FirebaseAuthError } from "firebase-admin/auth";
dotenv.config();

const router = express.Router();
router.use(express.json());

//get all document
router.post("/login", async (req: Request, res: Response) => {});

//get all document
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password) {
      throw new Error("email/password is required");
    }

    const user = await fireAuth.createUser({
      email,
      password,
      displayName: name,
    });
    const jwt = await fireAuth.createCustomToken(user.uid);

    res.status(201).json({ data: { jwt } });
  } catch (err: any) {
    console.log("auth/register => ", err);
    let errMsg = err?.message ?? "not found";

    if (err instanceof FirebaseAuthError) {
      if (err.code.includes("email-already-exists")) {
        errMsg = "Email already exists";
      } else if (err.code.includes("invalid-password")) {
        errMsg = "characters to short";
      }
    }

    res.status(400).json({ data: { err: errMsg } });
  }
});

router.get("/usercheckbytoken", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    const verify = await fireAuth.verifyIdToken(token);
    console.log("verify ", verify);
    console.log(new Date(verify.iat).toTimeString());
    console.log(new Date(verify.exp).toTimeString());
    console.log(new Date(verify.auth_time).toTimeString());
    return res.json({ data: verify });
  }

  // console.log("token ", token);
  res.json({ data: "failed" });
});

export default router;
