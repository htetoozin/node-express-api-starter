"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCollection = void 0;
const pagination_1 = require("./pagination");
const TestCollection = (data) => {
    return {
        data: data.map((item) => ({})),
        pagination: (0, pagination_1.metaPagination)(data),
    };
};
exports.TestCollection = TestCollection;
