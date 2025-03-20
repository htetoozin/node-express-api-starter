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
exports.updateUserValidator = exports.createUserValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const userModel_1 = __importDefault(require("../models/userModel"));
/**
 * Create user validator
 */
exports.createUserValidator = zod_1.default
    .object({
    name: zod_1.default.string({
        required_error: "Name is required",
        invalid_type_error: "Name is a string",
    }),
    email: zod_1.default
        .string({
        invalid_type_error: "Email is required",
    })
        .email({
        message: "Invalid email format",
    })
        .superRefine((email, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.query().where("email", email).first();
        if (user) {
            ctx.addIssue({
                code: zod_1.default.ZodIssueCode.custom,
                message: "Email already exists",
                path: ["email"],
            });
        }
    })),
    password: zod_1.default
        .string({
        required_error: "Password is required",
        invalid_type_error: "Passowrd is a string",
    })
        .min(6, {
        message: "Password must be at least 6 characters",
    }),
    password_confirmation: zod_1.default.string({
        required_error: "Password confirmation is required",
    }),
})
    .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords doesn't match",
    path: ["password_confirmation"],
});
/**
 * Update user validator
 */
const updateUserValidator = (userId) => zod_1.default.object({
    name: zod_1.default.string({
        required_error: "Name is required",
        invalid_type_error: "Name is a string",
    }),
    email: zod_1.default
        .string({
        required_error: "Email is required",
    })
        .email({
        message: "Invalid email format",
    })
        .superRefine((email, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userModel_1.default.query()
            .where("id", "!=", userId)
            .where("email", email)
            .first();
        if (user) {
            ctx.addIssue({
                code: zod_1.default.ZodIssueCode.custom,
                message: "Email is already taken by other user",
                path: ["email"],
            });
        }
    })),
    role_id: zod_1.default.number({
        required_error: "Role ID is required",
        invalid_type_error: "Role ID is an integer",
    }),
    password: zod_1.default
        .string()
        .min(6, {
        message: "Password must be at least 6 characters",
    })
        .nullable(),
});
exports.updateUserValidator = updateUserValidator;
