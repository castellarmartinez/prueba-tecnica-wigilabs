import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";
import { httpStatusCodes } from "../../utils/constants";
import { saveUser } from "../../models/users-model";


export async function httpAddUser(
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
