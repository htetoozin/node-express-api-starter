"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteS3File = exports.deleteFile = exports.uploadS3File = exports.uploadFile = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
const app_1 = require("../config/app");
const filesystem_1 = require("../config/filesystem");
/**
 * S3 config
 */
const s3Config = new client_s3_1.S3Client({
    credentials: {
        accessKeyId: (filesystem_1.s3 === null || filesystem_1.s3 === void 0 ? void 0 : filesystem_1.s3.key) || "",
        secretAccessKey: filesystem_1.s3.secret || "",
    },
    region: filesystem_1.s3.region || "",
    forcePathStyle: true,
});
/**
 * Get S3 storage
 * @param path
 * @returns
 */
const s3Storage = (path) => {
    return (0, multer_s3_1.default)({
        s3: s3Config,
        bucket: filesystem_1.s3.bucket || "",
        acl: "public-read",
        contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname,
                bucket: filesystem_1.s3.bucket,
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
const validation = (req, file, callback) => {
    const extension = path_1.default
        .extname(file.originalname)
        .toLocaleLowerCase()
        .slice(1);
    const extname = app_1.ACCEPTED_FILE_TYPES.includes(extension);
    if (!extname) {
        return callback(new Error(`Only ${app_1.ACCEPTED_FILE_TYPES} formats are allowed`));
    }
    return callback(null, true);
};
/**
 * GEt local storage
 * @param path
 * @returns
 */
const localStorage = (path) => {
    return multer_1.default.diskStorage({
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
const uploadCallback = (upload, name, req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, function (error) {
            if (error instanceof multer_1.default.MulterError &&
                (error === null || error === void 0 ? void 0 : error.code) === "LIMIT_FILE_SIZE") {
                return reject({
                    [name]: `File must not be greater than ${app_1.MAX_FILE_SIZE} MB`,
                });
            }
            else if (error instanceof Error) {
                return reject({ [name]: error.message });
            }
            else if (!req.file) {
                return reject({ [name]: "Image is required" });
            }
            return resolve(req.file);
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
const uploadFile = (name = "image", path, req, res) => {
    return new Promise((resolve, reject) => {
        const upload = (0, multer_1.default)({
            storage: localStorage(path),
            limits: { fileSize: (0, utils_1.MB)(app_1.MAX_FILE_SIZE) },
            fileFilter: validation,
        }).single(name);
        uploadCallback(upload, name, req, res)
            .then((file) => {
            const imagePath = file.filename;
            const uploadPath = path.split("public/").pop() || "uploads";
            resolve(`${uploadPath}/${imagePath}`);
        })
            .catch(reject);
    });
};
exports.uploadFile = uploadFile;
/**
 * Upload file to s3
 * @param name
 * @param imagePath
 * @param req
 * @param res
 * @returns
 */
const uploadS3File = (name = "image", path, req, res) => {
    return new Promise((resolve, reject) => {
        const upload = (0, multer_1.default)({
            storage: s3Storage(path),
            limits: { fileSize: (0, utils_1.MB)(app_1.MAX_FILE_SIZE) },
            fileFilter: validation,
        }).single(name);
        uploadCallback(upload, name, req, res)
            .then((file) => {
            const imagePath = file.key;
            resolve(imagePath);
        })
            .catch(reject);
    });
};
exports.uploadS3File = uploadS3File;
/**
 * Delete file to public folder
 * @param path
 */
const deleteFile = (path) => {
    (0, utils_1.deletePath)((0, utils_1.publicPath)(path));
};
exports.deleteFile = deleteFile;
/**
 * Delete file from s3
 * @param path
 */
const deleteS3File = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const s3Config = new client_s3_1.S3Client({
        credentials: {
            accessKeyId: (filesystem_1.s3 === null || filesystem_1.s3 === void 0 ? void 0 : filesystem_1.s3.key) || "",
            secretAccessKey: filesystem_1.s3.secret || "",
        },
        region: filesystem_1.s3.region || "",
        forcePathStyle: true,
        maxAttempts: 3,
        retryMode: "standard",
        logger: console,
    });
    const params = {
        Bucket: filesystem_1.s3.bucket || "",
        Key: path,
    };
    try {
        const command = new client_s3_1.DeleteObjectCommand(params);
        yield s3Config.send(command);
    }
    catch (error) {
        console.log(error, "error");
    }
});
exports.deleteS3File = deleteS3File;
