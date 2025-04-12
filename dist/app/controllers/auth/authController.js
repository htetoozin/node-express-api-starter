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
exports.logout = exports.login = exports.register = void 0;
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const authValidator_1 = require("../../validators/auth/authValidator");
const asyncHandlerMiddleware_1 = __importDefault(require("../../middlewares/asyncHandlerMiddleware"));
const utils_1 = require("../../utils");
const app_1 = require("../../config/app");
const statusCode_1 = require("../../enums/statusCode");
const userModel_1 = __importDefault(require("../../models/userModel"));
const role_1 = require("../../enums/role");
const jwtService_1 = require("../../services/jwtService");
const emailService_1 = require("../../services/emailService");
const userResource_1 = require("../../resources/users/userResource");
/**
 * Create a new user
 */
exports.register = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data, errors } = yield (0, validatorMiddleware_1.default)(authValidator_1.registerValidator, req.body);
    if (!success) {
        return (0, utils_1.responseError)(res, app_1.INVALID_DATA, statusCode_1.StatusCode.BAD_REQUEST, errors);
    }
    const { name, email, password } = data;
    const user = yield userModel_1.default.query().create({
        name,
        email,
        password,
        role_id: role_1.Role.USER,
    });
    (0, emailService_1.sendEmail)(email, "User Registration!", name);
    return (0, utils_1.responseSuccess)(res, (0, userResource_1.userResource)(user), "User created successfully", statusCode_1.StatusCode.CREATED);
}));
/**
 * Login a user
 */
exports.login = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data, errors } = yield (0, validatorMiddleware_1.default)(authValidator_1.loginValidator, req.body);
    if (!success) {
        return (0, utils_1.responseError)(res, app_1.INVALID_DATA, statusCode_1.StatusCode.BAD_REQUEST, errors);
    }
    const user = yield userModel_1.default.query().where("email", data.email).first();
    if (user) {
        const token = yield (0, jwtService_1.createToken)(user.id);
        const response = {
            user: (0, userResource_1.userResource)(user),
            token,
        };
        return (0, utils_1.responseSuccess)(res, response, "User login successfully", statusCode_1.StatusCode.OK);
    }
}));
/**
 * Logout a user
 */
exports.logout = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (token) {
        const { userId, tokenType } = yield (0, jwtService_1.getVerifyToken)(token);
        yield (0, jwtService_1.destroyToken)(userId, tokenType, token);
        return (0, utils_1.responseSuccess)(res, null, "User logout successfully", statusCode_1.StatusCode.OK);
    }
}));
