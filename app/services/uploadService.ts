import { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import path from "path";
import { publicPath, deletePath, MB } from "../utils";
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "../config/app";
import { s3 } from "../config/filesystem";

/**
 * S3 config
 */
const s3Config = new S3Client({
  credentials: {
    accessKeyId: s3?.key || "",
    secretAccessKey: s3.secret || "",
  },
  region: s3.region || "",
  forcePathStyle: true,
});

/**
 * Get S3 storage
 * @param path
 * @returns
 */
const s3Storage = (path: string) => {
  return multerS3({
    s3: s3Config,
    bucket: s3.bucket || "",
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {
        fieldName: file.fieldname,
        bucket: s3.bucket,
      });
    },
    key: function (req, file, cb) {
      const random = `${(Math.random() + 1)
        .toString(36)
        .substring(6)}_${Date.now()}`;
      const extension = file.originalname.split(".").pop();
      cb(null, `${path}/${random}.${extension}`);
    },
  });
};

/**
 *
 * @param req
 * @param file
 * @param callback
 * @returns
 */
const validation = (
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
    return callback(
      new Error(`Only ${ACCEPTED_FILE_TYPES} formats are allowed`)
    );
  }

  return callback(null, true);
};

/**
 * GEt local storage
 * @param path
 * @returns
 */
const localStorage = (path: string) => {
  return multer.diskStorage({
    destination: path,
    filename: function (req, file, cb) {
      const random = `${(Math.random() + 1)
        .toString(36)
        .substring(6)}_${Date.now()}`;
      const extension = file.originalname.split(".").pop();
      cb(null, `${random}.${extension}`);
    },
  });
};

/**
 * @param upload
 * @param path
 * @param req
 * @param res
 * @returns
 */
const uploadCallback = (
  upload: Function,
  name: string,
  req: Request,
  res: Response
) => {
  return new Promise((resolve, reject) => {
    upload(req, res, function (error: any) {
      if (
        error instanceof multer.MulterError &&
        error?.code === "LIMIT_FILE_SIZE"
      ) {
        return reject({
          [name]: `File must not be greater than ${MAX_FILE_SIZE} MB`,
        });
      } else if (error instanceof Error) {
        return reject({ [name]: error.message });
      } else if (!req.file) {
        return reject({ [name]: "Image is required" });
      }
      return resolve(req.file?.filename);
    });
  });
};

/**
 * Upload file to public folder
 * @param name
 * @param path
 * @param req
 * @param res
 * @returns
 */
export const uploadFile = (
  name: string = "image",
  path: string,
  req: Request,
  res: Response
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const upload = multer({
      storage: localStorage(path),
      limits: { fileSize: MB(MAX_FILE_SIZE) },
      fileFilter: validation,
    }).single(name);

    uploadCallback(upload, name, req, res)
      .then((imagePath) => {
        const uploadPath = path.split("public/").pop() || "uploads";
        resolve(`${uploadPath}/${imagePath}`);
      })
      .catch(reject);
  });
};

/**
 * Upload file to s3
 * @param name
 * @param imagePath
 * @param req
 * @param res
 * @returns
 */
export const uploadS3File = (
  name: string = "image",
  path: string,
  req: Request,
  res: Response
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const upload = multer({
      storage: s3Storage(path),
      limits: { fileSize: MB(MAX_FILE_SIZE) },
      fileFilter: validation,
    }).single(name);

    uploadCallback(upload, name, req, res)
      .then((imagePath) => {
        resolve(imagePath);
      })
      .catch(reject);
  });
};

/**
 * Delete file to public folder
 * @param path
 */
export const deleteFile = (path: string): void => {
  deletePath(publicPath(path));
};
