"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generator_1 = require("./generator");
const fileName = process.argv[2];
if (!fileName) {
    console.error("❌ Please provide a validator name");
    process.exit(1);
}
const stubPath = (0, generator_1.directory)("../stubs/validator.stub");
const validatorDir = (0, generator_1.directory)("../../validators");
const filePath = (0, generator_1.createFile)(validatorDir, fileName);
// Check the validator directory exists, if the directory doesn't exist, create it
if (!fs_1.default.existsSync(validatorDir)) {
    fs_1.default.mkdirSync(validatorDir);
}
// Check the validator file already exists
if (fs_1.default.existsSync(filePath)) {
    console.error(`❌ Validator file already exists`);
    process.exit(1);
}
const modelName = fileName.toLowerCase().replace("validator", "").charAt(0).toUpperCase() +
    fileName.toLowerCase().replace("validator", "").slice(1);
const stub = (0, generator_1.getStub)(stubPath, modelName);
fs_1.default.writeFileSync(filePath, stub);
console.log(`✅ Validator file created successfully`);
