"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResource = void 0;
const utils_1 = require("../../utils");
const userResource = (user) => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
        path: user.path ? (0, utils_1.imagePath)(user.path) : null,
    };
};
exports.userResource = userResource;
