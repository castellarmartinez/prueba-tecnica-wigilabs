import express, { Request, Response } from "express";
import { api } from "./routes/api";

export const app = express();

app.use(express.json());

app.use(api);
app.get("/health", (_req: Request, res: Response) => {
  res.send("Server is up and running");
});
