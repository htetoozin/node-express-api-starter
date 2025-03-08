"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundException = (req, res, next) => {
    res.status(404).json({
        success: false,
        status: "fail",
        message: "route not found",
    });
};
exports.default = notFoundException;
