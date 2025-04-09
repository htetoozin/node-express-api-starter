"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generator_1 = require("../generator");
const fileName = process.argv[2];
if (!fileName) {
    console.error("❌ Please provide a seeder name");
    process.exit(1);
}
const stubPath = (0, generator_1.directory)("../stubs/seeder.stub");
const seedersDir = (0, generator_1.directory)("../../database/seeders");
const filePath = (0, generator_1.createFile)(seedersDir, fileName);
// Check the seeders directory exists, if the directory doesn't exist, create it
if (!fs_1.default.existsSync(seedersDir)) {
    fs_1.default.mkdirSync(seedersDir);
}
// Check the seeder file already exists
if (fs_1.default.existsSync(filePath)) {
    console.error(`❌ Seeder file already exists`);
    process.exit(1);
}
const stub = (0, generator_1.getStub)(stubPath, fileName);
fs_1.default.writeFileSync(filePath, stub);
console.log(`✅ Seeder file created successfully`);
