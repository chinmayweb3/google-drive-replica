import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { fireAuth } from "../config/firebase";
import { FirebaseAuthError } from "firebase-admin/auth";
dotenv.config();

const router = express.Router();
router.use(express.json());

//get all document
router.post("/login", async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password) {
      throw new Error("email/password is required");
    }
  } catch (err: any) {}
});

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

    return res.status(200).json({
      data: {
        email: verify.email,
        name: verify?.name,
        exp: verify.exp,
        iat: verify.iat,
        user_id: verify?.user_id,
        email_verified: verify.email_verified,
        uid: verify.uid,
        sub: verify.sub,
      },
    });
  }

  res.status(400).json({ data: "failed" });
});

export default router;
