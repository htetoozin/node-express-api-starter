"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const role_1 = require("../../enums/role");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../../config/database");
const demoSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.db.table("users").insert({
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            role_id: role_1.Role.ADMIN,
            password: bcrypt_1.default.hashSync("123456", 10),
            created_at: new Date(),
            updated_at: new Date(),
        });
        console.log("🌱 demoSeeder Successfully seeded");
        process.exit(0);
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
});
exports.default = demoSeeder;
