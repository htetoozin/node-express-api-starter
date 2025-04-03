import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt as jwtConfig } from "../config/app";
import { responseError } from "../utils";
import { StatusCode } from "../enums/statusCode";
import { UNAUTHORIZED } from "../config/app";
import { getToken } from "../services/jwtService";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return responseError(res, UNAUTHORIZED, StatusCode.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];
    const { userId, tokenType } = jwt.verify(token, jwtConfig.secret) as {
      userId: number;
      tokenType: string;
    };

    const revalidate = await getToken(userId, tokenType, token);

    if (!revalidate) {
      return responseError(res, "Token not found", StatusCode.UNAUTHORIZED);
    }

    (req as any).user = { userId, tokenType };
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return responseError(res, "Token has expired", StatusCode.UNAUTHORIZED);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return responseError(res, "Invalid token", StatusCode.UNAUTHORIZED);
    }
    return responseError(res, UNAUTHORIZED, StatusCode.UNAUTHORIZED);
  }
};
