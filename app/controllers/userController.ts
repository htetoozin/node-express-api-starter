import { request, Request, Response, type NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import validatorMiddleware from "../middlewares/validatorMiddleware";
import {
  createUserValidator,
  updateUserValidator,
} from "../validators/userValidator";
import asyncHandler from "../middlewares/asyncHandlerMiddleware";
import { StatusCode } from "../enums/statusCode";
import UserFilter from "../filters/userFilter";
import { INVALID_DATA } from "../config/app";
import { pgNumber, publicPath, responseError, responseSuccess } from "../utils";
import {
  deleteFile,
  uploadFile,
  uploadS3File,
} from "../services/uploadService";

/**
 * Display a listing of the users with pagination.
 *
 */
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { page, perPage } = pgNumber(Number(req?.query?.page));

    const filter = new UserFilter(req.query);
    const users = await User.query().filter(filter).paginate(page, perPage);

    return responseSuccess(
      res,
      users,
      "Users retrieved successfully",
      StatusCode.OK
    );
  }
);

/**
 * Display the user resource.
 *
 */
export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.query().findOrFail(req.params.id);

    return responseSuccess(
      res,
      user,
      "User retrieved successfully",
      StatusCode.OK
    );
  }
);

/**
 * Create a new user.
 *
 */
export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { success, data, errors } = await validatorMiddleware(
      createUserValidator,
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
    });

    return responseSuccess(
      res,
      user,
      "User created successfully",
      StatusCode.CREATED
    );
  }
);

/**
 * Update the user.
 *
 */
export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.query().findOrFail(req.params.id);

    const { success, data, errors } = await validatorMiddleware(
      updateUserValidator(Number(req.params.id)),
      req.body
    );

    if (!success) {
      return responseError(res, INVALID_DATA, StatusCode.BAD_REQUEST, errors);
    }
    const { name, email, password } = data;

    await User.query()
      .where("id", user.id)
      .update({
        name,
        email,
        ...(password && {
          password: bcrypt.hashSync(password, 10),
        }),
      });

    return responseSuccess(
      res,
      user,
      "User updated successfully",
      StatusCode.OK
    );
  }
);

/**
 * Delete the user.
 */
export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.query().findOrFail(req.params.id);

    await user.delete();

    return responseSuccess(
      res,
      null,
      "User deleted successfully",
      StatusCode.NO_CONTENT
    );
  }
);

/**
 * Upload user profile image.
 */
export const uploadImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.query().findOrFail(req.params.id);

    //public upload storage
    const folderPath = publicPath("uploads");

    //s3 storage
    // const folderPath = "development/uploads";  (You can change s3 folder path here)

    await uploadFile("path", folderPath, req, res)
      .then((image) => {
        if (user?.path) {
          deleteFile(user.path);
        }
        user.update({
          path: image,
        });
        responseSuccess(
          res,
          user,
          "User profile updated successfully",
          StatusCode.OK
        );
      })
      .catch((error) => {
        responseError(res, INVALID_DATA, StatusCode.BAD_REQUEST, [
          { path: error.path },
        ]);
      });
  }
);
