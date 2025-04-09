"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sutando_1 = require("sutando");
const bcrypt_1 = __importDefault(require("bcrypt"));
class User extends sutando_1.Model {
    constructor() {
        super(...arguments);
        this.hidden = ["password", "created_at", "updated_at"];
    }
    /**
     * Store bcrypt hashing value password when user saving.
     */
    attributePassword() {
        return sutando_1.Attribute.make({
            get: (value) => value,
            set: (value) => bcrypt_1.default.hashSync(value, 10),
        });
    }
    /**
     * Query Scopes
     */
    scopeFilter(query, filter) {
        return filter.apply(query);
    }
}
User.table = "users";
User.fillable = ["name", "email", "role_id", "path", "password"];
User.dates = ["created_at", "updated_at"];
exports.default = User;
