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
import {
  basePath,
  pathDelete,
  pgNumber,
  responseError,
  responseSuccess,
} from "../utils";
import fs from "fs";
import multer from "multer";
import { getFile } from "../services/uploadService";

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

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
}).single("image");

export const uploadImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.query().findOrFail(req.params.id);

    const folderPath = basePath("../../public/uploads");

    await getFile("path", folderPath, req, res)
      .then((image) => {
        if (user?.path) {
          const oldImagePath = basePath(`../../public/${user.path}`);

          pathDelete(oldImagePath);
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
