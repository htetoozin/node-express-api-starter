"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sutando_1 = require("sutando");
const utils_1 = require("../utils");
console.log((0, utils_1.env)("DB_HOST", "127.0.0.1"), "test server");
sutando_1.sutando.addConnection({
    client: "mysql2",
    connection: {
        host: (0, utils_1.env)("DB_HOST", "127.0.0.1"),
        database: (0, utils_1.env)("DB_NAME", "node_ts"),
        user: (0, utils_1.env)("DB_USERNAME", "root"),
        password: (0, utils_1.env)("DB_PASSWORD", ""),
    },
});
exports.db = sutando_1.sutando;
