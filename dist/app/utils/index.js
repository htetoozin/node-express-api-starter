"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgNumber = exports.responseError = exports.responseSuccess = exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/** Get env variable with default value */
const env = (name, value) => {
    return process.env[name] || value;
};
exports.env = env;
/** Response success */
const responseSuccess = (res, data, message, code) => {
    let responseData = data;
    let paginationData = null;
    if (data === null || data === void 0 ? void 0 : data._items) {
        responseData = data._items.items;
        paginationData = {
            current_page: data._currentPage,
            total_page: data._lastPage,
            total_items: data._total,
        };
    }
    res.status(code).json(Object.assign({ status: "success", message, data: responseData || null }, (paginationData && { pagination: paginationData })));
};
exports.responseSuccess = responseSuccess;
/** Response error */
const responseError = (res, message, code, errors = null) => {
    res.status(code).json(Object.assign({ status: "error", message }, (errors && { errors })));
};
exports.responseError = responseError;
/** Pagination number */
const pgNumber = (value = 1) => {
    const perPage = 3;
    return {
        page: value,
        perPage,
    };
};
exports.pgNumber = pgNumber;
