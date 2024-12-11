import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import { httpStatusCodes } from "../utils/constants";
import { Users } from "../models/users-mongo";

const UserSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp(/^[ a-zA-Z]+$/))
    .min(3)
    .max(32)
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "edu", "co"],
      },
    })
    .required(),

  username: Joi.string().alphanum().min(3).max(32).required(),

  password: Joi.string().min(6).max(32).required(),

  phone: Joi.number().min(1000000).max(999999999999).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "edu", "co"],
      },
    })
    .required(),

  password: Joi.string().required(),
});

export async function validateUserFields(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    await UserSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST.httpCode).json({
      error: invalidUser(error),
    });
  }
}

export async function validateExistingUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const emailTaken = await Users.findOne({ email: req.body.email });
    const usernameTaken = await Users.findOne({ username: req.body.username });

    if (emailTaken) {
      return res.status(httpStatusCodes.CONFLICT.httpCode).json({
        error: "Email already in use.",
      });
    }

    if (usernameTaken) {
      return res.status(httpStatusCodes.CONFLICT.httpCode).json({
        error: "Username already in use.",
      });
    }

    return next();
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST.httpCode).json({
      error: "Unexpected error in user registration. Try again later.",
    });
  }
}

export async function validateCredentials(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(httpStatusCodes.BAD_REQUEST.httpCode).json({
        error: "No user registered with that email.",
      });
    }

    const matchPassword = bcrypt.compareSync(password, user.password);

    if (!matchPassword) {
      return res.status(httpStatusCodes.BAD_REQUEST.httpCode).json({
        error: "The password you entered is incorrect.",
      });
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

export async function validateLoginFields(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    await loginSchema.validateAsync(req.body);
    return next();
  } catch (error) {
    return res.status(httpStatusCodes.BAD_REQUEST.httpCode).json({
      error: invalidULogin(error),
    });
  }
}

function invalidUser(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return invalidFieldsError(error.message);
  }

  return "Unexpected error in user registration. Try again later.";
}

function invalidFieldsError(message: string) {
  if (message.includes('"name"')) {
    return (
      "You must enter a 'name' with a length between " +
      "3-32 characters and only containing letters and spaces."
    );
  }

  if (message.includes('"email"')) {
    return "You must enter a valid 'email'.";
  }

  if (message.includes('"password"')) {
    return "You must enter a 'password' with a length between 6-32 characters.";
  }

  if (message.includes('"username"')) {
    return (
      "You must enter an 'username' with a length " +
      " between 3-32 characters and only containing letters and numbers."
    );
  }

  if (message.includes('"phone"')) {
    return "You must enter a valid 'phone' number.";
  }

  return "The fields you are trying to add are not allowed.";
}

function invalidULogin(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return invalidLoginError(error.message);
  }

  return "Unexpected error in user login. Try again later.";
}

function invalidLoginError(message: string) {
  if (message.includes('"email"')) {
    return "You must enter the user 'email'.";
  }

  if (message.includes('"password"')) {
    return "You must enter the user 'password'.";
  }

  return "The fields you are trying to add are not allowed.";
}
