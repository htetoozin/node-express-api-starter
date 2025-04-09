"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = exports.imagePath = exports.deletePath = exports.publicPath = exports.MB = exports.pgNumber = exports.responseError = exports.responseSuccess = exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
/** Get env variable with default value */
const env = (name, value) => {
    return process.env[name] || value;
};
exports.env = env;
/** Response success */
const responseSuccess = (res, data, message, code) => {
    var _a;
    let responseData = data;
    let paginationData = null;
    if ((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.items) {
        const { data: dataItems, pagination } = data;
        responseData = dataItems.items;
        paginationData = {
            current_page: pagination.currentPage,
            total_page: pagination.totalPage,
            total_items: pagination.totalItems,
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
    return {
        page: value,
        perPage: 10,
    };
};
exports.pgNumber = pgNumber;
/** Convert byets to MB */
const MB = (value = 1) => {
    return 1024 * 1024 * value;
};
exports.MB = MB;
/** Get public path */
const publicPath = (value) => {
    return path_1.default.join(__dirname, `../public/${value}`);
};
exports.publicPath = publicPath;
/** Delete file path */
const deletePath = (value) => {
    if (fs_1.default.existsSync(value)) {
        fs_1.default.unlinkSync(value);
    }
};
exports.deletePath = deletePath;
/** Get image path */
const imagePath = (path) => {
    if ((0, exports.env)("FILESYSTEM_DRIVER") === "s3") {
        return `${(0, exports.env)("AWS_REDIRECT_PATH")}/${path}`;
    }
    return `${(0, exports.env)("APP_URL")}/${path}`;
};
exports.imagePath = imagePath;
/** Random  */
const random = (length) => {
    return Math.random()
        .toString(36)
        .substring(2, length + 2);
};
exports.random = random;
