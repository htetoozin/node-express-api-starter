"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generator_1 = require("./generator");
const fileName = process.argv[2];
if (!fileName) {
    console.error("❌ Please provide a controller name");
    process.exit(1);
}
const stubPath = (0, generator_1.directory)("../stubs/controller.stub");
const controllerDir = (0, generator_1.directory)("../../controllers");
const filePath = (0, generator_1.createFile)(controllerDir, fileName);
// Check the controller directory exists, if the directory doesn't exist, create it
if (!fs_1.default.existsSync(controllerDir)) {
    fs_1.default.mkdirSync(controllerDir);
}
// Check the controller file already exists
if (fs_1.default.existsSync(filePath)) {
    console.error(`❌ Controller file already exists`);
    process.exit(1);
}
const modelName = fileName.toLowerCase().replace("controller", "").charAt(0).toUpperCase() +
    fileName.toLowerCase().replace("controller", "").slice(1);
const stub = (0, generator_1.getStub)(stubPath, modelName);
fs_1.default.writeFileSync(filePath, stub);
console.log(`✅ Controller file created successfully`);
