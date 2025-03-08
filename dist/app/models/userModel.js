"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sutando_1 = require("sutando");
// interface UserType {
//   id: number;
//   name: string;
//   email: string;
//   role_id: number;
//   created_at?: Date;
//   updated_at?: Date;
// }
class User extends sutando_1.Model {
}
User.table = "users";
User.fillable = ["name", "email", "role_id"];
User.dates = ["created_at", "updated_at"];
exports.default = User;
