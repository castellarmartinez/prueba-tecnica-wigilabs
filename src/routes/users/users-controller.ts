import { NextFunction, Request, Response } from "express";
import { logger } from "../../utils/logger";
import { httpStatusCodes } from "../../utils/constants";


export async function httpAddUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {
    logger.info(`Body received: ${JSON.stringify(req.body)}`);
    return res
      .status(httpStatusCodes.SUCCESSFUL_OPERATION.httpCode)
      .json({ ok: true });
  } catch (error) {
    return next(error);
  }
}
