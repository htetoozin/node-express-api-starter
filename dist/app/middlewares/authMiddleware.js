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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = require("../config/app");
const utils_1 = require("../utils");
const statusCode_1 = require("../enums/statusCode");
const app_2 = require("../config/app");
const jwtService_1 = require("../services/jwtService");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return (0, utils_1.responseError)(res, app_2.UNAUTHORIZED, statusCode_1.StatusCode.UNAUTHORIZED);
        }
        const token = authHeader.split(" ")[1];
        const { userId, tokenType } = jsonwebtoken_1.default.verify(token, app_1.jwt.secret);
        const revalidate = yield (0, jwtService_1.getToken)(userId, tokenType, token);
        if (!revalidate) {
            return (0, utils_1.responseError)(res, "Token not found", statusCode_1.StatusCode.UNAUTHORIZED);
        }
        req.user = { userId, tokenType };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return (0, utils_1.responseError)(res, "Token has expired", statusCode_1.StatusCode.UNAUTHORIZED);
        }
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return (0, utils_1.responseError)(res, "Invalid token", statusCode_1.StatusCode.UNAUTHORIZED);
        }
        return (0, utils_1.responseError)(res, app_2.UNAUTHORIZED, statusCode_1.StatusCode.UNAUTHORIZED);
    }
});
exports.auth = auth;
