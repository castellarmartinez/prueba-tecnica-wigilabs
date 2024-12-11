import express from "express";

import { login, register } from "./users-controller";
import {
  validateCredentials,
  validateExistingUser,
  validateLoginFields,
} from "../../middlewares/users-validation";

export const usersRouter = express.Router();

usersRouter
  .post("/register", validateLoginFields, validateExistingUser, register)
  .post("/login", validateLoginFields, validateCredentials, login);
