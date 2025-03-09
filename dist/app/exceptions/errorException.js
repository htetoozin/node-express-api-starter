"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const statusCode_1 = require("../enums/statusCode");
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || statusCode_1.StatusCode.INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";
    if ((0, utils_1.env)("NODE_ENV") === "development") {
        next((0, utils_1.responseError)(res, err.message, err.statusCode, err.stack));
    }
    next((0, utils_1.responseError)(res, err.message, err.statusCode));
};
exports.default = errorHandler;
