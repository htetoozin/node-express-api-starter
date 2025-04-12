"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generator_1 = require("./generator");
const fileName = process.argv[2];
if (!fileName) {
    console.error("❌ Please provide a model name");
    process.exit(1);
}
const stubPath = (0, generator_1.directory)("../stubs/model.stub");
const modelDir = (0, generator_1.directory)("../../models");
const filePath = (0, generator_1.createFile)(modelDir, fileName);
// Check the model directory exists, if the model doesn't exist, create it
if (!fs_1.default.existsSync(modelDir)) {
    fs_1.default.mkdirSync(modelDir);
}
// Check the model file already exists
if (fs_1.default.existsSync(filePath)) {
    console.error(`❌ Model file already exists`);
    process.exit(1);
}
const modelName = fileName.toLowerCase().replace("model", "").charAt(0).toUpperCase() +
    fileName.toLowerCase().replace("model", "").slice(1);
const stub = (0, generator_1.getStub)(stubPath, modelName);
fs_1.default.writeFileSync(filePath, stub);
console.log(`✅ Model file created successfully`);
