"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createUserValidator = zod_1.default
    .object({
    name: zod_1.default.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    email: zod_1.default.string().email({
        message: "Email is required",
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
