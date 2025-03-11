"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sutando_1 = require("sutando");
const utils_1 = require("../utils");
const statusCode_1 = require("../enums/statusCode");
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || statusCode_1.StatusCode.INTERNAL_SERVER_ERROR;
    err.status = err.status || "error";
    if (err instanceof sutando_1.ModelNotFoundError) {
        next((0, utils_1.responseError)(res, `${err.getModel()} not found`, statusCode_1.StatusCode.NOT_FOUND, (0, utils_1.env)("APP_ENV") === "development" ? err.stack : null));
    }
    if ((0, utils_1.env)("APP_ENV") === "development") {
        next((0, utils_1.responseError)(res, err.message, err.statusCode, err.stack));
    }
    const message = "Internal server error";
    next((0, utils_1.responseError)(res, message, statusCode_1.StatusCode.INTERNAL_SERVER_ERROR));
};
exports.default = errorHandler;
