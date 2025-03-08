"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const statusCode_1 = require("../enums/statusCode");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || statusCode_1.StatusCode.INTERNAL_SERVER_ERROR;
    const status = err.status || "error";
    const message = err.message || "Something went wrong";
    if ((0, utils_1.env)("NODE_ENV", "development") === "development") {
        return res.status(statusCode).json({
            success: false,
            status,
            message,
            stack: err.stack,
        });
    }
    return (0, utils_1.responseError)(res, message, statusCode);
};
exports.default = errorHandler;
