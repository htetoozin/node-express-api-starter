"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sutando_1 = require("sutando");
class User extends sutando_1.Model {
}
User.table = "users";
User.fillable = ["name", "email", "role_id", "password"];
User.dates = ["created_at", "updated_at"];
exports.default = User;
