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
exports.createUserValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const userModel_1 = __importDefault(require("../models/userModel"));
exports.createUserValidator = zod_1.default
    .object({
    name: zod_1.default.string({
        invalid_type_error: "Name is required",
    }),
    email: zod_1.default
        .string()
        .email({
        message: "Email is required",
    })
        .refine((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.query().where("email", value).first();
        return !!user;
    }), {
        message: "Email already exists",
    }),
    password: zod_1.default.string().min(6, {
        message: "Password is required",
    }),
    password_confirmation: zod_1.default.string({
        required_error: "Password confirmation is required",
    }),
})
    .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});
