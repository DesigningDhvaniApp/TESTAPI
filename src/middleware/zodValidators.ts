import { ZodTypeAny, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../utils/errors/AppError";

function handleZodError(err: unknown, type: string): BadRequestError {
  let message = `${type} Validation Failed`;
  let details: any = [];

  if (err instanceof ZodError) {
    message = `Validation failed: ${err.issues.length} error(s) detected in ${type}`;
    details = err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
  }

  return new BadRequestError(message, details);
}

export function ZodBodyValidator(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      next(handleZodError(err, "Body"));
    }
  };
}

export function ZodQueryValidator(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (err) {
      next(handleZodError(err, "Query"));
    }
  };
}

export function ZodParamValidator(schema: ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (err) {
      next(handleZodError(err, "Params"));
    }
  };
}
