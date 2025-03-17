"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = __importDefault(require("./filter"));
class UserFilter extends filter_1.default {
    constructor() {
        super(...arguments);
        /**
         * Filter values
         */
        this.filterValues = ["name", "email"];
    }
    /**
     * Filter by name
     */
    name(value) {
        return this.builder.where("name", "like", `%${value}%`);
    }
    /**
     * Filter by email
     */
    email(value) {
        return this.builder.where("email", value);
    }
}
exports.default = UserFilter;
