"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const statusCode_1 = require("../enums/statusCode");
const notFoundException = (req, res, next) => {
    (0, utils_1.responseError)(res, "Route not found", statusCode_1.StatusCode.NOT_FOUND);
};
exports.default = notFoundException;
