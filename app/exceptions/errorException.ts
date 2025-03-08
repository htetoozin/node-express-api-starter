import { Request, Response, NextFunction } from "express";
import { env, responseError } from "../utils";
import { StatusCode } from "../enums/statusCode";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  err.status = err.status || "error";

  if (env("NODE_ENV") === "development") {
    next(responseError(res, err.message, err.statusCode, err.stack));
  }
  next(responseError(res, err.message, err.statusCode));
};

export default errorHandler;
