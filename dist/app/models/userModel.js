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
        this.SALT_ROUNDS = 10;
    }
    /**
     * Store bcrypt hashing value password when user saving.
     */
    attributePassword() {
        return sutando_1.Attribute.make({
            set: (value) => bcrypt_1.default.hashSync(value, this.SALT_ROUNDS),
        });
    }
}
User.table = "users";
User.fillable = ["name", "email", "role_id", "password"];
User.dates = ["created_at", "updated_at"];
exports.default = User;
