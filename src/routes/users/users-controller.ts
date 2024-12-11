import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";
import { httpStatusCodes } from "../../utils/constants";
import { getAuthToken, saveUser } from "../../models/users-model";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    logger.info(`Trying to register user: ${JSON.stringify(req.body)}`);
    saveUser(req.body);
    return res
      .status(httpStatusCodes.SUCCESSFUL_OPERATION.httpCode)
      .json({ ok: true });
  } catch (error) {
    return next(error);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    logger.info(`Trying to log in user: ${JSON.stringify(req.body)}`);
    const token = getAuthToken(req.body);
    return res
      .status(httpStatusCodes.SUCCESSFUL_OPERATION.httpCode)
      .json({ message: "You are now logged in.", token });
  } catch (error) {
    return next(error);
  }
}
