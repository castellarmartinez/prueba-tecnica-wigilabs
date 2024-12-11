import express from "express";
import { addUser } from "./users-controller";
import { validateExistingUser, validateUserFields } from "../../middlewares/users-validation";

export const usersRouter = express.Router();

usersRouter.post("/register", validateUserFields, validateExistingUser, addUser);
