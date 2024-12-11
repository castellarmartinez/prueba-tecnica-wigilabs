import express from "express";
import { httpAddUser } from "./users-controller";
import { validateUser } from "../../middlewares/users-validation";

export const usersRouter = express.Router();

usersRouter.post("/register", validateUser, httpAddUser);
