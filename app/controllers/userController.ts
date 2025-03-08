import { Request, Response, type NextFunction } from "express";
import User from "../models/userModel";
import validatorMiddleware from "../middlewares/validatorMiddleware";
import { createUserValidator } from "../validators/userValidator";
import asyncHandler from "../middlewares/asyncHandlerMiddleware";
import { StatusCode } from "../enums/statusCode";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.query().paginate();
  res.status(StatusCode.OK).json({
    success: true,
    data: users,
  });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.query().find(id);

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, errors } = await validatorMiddleware(
      createUserValidator,
      req.body
    );

    // throw new Error("Test");
    if (!success) {
      res.status(400).json({
        success: false,
        message: "Invalid data",
        errors,
      });
      return;
    }

    const { name, email, password } = data;

    const user = await User.query().create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  }
);
