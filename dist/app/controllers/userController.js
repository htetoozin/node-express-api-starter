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
exports.uploadImage = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../models/userModel"));
const validatorMiddleware_1 = __importDefault(require("../middlewares/validatorMiddleware"));
const userValidator_1 = require("../validators/userValidator");
const asyncHandlerMiddleware_1 = __importDefault(require("../middlewares/asyncHandlerMiddleware"));
const statusCode_1 = require("../enums/statusCode");
const userFilter_1 = __importDefault(require("../filters/userFilter"));
const app_1 = require("../config/app");
const utils_1 = require("../utils");
const uploadService_1 = require("../services/uploadService");
/**
 * Display a listing of the users with pagination.
 *
 */
exports.getUsers = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, perPage } = (0, utils_1.pgNumber)(Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page));
    const filter = new userFilter_1.default(req.query);
    const users = yield userModel_1.default.query().filter(filter).paginate(page, perPage);
    return (0, utils_1.responseSuccess)(res, users, "Users retrieved successfully", statusCode_1.StatusCode.OK);
}));
/**
 * Display the user resource.
 *
 */
exports.getUser = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.query().findOrFail(req.params.id);
    return (0, utils_1.responseSuccess)(res, user, "User retrieved successfully", statusCode_1.StatusCode.OK);
}));
/**
 * Create a new user.
 *
 */
exports.createUser = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data, errors } = yield (0, validatorMiddleware_1.default)(userValidator_1.createUserValidator, req.body);
    if (!success) {
        return (0, utils_1.responseError)(res, app_1.INVALID_DATA, statusCode_1.StatusCode.BAD_REQUEST, errors);
    }
    const { name, email, password } = data;
    const user = yield userModel_1.default.query().create({
        name,
        email,
        password,
    });
    return (0, utils_1.responseSuccess)(res, user, "User created successfully", statusCode_1.StatusCode.CREATED);
}));
/**
 * Update the user.
 *
 */
exports.updateUser = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.query().findOrFail(req.params.id);
    const { success, data, errors } = yield (0, validatorMiddleware_1.default)((0, userValidator_1.updateUserValidator)(Number(req.params.id)), req.body);
    if (!success) {
        return (0, utils_1.responseError)(res, app_1.INVALID_DATA, statusCode_1.StatusCode.BAD_REQUEST, errors);
    }
    const { name, email, password } = data;
    yield userModel_1.default.query()
        .where("id", user.id)
        .update(Object.assign({ name,
        email }, (password && {
        password: bcrypt_1.default.hashSync(password, 10),
    })));
    return (0, utils_1.responseSuccess)(res, user, "User updated successfully", statusCode_1.StatusCode.OK);
}));
/**
 * Delete the user.
 */
exports.deleteUser = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.query().findOrFail(req.params.id);
    yield user.delete();
    return (0, utils_1.responseSuccess)(res, null, "User deleted successfully", statusCode_1.StatusCode.NO_CONTENT);
}));
/**
 * Upload user profile image.
 */
exports.uploadImage = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.query().findOrFail(req.params.id);
    //public upload storage
    const folderPath = (0, utils_1.publicPath)("uploads");
    //s3 storage
    // const folderPath = "development/uploads";  (You can change s3 folder path here)
    yield (0, uploadService_1.uploadFile)("path", folderPath, req, res)
        .then((image) => {
        if (user === null || user === void 0 ? void 0 : user.path) {
            (0, uploadService_1.deleteFile)(user.path);
        }
        console.log(image, "image");
        user.update({
            path: image,
        });
        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            path: (0, utils_1.imagePath)(image),
        };
        return (0, utils_1.responseSuccess)(res, response, "User profile updated successfully", statusCode_1.StatusCode.OK);
    })
        .catch((error) => {
        return (0, utils_1.responseError)(res, app_1.INVALID_DATA, statusCode_1.StatusCode.BAD_REQUEST, [
            { path: error.path },
        ]);
    });
}));
