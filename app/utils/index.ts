import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import type { Response } from "express";

dotenv.config();

/** Get env variable with default value */
export const env = (name: string, value?: any) => {
  return process.env[name] || value;
};

/** Response success */
export const responseSuccess = (
  res: Response,
  data: any,
  message: string,
  code: number
) => {
  let responseData = data;
  let paginationData = null;

  if (data?.data?.items) {
    const { data: dataItems, pagination } = data;

    responseData = dataItems.items;

    paginationData = {
      current_page: pagination.currentPage,
      total_page: pagination.totalPage,
      total_items: pagination.totalItems,
    };
  }

  res.status(code).json({
    status: "success",
    message,
    data: responseData || null,
    ...(paginationData && { pagination: paginationData }),
  });
};

/** Response error */
export const responseError = (
  res: Response,
  message: string,
  code: number,
  errors: any = null
) => {
  res.status(code).json({
    status: "error",
    message,
    ...(errors && { errors }),
  });
};

/** Pagination number */
export const pgNumber = (value: number = 1) => {
  return {
    page: value,
    perPage: 10,
  };
};

/** Convert byets to MB */
export const MB = (value: number = 1) => {
  return 1024 * 1024 * value;
};

/** Get public path */
export const publicPath = (value: string) => {
  return path.join(__dirname, `../public/${value}`);
};

/** Delete file path */
export const deletePath = (value: string): void => {
  if (fs.existsSync(value)) {
    fs.unlinkSync(value);
  }
};

/** Get image path */
export const imagePath = (path: string) => {
  if (env("FILESYSTEM_DRIVER") === "s3") {
    return `${env("AWS_REDIRECT_PATH")}/${path}`;
  }

  return `${env("APP_URL")}/${path}`;
};

/** Random  */
export const random = (length: number) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
