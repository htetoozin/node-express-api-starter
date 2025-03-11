import { Request, Response, NextFunction } from "express";
import { ModelNotFoundError } from "sutando";
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

  if (err instanceof ModelNotFoundError) {
    next(
      responseError(
        res,
        `${err.getModel()} not found`,
        StatusCode.NOT_FOUND,
        env("APP_ENV") === "development" ? err.stack : null
      )
    );
  }

  if (env("APP_ENV") === "development") {
    next(responseError(res, err.message, err.statusCode, err.stack));
  }

  const message = "Internal server error";
  next(responseError(res, message, StatusCode.INTERNAL_SERVER_ERROR));
};

export default errorHandler;
