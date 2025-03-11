import { Request, Response, NextFunction } from "express";
import { responseError } from "../utils";
import { StatusCode } from "../enums/statusCode";

const notFoundException = (req: Request, res: Response, next: NextFunction) => {
  responseError(res, "Route not found", StatusCode.NOT_FOUND);
};

export default notFoundException;
