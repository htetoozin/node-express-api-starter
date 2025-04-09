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
exports.getToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const app_1 = require("../config/app");
/**
 * Create jwt token with userId
 * @param userId
 * @param tokenType
 * @returns
 */
const createToken = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, tokenType = "User") {
    const token = jsonwebtoken_1.default.sign({ userId, tokenType }, app_1.jwt.secret, {
        expiresIn: app_1.jwt.expire,
    });
    //previous jwt token delete
    yield database_1.db
        .table("jwt_access_token")
        .where("token_type", tokenType)
        .where("token_id", userId)
        .delete();
    yield database_1.db.table("jwt_access_token").insert({
        token_id: userId,
        token_type: tokenType,
        token: token,
        last_used_at: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    });
    return token;
});
exports.createToken = createToken;
/**
 * Get jwt token
 * @param token
 * @returns
 */
const getToken = (userId_1, ...args_1) => __awaiter(void 0, [userId_1, ...args_1], void 0, function* (userId, tokenType = "User", token) {
    return (yield database_1.db
        .table("jwt_access_token")
        .where("token_id", userId)
        .where("token_type", tokenType)
        .where("token", token)
        .first())
        ? true
        : false;
});
exports.getToken = getToken;
