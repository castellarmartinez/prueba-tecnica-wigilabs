import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { httpStatusCodes } from "../utils/constants";

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

export async function validateUser(
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

function invalidUser(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return invalidFieldsError(error.message);
  }

  return "Unexpected error, try again later.";
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
    return (
      "You must enter a 'password' with a length between 6-32 characters."
    );
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
