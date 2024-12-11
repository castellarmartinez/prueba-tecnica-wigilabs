import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../utils/http-responses";
import { httpStatusCodes } from "../../utils/constants";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpException) {
    return res
      .status(err.status)
      .json({ error: err.message });
  }

  return res
    .status(httpStatusCodes.INTERNAL_ERROR.httpCode)
    .json({ error: httpStatusCodes.INTERNAL_ERROR.message });
}
