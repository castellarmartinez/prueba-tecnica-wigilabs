import express, { Request, Response } from "express";

export const app = express();

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.send("Server is up and running");
});
