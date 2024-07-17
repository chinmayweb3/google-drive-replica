import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import folderRouter from "./folder";
import documentRouter from "./document";
import authRouter from "./auth";
dotenv.config();
const port = process.env.PORT || 4000;
const app: Express = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

//test
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/folders", folderRouter);
app.use("/documents", documentRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
