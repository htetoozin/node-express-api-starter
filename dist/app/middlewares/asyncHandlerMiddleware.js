"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((error) => {
            next(error);
        });
    };
};
exports.default = asyncHandler;
