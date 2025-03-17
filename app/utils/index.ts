import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import type { Response } from "express";

dotenv.config();

/** Get env variable with default value */
export const env = (name: string, value?: string) => {
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

  if (data?._items) {
    responseData = data._items.items;
    paginationData = {
      current_page: data._currentPage,
      total_page: data._lastPage,
      total_items: data._total,
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
  const perPage = 3;
  return {
    page: value,
    perPage,
  };
};

/** Convert byets to MB */
export const MB = (value: number = 1) => {
  return 1024 * 1024 * value;
};

/** Get base path */
export const basePath = (value: string) => {
  return path.join(__dirname, value);
};

/** Delete image path */
export const pathDelete = (value: string): void => {
  if (fs.existsSync(value)) {
    fs.unlinkSync(value);
  }
};
