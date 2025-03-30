import { StatusCodes } from "http-status-codes";

export class ApiError extends Error {
  public statusCode: number;
  public details?: any;

  constructor(
    message: string,
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
    details: any = {},
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", details: any = {}) {
    super(message, StatusCodes.BAD_REQUEST, details);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details: any = {}) {
    super(message, StatusCodes.UNAUTHORIZED, details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource Not Found", details: any = {}) {
    super(message, StatusCodes.NOT_FOUND, details);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Conflict", details: any = {}) {
    super(message, StatusCodes.CONFLICT, details);
  }
}
