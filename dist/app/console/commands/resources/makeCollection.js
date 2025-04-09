"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const generator_1 = require("../generator");
const fileName = process.argv[2];
if (!fileName) {
    console.error("❌ Please provide a collection name");
    process.exit(1);
}
const stubPath = (0, generator_1.directory)("../stubs/collection.stub");
const collectionDir = (0, generator_1.directory)("../../resources");
const filePath = (0, generator_1.createFile)(collectionDir, fileName);
// Check the collection directory exists, if the directory doesn't exist, create it
if (!fs_1.default.existsSync(collectionDir)) {
    fs_1.default.mkdirSync(collectionDir);
}
// Check the collection file already exists
if (fs_1.default.existsSync(filePath)) {
    console.error(`❌ Collection file already exists`);
    process.exit(1);
}
const modelName = fileName.toLowerCase().replace("collection", "").charAt(0).toUpperCase() +
    fileName.toLowerCase().replace("collection", "").slice(1);
const stub = (0, generator_1.getStub)(stubPath, modelName);
fs_1.default.writeFileSync(filePath, stub);
console.log(`✅ Collection file created successfully`);
