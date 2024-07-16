import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { fireAuth } from "../config/firebase";
import { getAuth } from "firebase-admin/auth";
dotenv.config();

const router = express.Router();

//get all document
router.post("/login", async (req: Request, res: Response) => {});

//get all document
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await fireAuth.createUser({ email, password });

  const jwt = await fireAuth.createCustomToken(user.uid);

  res.status(200).json({ jwt });
});

export default router;
