"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStub = exports.createFile = exports.directory = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * Get directory path
 * @param path
 * @returns
 */
const directory = (filePath) => {
    return path_1.default.join(__dirname, filePath);
};
exports.directory = directory;
/**
 * Create file path
 * @param folder
 * @param fileName
 * @returns
 */
const createFile = (folder, fileName) => {
    return path_1.default.join(folder, `${fileName}.ts`);
};
exports.createFile = createFile;
/**
 * Get stub file
 * @param stubPath
 * @param fileName
 * @returns
 */
const getStub = (stubPath, fileName) => {
    let stub = fs_1.default.readFileSync(stubPath, "utf-8");
    stub = stub.replace(/{{name}}/g, fileName);
    return stub;
};
exports.getStub = getStub;
