import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

//get all document
router.get("/", (req: Request, res: Response) => {});

//get single document
router.get("/:id", (req: Request, res: Response) => {});

//upload document
router.post("/", (req: Request, res: Response) => {});

//delete a document
router.delete("/:id", (req: Request, res: Response) => {});

//update a document
router.patch("/:id", (req: Request, res: Response) => {});

export default router;
