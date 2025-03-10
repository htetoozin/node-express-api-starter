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
exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const validatorMiddleware_1 = __importDefault(require("../middlewares/validatorMiddleware"));
const userValidator_1 = require("../validators/userValidator");
const asyncHandlerMiddleware_1 = __importDefault(require("../middlewares/asyncHandlerMiddleware"));
const statusCode_1 = require("../enums/statusCode");
const utils_1 = require("../utils");
/**
 * Display a listing of the users with pagination.
 *
 */
exports.getUsers = (0, asyncHandlerMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, perPage } = (0, utils_1.pgNumber)(Number((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.page));
    const users = yield userModel_1.default.query().paginate(page, perPage);
    (0, utils_1.responseSuccess)(res, users, "Users retrieved successfully", statusCode_1.StatusCode.OK);
}));
/**
 * Display the user resource.
 *
 */
exports.getUser = (0, asyncHandlerMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield userModel_1.default.query().find(id);
    (0, utils_1.responseSuccess)(res, user, "User retrieved successfully", statusCode_1.StatusCode.OK);
}));
/**
 * Create a new user.
 *
 */
exports.createUser = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data, errors } = yield (0, validatorMiddleware_1.default)(userValidator_1.createUserValidator, req.body);
    if (!success) {
        (0, utils_1.responseError)(res, "Invalid data", statusCode_1.StatusCode.BAD_REQUEST, errors);
    }
    const { name, email, password } = data;
    const user = yield userModel_1.default.query().create({
        name,
        email,
        password,
    });
    (0, utils_1.responseSuccess)(res, user, "User created successfully", statusCode_1.StatusCode.CREATED);
}));
/**
 * Update the user.
 *
 */
exports.updateUser = (0, asyncHandlerMiddleware_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data, errors } = yield (0, validatorMiddleware_1.default)(userValidator_1.updateUserValidator, req.body);
    if (!success) {
        (0, utils_1.responseError)(res, "Invalid data", statusCode_1.StatusCode.BAD_REQUEST, errors);
    }
    const { name, email, password } = data;
    const user = yield userModel_1.default.query().update({
        name,
        email,
        password,
    });
    (0, utils_1.responseSuccess)(res, user, "User updated successfully", statusCode_1.StatusCode.OK);
}));
