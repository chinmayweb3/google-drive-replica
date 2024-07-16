import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import folderRouter from "./folder";
import documentRouter from "./document";
import authRouter from "./auth";
dotenv.config();
const port = process.env.PORT || 3000;
const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/folders", folderRouter);
app.use("/documents", documentRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
