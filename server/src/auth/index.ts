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
  const { email, password } = req.body;

  try {
    const user = await fireAuth.createUser({ email, password });

    const jwt = await fireAuth.createCustomToken(user.uid);

    res.status(201).json({ data: { jwt } });
  } catch (err: any) {
    res.statusCode = 400;
    console.log("auth/register => ", err);

    if (err instanceof FirebaseAuthError) {
      return res.json({ err: err.message });
    }

    res.json({ err: err?.message ?? "not found" });
  }
});

export default router;
