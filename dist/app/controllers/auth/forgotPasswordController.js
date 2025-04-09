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
exports.passwordReset = void 0;
const validatorMiddleware_1 = __importDefault(require("../../middlewares/validatorMiddleware"));
const forgotPasswordValidator_1 = require("../../validators/auth/forgotPasswordValidator");
const asyncHandlerMiddleware_1 = __importDefault(require("../../middlewares/asyncHandlerMiddleware"));
const utils_1 = require("../../utils");
const app_1 = require("../../config/app");
const statusCode_1 = require("../../enums/statusCode");
const userModel_1 = __importDefault(require("../../models/userModel"));
const emailService_1 = require("../../services/emailService");
const userResource_1 = require("../../resources/users/userResource");
/**
 * Send a password reset link to the user's email.
 */
exports.passwordReset = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { success, data, errors } = yield (0, validatorMiddleware_1.default)(forgotPasswordValidator_1.passwordResetValidator, req.body);
    if (!success) {
        return (0, utils_1.responseError)(res, app_1.INVALID_DATA, statusCode_1.StatusCode.BAD_REQUEST, errors);
    }
    const user = yield userModel_1.default.query().where("email", data.email).first();
    if (user) {
        const newPassword = (0, utils_1.random)(8);
        yield user.update({
            password: newPassword,
        });
        const description = `
        You have requested to reset your password.
        Here is your new password: <b> ${newPassword} </b>
        <br />
        Please change your password after logging in.
      `;
        (0, emailService_1.sendEmail)(user.email, "New Password!", user.name, `Password Reset`, description);
        return (0, utils_1.responseSuccess)(res, (0, userResource_1.userResource)(user), "Email sent successfully", statusCode_1.StatusCode.OK);
    }
}));
