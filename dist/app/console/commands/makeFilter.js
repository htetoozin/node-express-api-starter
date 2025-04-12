"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generator_1 = require("./generator");
const fileName = process.argv[2];
if (!fileName) {
    console.error("❌ Please provide a filter name");
    process.exit(1);
}
const stubPath = (0, generator_1.directory)("../stubs/filter.stub");
const filterDir = (0, generator_1.directory)("../../filters");
const filePath = (0, generator_1.createFile)(filterDir, fileName);
// Check the filter directory exists, if the filter doesn't exist, create it
if (!fs_1.default.existsSync(filterDir)) {
    fs_1.default.mkdirSync(filterDir);
}
// Check the filter file already exists
if (fs_1.default.existsSync(filePath)) {
    console.error(`❌ Filter file already exists`);
    process.exit(1);
}
const modelName = fileName.toLowerCase().replace("filter", "").charAt(0).toUpperCase() +
    fileName.toLowerCase().replace("filter", "").slice(1);
const stub = (0, generator_1.getStub)(stubPath, modelName);
fs_1.default.writeFileSync(filePath, stub);
console.log(`✅ Filter file created successfully`);
