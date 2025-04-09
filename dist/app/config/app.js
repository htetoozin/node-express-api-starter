"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneSignal = exports.jwt = exports.UNAUTHORIZED = exports.INVALID_DATA = exports.ACCEPTED_FILE_TYPES = exports.MAX_FILE_SIZE = void 0;
const utils_1 = require("../utils");
/**
 * Image upload max file size with MB
 */
exports.MAX_FILE_SIZE = 1;
/**
 * Image upload accepted types
 */
exports.ACCEPTED_FILE_TYPES = ["jpeg", "jpg", "png"];
/**
 * 400 Bad validaion error default message
 */
exports.INVALID_DATA = "Invalid Data";
/**
 * 401 Unauthorized error default message
 */
exports.UNAUTHORIZED = "Unauthorized";
/**
 * JWT credentials
 */
exports.jwt = {
    expire: (0, utils_1.env)("JWT_EXPIRE_TIME", 18000), // 5 hours
    secret: (0, utils_1.env)("JWT_SECRET", "secret"),
};
/**
 * One Signal credentials
 */
exports.oneSignal = {
    appId: (0, utils_1.env)("ONE_SIGNAL_APP_ID"),
    appToken: (0, utils_1.env)("ONE_SIGNAL_APP_TOKEN"),
};
