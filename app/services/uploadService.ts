import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { MB } from "../utils";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "../config/app";

/**
 *
 * @param req
 * @param file
 * @param callback
 * @returns
 */
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const extension = path
    .extname(file.originalname)
    .toLocaleLowerCase()
    .slice(1);

  const extname = ACCEPTED_FILE_TYPES.includes(extension);

  if (!extname) {
    callback(new Error(`Only ${ACCEPTED_FILE_TYPES} formats are allowed`));
  }

  return callback(null, true);
};

/**
 *
 * @param file
 * @param imagePath
 * @param req
 * @param res
 * @returns
 */
export const getFile = (
  file: string = "image",
  imagePath: string,
  req: Request,
  res: Response
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const storage = multer.diskStorage({
      destination: imagePath,
      filename: function (req, file, cb) {
        const random = `${(Math.random() + 1)
          .toString(36)
          .substring(6)}_${Date.now()}`;
        const extension = file.originalname.split(".").pop();
        cb(null, `${random}.${extension}`);
      },
    });

    const upload = multer({
      storage,
      limits: { fileSize: MB(MAX_FILE_SIZE) },
      fileFilter,
    }).single(file);

    upload(req, res, function (error) {
      if (
        error instanceof multer.MulterError &&
        error?.code === "LIMIT_FILE_SIZE"
      ) {
        reject({ path: `File must not be greater than ${MAX_FILE_SIZE} MB` });
      } else if (error) {
        reject({ path: error.message });
      } else if (!req.file) {
        reject({ path: "Image is required" });
      } else {
        const imageName = req.file.filename;
        const uploadPath = imagePath.split("public/").pop() || "uploads";
        resolve(`${uploadPath}/${imageName}`);
      }
    });
  });
};
