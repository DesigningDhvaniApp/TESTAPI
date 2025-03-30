import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";

import Logger from "../logger";
import { ApiError } from "../utils/errors/AppError";

export const globalErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err instanceof ApiError ? err.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  const details = err instanceof ApiError ? err.details : {};

  Logger.error("Some thing went wrong: " + err);

  res.status(statusCode).json({
    message,
    status: false,
    ...(!isEmpty(details) && { details }),
  });
};
