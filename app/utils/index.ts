import dotenv from "dotenv";
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

  return res.status(code).json({
    status: "success",
    message,
    data: responseData,
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
  return res.status(code).json({
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
