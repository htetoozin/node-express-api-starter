"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCollection = void 0;
const pagination_1 = require("../pagination");
const userResource_1 = require("./userResource");
const userCollection = (data) => {
    return {
        data: data.map((item) => (Object.assign({}, (0, userResource_1.userResource)(item)))),
        pagination: (0, pagination_1.metaPagination)(data),
    };
};
exports.userCollection = userCollection;
