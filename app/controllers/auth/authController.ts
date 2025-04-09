import { Request, Response, NextFunction } from "express";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import {
  registerValidator,
  loginValidator,
} from "../../validators/auth/authValidator";
import asyncHandler from "../../middlewares/asyncHandlerMiddleware";
import { responseError, responseSuccess } from "../../utils";
import { INVALID_DATA } from "../../config/app";
import { StatusCode } from "../../enums/statusCode";
import User from "../../models/userModel";
import { Role } from "../../enums/role";
import {
  createToken,
  destroyToken,
  getVerifyToken,
} from "../../services/jwtService";
import { sendEmail } from "../../services/emailService";
import { userResource } from "../../resources/users/userResource";

/**
 * Create a new user
 */
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, errors } = await validatorMiddleware(
      registerValidator,
      req.body
    );

    if (!success) {
      return responseError(res, INVALID_DATA, StatusCode.BAD_REQUEST, errors);
    }

    const { name, email, password } = data;

    const user = await User.query().create({
      name,
      email,
      password,
      role_id: Role.USER,
    });

    sendEmail(email, "User Registration!", name);

    return responseSuccess(
      res,
      userResource(user),
      "User created successfully",
      StatusCode.CREATED
    );
  }
);

/**
 * Login a user
 */
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, errors } = await validatorMiddleware(
      loginValidator,
      req.body
    );

    if (!success) {
      return responseError(res, INVALID_DATA, StatusCode.BAD_REQUEST, errors);
    }

    const user = await User.query().where("email", data.email).first();

    if (user) {
      const token = await createToken(user.id);

      const response = {
        user: userResource(user),
        token,
      };

      return responseSuccess(
        res,
        response,
        "User login successfully",
        StatusCode.OK
      );
    }
  }
);

/**
 * Logout a user
 */
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader, "auth header");

    const token = authHeader?.split(" ")[1];
    if (token) {
      const { userId, tokenType } = await getVerifyToken(token);

      await destroyToken(userId, tokenType, token);

      return responseSuccess(
        res,
        null,
        "User logout successfully",
        StatusCode.OK
      );
    }
  }
);
