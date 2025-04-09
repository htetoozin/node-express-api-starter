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
exports.deleteDemo = exports.updateDemo = exports.createDemo = exports.getDemo = exports.getDemos = void 0;
const asyncHandlerMiddleware_1 = __importDefault(require("../middlewares/asyncHandlerMiddleware"));
/**
 * Display a listing of the Demos.
 *
 */
exports.getDemos = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
/**
 * Display the Demo resource.
 *
 */
exports.getDemo = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
/**
 * Create a new Demo.
 *
 */
exports.createDemo = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
/**
 * Update the Demo.
 *
 */
exports.updateDemo = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
/**
 * Delete the Demo.
 */
exports.deleteDemo = (0, asyncHandlerMiddleware_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
}));
