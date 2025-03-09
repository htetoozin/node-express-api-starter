import { Request, Response, type NextFunction } from "express";
import User from "../models/userModel";
import validatorMiddleware from "../middlewares/validatorMiddleware";
import { createUserValidator } from "../validators/userValidator";
import asyncHandler from "../middlewares/asyncHandlerMiddleware";
import { StatusCode } from "../enums/statusCode";
import { pgNumber, responseError, responseSuccess } from "../utils";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const { page, perPage } = pgNumber(Number(req?.query?.page));

  const users = await User.query().paginate(page, perPage);

  responseSuccess(res, users, "Users retrieved successfully", StatusCode.OK);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.query().find(id);

  responseSuccess(res, user, "User retrieved successfully", StatusCode.OK);
});

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, errors } = await validatorMiddleware(
      createUserValidator,
      req.body
    );

    if (!success) {
      responseError(res, "Invalid data", StatusCode.BAD_REQUEST, errors);
    }

    const { name, email, password } = data;

    const user = await User.query().create({
      name,
      email,
      password,
    });

    responseSuccess(res, user, "User created successfully", StatusCode.CREATED);
  }
);
