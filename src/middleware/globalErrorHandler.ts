import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";
import { ApiError } from "../utils/errors/AppError";
import Logger from "../logger";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode =
    err instanceof ApiError
      ? err.statusCode
      : StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";
  const details = err instanceof ApiError ? err.details : {};

  Logger.error("Some thing went wrong: " + err);

  res.status(statusCode).json({
    status: false,
    message,
    ...(!isEmpty(details) && { details }),
  });
};
