"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mail = void 0;
const utils_1 = require("../utils");
exports.mail = {
    host: (0, utils_1.env)("MAIL_HOST"),
    port: Number((0, utils_1.env)("MAIL_PORT", 587)),
    secure: (0, utils_1.env)("MAIL_SECURE", false),
    username: (0, utils_1.env)("MAIL_USERNAME"),
    password: (0, utils_1.env)("MAIL_PASSWORD"),
    address: (0, utils_1.env)("MAIL_FROM_ADDRESS", "hello@node.com"),
    name: (0, utils_1.env)("MAIL_FROM_NAME", "Welcome from Hello Node"),
};
