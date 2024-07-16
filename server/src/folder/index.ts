import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

//get all folder
router.get("/", (req: Request, res: Response) => {});

//get single folder
router.get("/:id", (req: Request, res: Response) => {});

//create empty folder
router.post("/", (req: Request, res: Response) => {});

//delete a folder
router.delete("/:id", (req: Request, res: Response) => {});

//update a folder
router.patch("/:id", (req: Request, res: Response) => {});

export default router;
