"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3 = void 0;
const utils_1 = require("../utils");
exports.s3 = {
    region: (0, utils_1.env)("AWS_REGION"),
    key: (0, utils_1.env)("AWS_ACCESS_KEY_ID"),
    secret: (0, utils_1.env)("AWS_SECRET_ACCESS_KEY"),
    endpoint: (0, utils_1.env)("AWS_ENDPOINT"),
    bucket: (0, utils_1.env)("AWS_BUCKET"),
};
