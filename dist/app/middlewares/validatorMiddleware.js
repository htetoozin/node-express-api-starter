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
Object.defineProperty(exports, "__esModule", { value: true });
const validator = (rule, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rule.safeParse(payload);
    if (!result.success) {
        const errors = result.error.errors.map((err) => ({
            [err.path[0]]: err.message,
        }));
        return {
            success: result.success,
            errors,
        };
    }
    return {
        success: result.success,
        data: result.data,
    };
});
exports.default = validator;
