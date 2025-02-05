import express from "express";

import { login, register } from "./users-controller";
import {
  validateCredentials,
  validateExistingUser,
  validateLoginFields,
  validateUserFields,
} from "../../middlewares/users-validation";

export const usersRouter = express.Router();

usersRouter
  .post("/register", validateUserFields, validateExistingUser, register)
  .post("/login", validateLoginFields, validateCredentials, login);
