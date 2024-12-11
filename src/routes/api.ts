import express from "express";
import { usersRouter } from "./users/users-router";

export const api = express();

api.use("/users", usersRouter);
