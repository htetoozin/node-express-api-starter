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
exports.passwordResetValidator = void 0;
const zod_1 = __importDefault(require("zod"));
const userModel_1 = __importDefault(require("../../models/userModel"));
/**
 * Password reset validator
 */
exports.passwordResetValidator = zod_1.default
    .object({
    email: zod_1.default
        .string({
        invalid_type_error: "Email is required",
    })
        .email({
        message: "Invalid email format",
    }),
})
    .superRefine((data, ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.query().where("email", data.email).first();
    if (!user) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            message: "User not found",
            path: ["email"],
        });
    }
}));
